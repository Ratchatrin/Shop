import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userAddCart } from "../redux/slicer";
import { useNavigate } from "react-router-dom";
interface wearType {
  _id: string;
  brand: string;
  productname: string;
  description: string;
  color: [string];
  image: {
    color: [string];
    common: [string];
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
    userData: { _id: string };
    error: boolean;
    loading: boolean;
  };
}
function DetailKidsPantsXl({ productId, backBtn }) {
  const [detail, setDetail] = useState<wearType[]>([]);
  const [pantsSize, setPantsSize] = useState<string[]>([]);
  const [selectColor, setSelectColor] = useState(String);
  const [selectSize, setSelectSize] = useState(String);
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: state) => state.user.userData);
  const getData = async () => {
    const data = await axios.get(
      `http://localhost:3001/product/kids/pants/detail/${productId}`
    );
    setDetail([data.data]);
    setPantsSize(Object.keys(data.data.size));
  };
  const addCart = async () => {
    try {
      if (!userData) {
        navigate("/login");
      } else {
        if (selectColor && selectSize.length !== 0) {
          const select = detail.map((list) => {
            return {
              id: list._id,
              brand: list.brand,
              productname: list.productname,
              description: list.description,
              image: list.image.color[selectColor],
              color: selectColor,
              size: selectSize,
              overview: list.overview,
              materials: list.materials,
              price: list.price,
              amount: amount,
            };
          });
          dispatch(userAddCart(select[0]));
          const add = await axios.put(
            `http://localhost:3001/cart/add/${userData._id}`,
            select[0]
          );
          console.log(add.data);
        } else {
          alert("Please Select Color or Size");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {pantsSize.length !== 0 ? (
        <div>
          <button
            className="btn btn-active btn-neutral mt-5 ml-4 text-3xl"
            onClick={() => {
              backBtn("");
            }}
          >
            Back
          </button>
          {detail.map((pants: wearType) => {
            return (
              <div className="p-2 flex flex-col items-center text-center">
                {selectColor === "" ? (
                  <div className="grid grid-cols-3  w-fit ">
                    {pants.image.common.map((image: string) => {
                      return (
                        <>
                          <img
                            src={image}
                            alt=""
                            className="w-64 m-2 rounded-xl "
                          />
                        </>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-5 w-fit ">
                    <img
                      src={pants.image.color[selectColor]}
                      alt=""
                      className="w-64 m-2 rounded-xl "
                    />
                    {pants.image.common.map((image: string) => {
                      return (
                        <>
                          <img
                            src={image}
                            alt=""
                            className="w-64 m-2 rounded-xl"
                          />
                        </>
                      );
                    })}
                  </div>
                )}
                <p className="mt-2 text-3xl underline w-2/3">
                  {pants.productname}
                </p>
                <p className="mt-2 text-2xl w-96">{pants.description}</p>
                <p className="mt-2">${pants.price}</p>
                <select
                  className="select select-bordered w-full max-w-xs mt-2"
                  onChange={(ev) => {
                    setSelectColor(ev.target.value);
                  }}
                >
                  <option disabled selected>
                    Pick Color
                  </option>
                  {pants.color.map((color: string) => {
                    return (
                      <>
                        <option>{color}</option>
                      </>
                    );
                  })}
                </select>
                <select
                  className="select select-bordered w-full max-w-xs mt-2"
                  onChange={(ev) => {
                    setSelectSize(ev.target.value);
                  }}
                >
                  <option disabled selected>
                    Pick Size
                  </option>
                  {pantsSize.map((size) => {
                    return (
                      <>
                        <option>{size}</option>
                      </>
                    );
                  })}
                </select>
                <div className="collapse bg-base-200 mt-2 w-80">
                  <input type="checkbox" />
                  <div className="collapse-title text-xl font-medium">
                    Overview
                  </div>
                  <div className="collapse-content">
                    {pants.overview.map((data: string) => {
                      return (
                        <>
                          <p>- {data}</p>
                        </>
                      );
                    })}
                  </div>
                </div>
                <div className="collapse bg-base-200 mt-2 w-80">
                  <input type="checkbox" />
                  <div className="collapse-title text-xl font-medium">
                    Materials
                  </div>
                  <div className="collapse-content">
                    <p> {pants.materials.FABRICDETAILS}</p>
                  </div>
                </div>
                <div className="flex justify-stretch items-center mt-2">
                  <button
                    className="btn btn-outline"
                    onClick={() => {
                      setAmount(amount + 1);
                    }}
                  >
                    +
                  </button>
                  <p className="w-10 text-center"> {amount}</p>
                  <button
                    className="btn btn-outline"
                    onClick={() => {
                      if (amount > 1) {
                        setAmount(amount - 1);
                      }
                    }}
                  >
                    -
                  </button>
                </div>

                <p>Total : {amount * pants.price}</p>
                <button
                  className="btn btn-active btn-accent mt-2"
                  onClick={addCart}
                >
                  Add To Cart
                </button>
                {/* {addComplete ? (
                  <>
                    <div role="alert" className="alert alert-success">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-current shrink-0 h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>Your purchase has been confirmed!</span>
                    </div>
                  </>
                ) : (
                  <></>
                )} */}
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default DetailKidsPantsXl;
