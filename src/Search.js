import { useState, useEffect } from "react";

export default function Search({ setSearchResults, searchResults }) {
  const [searchQuery, setSearchQuery] = useState("");

  let code_array = [];

  const searchFlights = async () => {
    const response = await fetch(
      `https://api.skypicker.com/locations?term=${searchQuery}&locale=en-US&location_types=airport&limit=10&active_only=true&sort=name`
    );
    const data = await response.json();

    setSearchResults(data.locations);
    console.log(data.locations);
  };

  //   useEffect(() => {
  //     searchFlights();
  //   }, [searchQuery]);

  return (
    <>
      <div className="search-bar">
        <input
          id="search-input"
          name="search"
          type="text"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
        />
        <button onClick={searchFlights}>Search</button>
      </div>
      <div className="search-result">
        {searchResults
          ? searchResults.map((searchResult) => {
              code_array.push(searchResult.id);
              //   return code_array;
            })
          : ""}
      </div>
    </>
  );
}
