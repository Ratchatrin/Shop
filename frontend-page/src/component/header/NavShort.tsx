import "./nav.css";
import { Link } from "react-router-dom";
function NavShort() {
  return (
    <>
      <div className="header">
        <div className="navigator">
          <div className="navbar bg-base-100 text-center">
            <Link to="/home">
              <img
                src="https://www.thebrandshopbw.com/wp-content/uploads/2021/11/Logo_Long_Black.png"
                alt=""
              />
            </Link>
            <div className="flex-none">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 h-fit menu">
                    <p className="align-middle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block w-5 h-5 stroke-current"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                        ></path>
                      </svg>
                    </p>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52"
                >
                  <li>
                    <Link to="/login">login</Link>
                  </li>
                  <li>
                    <Link to="/home">home</Link>
                  </li>
                  <li>
                    <Link to="/product/men">men</Link>
                  </li>
                  <li>
                    <Link to="/product/women">women</Link>
                  </li>
                  <li>
                    <Link to="/product/kids">kids</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavShort;
