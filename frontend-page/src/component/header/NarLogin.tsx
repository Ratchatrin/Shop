import { useDispatch, useSelector } from "react-redux";
import "./nav.css";
import { Link } from "react-router-dom";
import { userLogout } from "../redux/slicer";
import "./nav.css";
interface state {
  user: {
    userData: { cart: wearType[] };
    error: boolean;
    loading: boolean;
  };
}
interface wearType {
  id: string;
  brand: string;
  productname: string;
  description: string;
  color: string;
  image: string;
  size: string;
  overview: string[];
  materials: {
    FABRICDETAILS: string;
  };
  price: number;
  amount: number;
}
function NavLogin() {
  const dispatch = useDispatch();
  const userData = useSelector((state: state) => state.user.userData);
  const amount = userData.cart.map((data) => {
    return data.amount;
  });
  const totalAmount = amount.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  return (
    <>
      <div className="header">
        <Link to="/home">
          <img
            src="https://www.thebrandshopbw.com/wp-content/uploads/2021/11/Logo_Long_Black.png"
            alt=""
          />
        </Link>
        <div className="navbar bg-base-100 flex justify-center">
          <div className="flex-none">
            <Link to="/cart">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <Link to="/cart">
                      <span className="badge badge-sm indicator-item">
                        {userData ? <>{totalAmount}</> : <></>}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </Link>
            <div className="navigator">
              <Link to="/home">home</Link>
              <Link to="/product/men">men</Link>
              <Link to="/product/women">women</Link>
              <Link to="/product/kids">kids</Link>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link
                    to="/home"
                    onClick={() => {
                      dispatch(userLogout(null));
                    }}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavLogin;
