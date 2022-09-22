import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddContact from "./components/AddContact/AddContact";
import Contact from "./components/Contact";
import ContactList from "./components/ContactList/ContactList";
import EditContact from "./components/EditContact/Editcontact";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/edit/:id" element={<EditContact />} />
          <Route path="/user/:id" element={<Contact />} />
          <Route path="/" element={<ContactList />} />
          <Route path="/add" element={<AddContact />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
