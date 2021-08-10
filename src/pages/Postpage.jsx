import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Button, TextField, Input } from "@material-ui/core";
import FlipMove from "react-flip-move";
import Post from "../compoents/Post";
import "./Postpage.css";
export default function PostPage(props) {
  const { user, identity, authActor } = useSelector((state) => state);
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState();
  async function handleSubmit() {
    if (authActor && post) {
      try {
        let tp = document.getElementById("comment").value;
        authActor.addComment(
          value,
          "time",
          "",
          "url",
          parseInt(props.match.params.tid)
        );
      } catch (error) {}
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
  }, [authActor]);
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
      <div className="post__page__input">
        <div className="post__page__avatar">
          <Avatar src={user ? user.avatarimg : ""} />
        </div>
        <Input
          id="comments"
          inputProps={{ "aria-label": "description" }}
          className="signup__input"
        />
        <Button onClick={handleSubmit} className="submit__button">
          Submit
        </Button>
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
