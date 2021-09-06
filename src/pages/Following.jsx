import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserList from "../utils/UserList";
import "./Following.css";
export default function Following(props) {
  const { authActor } = useSelector((state) => state);
  const [following, setFollowing] = useState([]);
  useEffect(async () => {
    try {
      let tu = await authActor.getShowUserProfileByUserName(
        props.match.params.username
      );
      let tmp = await authActor.getFollow(tu.uid);
      setFollowing(tmp);
    } catch (error) {
      console.log(error);
    }
  }, [authActor]);
  return (
    <div className="following__page">
      <div className="following__header">
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
