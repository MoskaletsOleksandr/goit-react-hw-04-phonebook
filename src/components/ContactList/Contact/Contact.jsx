import PropTypes from 'prop-types';
import {
  ContactItem,
  ContactName,
  ContactNumber,
  DeleteButton,
} from './Contact.styled';

export const Contact = ({name, number, onDeleteContact, id}) => {
    return (
      <ContactItem>
        <ContactName>{name}:</ContactName>
        <ContactNumber>{number}</ContactNumber>
        <DeleteButton
          type="button"
          onClick={() => onDeleteContact(id)}
        >
          Delete
        </DeleteButton>
      </ContactItem>
    );
  }

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
