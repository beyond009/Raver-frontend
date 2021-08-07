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
  const { identity, authActor, user } = useSelector((state) => state);
  async function fetchData() {
    if (authActor !== null && identity) {
      console.log("fetching data");
      let a = await authActor.getUserAllTweets(identity);
      setIsloading(false);
      // a.reverse();
      setPosts(a);
    }
  }
  useEffect(() => {
    fetchData();
  }, [authActor, identity]);
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
              text={post.content}
              image={post.url}
            />
          ))}
        </FlipMove>
      )}
    </div>
  );
}
