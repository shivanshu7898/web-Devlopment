import {Link} from "react-router-dom";

function Header() {
  return (
    <header>
      <div className="d-flex justify-content-between p-3 bg-light">
        <div className="">My Website</div>

        <div className="d-flex gap-3 " > 
          <Link to="/">Home</Link>
          <Link to={"/about"}>About</Link>
         
        </div>
        <div className="d-flex gap-2">
          <Link className="btn btn-primary btn-outline-light" to="/login">
            Login
          </Link>
          <Link className="btn btn-outline-primary" to="/register">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;