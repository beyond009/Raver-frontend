import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Principal } from "@dfinity/principal";
import { useSelector, useDispatch } from "react-redux";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

import TweetBox from "./TweetBox";
import Post from "./Post";
import { makeStyles } from "@material-ui/core";
import { Button, Avatar, TextField, LinearProgress } from "@material-ui/core";
import "./TweetBox.css";
import "./Feed.css";
import FlipMove from "react-flip-move";
import { LoopCircleLoading } from "react-loadingg";
import { updateFeed } from "../redux/features/feed";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    color: "#0f1419",
  },
}));
function Feed(props) {
  const classes = useStyles();
  const { authActor, user, feed } = useSelector((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const [posts, setPosts] = useState([]);
  const [disable, setDisable] = useState(true);
  const [inDisable, setInDisable] = useState(false);
  const [sending, setSending] = useState(false);
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const dispatch = useDispatch();
  let flag = false;
  // window.scroll(function () {
  //   if ($(document).scrollTop() != 0) {
  //     sessionStorage.setItem("offsetTop", $(window).scrollTop());
  //   }
  // });
  // //onload时，取出并滚动到上次保存位置
  // window.onload = function () {
  //   var offset = sessionStorage.getItem("offsetTop");
  //   $(document).scrollTop(offset);
  // };

  const sendTweet = async (e) => {
    e.preventDefault();
    console.log("sending Tweet");
    setDisable(true);
    setSending(true);
    setInDisable(true);
    let re = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/g;
    let re1 = /http(s)?:\/\//;
    let tt = tweetMessage.replace(re, (website) => {
      return (
        "<a href='" +
        website +
        "' target='_blank'>" +
        `${
          website.replace(re1, "").length < 35
            ? website.replace(re1, "")
            : website.replace(re1, "").slice(0, 35)
        }...` +
        "</a>"
      );
    });
    // .replace(/@(.*) /g, (username) => {
    //   return (
    //     "<a href='http://localhost:3000/profile/" +
    //     username.slice(1) +
    //     "'>" +
    //     username.substring(0, username.length - 1) +
    //     "</a>" +
    //     " "
    //   );
    // });
    // console.log(tt);
    // .replace(/@(.+)\s/g, "我是ddd");
    // let tt = ttt.replace(/@(.+)\s/g, "我是ddd");
    let tmp = await authActor.addTweet(tt, "time", tweetImage, 0);
    let b = await authActor.getFollowLastestAmountTweets(0, 50);
    dispatch(updateFeed(b));
    setDisable(false);
    setSending(false);
    setInDisable(false);
    setTweetMessage("");
    setTweetImage("");
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
              disabled={inDisable}
              label="What's happening?"
              multiline
              variant="outlined"
            />
          </div>
          <input
            value={tweetImage}
            disabled={inDisable}
            onChange={(e) => setTweetImage(e.target.value)}
            className="tweetBox__imageInput"
            placeholder="Optional: Image URL"
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
            {sending ? "Sending" : "POST"}
          </Button>
        </form>
      </div>
      {isLoading ? (
        <div className={classes.root} className="user__posts__load">
          <LinearProgress />
        </div>
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
