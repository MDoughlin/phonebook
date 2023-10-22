import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:8000/api/contact`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id, ...userDetails }),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(`updated [${userDetails.first_name}] contact`);

      setUserDetails({ first_name: "", last_name: "", email: "", phone: "" });
      navigate("/mycontacts");
    } else {
      toast.error(result.error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/api/contact/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        setUserDetails({
          first_name: result.first_name,
          last_name: result.last_name,
          phone: result.phone,
          email: result.email,
        });
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData(); // Call the async function immediately

  }, [id]);


  return (
    <>
      {loading ? (
        <Spinner splash="Loading Contact..." />
      ) : (
        <>
          <h2>Edit your contact</h2>

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
              <label htmlFor="emailInput" className="form-label mt-4">Email address</label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
                placeholder="janedoe@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneInput" className="form-label mt-4">Phone Number</label>
              <input
                type="number"
                className="form-control"
                id="phoneInput"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                placeholder="0000000000"
                required
              />
            </div>
            <input type="submit" value="Save Changes" className="btn btn-info my-2" />
          </form>
        </>
      )}
    </>
  );
};

export default EditContact;
