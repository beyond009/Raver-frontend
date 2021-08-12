import React, { forwardRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import history from "../History";
import "./Post.css";
import { Avatar, Button } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Zmage from "react-zmage";
import LikeButton from "./LikeButton";
import { SyncDisabled } from "@material-ui/icons";
const Post = forwardRef(
  (
    {
      tid,
      deletPost,
      displayName,
      username,
      verified,
      text,
      image,
      avatar,
      commentNumber,
      likeNumber,
      uid,
    },
    ref
  ) => {
    const { authActor, user } = useSelector((state) => state);
    const [isLoading, setIsLoading] = useState(true);
    const [isFollowed, setIsFollowed] = useState(true);
    const location = useLocation();

    return (
      <div className="post" ref={ref}>
        <div className="post__avatar">
          <Avatar src={avatar} />
        </div>

        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                {displayName}{" "}
                <span className="post__headerSpecial">
                  {verified && <VerifiedUserIcon className="post__badge" />}
                  {username}
                </span>
              </h3>
            </div>
            <div className="post__headerDescription">{text}</div>
          </div>
          {/* <div className="post__follow__button">
            {" "}
        
          </div> */}
          <div>
            {image ? <img className="post_img" src={image} alt="" /> : null}
          </div>
          <div className="post__footer">
            <NavLink
              to={tid ? `/post/${tid}` : location.pathname}
              className="comment__link"
            >
              <div>
                <ChatBubbleOutlineIcon fontSize="small" />
                <span className="comment__number">
                  {commentNumber ? commentNumber : null}
                </span>
              </div>
            </NavLink>
            <RepeatIcon fontSize="small" />
            <LikeButton />
            <PublishIcon fontSize="small" />
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
