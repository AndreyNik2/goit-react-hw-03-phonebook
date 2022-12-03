import React from 'react';
import { FormEl, LabelFormEl, InputFormEl } from './Form.styled';

class Form extends React.Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();
      this.props.onSubmit(this.state);
      this.resetForm();
  };

  resetForm = () => {
    this.setState({ name: '', number: '',});
  };

  render() {
    return (
      <FormEl onSubmit={this.handleSubmit}>
        <LabelFormEl>
          Name
          <InputFormEl
            onChange={this.handleChange}
            value={this.state.name}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </LabelFormEl>
        <LabelFormEl>
          Number
          <InputFormEl
            onChange={this.handleChange}
            value={this.state.number}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </LabelFormEl>

        <button type="submit">Add contact</button>
      </FormEl>
    );
  }
}

export default Form;
