import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./home.css";
import Nav from "../header/Nav";
import NavShort from "../header/NavShort";
import Footer from "../footer/Footer";
import "./index.css";
import { useSelector } from "react-redux";
import NavShortLogin from "../header/NavShortLogin";
import NavLogin from "../header/NarLogin";
import HomeXl from "./HomeXl";
interface wearType {
  _id: string;
  brand: string;
  productname: string;
  description: string;
  color: [string];
  image: {
    color: string;
    common: string;
  };
  size: object;
  overview: [string];
  materials: {
    FABRICDETAILS: string;
  };
  price: number;
}
interface state {
  user: {
    userData: object;
  };
}
interface userData {
  cart: [];
  email: string;
  password: string;
  username: string;
}
function Home() {
  const [menShirt, setMenShirt] = useState<wearType[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cartData, setCartData] = useState<userData>();
  const userData = useSelector(
    (state: state) => state.user.userData as userData
  );
  const getData = async () => {
    try {
      const data = (await axios.get("https://shop-pdxc.onrender.com/home"))
        .data;
      setMenShirt(data.menWear[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setCartData(userData);
  }, [userData]);
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  window.addEventListener("resize", updateWindowWidth);
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="main">
      {windowWidth < 767 ? (
        <>
          {cartData ? (
            <>
              <NavShortLogin></NavShortLogin>
            </>
          ) : (
            <>
              <NavShort></NavShort>
            </>
          )}
        </>
      ) : (
        <>
          {cartData ? (
            <>
              <NavLogin></NavLogin>
            </>
          ) : (
            <>
              <Nav></Nav>
            </>
          )}
        </>
      )}
      {windowWidth < 1440 ? (
        <>
          <div className="container">
            {menShirt.length !== 0 ? (
              <>
                <div
                  className="hero min-h-screen bg-base-200 bg-[url('https://im.uniqlo.com/global-cms/spa/res468423fb5128de816b7e0023c9730356fr.jpg')] h-1/5 w-full bg-center bg-cover
                 bg-no-repeat"
                >
                  <div className="hero-content flex items-center justify-center bg-slate-100 w-11/12 rounded-xl max-w-fit">
                    <div className="w-full">
                      <h1 className="text-3xl font-bold text-gray-800 mr-10">
                        Welcome To The Brand Shop
                      </h1>
                      <p className="font-bold">New Men-Collection</p>
                      <Link to="/product/men">
                        <button className="btn btn-active btn-neutral mt-3">
                          View More
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <p className="text-4xl font-bold m-2 uppercase underline">
                  Collection
                </p>
                <div className="man_category w-10/12">
                  <p className="text-xl font-bold m-2 uppercase ">
                    Men Collection
                  </p>
                  <button className="btn btn-outline text-white">
                    <Link to="/product/men">Shop Collection</Link>
                  </button>
                </div>
                <div className="woman_category w-10/12">
                  <p className="text-xl font-bold m-2 uppercase ">
                    Women Collection
                  </p>

                  <button className="btn btn-outline text-white">
                    <Link to="/product/women">Shop Collection</Link>
                  </button>
                </div>
                <div className="kids_category w-10/12">
                  <p className="text-xl font-bold m-2 uppercase ">
                    Kids Collection
                  </p>
                  <button className="btn btn-outline text-white">
                    <Link to="/product/kids">Shop Collection</Link>
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="h-screen flex flex-col justify-center items-center">
                  <span className="loading loading-bars loading-lg"></span>
                  <p className="mt-5 font-bold text-2xl">Loading Data</p>
                </div>
              </>
            )}
          </div>
          <Footer></Footer>
        </>
      ) : (
        <>
          <HomeXl></HomeXl>
        </>
      )}
    </div>
  );
}

export default Home;
