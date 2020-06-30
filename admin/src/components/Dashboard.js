import React, { Component } from "react";

import SideBar from "./SideBar";
import TopBar from "./TopBar";
import AnnoncesList from "./AnnoncesList";
import ContentCounter from "./ContentCounter";
import UserList from "./UsersList";
import CssBaseline from "@material-ui/core/CssBaseline";

export default class Dashboard extends Component {
  render() {
    return (
      <div id="wrapper">
        <SideBar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <TopBar />
            <div className="container-fluid">
              <ContentCounter />

              <AnnoncesList />
              <UserList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
