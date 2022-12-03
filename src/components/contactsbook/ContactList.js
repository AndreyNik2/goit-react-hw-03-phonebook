import PropTypes from 'prop-types';
import {
  ContactItem,
  DeleteButton,
  Contact,
  List,
} from './ContactList.styled';

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <List>
      {contacts.map(contact => (
        <ContactItem key={contact.id}>
          <Contact>
            {contact.name}: {contact.number}
          </Contact>
          <DeleteButton onClick={() => onDeleteContact(contact.id)} type="button">
            Delete
          </DeleteButton>
        </ContactItem>
      ))}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactList;
