import React, { useState, useEffect } from "react";
import { Principal } from "@dfinity/principal";
import { useSelector } from "react-redux";
import TweetBox from "./TweetBox";
import Post from "./Post";
import { Button, Avatar, TextField } from "@material-ui/core";
import "./TweetBox.css";
import "./Feed.css";
import FlipMove from "react-flip-move";
import { LoopCircleLoading } from "react-loadingg";

function Feed(props) {
  const { authActor, user } = useSelector((state) => state);
  const [isloading, setIsloading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const [posts, setPosts] = useState([]);
  const [disable, setDisable] = useState(true);
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  let flag = false;

  const sendTweet = (e) => {
    e.preventDefault();
    console.log("sending Tweet");
    let a = posts;
    let t = 0;
    if (user)
      a.unshift({
        tid: null,
        content: tweetMessage,
        url: tweetImage,
        user: user,
      });
    setPosts(a);
    authActor
      .addTweet(tweetMessage, "time", tweetImage, 0)
      .then((tmp) => console.log(tmp));
    setDisable(true);
    setTweetMessage("");
    setTweetImage("");
  };
  function handleOnChange(e) {
    if (e.target.value && e.target.value.length <= 300) {
      setTweetMessage(e.target.value);
      setDisable(false);
    } else {
      setTweetMessage(e.target.value);
      setDisable(true);
    }
  }
  async function fetchData() {
    setNoMore(false);
    if (authActor) {
      console.log("fetching data");
      let a = await authActor.getFollowLastestAmountTweets(0, 20);
      console.log(a);
      if (!a.length) setNoMore(true);
      setIsloading(false);
      setPosts(a);
    }
  }
  async function handleLoadMore() {
    setIsLoadingMore(true);
    if (authActor && posts.length) {
      try {
        let a = await authActor.getFollowOlder50Tweets(
          posts[posts.length - 1].tid
        );
        if (!a.length) {
          setNoMore(true);
          setIsLoadingMore(false);
          return;
        }
        let b = posts.concat(a);
        setIsLoadingMore(false);
        setPosts(b);
      } catch (error) {}
    }
  }
  useEffect(() => {
    fetchData();
  }, [authActor]);
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
              onChange={(e) => handleOnChange(e)}
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
            className={
              disable
                ? "tweetBox__tweetButton__disabled"
                : "tweetBox__tweetButton"
            }
            disabled={disable}
          >
            Post
          </Button>
        </form>
      </div>
      {isloading ? (
        <LoopCircleLoading color="#f09217" size="small" />
      ) : (
        <div className="feed">
          <FlipMove>
            {posts.map((post, k) => (
              <Post
                key={k}
                tid={post.tid}
                displayName={post.user.nickname}
                username={post.user.username}
                uid={post.user.uid}
                verified={true}
                avatar={post.user.avatarimg}
                text={post.content}
                image={post.url}
                commentNumver={post.commentNumber}
                likeNumber={post.likeNumber}
              />
            ))}
          </FlipMove>
          <div className="feed__load">
            <Button
              className="feed__load__button"
              onClick={handleLoadMore}
              disabled={isLoadingMore || noMore}
            >
              {noMore ? "no more" : isLoadingMore ? "loading" : "load more"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Feed;
