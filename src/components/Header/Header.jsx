import { Link } from "react-router-dom";
import "./Header.css";

function Header({ isLoggedIn, onClickBurger, isBurgerOpened }) {
  return (
    <header className="header">
      <h1 className="header__title">interactive cat cards</h1>
    </header>
  );
}

export default Header;
