import {Link} from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="d-flex justify-content-between p-3 bg-light">
        <div className="">My Website</div>

        <div className="d-flex gap-3 " > 
          <Link to="/">Home</Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/login"}>login</Link> 
          <Link to={"/register"}>Register</Link>
        </div>
        <div className="d-flex gap-2">
            <button className="btn btn-primary btn-outline-light">login</button>
            <button className="btn btn-outline-primary">Register</button>
        </div>
      </div>
    </header>
  );
}

export default Header;