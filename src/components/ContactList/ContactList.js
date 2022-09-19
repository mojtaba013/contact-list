import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import getContacts from "../../services/getContactService";
import Contact from "../Contact";
import "./contactList.css";

const ContactList = ({ _contactList, onDelete }) => {


  return (
    <section className="contactList">
      <Link to="/add">add contact</Link>
      {_contactList.map((items, index) => {
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
            <button onClick={() => onDelete(id)}>Delete</button>
          </div>
        );
      })}
    </section>
  );
};

export default ContactList;
