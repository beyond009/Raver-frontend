import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Post from "../compoents/Post";
export default function PostPage(props) {
  const { user, identity, authActor } = useSelector((state) => state);
  const [commets, setCommets] = useState([]);
  const [post, setPost] = useState();
  useEffect(async () => {
    try {
      let tp = await authActor.getTweetById(props.match.params.tid);
      setPost(tp);
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <div className="post__page">
      <Post
        key={post.tid}
        tid={post.tid}
        displayName={post.user.nickname}
        username={post.user.username}
        verified={true}
        avatar={post.user.avatarimg}
        text={post.content}
        image={post.url}
      />
    </div>
  );
}
