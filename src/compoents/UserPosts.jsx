import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FlipMove from "react-flip-move";
import { LoopCircleLoading } from "react-loadingg";
import { Button } from "@material-ui/core";
import Post from "./Post";
import "./UserPosts.css";
export default function UserPosts(props) {
  const [posts, setPosts] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const { authActor } = useSelector((state) => state);
  async function fetchData() {
    if (authActor !== null && props.user) {
      console.log("fetching data");
      let a = await authActor.getUserOlder20Tweets(props.user.uid, 0);
      console.log(a);
      setIsloading(false);
      setPosts(a);
    }
  }
  async function handleLoadMore() {
    if (authActor && posts.length && props.user.uid) {
      try {
        setIsLoadingMore(true);
        let a = await authActor.geUserOlder20Tweets(
          props.user.uid,
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
      } catch (error) {
        console.log(error);
      }
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
      <div className="user__load">
        <Button
          className="user__load__button"
          onClick={handleLoadMore}
          disabled={isLoadingMore || noMore}
        >
          {noMore ? "no more" : isLoadingMore ? "loading" : "load more"}
        </Button>
      </div>
    </div>
  );
}
