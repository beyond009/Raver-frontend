import React, { Component } from "react";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import { Avatar } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import history from "../History";
import "./Signup.css";
const EditProfile = (props) => {
  const { user, authActor } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [disableb, setDisableb] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState();
  function handleUsername(e) {
    if (e.target.value.length >= 64) {
      setUsernameError(true);
      setUsernameMessage("Username need to be less than 65 characters");
      setDisableb(true);
    } else {
      setUsernameError(false);
      setUsernameMessage("");
      if (!avatarimgError && !descriptionError && !displayNameError)
        setDisableb(false);
    }
  }

  return (
    <div className="signup__page">
      <TextField
        id="username"
        style={{ margin: 8 }}
        label="username"
        error={usernameError}
        onChange={(e) => handleUsername(e)}
        helperText={usernameMessage}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        defaultValue={user ? user.username : null}
      />
      <br />

      <br />
      <br />
      <div className="submit__button">
        <Button onClick={handleSubmit} disabled={disableb}>
          Submit
        </Button>
      </div>
    </div>
  );
};
export default EditProfile;
