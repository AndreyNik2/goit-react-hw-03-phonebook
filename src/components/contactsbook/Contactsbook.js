import React from 'react';
import {
  TitlePhonebook,
  BoxPhonebook,
  TitleContacts,
} from './contactsBook.styled';
import { nanoid } from 'nanoid';
import Form from './Form';
import ContactList from './ContactList';
import Filter from './Filter';

class ContactsBook extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const parceContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parceContacts) {
      this.setState({ contacts: parceContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const name = form.elements.name.value;
    console.log(name);
    form.reset();
  };

  formSubmitHandler = data => {
    if (
      this.state.contacts.filter(contact => contact.name === data.name).length >
      0
    ) {
      alert(`${data.name}  is already in contacts`);
      return;
    }
    data.id = nanoid();
    this.setState(prevState => ({ contacts: [...prevState.contacts, data] }));
  };

  onChangeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  deleteContacts = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const normalizedFilter = this.state.filter.toLowerCase();
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return (
      <BoxPhonebook>
        <TitlePhonebook>Phonebook</TitlePhonebook>
        <Form onSubmit={this.formSubmitHandler} />
        <TitleContacts>Contacts</TitleContacts>
        <Filter value={this.state.filter} onChange={this.onChangeFilter} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContacts}
        />
        {this.state.contacts.length === 0 && (
          <p>Contactlist empty. Please add contact.</p>
        )}
      </BoxPhonebook>
    );
  }
}

export default ContactsBook;
