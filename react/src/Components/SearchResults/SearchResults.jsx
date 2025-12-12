import React from "react";
import { useLocation } from "react-router-dom";
import Fuse from "fuse.js";
import ProductList from "../ProductList/ProductList";
import Cards from "../Cards/Cards";
import Heading from "../Heading/Heading";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  const fuse = new Fuse(ProductList, {
    keys: ["name"],
    includeMatches: true,
    threshold: 0.5,
    minMatchCharLength: 2,
  });

  const fuseResults = query ? fuse.search(query) : [];
  const filteredProducts = fuseResults.map((result) => ({
    ...result.item,
    matches: result.matches,
  }));

  const highlightMatch = (name, matches) => {
    if (!matches || matches.length === 0) return name;

    let result = "";
    let lastIndex = 0;

    matches.forEach((match) => {
      match.indices.forEach(([start, end]) => {
        result += name.slice(lastIndex, start);
        result += `<span class="bg-red-300 text-black px-1 rounded">${name.slice(
          start,
          end + 1
        )}</span>`;
        lastIndex = end + 1;
      });
    });

    result += name.slice(lastIndex);
    return result;
  };

  return (
    <section>
      <div className="max-w-[1400px] mx-auto px-10 py-20">
        <Heading highlight="Search" heading={`Results for "${query}"`} />

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-9 mt-10">
            {filteredProducts.map((product) => (
              <Cards
                key={product.id}
                image={product.image}
                price={product.price}
                name={
                  <span
                    dangerouslySetInnerHTML={{
                      __html: highlightMatch(product.name, product.matches),
                    }}
                  />
                }
              />
            ))}
          </div>
        ) : (
          <p className="text-center mt-10 text-xl">No products found.</p>
        )}
      </div>
    </section>
  );
};

export default SearchResults;
