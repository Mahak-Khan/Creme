import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductList from '../ProductList/ProductList';
import Cards from '../Cards/Cards';
import Heading from '../Heading/Heading';

// ---------------- Fuzzy Match & Highlight ----------------
const getMatchedIndexes = (name, query) => {
  const nameLower = name.toLowerCase();
  const queryLower = query.toLowerCase();
  const minMatchLength = 2;
  const matched = Array(name.length).fill(false);

  for (let len = Math.min(nameLower.length, queryLower.length); len >= minMatchLength; len--) {
    for (let i = 0; i <= nameLower.length - len; i++) {
      const nameSub = nameLower.substr(i, len);
      for (let j = 0; j <= queryLower.length - len; j++) {
        const querySub = queryLower.substr(j, len);
        if (nameSub === querySub) {
          for (let k = 0; k < len; k++) matched[i + k] = true;
        }
      }
    }
  }
  return matched;
};

const highlightMatch = (name, query) => {
  const matchedIndexes = getMatchedIndexes(name, query);
  return name.split('').map((char, idx) => (
    <span key={idx} className={matchedIndexes[idx] ? 'text-rose-500' : ''}>
      {char}
    </span>
  ));
};

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query') || '';

  // Fuzzy filter products
  const filteredProducts = ProductList.filter(product =>
    getMatchedIndexes(product.name, query).some(Boolean)
  );

  return (
    <section>
      <div className='max-w-[1400px] mx-auto px-10 py-20'>
        <Heading highlight="Search" heading={`Results for "${query}"`} />

        {filteredProducts.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-4 gap-9 mt-10'>
            {filteredProducts.map(product => (
              <Cards
                key={product.id}
                image={product.image}
                name={highlightMatch(product.name, query)}
                price={product.price}
              />
            ))}
          </div>
        ) : (
          <p className='text-center mt-10 text-xl'>No products found.</p>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
