import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FlipMove from "react-flip-move";
import { LoopCircleLoading } from "react-loadingg";
import { hexToRgb, makeStyles } from "@material-ui/core/styles";
import { Button, LinearProgress } from "@material-ui/core";
import Post from "./Post";
import "./UserPosts.css";
import { toHex } from "@dfinity/agent";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    color: "#0f1419",
  },
}));
export default function GlobalPosts(props) {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const { authActor } = useSelector((state) => state);
  async function fetchData() {
    setNoMore(false);
    if (authActor !== null) {
      console.log("fetching data");
      let a = await authActor.getNew20Tweets(0);
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
        let a = await authActor.getNew20Tweets(posts[posts.length - 1].tid);
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
        <div className={classes.root} className="user__posts__load">
          <LinearProgress />
        </div>
      ) : (
        <div>
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
      )}
    </div>
  );
}
