import React from "react";
import FlipMove from "react-flip-move";
import { BlockLoading } from "react-loadingg";
export default function UserPosts(props) {
  async function fetchData() {
    if (authActor !== null && !changing && identity) {
      console.log("fetching data");
      changing = true;
      let a = await authActor.getUserAllTweets(identity);
      setIsloading(false);
      // a.reverse();
      setPosts(a);
    }
    changing = false;
  }
  useEffect(() => {
    fetchData();
  }, [authActor, identity]);
  return (
    <div>
      {isloading ? (
        <BlockLoading color="#f09217" />
      ) : (
        <div className="feed">
          <Button onClick={fetchData}> refresh </Button>
          <FlipMove>
            {posts.map((post) => (
              <Post
                key={post.tid}
                tid={post.tid}
                displayName={post.user.nickname}
                avatar={post.user.avatarimg}
                text={post.content}
                image={post.url}
              />
            ))}
          </FlipMove>
        </div>
      )}
    </div>
  );
}
