import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Card from "../components/Card";


const AllContacts = () => {
  const [loading, setLoading] = useState(false);
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
            {/* <thead>
              <tr className="table-dark">
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
              </tr>
            </thead> */}
            <tbody>
              {contacts.map(contact => (
                <Card
                  key={contact.id}
                  name={contact.first_name}
                  phone={contact.phone}
                  email={contact.email}
                />
                // <tr
                //   key={contact._id}
                //   onClick={() => {
                //   }}>
                //   <th scope="row">{contact.first_name}</th>
                //   <th scope="row">{contact.last_name}</th>
                //   <td>{contact.phone}</td>
                //   <td>{contact.email}</td>
                // </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
export default AllContacts;
