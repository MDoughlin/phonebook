import React, { useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Modal from 'react-bootstrap/Modal';
import ToastContext from '../context/ToastContext';
import { Link } from "react-router-dom";

const AllContacts = () => {
  const { toast } = useContext(ToastContext);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [contacts, setContacts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8000/api/mycontacts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (!result.error) {
        setContacts(result.contacts);
      } else {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // Call the async function within the useEffect
  useEffect(() => {
    fetchData();
  }, []);

  const deleteContact = async (id) => {
    if (window.confirm("are you sure you want to delete this contact ?")) {
      try {
        const res = await fetch(`http://localhost:8000/api/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setContacts(result.myContacts);
          toast.success("Deleted contact");
          setShowModal(false);
        } else {
          toast.error(result.error);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const newSearchUser = contacts.filter((contact) =>
      contact.first_name.toLowerCase().includes(searchInput.toLowerCase())
    );
    console.log(newSearchUser);
    setContacts(newSearchUser);
  };

  return (
    <>
      <div >
        <h1>Your Contacts</h1>
        {/* <a href="/mycontacts" className="btn btn-danger">Reload Contact</a> */}
        <hr className="my-4" />

        {loading ? (
          <Spinner splash="Loading Contacts..." />
        ) : (
          <>
            {contacts.length === 0 ? <h3>No Contacts Created </h3> : (
              <>
                <form className="d-flex" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    name="searchInput"
                    id="searchInput"
                    className="form-control my-2"
                    placeholder="Search Contact"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <button type="submit" className="btn btn-info mx-2">Search</button>
                </form>

                <p className="text-muted">Total Contacts: {contacts.length}</p>
                <table className="table table-hover">
                  <thead>
                    <tr className="table-dark">
                      <th scope="col">First Name</th>
                      <th scope="col">Last Name</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (

                      <tr
                        key={contact._id}
                        onClick={() => {
                          setModalData({});
                          setModalData(contact);
                          setShowModal(true);
                        }}>
                        <th scope="row">{contact.first_name}</th>
                        <th scope="row">{contact.last_name}</th>
                        <td>{contact.phone}</td>
                        <td>{contact.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

          </>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.first_name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p><strong>Phone Number:</strong>{modalData.phone}</p>
          <p><strong>Email:</strong> {modalData.email}</p>
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-info" to={`/edit/:${modalData._id}`} >Edit</Link>
          <button className="btn btn-danger" onClick={() => deleteContact(modalData._id)}>Delete </button>
          <button className="btn btn-warning" onClick={() => setShowModal(false)}>Close</button>
        </Modal.Footer>
      </Modal>

    </>
  );
};
export default AllContacts;
