import axios from "axios";
import { useEffect, useState } from "react";
import "./home.css";
import DetailWomenShirtXl from "../detail/DetailWomenShirtXl";
import DetailWomenPantsXl from "../detail/DetailWomenPantsXl";
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

function WomenWearXl() {
  const [womenShirt, setWomenShirt] = useState([]);
  const [womenPants, setWomenPants] = useState([]);
  const [productId, setProductId] = useState(String);
  const [selectWear, setSelectWear] = useState(String);
  const getData = async () => {
    const data = await axios.get("http://localhost:3001/product/women");
    setWomenShirt(data.data[0]);
    setWomenPants(data.data[1]);
  };
  const backSelect = (back: string) => {
    setProductId(back);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div
      className="main
    "
    >
      <div className="container">
        {productId.length !== 0 ? (
          <>
            {selectWear === "shirt" ? (
              <>
                <DetailWomenShirtXl
                  productId={productId}
                  backBtn={backSelect}
                ></DetailWomenShirtXl>
              </>
            ) : (
              <>
                <DetailWomenPantsXl
                  productId={productId}
                  backBtn={backSelect}
                ></DetailWomenPantsXl>
              </>
            )}
          </>
        ) : (
          <>
            <div className="text-center grid grid-cols-3 items-center m-5">
              <div className="flex rounded-3xl items-center justify-center bg-[url('https://image.uniqlo.com/UQ/ST3/th/imagesgoods/465760/item/thgoods_61_465760.jpg?width=750')] h-full bg-cover">
                <p className=" font-bold underline text-3xl text-black">
                  Women T-Shirt
                </p>
              </div>
              {womenShirt.map((shirt: wearType) => {
                return (
                  <div className="flex flex-col m-5 justify-center items-center ">
                    <img
                      src={shirt.image.common[1]}
                      alt=""
                      className="rounded-3xl"
                    />
                    <p className="font-bold">{shirt.productname}</p>
                    <p className="font-bold">Price : ${shirt.price}</p>
                    <button
                      className="btn  btn-info w-40"
                      onClick={() => {
                        setProductId(shirt._id);
                        setSelectWear("shirt");
                      }}
                    >
                      Detail
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="text-center grid grid-cols-3 items-center m-5">
              <div className="flex rounded-3xl items-center justify-center bg-[url('https://image.uniqlo.com/UQ/ST3/th/imagesgoods/463182/item/thgoods_09_463182.jpg?width=750')] h-full bg-cover ">
                <p className=" font-bold underline text-3xl text-black">
                  Women Pants
                </p>
              </div>

              {womenPants.map((pants: wearType) => {
                return (
                  <div className="flex flex-col m-5 justify-center items-center ">
                    <img
                      src={pants.image.common[1]}
                      alt=""
                      className="rounded-3xl"
                    />
                    <p className="font-bold">{pants.productname}</p>
                    <p className="font-bold">Price : ${pants.price}</p>
                    <button
                      className="btn  btn-info w-40"
                      onClick={() => {
                        setProductId(pants._id);
                        setSelectWear("pants");
                      }}
                    >
                      Detail
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default WomenWearXl;
