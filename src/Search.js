import { useState, useEffect } from "react";

export default function Search({ setSearchResults, searchResults }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [flights, setFlights] = useState([]);
  const [offset, setOffset] = useState(10);

  const searchFlights = async () => {
    let code_array = [];

    const response = await fetch(
      `https://api.skypicker.com/locations?term=${searchQuery}&locale=en-US&location_types=airport&limit=10&active_only=true&sort=name`
    );
    const data = await response.json();

    setSearchResults(data.locations);
    // console.log(data.locations);

    if (data.locations) {
      data.locations.map((searchResult) => {
        code_array.push(searchResult.id);
      });
    }

    const fly_from = code_array.join(",");
    console.log(fly_from);

    if (fly_from) {
      const results = await fetch(
        `https://api.skypicker.com/flights?fly_from=airport:${fly_from}&limit=${offset}&partner=data4youcbp202106`
      );
      const flights = await results.json();

      setFlights(flights.data);
    }
  };

  const changeOffset = () => {
    setOffset(offset + 10);
  };

  useEffect(() => {
    searchFlights();
  }, [offset]);

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
        {flights
          ? flights.map((flight) => {
              return (
                <ul>
                  <li>Depart From: {flight.cityFrom}</li>
                  <li>Arrive To: {flight.cityTo}</li>
                  <li>Departure Time: {flight.dTime}</li>
                  <li>Arrival Time: {flight.aTime}</li>
                  <li>Price in Eur: {flight.price}</li>
                </ul>
              );
            })
          : ""}
        <button onClick={changeOffset}>Load More</button>
      </div>
    </>
  );
}
