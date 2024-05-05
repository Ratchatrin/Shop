import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "./Nav";
import NavShort from "./NavShort";
import NavShortLogin from "./NavShortLogin";
import { userAddCart, userDelete } from "../redux/slicer";
import axios from "axios";
import Footer from "../footer/Footer";
import NavLogin from "./NarLogin";
import { Link } from "react-router-dom";
interface state {
  user: {
    userData: { _id: string; cart: wearType[] };
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
  const amount = cart.map((product) => {
    return product.amount;
  });
  const totalAmount = amount.reduce((acc, cur) => {
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
      {windowWidth < 767 ? (
        <>
          {cart.length === 0 ? (
            <>
              <div className="flex flex-col justify-between items-center h-full">
                <div className="w-11/12 font-bold  text-center">
                  <p className="text-xl mb-3 mt-10 underline">
                    Your cart is currently empty.
                  </p>
                  <button className="btn btn-active btn-neutral w-7/12 h-7/12 ">
                    <Link to="/home">
                      <p>Go Shopping</p>
                    </Link>
                  </button>
                </div>
                <Footer></Footer>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-center">
                <p className="text-2xl underline mb-10 font-bold">
                  Shopping Cart
                </p>
              </div>
              <div className="flex flex-col items-center justify-between h-full ">
                <div className="flex justify-start items-start">
                  <div className=" flex flex-col h-full justify-start items-start">
                    {cart.map((product: wearType) => {
                      return (
                        <>
                          <div className="w-11/12 flex justify-between items-center text-xl mb-7 border-b-2 border-b-gray-300 p-5 ">
                            <img
                              src={product.image}
                              alt=""
                              className="rounded-lg w-4/12 h-4/12 max-w-md max-h-md  mr-8"
                            />
                            <div className="w-full">
                              <p className="font-bold uppercase mb-2">
                                {product.brand}
                              </p>
                              <p className="text-pretty w-10/12 font-semibold">
                                {product.productname}
                              </p>
                              <p className="font-light">
                                Color : {product.color}
                              </p>
                              <p className="font-light ">
                                Size : {product.size}
                              </p>
                              <p className="font-bold underline">
                                Total : $ {product.price * product.amount}
                              </p>
                            </div>
                            <div className="text-center">
                              <button
                                className="btn btn-success text-2xl"
                                onClick={() => {
                                  dispatch(userAddCart(product));
                                  addCart(product);
                                }}
                              >
                                +
                              </button>
                              <p className="text-2xl font-semibold ">
                                {product.amount}
                              </p>
                              <button
                                className="btn btn-error  text-2xl"
                                onClick={() => {
                                  dispatch(userDelete(product));
                                  deleteCart(product);
                                }}
                              >
                                -
                              </button>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <div className="flex flex-col justify-end items-center h-fit p-3">
                    <p className="text-xl text-pretty">
                      Order Items | {totalAmount} Items{" "}
                    </p>
                    <p className="text-xl underline">
                      Total Price : ${finalTotal}
                    </p>
                    <button className="btn btn-success mt-5 text-xl">
                      Check Out
                    </button>
                  </div>
                </div>
                <Footer></Footer>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {cart.length === 0 ? (
            <>
              <div className="flex flex-col justify-between items-center h-full">
                <div className="w-8/12 font-bold  text-center">
                  <p className="text-3xl mb-3 mt-10 underline">
                    Your cart is currently empty.
                  </p>
                  <button className="btn btn-active btn-neutral w-6/12 max-w-xs text-xl">
                    <Link to="/home">
                      <p>Go Shopping</p>
                    </Link>
                  </button>
                </div>
                <Footer></Footer>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-between h-full ">
                <div className="flex  justify-start items-start">
                  <div className=" flex flex-col h-full justify-start items-center">
                    {cart.map((product: wearType) => {
                      return (
                        <>
                          <div className="w-10/12 h-10/12 flex justify-between items-center text-xl mb-7 border-b-2 border-b-gray-300 p-5 ">
                            <img
                              src={product.image}
                              alt=""
                              className="rounded-lg w-4/12 h-4/12 max-w-sm max-h-sm  mr-8"
                            />
                            <div className="w-full">
                              <p className="font-bold uppercase mb-2">
                                {product.brand}
                              </p>
                              <p className="text-pretty w-10/12 font-semibold">
                                {product.productname}
                              </p>
                              <p className="font-light">
                                Color : {product.color}
                              </p>
                              <p className="font-light ">
                                Size : {product.size}
                              </p>
                              <p className="font-bold ">
                                Total : $ {product.price * product.amount}
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="mb-2 font-semibold">Quantity</p>
                              <button
                                className="btn bg-green-400 text-2xl"
                                onClick={() => {
                                  dispatch(userAddCart(product));
                                  addCart(product);
                                }}
                              >
                                +
                              </button>
                              <p className="text-2xl font-semibold ">
                                {product.amount}
                              </p>
                              <button
                                className="btn btn-error  text-2xl"
                                onClick={() => {
                                  dispatch(userDelete(product));
                                  deleteCart(product);
                                }}
                              >
                                -
                              </button>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                  <div className="flex flex-col justify-end items-center h-fit p-3 w-7/12">
                    <div className="text-center border-b-2 w-full pb-2 border-b-slate-400">
                      <p className="text-lg text-pretty font-bold">
                        Order Items{" "}
                        <p className=" text-2xl underline">
                          {totalAmount} Item
                        </p>
                      </p>
                    </div>
                    <p className="text-2xl mt-5 text-pretty font-bold  ">
                      Total Price :{" "}
                      <span className="underline">${finalTotal}</span>
                    </p>
                    <div>
                      <button className="btn bg-green-400 mt-5 text-xl w-full h-full">
                        Check Out
                      </button>
                      <Link to="/home">
                        <button className="btn btn-active btn-neutral mt-5 text-xl w-full h-full p-1">
                          Continue Shopping
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <Footer></Footer>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default Cart;
