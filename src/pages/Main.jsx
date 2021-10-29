import * as React from "react";
import DCard from "../compoents/DCard";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import TestSidebar from "../compoents/TestSidebar";
import MainSidebar from "../compoents/MainSidebar";
import "./Main.css";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

export default function Main() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="main">
      <div className="main__mainsidebar">
        <MainSidebar />
      </div>
      {/* <div className="main__dcard"> */}
      {/* <div className="main__mainsidebar"> */}
      {/* <ProSidebar>
        <Menu iconShape="square">
          <MenuItem>Dashboard</MenuItem>
          <SubMenu title="Components">
            <MenuItem>Component 1</MenuItem>
            <MenuItem>Component 2</MenuItem>
          </SubMenu>
        </Menu>
      </ProSidebar> */}
      {/* </div> */}
      {/* <TestSidebar /> */}
      <div className="main__dcard">
        <DCard />
      </div>
      {/* </div> */}
    </div>
  );
}
