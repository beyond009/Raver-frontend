import { Menu, Switch } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import React from "react";
import { ClassNames } from "@emotion/react";
const { SubMenu } = Menu;
import "./MainSidebar.css";
class MainSidebar extends React.Component {
  state = {
    theme: "light",
    current: "2",
  };

  render() {
    return (
      <div className="main__sidebar">
        <Menu
          theme={this.state.theme}
          onClick={this.handleClick}
          style={{ width: 256 }}
          defaultOpenKeys={["sub1"]}
          selectedKeys={[this.state.current]}
          mode="inline"
        >
          <SubMenu key="sub1" title="Classes">
            <Menu.Item key="1">Games</Menu.Item>
            <Menu.Item key="2">NFT</Menu.Item>
            <Menu.Item key="3">DEFI</Menu.Item>
            <Menu.Item key="4">Language</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<AppstoreOutlined />} title="My DAOs">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" icon={<SettingOutlined />} title="Settings">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
export default MainSidebar;
