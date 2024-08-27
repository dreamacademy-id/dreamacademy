'use client'
import React from "react";
import { Container } from "reactstrap";
import Header from "../layouts/header/Header";
import BottomNav from "../layouts/bottomNav/bottomNav";

const FullLayout = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const showMobilemenu = () => {
    setOpen(!open);
  };

  return (
    <main>
      <div className="pageWrapper d-md-block d-lg-flex">
        {/******** Sidebar **********/}
        {/* <aside
          className={`sidebarArea shadow bg-white ${
            !open ? "" : "showSidebar"
          }`}
        >
          <Sidebar showMobilemenu={() => showMobilemenu()} />
        </aside> */}
        {/********Content Area**********/}

        <div className="contentArea bg-white">
          {/********header**********/}
          <Header showMobmenu={() => showMobilemenu()} />

          {/********Middle Content**********/}
          <Container className="wrapper" fluid>
            <div>{children}</div>
          </Container>

          <BottomNav />
        </div>
      </div>
    </main>
  );
};

export default FullLayout;
