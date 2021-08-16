import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Button, TextField, Input } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import FlipMove from "react-flip-move";
import Post from "../compoents/Post";
import "./PostPage.css";
export default function PostPage(props) {
  const { user, authActor } = useSelector((state) => state);
  const [comments, setComments] = useState([]);
  const [commentMessage, setCommentMessage] = useState();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const [post, setPost] = useState();
  function handleSubmit() {
    if (authActor && post) {
      try {
        console.log("sending Tweet");
        let a = comments;
        if (user)
          a.unshift({
            tid: null,
            content: commentMessage,
            user: user,
          });
        setComments(a);
        authActor
          .addComment(
            commentMessage,
            "time",
            "url",
            parseInt(props.match.params.tid)
          )
          .then((a) => console.log(a));

        setCommentMessage("");
      } catch (error) {
        console.log(error);
      }
    }
  }
  async function handleLoadMore() {
    setIsLoadingMore(true);
    if (authActor && comments.length) {
      try {
        let a = await authActor.getTweetOlder20Comments(
          parseInt(props.match.params.tid),
          comments[comments.length - 1].tid
        );
        if (!a.length) {
          setNoMore(true);
          setIsLoadingMore(false);
          return;
        }
        let b = comments.concat(a);
        setIsLoadingMore(false);
        setComments(b);
      } catch (error) {
        console.log(error);
      }
    }
  }
  useEffect(async () => {
    setNoMore(false);
    if (authActor) {
      try {
        let tp = await authActor.getTweetById(parseInt(props.match.params.tid));
        setPost(tp);
      } catch (e) {
        console.log(e);
      }
      try {
        let tp = await authActor.getTweetOlder20Comments(
          parseInt(props.match.params.tid),
          0
        );
        if (!tp.length) setNoMore(true);
        setComments(tp);
      } catch (e) {
        console.log(e);
      }
    }
  }, [authActor, props.match.params.tid]);
  return (
    <div className="post__page">
      <div className="post__page__header">
        <h2>Post</h2>
      </div>
      {post ? (
        <Post
          key={post.tid}
          tid={post.tid}
          displayName={post.user.nickname}
          username={post.user.username}
          verified={true}
          avatar={post.user.avatarimg}
          text={post.content}
          image={post.url}
          likeNumber={post.likeNumber}
          commentNumber={post.commentNumber}
        />
      ) : null}
      <div className="commentBox">
        <form>
          {/* <div className="post__page__input"> */}
          <TextField
            className="TextField"
            id="comment"
            label=""
            multiline
            variant="outlined"
            value={commentMessage}
            onChange={(e) => setCommentMessage(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Avatar src={user ? user.avatarimg : ""} />
                </InputAdornment>
              ),
            }}
          />
          <Button onClick={handleSubmit} className="submit__button">
            Reply
          </Button>
          {/* </div> */}
        </form>
      </div>
      <div>
        <h4>comments</h4>
      </div>
      <div className="post__page__comments">
        <FlipMove>
          {comments.map((post, k) => (
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
      </div>
      <div className="post__load">
        <Button
          className="post__load__button"
          onClick={handleLoadMore}
          disabled={isLoadingMore || noMore}
        >
          {noMore ? "no more" : isLoadingMore ? "loading" : "load more"}
        </Button>
      </div>
    </div>
  );
}
