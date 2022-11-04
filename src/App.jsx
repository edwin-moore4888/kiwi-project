
import logo from "./logo.svg";
import "./App.scss";
import { useEffect, useState } from "react";
import Select from "./Select";
import Search from "./Search";
import { DateTime } from "luxon";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const [flights, setFlights] = useState([]);

  const [departure, setDeparture] = useState("PRG");

  const [arrival, setArrival] = useState("MAD");

  const [offset, setOffset] = useState(5);

  let [isLoading, setIsLoading] = useState(true)


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
  
  const loadFlights= async () => {
    setIsLoading(true);
    console.log(isLoading);
    const response = await fetch(`https://api.skypicker.com/flights?fly_from=${departure}&fly_to=${arrival}&partner=data4youcbp202106&limit=5&offset=${offset}`);
    const data = await response.json();
    console.log(data);
    setFlights(data.data);
    setIsLoading(false);
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
  }, [departure, arrival, offset]);

  // let isLoading = true;
  // if (flights) {
  //   isLoading = false;
  // }

  return (


      <div className="App">
        <h1 className='App__header'>Let the journey begin</h1>
        <Search
          setFlights={setFlights}
          searchResults={searchResults}
        />
        <Select
            label="Departure City"
            name="flight_id"
            onChange={ departureCity }
            value={departure}
            options={ departureCities }
            emptyOption="Choose Departure City"
        /> <br />
              <Select
            label="Arrival City"
            name="flight_id"
            onChange={ arrivalCity }
            value={ arrival }
            options={ arrivalCities }
            emptyOption="Choose Arrival City"
        />
        <h1>Flight Info</h1>

  
        {isLoading ? <p>Searching Flights</p> : flights.length === 0 ? <p>No connections found</p> :
          flights.map(flight => {
            return (

            <div key={flight.id}>
              <span>Depart From: {flight.cityFrom}</span><br />
              <span>Arrive To: {flight.cityTo}</span><br />
              <span>Departure Time: {DateTime.fromMillis(flight.dTime * 1000).toFormat('hh:mm')}</span><br />
              <span>Arrival Time: {DateTime.fromMillis(flight.aTime * 1000).toFormat('hh:mm')}</span><br />
              <span>Duration: {flight.fly_duration}</span><br />
              <span>Airline: {flight.airlines}</span><br />
              <span>Seats Remaing: {flight.availability.seats}</span><br />
              <span>Price in Eur: {flight.price}</span><br /><br /> <hr />
            
            
            </div>

          )})
  
            }
        <div className="pagination">
            <button onClick={ previousResults }>Previous</button>
            <button onClick={ nextResults }>Next</button> <br />
        </div>

        </div>
)


}

export default App;
