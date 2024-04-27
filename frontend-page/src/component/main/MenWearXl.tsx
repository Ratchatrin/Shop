import axios from "axios";
import { useEffect, useState } from "react";
import "./home.css";
import DetailMenShirtXl from "../detail/DetailMenShirtXl";
import DetailMenPantsXl from "../detail/DetailMenPantsXl";
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

function MenWearXl() {
  const [menShirt, setMenShirt] = useState([]);
  const [menPants, setMenPants] = useState([]);
  const [productId, setProductId] = useState(String);
  const [selectWear, setSelectWear] = useState(String);
  const getData = async () => {
    const data = await axios.get("http://localhost:3001/product/men");
    setMenShirt(data.data[0]);
    setMenPants(data.data[1]);
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
                <DetailMenShirtXl
                  productId={productId}
                  backBtn={backSelect}
                ></DetailMenShirtXl>
              </>
            ) : (
              <>
                <DetailMenPantsXl
                  backBtn={backSelect}
                  productId={productId}
                ></DetailMenPantsXl>
              </>
            )}
          </>
        ) : (
          <>
            <div className="text-center grid grid-cols-3 items-stretch item">
              <div className="flex items-center justify-center bg-[url('https://im.uniqlo.com/global-cms/spa/res72658c23751af1cb313fb8ad02c69db9fr.jpg')] h-full bg-cover">
                <p className=" font-bold underline text-3xl text-black">
                  Men T-Shirt
                </p>
              </div>
              {menShirt.map((shirt: wearType) => {
                return (
                  <div className="flex flex-col m-5 justify-center items-center ">
                    <img src={shirt.image.common[1]} alt="" />
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
            <div className="text-center grid grid-cols-3 items-center">
              <div className="flex items-center justify-center bg-[url('https://image.uniqlo.com/UQ/ST3/th/imagesgoods/471600/item/thgoods_08_471600.jpg?width=750')] h-full bg-cover">
                <p className=" font-bold underline text-3xl text-black">
                  Men Pants
                </p>
              </div>

              {menPants.map((pants: wearType) => {
                return (
                  <div className="flex flex-col m-5 justify-center items-center ">
                    <img src={pants.image.common[1]} alt="" />
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

export default MenWearXl;
