import React, { useState, useEffect } from "react";
import { Principal } from "@dfinity/principal";
import { useSelector, useDispatch } from "react-redux";
import TweetBox from "./TweetBox";
import Post from "./Post";
import { Button, Avatar, TextField } from "@material-ui/core";
import "./TweetBox.css";
import "./Feed.css";
import FlipMove from "react-flip-move";
import { LoopCircleLoading } from "react-loadingg";
import { updateFeed } from "../redux/features/feed";

function Feed(props) {
  const { authActor, user, feed } = useSelector((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const [posts, setPosts] = useState([]);
  const [disable, setDisable] = useState(true);
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const dispatch = useDispatch();
  let flag = false;

  const sendTweet = async (e) => {
    e.preventDefault();
    console.log("sending Tweet");
    setDisable(true);
    let t = 0;
    let a = [
      {
        tid: null,
        content: tweetMessage,
        url: tweetImage,
        user: user,
        sending: true,
      },
      ...feed,
    ];
    dispatch(updateFeed(a));
    setTweetMessage("");
    setTweetImage("");
    let tmp = await authActor.addTweet(tweetMessage, "time", tweetImage, 0);
    let b = await authActor.getFollowLastestAmountTweets(0, 50);
    dispatch(updateFeed(b));
  };
  function handleOnChange(e) {
    if (e.target.value && e.target.value.length <= 300) {
      setTweetMessage(e.target.value);
      if (user) setDisable(false);
    } else {
      setTweetMessage(e.target.value);
      setDisable(true);
    }
  }
  async function fetchData() {
    setNoMore(false);
    if (authActor && !feed.length) {
      console.log("fetching data");
      setIsLoading(true);
      let a = await authActor.getFollowLastestAmountTweets(0, 20);
      console.log(a);
      dispatch(updateFeed(a));
      if (!a.length) setNoMore(true);
      setIsLoading(false);
    }
  }
  async function handleLoadMore() {
    setIsLoadingMore(true);
    if (authActor && feed.length) {
      try {
        let a = await authActor.getFollowOlder50Tweets(
          feed[feed.length - 1].tid
        );
        if (!a.length) {
          setNoMore(true);
          setIsLoadingMore(false);
          return;
        }
        let b = feed.concat(a);
        setIsLoadingMore(false);
        dispatch(updateFeed(b));
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
      {isLoading ? (
        <LoopCircleLoading color="rgb(15, 20, 25)" size="small" />
      ) : (
        <div className="feed">
          <FlipMove>
            {feed.map((post, k) => (
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
                sending={post.sending}
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
