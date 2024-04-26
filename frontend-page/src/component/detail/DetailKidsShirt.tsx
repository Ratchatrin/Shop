import axios from "axios";
import { useEffect, useState } from "react";
import { userAddCart } from "../redux/slicer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
interface wearType {
  readonly _id: string;
  brand: string;
  productname: string;
  description: string;
  color: string[];
  image: {
    color: { [color: string]: string[] };
    common: string[];
  };
  size: { [size: string]: unknown };
  overview: string[];
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
function DetailKidsShirt({
  productId,
  backBtn,
}: {
  productId: string;
  backBtn: React.FunctionComponent<unknown>;
}) {
  const [detail, setDetail] = useState<wearType[]>([]);
  const [shirtSize, setShirtSize] = useState<string[]>([]);
  const [selectColor, setSelectColor] = useState(String);
  const [selectSize, setSelectSize] = useState(String);
  const [amount, setAmount] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state: state) => state.user.userData);

  const getData = async () => {
    setShirtSize([]);
    const data = await axios.get(
      `http://localhost:3001/product/kids/shirt/detail/${productId}`
    );
    setDetail([data.data]);
    setShirtSize(Object.keys(data.data.size));
  };

  const addCart = async () => {
    try {
      if (!userData) {
        navigate("/home");
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
      {shirtSize.length !== 0 ? (
        <div>
          <button
            className="btn btn-active btn-neutral mt-5 ml-4"
            onClick={() => {
              backBtn("");
            }}
          >
            Back
          </button>
          {detail.map((shirt) => {
            return (
              <div className="p-2 flex flex-col items-center">
                {selectColor === "" ? (
                  <div className="grid grid-cols-2  grid-rows-2 w-fit">
                    {shirt.image.common.map((image) => {
                      return (
                        <>
                          <img
                            src={image}
                            alt=""
                            className="w-36 m-2 rounded-xl"
                          />
                        </>
                      );
                    })}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 grid-rows-2 ">
                    <img
                      src={shirt.image.color[selectColor]}
                      alt=""
                      className="w-36 m-2 rounded-xl "
                    />
                    {shirt.image.common.map((image) => {
                      return (
                        <>
                          <img
                            src={image}
                            alt=""
                            className="w-36 m-2 rounded-xl"
                          />
                        </>
                      );
                    })}
                  </div>
                )}

                <p className="mt-2 w-72 text-center">{shirt.productname}</p>
                <p className="mt-2 w-64">{shirt.description}</p>
                <p className="mt-2">${shirt.price}</p>
                <select
                  className="select select-bordered w-full max-w-xs mt-2"
                  onChange={(ev) => {
                    setSelectColor(ev.target.value);
                  }}
                >
                  <option disabled selected>
                    Pick Color
                  </option>
                  {shirt.color.map((color) => {
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
                  {shirtSize.map((size) => {
                    return (
                      <>
                        <option>{size}</option>
                      </>
                    );
                  })}
                </select>
                <div className="collapse bg-base-200 mt-2 w-72">
                  <input type="checkbox" />
                  <div className="collapse-title text-xl font-medium">
                    Overview
                  </div>
                  <div className="collapse-content">
                    {shirt.overview.map((data) => {
                      return (
                        <>
                          <p>- {data}</p>
                        </>
                      );
                    })}
                  </div>
                </div>
                <div className="collapse bg-base-200 mt-2 w-72">
                  <input type="checkbox" />
                  <div className="collapse-title text-xl font-medium">
                    Materials
                  </div>
                  <div className="collapse-content">
                    <p> {shirt.materials.FABRICDETAILS}</p>
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
                <button
                  className="btn btn-active btn-accent mt-2"
                  onClick={addCart}
                >
                  Add To Cart
                </button>
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

export default DetailKidsShirt;
