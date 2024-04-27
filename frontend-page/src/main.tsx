import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MenWear from "./component/main/MenWear.tsx";
import WomenWear from "./component/main/WomenWear.tsx";
import KidsWear from "./component/main/KidsWear.tsx";
import About from "./component/header/About.tsx";
import Contact from "./component/header/Contact.tsx";
import Detail from "./component/detail/DetailMenShirt.jsx";
import Login from "./component/header/Login.tsx";
import Signin from "./component/header/Signin.tsx";
import Home from "./component/main/Home.tsx";
import Welcome from "./component/header/Welcome.tsx";
import { Provider } from "react-redux";
import Store from "./component/redux/store.js";
import Cart from "./component/header/Cart.tsx";
import ResetPassword from "./component/header/ResetPassword.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome></Welcome>,
  },
  {
    path: "/home",
    element: <Home></Home>,
  },
  {
    path: "/product/men",
    element: <MenWear></MenWear>,
  },
  {
    path: "/product/women",
    element: <WomenWear></WomenWear>,
  },
  {
    path: "/product/kids",
    element: <KidsWear></KidsWear>,
  },
  {
    path: "/product/detail",
    element: <Detail productId={undefined} backBtn={undefined}></Detail>,
  },
  {
    path: "/about",
    element: <About></About>,
  },
  {
    path: "/contact",
    element: <Contact></Contact>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signin",
    element: <Signin></Signin>,
  },
  {
    path: "/cart",
    element: <Cart></Cart>,
  },
  {
    path: "/reset",
    element: <ResetPassword></ResetPassword>,
  },
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={Store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);
