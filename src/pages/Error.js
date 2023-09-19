import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <section className="content">
      <div>This page does not exists</div>
      <Link to="/" className="home">Return Home</Link>
    </section>
  );
}

export default Error