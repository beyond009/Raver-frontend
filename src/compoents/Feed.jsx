import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import FlipMove from "react-flip-move";

function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // db.collection("posts").onSnapshot((snapshot) =>
    //   setPosts(snapshot.docs.map((doc) => doc.data()))
    // );
    var post = {
      text: "fuck you asshole",
      displayName: "ddd009",
      username: "ddd009",
      avatar:
        "https://pbs.twimg.com/profile_images/1398625159016292358/uxVxE5Oc_400x400.jpg",
      image:
        "https://www.nme.com/wp-content/uploads/2020/07/GettyImages-1052372952.jpg",
    };
    // setPosts(post);
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
