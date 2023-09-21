import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <h3>Login </h3>
      <form>
        <div class="form-group">
          <label for="emailInput" class="form-label mt-4">Email address</label>
          <input
            type="email"
            class="form-control"
            id="emailInput"
            aria-describedby="emailHelp"
            name="email"
            placeholder="Enter email"
          />
        </div>
        <div class="form-group">
          <label for="passwordlInput" class="form-label mt-4">Password</label>
          <input
            type="password"
            class="form-control"
            id="passwordInput"
            name="email"
            placeholder="Enter password"
          />
        </div>
        <input type="submit" value="Login" className="btn btn-primary m-3" />
        <p> Don't have an account ? <Link to="/register">Create one</Link></p>
      </form>
    </>
  );
};
export default Login;
