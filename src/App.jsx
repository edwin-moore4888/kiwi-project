import logo from "./logo.svg";
import "./App.scss";
import { useEffect, useState } from "react";
import Select from "./Select";
import Search from "./Search";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const [checkbox, setCheckbox] = useState(false);

  const [flights, setFlights] = useState([]);

  const [departure, setDeparture] = useState("PRG");

  const [arrival, setArrival] = useState("MAD");

  const [offset, setOffset] = useState(5);

  const departureCities = [
    { id: "PRG", name: "Prague" },
    { id: "BER", name: "Berlin" },
    { id: "WAW", name: "Warsaw" },
    { id: "PED", name: "Pardubice" },
  ];
  const arrivalCities = [
    { id: "VLC", name: "Valencia" },
    { id: "BCN", name: "Barcelona" },
    { id: "MAD", name: "Madrid" },
    { id: "MXP", name: "Milano" },
    { id: "ATH", name: "Athens" },
    { id: "PRG", name: "Prague" },
  ];

  let stopOver = "";
  if (checkbox) {
    stopOver = "&max_stopovers=0";
  }

  const loadFlights = async () => {
    const response = await fetch(
      `https://api.skypicker.com/flights?fly_from=${departure}&fly_to=${arrival}&partner=data4youcbp202106&limit=${offset}&${stopOver}`
    );
    const data = await response.json();

    setFlights(data.data);
    console.log(data.data);
  };

  const departureCity = (event) => {
    setDeparture(event.target.value);
  };

  const arrivalCity = (event) => {
    setArrival(event.target.value);
  };

  const previousResults = () => {
    setOffset(offset - 5);
  };

  const nextResults = () => {
    setOffset(offset + 5);
  };

  useEffect(() => {
    loadFlights();
  }, [departure, arrival, offset, checkbox]);

  let isLoading = true;
  if (flights) {
    isLoading = false;
  }

  // const changeCheckbox = () => {
  //   checkbox ? setCheckbox("false") : setCheckbox("true");
  // };

  return (
    <div className="App">
      <h1 className="App__header">Let the journey begin</h1>
      <Search setFlights={setFlights} searchResults={searchResults} />
      <Select
        label="Departure City"
        name="flight_id"
        onChange={departureCity}
        value={departure}
        options={departureCities}
        emptyOption="Choose Departure City"
      />{" "}
      <br />
      <Select
        label="Arrival City"
        name="flight_id"
        onChange={arrivalCity}
        value={arrival}
        options={arrivalCities}
        emptyOption="Choose Arrival City"
      />
      Direct flights only:
      <input
        id="checkbox"
        name="checkbox"
        type="checkbox"
        checked={checkbox}
        onChange={(event) => {
          setCheckbox(event.target.checked);
        }}
      />
      <h1>Flight Info</h1>
      {flights.map((flight) => {
        return (
          <div key={flight.id}>
            <span>Depart From: {flight.cityFrom}</span>
            <br />
            <span>Arrive To: {flight.cityTo}</span>
            <br />
            <span>Departure Time: {flight.dTime}</span>
            <br />
            <span>Arrival Time: {flight.aTime}</span>
            <br />
            <span>Price in Eur: {flight.price}</span>
            <br />
            <br /> <hr />
          </div>
        );
      })}
      <div className="pagination">
        <button onClick={previousResults}>Previous</button>
        <button onClick={nextResults}>Next</button> <br />
      </div>
    </div>
  );
}

export default App;
