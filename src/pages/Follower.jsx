import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import UserList from "../utils/UserList";
import { LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Follower.css";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    color: "#0f1419",
  },
}));
export default function Follower(props) {
  const classes = useStyles();
  const { authActor } = useSelector((state) => state);
  const [follower, setFollower] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(async () => {
    try {
      let tu = await authActor.getShowUserProfileByUserName(
        props.match.params.username
      );
      let tmp = await authActor.getFollower(tu.uid);
      setIsLoading(false);
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
      {isLoading ? (
        <div className={classes.root}>
          <LinearProgress />
        </div>
      ) : (
        <div>
          {follower.map((u, index) => (
            <UserList user={u} forF={true} key={index} />
          ))}{" "}
        </div>
      )}
    </div>
  );
}
