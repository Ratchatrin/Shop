import { useState } from "react";
import NavShort from "./NavShort";
import Nav from "./Nav";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/slicer";
import Footer from "../footer/Footer";
function LoginXl() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [switchLogin, setSwitchLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, SetPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  window.addEventListener("resize", updateWindowWidth);
  const userLogin = async () => {
    try {
      if (username && password.length !== 0) {
        const user = {
          username,
          password,
        };
        const login = await axios.post(
          "https://shop-pdxc.onrender.com/login",
          user
        );
        dispatch(loginUser(login.data));
        setUsername("");
        SetPassword("");
        navigate("/home");
      } else {
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! Task failed successfully.</span>
        </div>;
      }
    } catch (error) {
      console.log(error);
      alert("Username or Password is Incorrect");
    }
  };

  return (
    <>
      <div className="container">
        {windowWidth < 767 ? (
          <>
            <NavShort></NavShort>
          </>
        ) : (
          <Nav></Nav>
        )}
        <div className="flex justify-evenly w-2/4">
          <p>Sign in</p>
          <Link to="/signin">
            <input
              type="checkbox"
              className="toggle"
              onClick={() => {
                setSwitchLogin(!switchLogin);
              }}
              checked
            />
          </Link>
          <p>Login</p>
        </div>
        <>
          <div className="text-center">
            <p className="m-3 text-3xl underline">Login</p>
            <label className="input input-bordered flex items-center gap-2  mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Username"
                onChange={(ev) => {
                  setUsername(ev.target.value);
                }}
                value={username}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="Password"
                onChange={(ev) => {
                  SetPassword(ev.target.value);
                }}
                value={password}
              />
            </label>
            <button className="btn btn-active btn-primary" onClick={userLogin}>
              Login
            </button>
            <div className="flex justify-evenly mb-3 mt-5">
              <p>Don't Have Account ?</p>
              <Link to="/signin">
                <a className="link link-hover">Click</a>
              </Link>
            </div>
            <div className="flex justify-evenly mb-3 mt-5">
              <p>Reset Password</p>
              <Link to="/reset" className="link link-hover">
                Click
              </Link>
            </div>
          </div>
        </>
      </div>
      <Footer></Footer>
    </>
  );
}

export default LoginXl;
