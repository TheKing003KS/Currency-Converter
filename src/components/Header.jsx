import React from "react";
import LocalAtmIcon from '@material-ui/icons/LocalAtm';

function Header() {
  return (
    <header>
      <LocalAtmIcon
        style={{
          color: "white",
          display: "inline",
          marginRight: "10px",
          fontSize: "2.5rem"
        }}
      />
      <h1>Currency Converter</h1>
    </header>
  );
}

export default Header;
