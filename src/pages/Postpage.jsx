import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Button, TextField, Input } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import FlipMove from "react-flip-move";
import Post from "../compoents/Post";
import "./PostPage.css";
export default function PostPage(props) {
  const { user, identity, authActor } = useSelector((state) => state);
  const [comments, setComments] = useState([]);
  const [commentMessage, setCommentMessage] = useState();
  const [post, setPost] = useState();
  function handleSubmit() {
    console.log("dfasdfsa");
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
  useEffect(async () => {
    if (authActor) {
      try {
        let tp = await authActor.getTweetById(parseInt(props.match.params.tid));
        setPost(tp);
      } catch (e) {
        console.log(e);
      }
      try {
        let tp = await authActor.getTweetAllComments(
          parseInt(props.match.params.tid)
        );
        console.log(tp);
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
    </div>
  );
}
