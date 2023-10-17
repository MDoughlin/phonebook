import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Modal from 'react-bootstrap/Modal';


const AllContacts = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [contacts, setContacts] = useState([]);


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

  return (
    <>
      <div >
        <h1>Your Contacts</h1>
        <hr className="my-4" />

        {loading ? <Spinner splash="Loading Contacts..." /> : (

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
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.first_name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Phone Number:{modalData.phone}</p>
          <p>Email: {modalData.email}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn btn-warning" onClick={() => setShowModal(false)}>Close</button>
        </Modal.Footer>
      </Modal>

    </>
  );
};
export default AllContacts;
