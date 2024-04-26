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
    error: boolean;
    loading: boolean;
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
  const [menPants, setMenPants] = useState<wearType[]>([]);
  const [womenShirt, setWomenShirt] = useState<wearType[]>([]);
  const [womenPants, setWomenPants] = useState<wearType[]>([]);
  const [kidsShirt, setKidsShirt] = useState<wearType[]>([]);
  const [kidsPants, setKidsPants] = useState<wearType[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [cartData, setCartData] = useState<userData>();
  const userData = useSelector((state: state) => state.user.userData);
  console.log(userData);
  const getData = async () => {
    try {
      const data = (await axios.get("http://localhost:3001/home")).data;
      setMenShirt(data.menWear[0]);
      setMenPants(data.menWear[1]);
      setWomenShirt(data.womenWear[0]);
      setWomenPants(data.womenWear[1]);
      setKidsShirt(data.kidsWear[0]);
      setKidsPants(data.kidsWear[1]);
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
                <div className="card w-80 bg-slate-400 p-3">
                  <figure className="px-10 pt-10">
                    <img
                      src={menShirt[0].image.common[1]}
                      alt="Shoes"
                      className="rounded-xl"
                    />
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title tex">Men T-Shirts</h2>
                    <p className="font-bold text-pretty">
                      {menShirt[0].description}
                    </p>
                  </div>
                </div>
                <p className="text-xl font-bold m-3 uppercase">
                  summer collection
                </p>
                <div>
                  <Link to="/product/men">
                    <p className="text-xl font-bold m-2 uppercase underline">
                      Men
                    </p>
                    <div className="text-center grid grid-cols-2 gap-2">
                      <div className="flex flex-col justify-between items-center text-pretty w-40 ">
                        <img
                          src={menShirt[0].image.common[0]}
                          alt=""
                          className="w-40 rounded-xl"
                        />
                        <p className="font-bold text-pretty">
                          {menShirt[0].productname}
                        </p>
                        <p className="font-bold text-pretty ">
                          Price : $ {menShirt[0].price}
                        </p>
                      </div>
                      <div className="flex flex-col justify-between items-center text-pretty w-40">
                        <img
                          src={menPants[2].image.common[1]}
                          alt=""
                          className="w-40 rounded-xl"
                        />
                        <p className="font-bold text-pretty ">
                          {menPants[2].productname}
                        </p>
                        <p className="font-bold text-pretty">
                          Price : $ {menPants[2].price}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/product/women">
                    <p className="text-xl font-bold m-2 uppercase underline">
                      Women
                    </p>
                    <div className="text-center grid grid-cols-2 gap-2">
                      <div className="flex flex-col justify-between items-center text-pretty w-40">
                        <img
                          src={womenShirt[2].image.common[1]}
                          alt=""
                          className="w-40 rounded-xl"
                        />
                        <p className="font-bold text-pretty ">
                          {womenShirt[2].productname}
                        </p>
                        <p className="font-bold text-pretty">
                          Price : $ {womenShirt[2].price}
                        </p>
                      </div>
                      <div className="flex flex-col justify-between items-center text-pretty w-40">
                        <img
                          src={womenPants[3].image.common[0]}
                          alt=""
                          className="w-40 rounded-xl"
                        />
                        <p className="font-bold text-balance ">
                          {womenPants[3].productname}
                        </p>
                        <p className="font-bold text-pretty">
                          Price : $ {womenPants[3].price}
                        </p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/product/kids">
                    <p className="text-xl font-bold m-2 uppercase underline">
                      Kids
                    </p>
                    <div className="text-center grid grid-cols-2 gap-2">
                      <div className="flex flex-col justify-between items-center text-pretty w-40">
                        <img
                          src={kidsShirt[0].image.common[1]}
                          alt=""
                          className="w-40 rounded-xl"
                        />
                        <p className="font-bold text-pretty ">
                          {kidsShirt[0].productname}
                        </p>
                        <p className="font-bold text-pretty">
                          Price : $ {womenShirt[2].price}
                        </p>
                      </div>
                      <div className="flex flex-col justify-between items-center text-pretty w-40">
                        <img
                          src={kidsPants[2].image.common[2]}
                          alt=""
                          className="w-40 rounded-xl"
                        />
                        <p className="font-bold text-balance ">
                          {kidsPants[2].productname}
                        </p>
                        <p className="font-bold text-pretty">
                          Price : $ {kidsPants[2].price}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
                <br />
                <div className="man_category">
                  <p className="text-xl font-bold m-2 uppercase ">
                    Men Collection
                  </p>
                  <button className="btn btn-outline">
                    <Link to="/product/men">Shop Collection</Link>
                  </button>
                </div>
                <div className="woman_category">
                  <p className="text-xl font-bold m-2 uppercase ">
                    Women Collection
                  </p>

                  <button className="btn btn-outline text-white">
                    <Link to="/product/women">Shop Collection</Link>
                  </button>
                </div>
                <div className="kids_category">
                  <p className="text-xl font-bold m-2 uppercase ">
                    Kids Collection
                  </p>
                  <button className="btn btn-outline text-white">
                    <Link to="/product/kids">Shop Collection</Link>
                  </button>
                </div>
              </>
            ) : (
              <></>
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
