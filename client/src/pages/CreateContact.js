import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import ToastContext from "../context/ToastContext";


const CreateContact = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  // const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:8000/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(userDetails),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(`Created[${userDetails.name}] created`);

      setUserDetails({ first_name: "", last_name: "", email: "", phone: "" });
    } else {
      toast.error(result.error);
    }
  };

  return (
    <>
      <h2>Create Your Contact</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstNameInput" className="form-label mt-4">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstNameInput"
            name="first_name"
            value={userDetails.firstName}
            onChange={handleInputChange}
            placeholder="Jane"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastNameInput" className="form-label mt-4">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastNameInput"
            name="last_name"
            value={userDetails.lastName}
            onChange={handleInputChange}
            placeholder="Doe"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailInput" class="form-label mt-4">Email address</label>
          <input
            type="email"
            class="form-control"
            id="emailInput"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            placeholder="janedoe@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneInput" class="form-label mt-4">Phone Number</label>
          <input
            type="number"
            class="form-control"
            id="phoneInput"
            name="phone"
            value={userDetails.phone}
            onChange={handleInputChange}
            placeholder="0000000000"
            required
          />
        </div>
        <input type="submit" value="Add Contact" className="btn btn-info my-2" />
      </form>
    </>
  );
};
export default CreateContact;
