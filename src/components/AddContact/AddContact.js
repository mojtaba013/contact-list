import { useState } from "react";
import { useNavigate } from "react-router-dom";
import addOneContact from "../../services/addContactService";
import "./addContact.css";

const AddContact = () => {
  const [contact, setContact] = useState({ name: "", email: "" });
  const navigate = useNavigate();
  const changeHandler = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      await addOneContact(contact);
      navigate("/");
    } catch (error) {}
  };

  return (
    <form onSubmit={submitForm}>
      <div className="formControl">
        <label>name:</label>
        <input
          type="text"
          name="name"
          value={contact.name}
          onChange={changeHandler}
        />
      </div>
      <div className="formControl">
        <label>email:</label>
        <input
          type="text"
          name="email"
          value={contact.email}
          onChange={changeHandler}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddContact;
