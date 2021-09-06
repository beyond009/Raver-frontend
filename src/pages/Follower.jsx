import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./Follower.css";

export default function Follower(props) {
  const { authActor } = useSelector((state) => state);
  const [following, setFollowing] = useState([]);
  useEffect(async () => {
    try {
      let tu = await authActor.getShowUserProfileByUserName(
        props.match.params.username
      );
      let tmp = await authActor.getFollower(tu.uid);
      setFollowing(tmp);
    } catch (error) {
      console.log(error);
    }
  }, [authActor]);
  return (
    <div className="follower__page">
      <div className="follower__header">
        <h2>
          {props.match.params.username.length < 10
            ? props.match.params.username
            : `${props.match.params.username.slice(0, 9)}...`}
          's Following
        </h2>
      </div>
      {following.map((u) => {
        <UserList user={u} forF={true} />;
      })}
    </div>
  );
}
