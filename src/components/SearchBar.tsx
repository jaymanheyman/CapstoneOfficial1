import React, { useState } from 'react';

// Define the product type
type Product = {
  id: number;
  title: string;
  // Add other properties as needed
};

type SearchBarProps = {
  onSearch: (filteredProducts: Product[]) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Make an API request to search for products
    try {
      const response = await fetch(`https://fakestoreapi.com/products?title=${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        onSearch(data); // Pass the filtered products back to the parent component
      } else {
        console.error('Error searching for products');
      }
    } catch (error) {
      console.error('Error searching for products:', error);
    }
  };

  return (
    <div className="w-100 p-4 text-black bg-white fd-hover-border-primary border border-1">
      <h5 className='fw-bold'>Search</h5>
      <form onSubmit={handleSearch} className='w-100 d-flex'>
        <div className="w-75">
          <input
            type="text"
            title="searchquery"
            placeholder='Search Here '
            className='p-3 border border-1 rounded-0'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="w-25">
          <button type='submit' className='btn btn-outline-dark rounded-0 py-3 px-4'>
            <i className="bi bi-search"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
