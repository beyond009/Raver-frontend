import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import { Button, Avatar, TextField } from "@material-ui/core";
import "./TweetBox.css";
import "./Feed.css";
import FlipMove from "react-flip-move";
import { BlockLoading } from "react-loadingg";

function Feed(props) {
  const [update, setUpdate] = useState(false);
  const [isloading, setIsloading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const [user, setUser] = useState();
  let flag = false;
  let cnt = 0;
  let ct = 0;
  let changing = false;
  const sendTweet = (e) => {
    e.preventDefault();
    console.log("sending Tweet");
    let a = posts;
    let t = 0;
    if (posts.length) {
      t = posts[0].tid + 1;
    }
    if (user)
      a.unshift({
        tid: t,
        content: tweetMessage,
        url: tweetImage,
        user: user,
      });
    setPosts(a);
    props.authActor
      .addTweet("", tweetMessage, "", tweetImage)
      .then((tmp) => console.log(tmp));
    setTweetMessage("");
    setTweetImage("");
  };
  async function fetchData() {
    if (props.authActor !== null && !changing) {
      console.log("fetching data");
      changing = true;
      let a = await props.authActor.getUserLastestTenTweets();

      setIsloading(false);
      setPosts(a);
      let b = await props.authActor.getUserProfile();
      setUser(b);
    }
    changing = false;
  }
  const deletPost = async (tid) => {
    if (props.authActor != null) {
      props.authActor.deleteTweet(tid);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <div className="tweetBox">
        <form>
          <div className="tweetBox__input">
            <Avatar
              className="tweetBox__Avatar"
              src={user ? user.avatarimg : ""}
            />
            {/* <input
          onChange={(e) => setTweetMessage(e.target.value)}
          value={tweetMessage}
          placeholder="What's happening?"
          type="text"
        /> */}
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
                displayName={post.user.uname}
                avatar={post.user.avatarimg}
                text={post.content}
                image={post.url}
                deletPost={deletPost}
              />
            ))}
          </FlipMove>
        </div>
      )}
    </div>
  );
}

export default Feed;
