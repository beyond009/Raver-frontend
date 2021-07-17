import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import httpAgent from "../httpAgent";
import { Button, Avatar, TextField } from "@material-ui/core";
import "./TweetBox.css";
import "./Feed.css";
import FlipMove from "react-flip-move";

function Feed(props) {
  const [update, setUpdate] = useState(false);
  const [posts, setPosts] = useState([]);
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const [user, setUser] = useState();
  let flag = false;
  let cnt = 0;
  let ct = 0;
  let tposts = new Array(100);
  let changing = false;
  const sendTweet = (e) => {
    e.preventDefault();
    console.log("sending Tweet");
    console.log(tweetMessage);
    let a = posts;
    console.log("a", a);
    a.unshift({
      tid: posts[0].tid + 1,
      content: tweetMessage,
      url: tweetImage,
      user: props.user,
    });
    setPosts(a);
    props.authActor
      .addTweet("", tweetMessage, "", tweetImage)
      .then((tmp) => console.log(tmp));
    // props.setUpdate();
    setTweetMessage("");
    setTweetImage("");
  };
  async function fetchData() {
    if (props.authActor !== null && !changing) {
      console.log("fetching data");
      changing = true;
      let a = await props.authActor.getUserLastestTenTweets();
      console.log(a);
      setPosts(a);
      // let b = await props.authActor.getUs;
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
              src={props.user ? props.user.avatarimg : ""}
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
      <div className="feed">
        <Button onClick={fetchData}> refresh </Button>
        <FlipMove>
          {console.log(posts)}
          {/* {posts.map((post) => console.log(post))} */}
          {posts.map((post) => (
            <Post
              key={post.tid}
              tid={post.tid}
              displayName={post.user.uname}
              // username={post.user.uname}
              text={post.content}
              image={post.url}
              deletPost={deletPost}
            />
          ))}
        </FlipMove>
      </div>
    </div>
  );
}

export default Feed;
