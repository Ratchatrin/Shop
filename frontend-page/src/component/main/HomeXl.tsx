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
  const [menPants, setMenPants] = useState<wearType[]>([]);
  const [womenShirt, setWomenShirt] = useState<wearType[]>([]);
  const [womenPants, setWomenPants] = useState<wearType[]>([]);
  const [kidsShirt, setKidsShirt] = useState<wearType[]>([]);
  const [kidsPants, setKidsPants] = useState<wearType[]>([]);
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
    getData();
  }, []);
  return (
    <>
      <div className="container">
        {menShirt.length !== 0 ? (
          <>
            {/* <div
              className="w-full flex justify-around
            "
            >
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
              <div className="card w-80 bg-slate-400 p-3">
                <figure className="px-10 pt-10">
                  <img
                    src={womenShirt[1].image.common[2]}
                    alt="Shoes"
                    className="rounded-xl"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title tex">Women T-Shirts</h2>
                  <p className="font-bold text-pretty">
                    {womenShirt[1].description}
                  </p>
                </div>
              </div>
              <div className="card w-80 bg-slate-400 p-3">
                <figure className="px-10 pt-10">
                  <img
                    src={kidsShirt[2].image.common[2]}
                    alt="Shoes"
                    className="rounded-xl"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title tex">Kids T-Shirts</h2>
                  <p className="font-bold text-pretty">
                    {kidsShirt[2].description}
                  </p>
                </div>
              </div>
            </div>
            <p className="text-6xl font-bold mt-10 uppercase">
              summer collection
            </p>
            <div className="text-center">
              <Link to="/product/men">
                <p className="text-4xl font-bold m-2 uppercase underline">
                  Men
                </p>
                <div className="text-center grid grid-cols-6 gap-10">
                  <div className="flex flex-col justify-between items-center text-pretty w-44 ">
                    <img
                      src={menShirt[0].image.common[0]}
                      alt=""
                      className="w-44 rounded-xl"
                    />
                    <p className="font-bold text-pretty">
                      {menShirt[0].productname}
                    </p>
                    <p className="font-bold text-pretty ">
                      Price : $ {menShirt[0].price}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between items-center text-pretty w-44">
                    <img
                      src={menPants[2].image.common[1]}
                      alt=""
                      className="w-44 rounded-xl"
                    />
                    <p className="font-bold text-pretty ">
                      {menPants[2].productname}
                    </p>
                    <p className="font-bold text-pretty">
                      Price : $ {menPants[2].price}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between items-center text-pretty w-44 ">
                    <img
                      src={menShirt[1].image.common[0]}
                      alt=""
                      className="w-44 rounded-xl"
                    />
                    <p className="font-bold text-pretty">
                      {menShirt[1].productname}
                    </p>
                    <p className="font-bold text-pretty ">
                      Price : $ {menShirt[1].price}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between items-center text-pretty w-44">
                    <img
                      src={menPants[0].image.common[1]}
                      alt=""
                      className="w-44 rounded-xl"
                    />
                    <p className="font-bold text-pretty ">
                      {menPants[0].productname}
                    </p>
                    <p className="font-bold text-pretty">
                      Price : $ {menPants[0].price}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between items-center text-pretty w-44 ">
                    <img
                      src={menShirt[2].image.common[1]}
                      alt=""
                      className="w-44 rounded-xl"
                    />
                    <p className="font-bold text-pretty">
                      {menShirt[2].productname}
                    </p>
                    <p className="font-bold text-pretty ">
                      Price : $ {menShirt[2].price}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between items-center text-pretty w-44">
                    <img
                      src={menPants[3].image.common[0]}
                      alt=""
                      className="w-44 rounded-xl"
                    />
                    <p className="font-bold text-pretty ">
                      {menPants[3].productname}
                    </p>
                    <p className="font-bold text-pretty">
                      Price : $ {menPants[3].price}
                    </p>
                  </div>
                </div>
              </Link>
              <Link to="/product/women">
                <p className="text-4xl font-bold m-2 uppercase underline">
                  Women
                </p>
                <div className="text-center grid grid-cols-6 gap-10">
                  <div className="flex flex-col justify-between items-center text-pretty w-44">
                    <img
                      src={womenShirt[2].image.common[1]}
                      alt=""
                      className="w-44 rounded-xl"
                    />
                    <p className="font-bold text-pretty ">
                      {womenShirt[2].productname}
                    </p>
                    <p className="font-bold text-pretty">
                      Price : $ {womenShirt[2].price}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between items-center text-pretty w-44">
                    <img
                      src={womenPants[3].image.common[0]}
                      alt=""
                      className="w-44rounded-xl"
                    />
                    <p className="font-bold text-balance ">
                      {womenPants[3].productname}
                    </p>
                    <p className="font-bold text-pretty">
                      Price : $ {womenPants[3].price}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between items-center text-pretty w-44">
                    <img
                      src={womenShirt[0].image.common[2]}
                      alt=""
                      className="w-44 rounded-xl"
                    />
                    <p className="font-bold text-pretty ">
                      {womenShirt[0].productname}
                    </p>
                    <p className="font-bold text-pretty">
                      Price : $ {womenShirt[0].price}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between items-center text-pretty w-44">
                    <img
                      src={womenPants[1].image.common[1]}
                      alt=""
                      className="w-44 rounded-xl"
                    />
                    <p className="font-bold text-balance ">
                      {womenPants[1].productname}
                    </p>
                    <p className="font-bold text-pretty">
                      Price : $ {womenPants[1].price}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between items-center text-pretty w-44">
                    <img
                      src={womenShirt[1].image.common[1]}
                      alt=""
                      className="w-44 rounded-xl"
                    />
                    <p className="font-bold text-pretty ">
                      {womenShirt[1].productname}
                    </p>
                    <p className="font-bold text-pretty">
                      Price : $ {womenShirt[1].price}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between items-center text-pretty w-44">
                    <img
                      src={womenPants[2].image.common[0]}
                      alt=""
                      className="w-44 rounded-xl"
                    />
                    <p className="font-bold text-balance ">
                      {womenPants[2].productname}
                    </p>
                    <p className="font-bold text-pretty">
                      Price : $ {womenPants[2].price}
                    </p>
                  </div>
                </div>
              </Link>
              <Link to="/product/kids">
                <p className="text-4xl font-bold m-2 uppercase underline">
                  Kids
                </p>
                <div className="text-center grid grid-cols-6 gap-10">
                  <div className="flex flex-col justify-between items-center text-pretty w-44">
                    <img
                      src={kidsShirt[0].image.common[1]}
                      alt=""
                      className="w-44 rounded-xl"
                    />
                    <p className="font-bold text-pretty ">
                      {kidsShirt[0].productname}
                    </p>
                    <p className="font-bold text-pretty">
                      Price : $ {kidsShirt[2].price}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between items-center text-pretty w-44">
                    <img
                      src={kidsPants[2].image.common[2]}
                      alt=""
                      className="w-44 rounded-xl"
                    />
                    <p className="font-bold text-balance ">
                      {kidsPants[2].productname}
                    </p>
                    <p className="font-bold text-pretty">
                      Price : $ {kidsPants[2].price}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between items-center text-pretty w-44">
                    <img
                      src={kidsShirt[1].image.common[0]}
                      alt=""
                      className="w-44 rounded-xl"
                    />
                    <p className="font-bold text-pretty ">
                      {kidsShirt[1].productname}
                    </p>
                    <p className="font-bold text-pretty">
                      Price : $ {kidsShirt[1].price}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between items-center text-pretty w-44">
                    <img
                      src={kidsPants[1].image.common[0]}
                      alt=""
                      className="w-44 rounded-xl"
                    />
                    <p className="font-bold text-balance ">
                      {kidsPants[1].productname}
                    </p>
                    <p className="font-bold text-pretty">
                      Price : $ {kidsPants[1].price}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between items-center text-pretty w-44">
                    <img
                      src={kidsShirt[2].image.common[2]}
                      alt=""
                      className="w-44 rounded-xl"
                    />
                    <p className="font-bold text-pretty ">
                      {kidsShirt[2].productname}
                    </p>
                    <p className="font-bold text-pretty">
                      Price : $ {kidsShirt[2].price}
                    </p>
                  </div>
                  <div className="flex flex-col justify-between items-center text-pretty w-44">
                    <img
                      src={kidsPants[0].image.common[2]}
                      alt=""
                      className="w-44 rounded-xl"
                    />
                    <p className="font-bold text-balance ">
                      {kidsPants[0].productname}
                    </p>
                    <p className="font-bold text-pretty">
                      Price : $ {kidsPants[0].price}
                    </p>
                  </div>
                </div>
              </Link>
            </div> */}
            <div
              className="hero min-h-screen bg-base-200 bg-[url('https://im.uniqlo.com/global-cms/spa/resba702f326ece6e072306fef710aba841fr.jpg')] h-1/5 w-full bg-top bg-cover
                 bg-no-repeat"
            >
              <div className="hero-content text-center ">
                <div className="w-full">
                  <h1 className="text-6xl font-bold text-gray-50 ">
                    Welcome To The Brand Shop
                  </h1>
                  <p className="py-6"></p>
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
          <></>
        )}
      </div>
      <Footer></Footer>
    </>
  );
}

export default HomeXl;
