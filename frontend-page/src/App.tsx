import NavShort from "./component/header/NavShort";
import Nav from "./component/header/Nav";
import Home from "./component/redux/main/Home.tsx";
import MenWear from "./component/redux/main/MenWear.tsx";
import WomenWear from "./component/redux/main/WomenWear.tsx";
import KidsWear from "./component/redux/main/KidsWear.tsx";
import About from "./component/header/About.tsx";
import Contact from "./component/header/Contact.tsx";
import Detail from "./component/detail/DetailMenShirt.jsx";
import Login from "./component/header/Login.tsx";
import Signin from "./component/header/Signin.tsx";

function App() {
  // const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  // const updateWindowWidth = () => {
  //   setWindowWidth(window.innerWidth);
  // };
  // window.addEventListener("resize", updateWindowWidth);
  return (
    <>
      <Home></Home>
      <MenWear></MenWear>
      <Nav></Nav>
      <NavShort></NavShort>
      <WomenWear></WomenWear>
      <KidsWear></KidsWear>
      <About></About>
      <Contact></Contact>
      <Detail productId={undefined} backBtn={undefined}></Detail>
      <Login></Login>
      <Signin></Signin>
    </>
  );
}

export default App;
