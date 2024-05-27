import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./home.css";
import Footer from "../footer/Footer";
import "./index.css";
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
function HomeXl() {
  const [menShirt, setMenShirt] = useState<wearType[]>([]);

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
    getData();
  }, []);
  return (
    <>
      <div className="container">
        {menShirt.length !== 0 ? (
          <>
            <div
              className="hero min-h-screen bg-base-200 bg-[url('https://im.uniqlo.com/global-cms/spa/res468423fb5128de816b7e0023c9730356fr.jpg')] h-1/5 w-full bg-top bg-cover
                 bg-no-repeat"
            >
              <div className=" hero-content flex items-center justify-center bg-slate-100 w-11/12 rounded-xl max-w-fit">
                <div className=" w-full">
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
            <div className="flex w-8/12">
              <div className="man_category w-8/12 ">
                <p className="text-xl font-bold m-2 uppercase ">
                  Men Collection
                </p>
                <button className="btn btn-outline text-white">
                  <Link to="/product/men">Shop Collection</Link>
                </button>
              </div>
              <div className="woman_category w-8/12 ">
                <p className="text-xl font-bold m-2 uppercase ">
                  Women Collection
                </p>

                <button className="btn btn-outline text-white">
                  <Link to="/product/women">Shop Collection</Link>
                </button>
              </div>
              <div className="kids_category w-8/12">
                <p className="text-xl font-bold m-2 uppercase ">
                  Kids Collection
                </p>
                <button className="btn btn-outline text-white">
                  <Link to="/product/kids">Shop Collection</Link>
                </button>
              </div>
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
  );
}

export default HomeXl;
