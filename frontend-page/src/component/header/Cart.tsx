import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./Nav";
import NavShort from "./NavShort";
import NavShortLogin from "./NavShortLogin";
import { userAddCart, userDelete } from "../redux/slicer";
import axios from "axios";
import Footer from "../footer/Footer";
import NavLogin from "./NarLogin";

interface state {
  user: {
    userData: { _id: string };
    error: boolean;
    loading: boolean;
  };
}
interface wearType {
  id: string;
  brand: string;
  productname: string;
  description: string;
  color: string;
  image: string;
  size: string;
  overview: string[];
  materials: {
    FABRICDETAILS: string;
  };
  price: number;
  amount: number;
}
function Cart() {
  const [cart, setCart] = useState<wearType[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const userData = useSelector((state: state) => state.user.userData);
  const dispatch = useDispatch();
  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth);
  };
  const total = cart.map((product) => {
    return product.price * product.amount;
  });
  const finalTotal = total.reduce((acc, cur) => {
    return acc + cur;
  }, 0);
  const deleteCart = async (product: wearType) => {
    await axios.put(
      `http://localhost:3001/cart/delete/${userData._id}`,
      product
    );
  };
  const addCart = async (product: wearType) => {
    await axios.put(`http://localhost:3001/cart/add/${userData._id}`, product);
  };

  useEffect(() => {
    setCart(userData.cart);
  }, [userData]);
  window.addEventListener("resize", updateWindowWidth);
  return (
    <>
      {windowWidth < 767 ? (
        <>
          {userData ? (
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
          {userData ? (
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
      {cart.map((product: wearType) => {
        return (
          <div>
            <div className="w-fit flex justify-center items-center">
              <img
                src={product.image}
                alt=""
                className="rounded-lg w-24 h-24"
              />
              <div className="m-4 w-fit">
                <p>{product.brand}</p>
                <p className="text-wrap w-40">{product.productname}</p>
                <p>Color : {product.color}</p>
                <p>Size : {product.size}</p>
                <p>$ {product.price * product.amount}</p>
              </div>
              <div className="text-center">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    dispatch(userAddCart(product));
                    addCart(product);
                  }}
                >
                  +
                </button>
                <p> {product.amount}</p>
                <button
                  className="btn btn-error"
                  onClick={() => {
                    dispatch(userDelete(product));
                    deleteCart(product);
                  }}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <div
        className="flex flex-col justify-end items-center
       h-full p-3"
      >
        <p className="text-2xl">Total Price : ${finalTotal}</p>
        <button className="btn btn-success mt-5">Check Out</button>
      </div>

      <Footer></Footer>
    </>
  );
}

export default Cart;
