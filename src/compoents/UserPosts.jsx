import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FlipMove from "react-flip-move";
import { LoopCircleLoading } from "react-loadingg";
import { Button } from "@material-ui/core";
import Post from "./Post";
import "./userPosts.css";
export default function UserPosts(props) {
  const [posts, setPosts] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const { authActor } = useSelector((state) => state);
  async function fetchData() {
    if (authActor !== null && props.user) {
      console.log("fetching data");
      let a = await authActor.getUserAllTweets(props.user.uid);
      setIsloading(false);
      a.reverse();
      setPosts(a);
    }
  }
  useEffect(() => {
    fetchData();
  }, [authActor, props.user]);
  return (
    <div className="user__posts">
      {isloading ? (
        <div>
          <LoopCircleLoading color="#f09217" />
        </div>
      ) : (
        <FlipMove>
          {posts.map((post, k) => (
            <Post
              key={k}
              tid={post.tid}
              displayName={post.user.nickname}
              avatar={post.user.avatarimg}
              verified={true}
              username={post.user.username}
              text={post.content}
              image={post.url}
              commentNumber={post.commentNumber}
              likeNumber={post.likeNumber}
              uid={post.user.uid}
            />
          ))}
        </FlipMove>
      )}
    </div>
  );
}
