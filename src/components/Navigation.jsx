import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Navigation({ authUser, signOut }) {
  const { id, name, avatar } = authUser;

  return (
    <div className="navigation">
      <div className="navigation__inner">
        <Link to="/" className="navigation__brand">
          Nexus Forum
        </Link>

        <nav className="navigation__links" aria-label="Primary navigation">
          <Link to="/">Home</Link>
          <Link to="/leaderboards">Leaderboards</Link>
        </nav>

        <div className="navigation__profile">
          <img src={avatar} alt={id} title={name} />
          <button type="button" onClick={signOut}>Sign out</button>
        </div>
      </div>
    </div>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
