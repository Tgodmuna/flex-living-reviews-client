import React from 'react';
import { Link } from 'react-router';

const Header = () => {
  return (
    <header className="flex items-center justify-between mb-6">
      <h1 className="text-2xl font-bold">Reviews Dashboard</h1>
      <nav className="flex gap-3">
        <Link
          to="/listing"
          className="px-3 py-2 bg-blue-600 text-white rounded"
        >
          Public Reviews
        </Link>
      </nav>
    </header>
  );
};

export default Header;
