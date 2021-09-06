import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Avatar, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import Feed from "../compoents/Feed";
import MailIcon from "@material-ui/icons/Mail";
import banner from "../../assets/1500x500.jpeg";
import history from "../History";
import UserPosts from "../compoents/UserPosts";
import { NavLink } from "react-router-dom";
import "./Profile.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(14),
    height: theme.spacing(14),
  },
}));

export default function Profile(props) {
  const { authActor, user } = useSelector((state) => state);
  const [auser, setAuser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowed, setIsFollowed] = useState(true);
  const [followerNum, setFollowerNum] = useState(0);
  const [followingNum, setFollowingNum] = useState(0);
  const classes = useStyles();
  useEffect(async () => {
    if (authActor) {
      try {
        let t = await authActor.getShowUserProfileByUserName(
          props.match.params.username
        );
        setAuser(t);
      } catch (error) {
        console.log(error);
      }
    }
  }, [authActor, props.match.params.username]);
  useEffect(async () => {
    if (authActor && auser) {
      try {
        let t = await authActor.getFollowAmount(auser.uid);
        console.log("f", t);
        setFollowingNum(t);
      } catch (error) {
        console.log(error);
      }
    }
  }, [authActor, auser]);
  useEffect(async () => {
    if (authActor && auser) {
      try {
        let t = await authActor.getFollowerAmount(auser.uid);
        console.log("er", t);
        setFollowerNum(t);
      } catch (error) {
        console.log(error);
      }
    }
  }, [authActor, auser]);
  useEffect(async () => {
    if (auser && user) {
      try {
        let t = await authActor.isAFollowedByB(auser.uid, user.uid);
        setIsLoading(false);
        if (!t) setIsFollowed(false);
      } catch (error) {
        console.log(error);
      }
    }
  }, [auser, user]);

  function handleClickEdit() {
    history.push({ pathname: "/editprofile" });
  }
  async function handleClickFollow() {
    if (authActor) {
      if (isFollowed) {
        authActor.cancelFollow(auser.uid);
        setIsFollowed(false);
      } else {
        authActor.addFollow(auser.uid);
        setIsFollowed(true);
      }
    }
  }
  return (
    <div className="profile">
      <div className="profile__header">
        <h2>Profile</h2>
      </div>
      <div className="profile__a">
        <img src={banner} className="profile__banner" />
        <div className="profile__avatar">
          <Avatar
            className={classes.large}
            src={auser ? auser.avatarimg : ""}
          />
        </div>
        <div className="profile__editposition">
          {user && auser && user.username === auser.username ? (
            <Button className="profile__editbutton" onClick={handleClickEdit}>
              Edit Profile
            </Button>
          ) : (
            <Button className="profile__editbutton" onClick={handleClickFollow}>
              {isLoading ? "loading" : isFollowed ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
        <div className="profile__displaynameposition">
          <h3>{auser ? auser.nickname : null}</h3>
        </div>
        <div className="profile__descriptionposition">
          <p className="profile__description">{auser ? auser.bio : null}</p>
        </div>
        <div className="profile__follow">
          <NavLink
            to={`/profile/${props.match.params.username}/follower`}
            className="profile__link__follower"
          >
            {" "}
            <span>Follower {followerNum}</span>
          </NavLink>
          <NavLink
            to={`/profile/${props.match.params.username}/following`}
            className="profile__link__following"
          >
            <span>Following {followingNum}</span>
          </NavLink>
        </div>
        <br />
        <br />
        <br />
      </div>
      <div className="profile__posts">
        <UserPosts user={auser} />
      </div>
    </div>
  );
}
