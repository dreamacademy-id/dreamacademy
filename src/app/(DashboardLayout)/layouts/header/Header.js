import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
} from "reactstrap";
import LogoWhite from "../../../../../public/images/logos/logoDa.svg";
import user1 from "../../../../../public/images/users/user1.jpg";

const Header = ({ showMobmenu }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [activeLink, setActiveLink] = useState('home');

  const handelActive = (linkName) => {
    setActiveLink(linkName);
  }

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Navbar color="white" dark expand="md" style={{ height: '10vh', zIndex: '9999' }}>
      <div className="d-flex align-items-center">
        <NavbarBrand href="/" className="d-lg-none">
          <Image src={LogoWhite} alt="logo" />
        </NavbarBrand>
        <Button color="primary" className="d-lg-none" onClick={showMobmenu}>
          <i className="bi bi-list"></i>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <i className="bi bi-x"></i>
          ) : (
            <i className="bi bi-three-dots-vertical"></i>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto w-100 d-flex align-items-center justify-content-between" navbar>
          <span>
            <NavItem>
              <Link href="/">
                <Image src={LogoWhite} alt="logo" />
              </Link>
            </NavItem>
          </span>
          <span className="d-flex align-items-center gap-3">
            <NavItem>
              <Link href="/" onClick={() => handelActive('home')} className={activeLink === 'home' ? 'fw-bolder active-link' : ''}>
                Home
              </Link>
            </NavItem>
            <UncontrolledDropdown nav onClick={() => handelActive('features')}>
              <DropdownToggle caret nav onClick={() => handelActive('features')} className={activeLink === 'features' ? 'fw-bolder active-link' : ''}>
                Features
              </DropdownToggle>
              <DropdownMenu end>
                <Link href="/pages/tryout" onClick={() => handelActive('features')}>
                  <DropdownItem>
                    Bank Soal
                  </DropdownItem>
                </Link>
                <Link href="/pages/tryout" onClick={() => handelActive('features')}>
                  <DropdownItem>
                    Try Out
                  </DropdownItem>
                </Link>
                <DropdownItem divider />
                <DropdownItem>Rekomendasi Belajar</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <Link href="/pages/about" onClick={() => handelActive('about')} className={activeLink === 'about' ? 'fw-bolder active-link' : ''}>
                About
              </Link>
            </NavItem>
            <NavItem className="bg-transparent border-2 border-primer rounded-3 p-0" style={{ width: '200px' }}>
              <Button className="border w-50 h-100 m-0 border-0 bg-primer">Login</Button>
              <Button className="border w-50 h-100 m-0 border-0 text-black bg-transparent">Register</Button>
            </NavItem>
            <Link href="/pages/profile">
              <NavItem className="bg-graybold rounded-5 p-0" style={{ width: '130px' }}>
                <Button className="border w-100 h-100 m-0 border-0 bg-transparent justify-content-between align-items-center rounded-5 d-flex">
                  <span className="d-flex align-items-center gap-1 text-black fw-bold">
                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.25 1.27289C15.6942 2.10669 16.8935 3.30595 17.7273 4.75013C18.5611 6.19431 19 7.83253 19 9.50013C19 11.1677 18.561 12.8059 17.7272 14.2501C16.8934 15.6943 15.6941 16.8935 14.2499 17.7273C12.8057 18.5611 11.1675 19 9.49985 19C7.83224 19 6.19402 18.561 4.74984 17.7272C3.30567 16.8933 2.10643 15.694 1.27265 14.2499C0.438881 12.8057 -4.23602e-05 11.1674 3.06627e-09 9.49983L0.00475011 9.19203C0.057953 7.55138 0.53537 5.95252 1.39046 4.55131C2.24554 3.1501 3.44912 1.99436 4.88385 1.19678C6.31857 0.399192 7.93549 -0.0130251 9.57696 0.000313731C11.2184 0.0136526 12.8284 0.452092 14.25 1.27289ZM9.5 3.79987C9.24804 3.79987 9.00641 3.89996 8.82825 4.07812C8.65009 4.25628 8.55 4.49791 8.55 4.74986C7.79413 4.74986 7.06922 5.05013 6.53475 5.5846C6.00027 6.11908 5.7 6.84398 5.7 7.59984C5.7 8.3557 6.00027 9.08061 6.53475 9.61508C7.06922 10.1496 7.79413 10.4498 8.55 10.4498V12.3498C8.39245 12.3585 8.23515 12.3286 8.09177 12.2628C7.9484 12.1969 7.82328 12.097 7.7273 11.9717L7.6627 11.8758C7.53272 11.6661 7.32632 11.5153 7.08713 11.4551C6.84794 11.3949 6.59472 11.4301 6.38102 11.5533C6.16732 11.6764 6.00988 11.8778 5.942 12.1149C5.87412 12.3521 5.90113 12.6063 6.0173 12.8239C6.25978 13.2444 6.60565 13.596 7.02212 13.8454C7.43859 14.0948 7.91186 14.2336 8.39705 14.2488H8.55C8.5498 14.4817 8.63512 14.7065 8.78976 14.8806C8.94441 15.0547 9.1576 15.1659 9.38885 15.1931L9.5 15.1998C9.75196 15.1998 9.99359 15.0997 10.1718 14.9215C10.3499 14.7434 10.45 14.5017 10.45 14.2498L10.6172 14.245C11.3578 14.2022 12.0526 13.8723 12.5538 13.3254C13.0551 12.7785 13.3233 12.0577 13.3015 11.3162C13.2797 10.5746 12.9697 9.87082 12.4372 9.35426C11.9048 8.8377 11.1919 8.54912 10.45 8.54984V6.64985C10.7901 6.63845 11.0875 6.78285 11.2727 7.02795L11.3373 7.1239C11.4673 7.33351 11.6737 7.48436 11.9129 7.54454C12.1521 7.60473 12.4053 7.56953 12.619 7.44639C12.8327 7.32325 12.9901 7.12183 13.058 6.88471C13.1259 6.64759 13.0989 6.39337 12.9827 6.1758C12.7403 5.7551 12.3945 5.40328 11.978 5.15373C11.5616 4.90418 11.0882 4.76516 10.603 4.74986H10.45C10.45 4.49791 10.3499 4.25628 10.1718 4.07812C9.99359 3.89996 9.75196 3.79987 9.5 3.79987ZM10.45 10.4498C10.702 10.4498 10.9436 10.5499 11.1218 10.7281C11.2999 10.9062 11.4 11.1479 11.4 11.3998C11.4 11.6518 11.2999 11.8934 11.1218 12.0716C10.9436 12.2497 10.702 12.3498 10.45 12.3498V10.4498ZM8.55 6.64985V8.54984C8.29804 8.54984 8.05641 8.44975 7.87825 8.27159C7.70009 8.09343 7.6 7.8518 7.6 7.59984C7.6 7.34789 7.70009 7.10625 7.87825 6.9281C8.05641 6.74994 8.29804 6.64985 8.55 6.64985Z" fill="#F9A419" />
                    </svg>
                    120
                  </span>
                  <span>
                    <Image src={user1} alt="" width={25} className="rounded-circle" />
                  </span>
                </Button>
              </NavItem>
            </Link>
          </span>
        </Nav>
        {/* <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle color="primary">
            <div style={{ lineHeight: "0px" }}>
              <Image
                src={user1}
                alt="profile"
                className="rounded-circle"
                width="30"
                height="30"
              />
            </div>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Info</DropdownItem>
            <DropdownItem>My Account</DropdownItem>
            <DropdownItem>Edit Profile</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>My Balance</DropdownItem>
            <DropdownItem>Inbox</DropdownItem>
            <DropdownItem>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown> */}
      </Collapse>
    </Navbar>
  );
};

export default Header;
