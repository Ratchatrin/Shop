import axios from "axios";
import { useState, useEffect } from "react";
import Nav from "../../header/Nav";
import NavShort from "../../header/NavShort";
import Footer from "../../footer/Footer";
import DetailKidsShirt from "../../detail/DetailKidsShirt";
import DetailKidsPants from "../../detail/DetailKidsPants";
import { useSelector } from "react-redux";
import NavShortLogin from "../../header/NavShortLogin";
import NavLogin from "../../header/NarLogin";
import KidsWearXl from "./KidsWearXl";
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
function KidsWear() {
  const [kidsShirt, setKidsShirt] = useState([]);
  const [kidsPants, setKidsPants] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [productId, setProductId] = useState(String);
  const [selectWear, setSelectWear] = useState(String);
  const [cartData, setCartData] = useState({});
  const userData = useSelector((state: state) => state.user.userData);
  useEffect(() => {
    setCartData(userData);
  }, [userData]);
  const getData = async () => {
    const data = await axios.get("http://localhost:3001/product/kids");
    setKidsShirt(data.data[0]);
    setKidsPants(data.data[1]);
  };
  const backSelect = (back: string) => {
    setProductId(back);
  };
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
      <div className="container">
        {productId.length !== 0 ? (
          <>
            {selectWear === "shirt" ? (
              <>
                <DetailKidsShirt
                  productId={productId}
                  backBtn={backSelect}
                ></DetailKidsShirt>
              </>
            ) : (
              <>
                <DetailKidsPants
                  productId={productId}
                  backBtn={backSelect}
                ></DetailKidsPants>
              </>
            )}
          </>
        ) : (
          <>
            {windowWidth > 1024 ? (
              <>
                <KidsWearXl></KidsWearXl>
              </>
            ) : (
              <>
                <div className="text-center ">
                  <p className=" font-bold underline text-3xl text-black">
                    Men T-Shirt
                  </p>

                  {kidsShirt.map((shirt: wearType) => {
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
                <div className="text-center">
                  <p className=" font-bold underline text-3xl text-black">
                    Men Pants
                  </p>
                  {kidsPants.map((pants: wearType) => {
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
          </>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default KidsWear;
