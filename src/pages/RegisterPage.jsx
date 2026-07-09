import React from 'react';
import { IoSparklesOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));

    navigate('/');
  };

  return (
    <section className="register-page">
      <header className="register-page__hero">
        <div className="auth-hero__content">
          <h1><IoSparklesOutline /></h1>
          <p>Nexus Forum</p>
        </div>
      </header>
      <article className="register-page__main">
        <p className="auth-page__eyebrow">Join the conversation</p>
        <h2>Create your account</h2>
        <RegisterInput register={onRegister} />

        <p className="auth-page__switch">
          Already have an account?
          {' '}
          <Link to="/">Login</Link>
        </p>
      </article>
    </section>
  );
}

export default RegisterPage;
