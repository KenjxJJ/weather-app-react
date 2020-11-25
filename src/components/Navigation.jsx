import React, { useState } from "react";
import { Link } from "react-router-dom";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
} from "reactstrap";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <>
      <Navbar light className="pt-3 pb-2">
        <NavbarBrand>Weather Now</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem className="ml-auto pr-3">
            <Link className="nav-link text-uppercase" to="/">
              Home
            </Link>
          </NavItem>
        </Nav>
      </Navbar>
    </>
  );
};

export default Navigation;
