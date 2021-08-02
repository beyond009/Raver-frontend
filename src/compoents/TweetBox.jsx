import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button, Input, TextField } from "@material-ui/core";
// import db from "../firebase"

function TweetBox(props) {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");

  const sendTweet = (e) => {
    e.preventDefault();
    console.log(tweetMessage);
    props.authActor
      .addTweet("", tweetMessage, "", tweetImage)
      .then((tmp) => console.log(tmp));
    setTweetMessage("");
    setTweetImage("");
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar
            className="tweetBox__Avatar"
            src={props.user ? props.user.avatarimg : ""}
          />
          <TextField
            className="TextField"
            id="outlined-textarea"
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            label="What's happening?"
            multiline
            variant="outlined"
          />
        </div>
        <input
          value={tweetImage}
          onChange={(e) => setTweetImage(e.target.value)}
          className="tweetBox__imageInput"
          placeholder="Optional: Enter image URL"
          type="text"
        />
        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Post
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
