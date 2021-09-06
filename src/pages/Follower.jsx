import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserList from "../utils/UserList";
import "./Follower.css";

export default function Follower(props) {
  const { authActor } = useSelector((state) => state);
  const [follower, setFollower] = useState([]);
  useEffect(async () => {
    try {
      let tu = await authActor.getShowUserProfileByUserName(
        props.match.params.username
      );
      let tmp = await authActor.getFollower(tu.uid);
      console.log(tmp);
      setFollower(tmp);
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
          's Follower
        </h2>
      </div>
      {follower.map((u, index) => (
        <UserList user={u} forF={true} key={index} />
      ))}
    </div>
  );
}
