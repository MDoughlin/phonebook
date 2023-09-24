import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = ({ title = "Contact List" }) => {
  const { user, setUser } = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link to="/">
          <a className="navbar-brand">{title}</a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ms-auto">
            {user ?
              <>
                <li class="nav-item" onClick={() => {
                  setUser(null);
                  localStorage.clear();
                }}>
                  <button className="btn btn-danger">Logout</button>
                </li>
              </> : <> <li className="nav-item">
                <Link to="/login">
                  <a class="nav-link active">Login</a>
                </Link>
              </li>
                <li className="nav-item">
                  <Link to="/register">
                    <a className="nav-link" href="#">Register</a>
                  </Link>
                </li></>}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
