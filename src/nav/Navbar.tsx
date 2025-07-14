import { NavLink } from "react-router-dom";
import "../style/nav.scss"; // Assuming you have a nav.scss file for styling
function Navbar() {


  return (
    <nav className="navContainer">
      <NavLink to="/">Hem</NavLink>
      <NavLink to="/RegisterForm">Registrera</NavLink>
      <NavLink to="/about">Om oss</NavLink>
      <NavLink to="/contact">Kontakta oss</NavLink>
      <NavLink to="/UserInfo">User Info</NavLink>
    </nav>
  );
}

export default Navbar;