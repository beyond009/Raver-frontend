import React from "react";
import LinkAvatar from "./LinkAvatar";
import "./UserList.css";
export default function UserList(props) {
  return (
    <div className={props.forF ? "userList__forF" : "userList"}>
      <div className="userList__linkAvatar">
        <LinkAvatar
          username={props.user ? props.user.username : null}
          avatar={props.user ? props.user.avatar : null}
        />
      </div>
      <div className="userList__displayName">
        {props.user ? `@${props.user.nickname}` : "ddd009"}
      </div>
      <div className="userList__userName">
        {props.user ? `@${props.user.username}` : "@ddd009"}
      </div>
    </div>
  );
}
