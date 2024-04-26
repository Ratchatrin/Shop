import axios from "axios";
import { useState, useEffect } from "react";
import Nav from "../../header/Nav";
import NavShort from "../../header/NavShort";
import Footer from "../../footer/Footer";
import DetailWomenShirt from "../../detail/DetailWomenShirt";
import DetailWomenPants from "../../detail/DetailWomenPants";
import { useSelector } from "react-redux";
import NavShortLogin from "../../header/NavShortLogin";
import NavLogin from "../../header/NarLogin";
import WomenWearXl from "./WomenWearXl";
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
function WomenWear() {
  const [womenShirt, setWomenShirt] = useState([]);
  const [womenPants, setWomenPants] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [productId, setProductId] = useState(String);
  const [selectWear, setSelectWear] = useState(String);
  const [cartData, setCartData] = useState({});
  const userData = useSelector((state: state) => state.user.userData);
  useEffect(() => {
    setCartData(userData);
  }, [userData]);
  const getData = async () => {
    const data = await axios.get("http://localhost:3001/product/women");
    setWomenShirt(data.data[0]);
    setWomenPants(data.data[1]);
  };

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  const backSelect = (back: string) => {
    setProductId(back);
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
                <DetailWomenShirt
                  backBtn={backSelect}
                  productId={productId}
                ></DetailWomenShirt>
              </>
            ) : (
              <>
                <DetailWomenPants
                  backBtn={backSelect}
                  productId={productId}
                ></DetailWomenPants>
              </>
            )}
          </>
        ) : (
          <>
            {windowWidth > 1024 ? (
              <>
                <WomenWearXl></WomenWearXl>
              </>
            ) : (
              <>
                <div className="text-center">
                  <p className=" font-bold underline text-3xl text-black">
                    Women T-Shirt
                  </p>
                  {womenShirt.map((shirt: wearType) => {
                    return (
                      <div
                        key={shirt._id}
                        className="flex flex-col m-5 justify-center items-center "
                      >
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
                    Women Pants
                  </p>
                  {womenPants.map((shirt: wearType) => {
                    return (
                      <div className="flex flex-col m-5 justify-center items-center ">
                        <img src={shirt.image.common[1]} alt="" />
                        <p className="font-bold">{shirt.productname}</p>
                        <p className="font-bold">Price : ${shirt.price}</p>
                        <button
                          className="btn  btn-info w-40"
                          onClick={() => {
                            setProductId(shirt._id);
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

export default WomenWear;
