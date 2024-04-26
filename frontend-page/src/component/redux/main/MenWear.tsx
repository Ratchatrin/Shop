import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "../../header/Nav";
import NavShort from "../../header/NavShort";
import Footer from "../../footer/Footer";
import DetailMenShirt from "../../detail/DetailMenShirt";
import DetailMenPants from "../../detail/DetailMenPants";
import { useSelector } from "react-redux";
import NavShortLogin from "../../header/NavShortLogin";
import NavLogin from "../../header/NarLogin";
import "./home.css";
import MenWearXl from "./MenWearXl";
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
function MenWear() {
  const [menShirt, setMenShirt] = useState([]);
  const [menPants, setMenPants] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [productId, setProductId] = useState(String);
  const [selectWear, setSelectWear] = useState(String);
  const [cartData, setCartData] = useState({});
  const userData = useSelector((state: state) => state.user.userData);
  useEffect(() => {
    setCartData(userData);
  }, [userData]);
  const getData = async () => {
    const data = await axios.get("http://localhost:3001/product/men");
    setMenShirt(data.data[0]);
    setMenPants(data.data[1]);
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
                <DetailMenShirt
                  backBtn={backSelect}
                  productId={productId}
                ></DetailMenShirt>
              </>
            ) : (
              <>
                <DetailMenPants
                  backBtn={backSelect}
                  productId={productId}
                ></DetailMenPants>
              </>
            )}
          </>
        ) : (
          <>
            {windowWidth > 1024 ? (
              <>
                <MenWearXl></MenWearXl>
              </>
            ) : (
              <>
                <div className="text-center ">
                  <p className=" font-bold underline text-3xl text-black">
                    Men T-Shirt
                  </p>

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
                <div className="text-center">
                  <p className=" font-bold underline text-3xl text-black">
                    Men Pants
                  </p>
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
          </>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default MenWear;
