import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const Register = () => {
  const { toast } = useContext(ToastContext);
  const { registerUser } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = event => {
    const { name, value } = event.target;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword
    ) {
      toast.error("please enter all the required fields!");
      return;
    }

    if (credentials.password !== credentials.confirmPassword) {
      toast.error("passwordName do not match!");
      return;
    }
    const userData = { ...credentials, confirmPassword: undefined };
    registerUser(userData);
  };
  return (
    <>
      <h3>Create account </h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstNameInput" class="form-label mt-4">Your Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            name="name"
            value={credentials.name}
            onChange={handleInputChange}
            placeholder="Jane Doe"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailInput" class="form-label mt-4">Email address</label>
          <input
            type="email"
            class="form-control"
            id="emailInput"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            placeholder="janedoe@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordlInput" class="form-label mt-4">Password</label>
          <input
            type="password"
            class="form-control"
            id="passwordInput"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Enter password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordlInput" class="form-label mt-4">Confirm Password</label>
          <input
            type="password"
            class="form-control"
            id="confirmPassword"
            name="confirmPassword"
            value={credentials.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm password"
            required
          />
        </div>
        <input type="submit" value="register" className="btn btn-primary m-3" />
        <p> Already have an account ? <Link to="/login">Login</Link></p>
      </form>
    </>
  );
};
export default Register;
