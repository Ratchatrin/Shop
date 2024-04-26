import "./nav.css";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <>
      <div className="header">
        <Link to="/home">
          <img
            src="https://www.thebrandshopbw.com/wp-content/uploads/2021/11/Logo_Long_Black.png"
            alt=""
          />
        </Link>
        <div className="navigator">
          <Link to="/login">login</Link>
          <Link to="/home">home</Link>
          <Link to="/product/men">men</Link>
          <Link to="/product/women">women</Link>
          <Link to="/product/kids">kids</Link>
        </div>
      </div>
    </>
  );
}

export default Nav;
