import React, { useState, useEffect } from "react";
import { Principal } from "@dfinity/principal";
import { useSelector } from "react-redux";
import TweetBox from "./TweetBox";
import Post from "./Post";
import { Button, Avatar, TextField } from "@material-ui/core";
import "./TweetBox.css";
import "./Feed.css";
import FlipMove from "react-flip-move";
import { BlockLoading } from "react-loadingg";

function Feed(props) {
  const { authActor, user, identity } = useSelector((state) => state);
  const [isloading, setIsloading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  let flag = false;
  let cnt = 0;
  let ct = 0;
  let changing = false;
  const sendTweet = (e) => {
    e.preventDefault();
    console.log("sending Tweet");
    let a = posts;
    let t = 0;
    console.log(posts[0].tid);
    if (user)
      a.unshift({
        tid: 1,
        content: tweetMessage,
        url: tweetImage,
        user: user,
      });
    setPosts(a);
    authActor
      .addTweet(tweetMessage, "time", tweetImage)
      .then((tmp) => console.log(tmp));
    setTweetMessage("");
    setTweetImage("");
  };

  async function fetchData() {
    console.log(authActor);
    if (authActor !== null && !changing && identity) {
      console.log("fetching data");
      changing = true;
      console.log(identity);
      let a = await authActor.getUserAllTweets(identity);
      console.log(a);
      setIsloading(false);
      setPosts(a);
    }
    changing = false;
  }

  useEffect(() => {
    fetchData();
  }, [authActor, identity]);
  return (
    <div>
      <div className="tweetBox">
        <form>
          <div className="tweetBox__input">
            <Avatar
              className="tweetBox__Avatar"
              src={user ? user.avatarimg : ""}
            />
            <TextField
              className="TextField"
              id="outlined-textarea"
              onChange={(e) => setTweetMessage(e.target.value)}
              value={tweetMessage}
              label="What's happening?"
              multiline
              variant="outlined"
            />
          </div>
          <input
            value={tweetImage}
            onChange={(e) => setTweetImage(e.target.value)}
            className="tweetBox__imageInput"
            placeholder="Optional: Enter image URL"
            type="text"
          />
          <Button
            onClick={sendTweet}
            type="submit"
            className="tweetBox__tweetButton"
          >
            Post
          </Button>
        </form>
      </div>
      {isloading ? (
        <BlockLoading color="#50b7f5" />
      ) : (
        <div className="feed">
          <Button onClick={fetchData}> refresh </Button>
          <FlipMove>
            {posts.map((post) => (
              <Post
                key={post.tid}
                tid={post.tid}
                displayName={post.user.nickname}
                avatar={post.user.avatarimg}
                text={post.content}
                image={post.url}
              />
            ))}
          </FlipMove>
        </div>
      )}
    </div>
  );
}

export default Feed;
