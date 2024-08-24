import { useState } from "react";
import { Link } from "react-router-dom";
import foodFireLogo from "../Common/Images/foodFireLogo.png";
import useOnlineStatus from "./useOnlineStatus";
const Title = () => (
  <Link to="/">
    <img
      className="logo"
      src={foodFireLogo}
      alt="Food Fire Logo"
      title="Food Fire"
    />
  </Link>
);

const Header = () => {
  const [isLoggedin, setIsLoggedin] = useState(true);
  const onlineStatus = useOnlineStatus();
  return (
    <div className="header">
      <Title />
      <div className="nav-items">
        <ul>
          <li>Online Status :{onlineStatus ? "🟢" : "🔴"}</li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
            {/* <li>
              {" "}
              <a href="/about">About</a>
            </li> */}
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <i className="fa-solid fa-cart-shopping"></i>
          </li>
          <li>
            {isLoggedin ? (
              <button
                className="logout-btn"
                onClick={() => setIsLoggedin(false)}
              >
                Logout
              </button>
            ) : (
              <button className="login-btn" onClick={() => setIsLoggedin(true)}>
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
