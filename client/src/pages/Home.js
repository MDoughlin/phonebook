import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";


const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    !user && navigate("/login", { replace: true });
  }, []);
  return (
    <>
      <div className="jumbotron">
        <h1 className="display-4">Welcome {user ? user.name : null}</h1>
        <hr className="my-4" />
      </div>
    </>
  );
};
export default Home;
