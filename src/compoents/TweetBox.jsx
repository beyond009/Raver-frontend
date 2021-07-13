import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button, Input, TextField } from "@material-ui/core";
// import db from "../firebase"

function TweetBox(props) {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");

  const sendTweet = (e) => {
    e.preventDefault();

    // db.collection("posts").add({
    //   displayName: "Rafeh Qazi",
    //   username: "cleverqazi",
    //   verified: true,
    //   text: tweetMessage,
    //   image: tweetImage,
    //   avatar:
    //     "https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png",
    // })
    console.log("sending Tweet");
    console.log(tweetMessage);
    props.authActor
      .addTweet("", tweetMessage, "", tweetImage)
      .then((tmp) => console.log(tmp));
    // props.setUpdate();
    setTweetMessage("");
    setTweetImage("");
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src={props.user.avatarimg} />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            type="text"
          />
          {/* <TextField
            id="outlined-textarea"
            onChange={(e) => setTweetMessage(e.target.value)}
            label="What's happening?"
            placeholder="Placeholder"
            multiline
            variant="outlined"
          /> */}
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
