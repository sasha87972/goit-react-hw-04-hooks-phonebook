import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Container from "./components/container";
import ContactForm from "./components/contactForm";
import ContactList from "./components/contactList";
import Title from "./components/title";
import Filter from "./components/filter";

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (info) => {
    const contact = {
      id: nanoid(),
      name: info.name,
      number: info.number,
    };
    const isOnList = contacts.find(
      (contact) => contact.name.toLowerCase() === info.name.toLowerCase()
    );

    isOnList
      ? alert(`${contact.name} is already in contacts`)
      : setContacts((prevstate) => [contact, ...prevstate]);
  };

  const handleFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const filterContacts = () => {
    const normFilter = filter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normFilter)
    );
  };
  const deleteContact = (id) => {
    setContacts((prevState) =>
      prevState.filter((contact) => contact.id !== id)
    );
  };
  return (
    <Container title="Phonebook">
      <ContactForm onSubmit={addContact} />
      <Title title="Contacts" />
      <Filter value={filter} onSearch={handleFilter} />
      <ContactList items={filterContacts()} onDelete={deleteContact} />
    </Container>
  );
}

export default App;
