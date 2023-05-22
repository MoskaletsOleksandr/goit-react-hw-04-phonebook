import PropTypes from 'prop-types';
import { Label, Input } from './Filter.styled';

export const Filter = ({onChange}) => {
    return (
      <Label>
        Find contact by name
        <Input onChange={onChange} />
      </Label>
    );
  }

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};
