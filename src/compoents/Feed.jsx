import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import httpAgent from "../httpAgent";
import "./Feed.css";
import FlipMove from "react-flip-move";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    // console.log("I'm here");
    // const authActor = await httpAgent();
    // console.log(authActor);
    // var tmp = await authActor.getValue();
    // console.log(tmp);
  }, []);

  return (
    <div className="feed">
      <FlipMove>
        {/* {posts.map((post) => ( */}
        <Post
          key="fxxk !"
          displayName="ddd009"
          username="ddd009"
          text="fxxK !"
          avatar="https://pbs.twimg.com/profile_images/1398625159016292358/uxVxE5Oc_400x400.jpg"
          image="https://www.nme.com/wp-content/uploads/2020/07/GettyImages-1052372952.jpg"
        />
        {/* // ))} */}
      </FlipMove>
    </div>
  );
}

export default Feed;
