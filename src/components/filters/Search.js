import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { SearchContext } from '../../context/searchContext'; // Import SearchContext
import '../filters/search.css';

const Search = () => {
  const { searchQuery, handleSearchChange } = useContext(SearchContext); // Use SearchContext
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // Fetch autocomplete suggestions based on user input
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length > 1) {
        try {
          const response = await axios.get('http://localhost:4000/api/products/suggest', {
            params: { q: searchQuery }
          });
          setSuggestions(response.data);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [searchQuery]);

  // Fetch search results based on user input
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.length > 1) {
        try {
          const response = await axios.get('http://localhost:4000/api/products/search', {
            params: { q: searchQuery }
          });
          setSearchResults(response.data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      } else {
        setSearchResults([]);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  // Handle input change and update search query
  const handleInputChange = (e) => {
    handleSearchChange(e.target.value); // Update context state
  };

  // Handle suggestion click and update search query
  const handleSuggestionClick = (suggestion) => {
    handleSearchChange(suggestion); // Update context state
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div className="search-section">
      <input
        type="text"
        placeholder="Search for products..."
        value={searchQuery}
        onChange={handleInputChange}
        className="search-input"
      />
      {searchQuery && suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion-item"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {searchQuery && searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((result, index) => (
            <div key={index} className="search-result-item">
              {result.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
