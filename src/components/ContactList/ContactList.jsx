import PropTypes from 'prop-types';
import { List } from './ContactList.styled';
import { Contact } from './Contact/Contact';

export const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <List>
      {contacts.map(({ id, name, number }) => {
        return (
          <Contact
            key={id}
            name={name}
            number={number}
            onDeleteContact={onDeleteContact}
            id={id}
          />
        );
      })}
    </List>
  );
};

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
