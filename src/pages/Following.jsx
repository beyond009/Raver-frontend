import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserList from "../utils/UserList";
import { LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "./Following.css";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    color: "#0f1419",
  },
}));
export default function Following(props) {
  const classes = useStyles();
  const { authActor } = useSelector((state) => state);
  const [following, setFollowing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(async () => {
    try {
      let tu = await authActor.getShowUserProfileByUserName(
        props.match.params.username
      );
      let tmp = await authActor.getFollow(tu.uid);
      setIsLoading(false);
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
      {isLoading ? (
        <div className={classes.root}>
          <LinearProgress />
        </div>
      ) : (
        <div>
          {following.map((u, index) => (
            <UserList user={u} forF={true} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}
