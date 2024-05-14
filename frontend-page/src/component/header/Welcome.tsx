import { Link } from "react-router-dom";
import "./welcome.css";
function Welcome() {
  return (
    <div className="welcome">
      <Link to="/home">
        <h1>Welcome To My Website</h1>
        <h2>Go to The Brand Shop :)</h2>
      </Link>
    </div>
  );
}

export default Welcome;
