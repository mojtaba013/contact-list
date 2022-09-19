import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import getOneContact from "../../services/getOneContact";
import updateContact from "../../services/updateContact";

const EditContact = ({ editContactHandler }) => {
  const params = useParams();
  const navigate=useNavigate();

  const [contact, setContact] = useState({ name: "", email: "" });

  const changeHandler = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    editContactHandler(contact,params.id);
    navigate("/")
  };

  useEffect(() => {
    const localFetch = async () => {
      try {
        const { data } = await getOneContact(params.id);

        setContact({ name: data.name, email: data.email });
        
      } catch (error) {}
    };
    localFetch();
  }, []);

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
      <button type="submit">Update</button>
    </form>
  );
};

export default EditContact;
