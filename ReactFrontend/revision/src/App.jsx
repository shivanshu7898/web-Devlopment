import { IoFastFoodSharp } from "react-icons/io5";

function App() {
  return (
    <>
      <div className="bg-warning d-flex justify-content-between align-items-center p-2 ">
        <div className="fw-bold fs-5 text-light">
          Cravings <IoFastFoodSharp  />
        </div>
        <div className="d-flex gap-3 ">
          <a className="text-decoration-none text-white" href="">
            home
          </a>
          <a className="text-decoration-none text-white" href="">
            about
          </a>
          <a className="text-decoration-none text-white" href="">
            order
          </a>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-light">login</button>
          <button className="btn btn-outline-light">Register</button>
        </div>
      </div>
    </>
  );
}

export default App;
