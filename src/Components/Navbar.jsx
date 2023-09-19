import React from 'react'
import { Link } from 'react-router-dom';
import Logo from '../Images/107.png'

const Navbar = () => {
  return (
    <section className="navbar">
      <div>
        <Link className="nav-links" to="/">
          <img src={Logo} alt="home" style={{ width: 100, height: 100, background: "none"}} />
        </Link>
      </div>
      <div>
        <Link className="nav-links" to="/register">
          Sign Up
        </Link>
      </div>
    </section>
  );
}

export default Navbar