import { useState } from "react";
import NavShort from "./NavShort";
import Nav from "./Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";

function ResetPassword() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [newPassword, setNewPassword] = useState(String);
  const [email, setEmail] = useState(String);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [complete, setComplete] = useState(false);
  const navigate = useNavigate();
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  const resetPassword = async () => {
    try {
      const user = { email, newPassword };
      const changePassword = await axios.put(
        "http://localhost:3001/resetpassword",
        user
      );
      console.log(changePassword.status);
      if (changePassword.status === 200) {
        setComplete(true);
        setNewPassword("");
        setEmail("");
      }
    } catch (error) {
      setNewPassword("");
      setEmail("");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1500);
    }
  };
  window.addEventListener("resize", updateWindowWidth);
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
        <div className="flex flex-col  text-center">
          <p className="text-2xl underline mb-8">Reset Password</p>
          <label className="input input-bordered flex items-center gap-2  mb-5">
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
              type="email"
              className="grow"
              placeholder="Email"
              onChange={(ev) => {
                setEmail(ev.target.value);
              }}
              value={email}
            />
          </label>
          {/* <label className="input input-bordered flex items-center gap-2  mb-3">
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
            placeholder="Old Password"
            onChange={(ev) => {
              setOldPassword(ev.target.value);
            }}
            value={oldPassword}
          />
        </label> */}
          {!showPassword ? (
            <>
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
                    setNewPassword(ev.target.value);
                  }}
                  value={newPassword}
                />
                <label className="swap">
                  <input type="checkbox" />
                  <div
                    className="swap-on"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    Hide
                  </div>
                  <div className="swap-off">Show</div>
                </label>
              </label>
            </>
          ) : (
            <>
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
                  type="text"
                  className="grow"
                  placeholder="Password"
                  onChange={(ev) => {
                    setNewPassword(ev.target.value);
                  }}
                  value={newPassword}
                />
                <label className="swap">
                  <input type="checkbox" />
                  <div className="swap-on">Hide</div>
                  <div
                    className="swap-off"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    Show
                  </div>
                </label>
              </label>
            </>
          )}
          <button
            className="btn btn-active btn-neutral"
            onClick={resetPassword}
          >
            Submit
          </button>
        </div>
        <div>
          {error ? (
            <>
              <div role="alert" className="alert alert-error mt-5">
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
                <span>Email is Incorrect.</span>
              </div>
            </>
          ) : (
            <></>
          )}
          {complete ? (
            <>
              <div role="alert" className="alert alert-success mt-5">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Change Complete Go to Login</span>
                <button
                  className="btn btn-active btn-ghost"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Click
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default ResetPassword;
