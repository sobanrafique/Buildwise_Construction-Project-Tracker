import React from 'react';
import './SearchBar.css';

const SearchBar = ({ value, onChange, placeholder }) => (
  <input
    className="search-bar"
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder || 'Search...'}
  />
);

export default SearchBar;

