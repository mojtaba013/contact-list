import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddContact from "./components/AddContact/AddContact";
import Contact from "./components/Contact";
import ContactList from "./components/ContactList/ContactList";
import EditContact from "./components/EditContact/Editcontact";
import addOneContact from "./services/addContactService";
import deleteContact from "./services/deleteContact";
import getContacts from "./services/getContactService";
import updateContact from "./services/updateContact";

function App() {
  const [contacts, setContacts] = useState([]);

  const addContactHandler = async(contact) => {
    try {
      setContacts([
      ...contacts,
      { id: Math.ceil(Math.random() * 100), ...contact },
    ]);
    await addOneContact(contact);
    } catch (error) {
      
    }
    
  };

  const deleteContactHandler = async (_id) => {
    try {
      await deleteContact(_id);
      const filteredContacts = contacts.filter((i) => i.id !== _id);
      setContacts(filteredContacts);
      
    } catch (error) {}
  };

  const editContactHandler=async(_contact,id)=>{
    await updateContact(id,_contact);
    const {data}=await getContacts();
    setContacts(data);
  }

  useEffect(() => {
    const fetchContacts = async () => {
      const { data } = await getContacts("/contacts");
      console.log(data);
      setContacts(data);
    };

    fetchContacts();
  }, []); 

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/edit/:id" element={<EditContact editContactHandler={editContactHandler} />} />
          <Route path="/user/:id" element={<Contact />} />
          <Route
            path="/"
            element={
              <ContactList
                _contactList={contacts}
                onDelete={deleteContactHandler}
              />
            }
          />
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          />
        </Routes>
      </BrowserRouter>

      {/* <main>
        <AddContact addContactHandler={addContactHandler} />
        <ContactList _contactList={contacts} onDelete={deleteContactHandler} />
      </main> */}
    </div>
  );
}

export default App;
