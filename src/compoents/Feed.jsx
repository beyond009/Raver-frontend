import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import httpAgent from "../httpAgent";
import { Button } from "@material-ui/core";
import "./Feed.css";
import FlipMove from "react-flip-move";

function Feed(props) {
  const [update, setUpdate] = useState(false);
  const [posts, setPosts] = useState([]);
  let flag = false;
  let cnt = 0;
  let ct = 0;
  let tposts = new Array(100);
  let changing = false;
  // let posts = new Array(100);
  async function fetchData() {
    if (props.authActor !== null && !changing) {
      console.log("fetching data");
      changing = true;
      let a = await props.authActor.getUserLastestTenTweets();
      // // if(cnt > a.length) 存在tweet被删除的情况;
      // for (let i = cnt; i < a.length; i++) {
      //   let tmp = await props.authActor.getTweetById(a[i]);
      //   tposts[cnt] = tmp;
      //   cnt++;
      //   // console.log(cnt, tmp, tposts);
      // }
      // tposts.reverse();
      setPosts(a);
    }
    changing = false;
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="feed">
      <Button onClick={fetchData}> refresh </Button>
      <FlipMove>
        {console.log(posts)}
        {/* {posts.map((post) => console.log(post))} */}
        {posts.map((post) => (
          <Post
            key={post.tid}
            displayName="ddd009"
            username="ddd009"
            text={post.content}
            image={post.url}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
