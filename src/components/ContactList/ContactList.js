import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import deleteContact from "../../services/deleteContact";
import getContacts from "../../services/getContactService";
import Contact from "../Contact";
import "./contactList.css";

const ContactList = () => {
  const [contacts, setContacts] = useState(null);
  const [allContacts, setAllContacts] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchContacts = async () => {
      const { data } = await getContacts("/contacts");
      setContacts(data);
      setAllContacts(data);
    };

    try {
      fetchContacts();
    } catch (error) {}
  }, []);

  const deleteContactHandler = async (_id) => {
    try {
      await deleteContact(_id);
      const filteredContacts = contacts.filter((i) => i.id !== _id);
      setContacts(filteredContacts);
    } catch (error) {}
  };

  const searchHandler = (e) => {
    setSearchTerm(e.target.value);
    const serach = e.target.value;
    if (serach !== "") {
      const filterContacts = allContacts.filter((x) => {
        return Object.values(x)
          .join(" ")
          .toLowerCase()
          .includes(serach.toLowerCase());
      });
      setContacts(filterContacts);
    } else {
      setContacts(allContacts);
    }
  };

  return (
    <section className="contactList">
      <Link to="/add">add contact</Link>
      <div>
        <input type="text" value={searchTerm} onChange={searchHandler} />
      </div>
      {contacts ? (
        contacts.map((items, index) => {
          const { name, email, id } = items;

          return (
            <div key={index} className="item">
              <Link to={{ pathname: `user/${id}` }} state={items}>
                <p>{name}</p>
                <p>{email}</p>
              </Link>
              <Link to={`/edit/${id}`}>
                <button>edit</button>
              </Link>
              <button onClick={() => deleteContactHandler(id)}>Delete</button>
            </div>
          );
        })
      ) : (
        <p>Loading ...</p>
      )}
    </section>
  );
};

export default ContactList;
