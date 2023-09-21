import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [credentials, setCredentials] = useState({
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
  };
  return (
    <>
      <h3>Create account </h3>
      <form onSubmit={handleSubmit}>
        <div class="form-group">
          <label for="emailInput" class="form-label mt-4">Email address</label>
          <input
            type="email"
            class="form-control"
            id="emailInput"
            aria-describedby="emailHelp"
            name="email"
            value={credentials.email}
            onChange={handleInputChange}
            placeholder="Enter email"
            required
          />
        </div>
        <div class="form-group">
          <label for="passwordlInput" class="form-label mt-4">Password</label>
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
        <div class="form-group">
          <label for="passwordlInput" class="form-label mt-4">Confirm Password</label>
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
