import axios from "axios";
import { useState, useEffect } from "react";
import DetailKidsPantsXl from "../detail/DetailKidsPantsXl";
import DetailKidsShirtXl from "../detail/DetailKidsShirtXl";
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

function KidsWearXl() {
  const [kidsShirt, setKidsShirt] = useState<wearType[]>([]);
  const [kidsPants, setKidsPants] = useState<wearType[]>([]);
  const [productId, setProductId] = useState(String);
  const [selectWear, setSelectWear] = useState(String);
  const getData = async () => {
    const data = await axios.get("https://shop-pdxc.onrender.com/product/kids");
    setKidsShirt(data.data[0]);
    setKidsPants(data.data[1]);
  };
  const backSelect = (back: string) => {
    setProductId(back);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="main">
      <div className="container">
        {productId.length !== 0 ? (
          <>
            {selectWear === "shirt" ? (
              <>
                <DetailKidsShirtXl productId={productId} backBtn={backSelect} />
              </>
            ) : (
              <>
                <DetailKidsPantsXl
                  productId={productId}
                  backBtn={backSelect}
                ></DetailKidsPantsXl>
              </>
            )}
          </>
        ) : (
          <>
            <div className="text-center grid grid-cols-3 items-stretch item m-5 ">
              <div className="flex rounded-3xl items-center justify-center bg-[url('https://image.uniqlo.com/UQ/ST3/th/imagesgoods/468929/item/thgoods_42_468929.jpg?width=750')] h-full bg-cover">
                <p className=" font-bold underline text-3xl text-black">
                  Kids T-Shirt
                </p>
              </div>
              {kidsShirt.map((shirt: wearType) => {
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
              <div className="flex rounded-3xl items-center justify-center bg-[url('https://image.uniqlo.com/UQ/ST3/th/imagesgoods/468793/sub/thgoods_468793_sub9.jpg?width=750')] h-full bg-cover">
                <p className=" font-bold underline text-3xl text-black">
                  Kids Pants
                </p>
              </div>

              {kidsPants.map((pants: wearType) => {
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

export default KidsWearXl;
