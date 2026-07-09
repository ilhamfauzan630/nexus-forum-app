import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className="register-input">
      <input className="register-input__field" type="text" value={name} onChange={onNameChange} placeholder="Name" />
      <input className="register-input__field" type="Email" value={email} onChange={onEmailChange} placeholder="Email" />
      <input className="register-input__field" type="password" value={password} onChange={onPasswordChange} placeholder="Password" />
      <button className="register-input__button" type="button" onClick={() => register({ name, email, password })}>Register</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
