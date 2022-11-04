
import logo from './logo.svg';
import './App.scss';
import { useEffect, useState } from 'react';
import Select from './Select';
import Search from "./Search";



function App() {

  const [searchResults, setSearchResults] = useState([]);
  
  const [flights, setFlights] = useState([]);

  const [departure, setDeparture] = useState('PRG');

  const [arrival, setArrival] = useState('MAD');

  const [offset, setOffset] = useState(5);

  const departureCities = [{id: 'PRG', name: 'Prague'}, {id: 'BER', name: 'Berlin'}, {id: 'WAW', name: 'Warsaw'}, {id: 'PED', name: 'Pardubice'}];
  const arrivalCities = [{id: 'VLC', name: 'Valencia'}, {id: 'BCN', name: 'Barcelona'}, {id: 'MAD', name: 'Madrid'}, {id: 'MXP', name: 'Milano'}, {id: 'ATH', name: 'Athens'}, {id: 'PRG', name: 'Prague'}];


  const loadFlights= async () => {
    const response = await fetch(`https://api.skypicker.com/flights?fly_from=${departure}&fly_to=${arrival}&partner=data4youcbp202106&limit=${offset}`);
    const data = await response.json();
    console.log(data);
    setFlights(data.data);
  }


  const departureCity= (event) => {
    setDeparture(
     event.target.value
    )
  }

const arrivalCity= (event) => {
    setArrival(
    event.target.value
    )
  }

  const previousResults = () => {
    setOffset(offset - 5);
}

const nextResults = () => {
    setOffset(offset + 5);
}


  useEffect(() => {
      loadFlights()
  }, [departure, arrival, offset])

  let isLoading = true;
  if (flights) {
    isLoading = false;
  }


  return (


      <div className="App">
        <h1 className='App__header'>Let the journey begin</h1>
        <Search
          setSearchResults={setSearchResults}
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
  
  
        {
          flights.map(flight => {
            return (
           <div className='result'>
              <div key={flight.id}>
                <span><span style={{fontWeight: "bold"}}>Depart From:</span> {flight.cityFrom}</span><br />
                <span><span  style={{fontWeight: "bold"}}>Arrive To:</span> {flight.cityTo}</span><br />
                <span><span  style={{fontWeight: "bold"}}>Departure Time:</span> {flight.dTime}</span><br />
                <span><span  style={{fontWeight: "bold"}}>Arrival Time:</span> {flight.aTime}</span><br />
                <span><span  style={{fontWeight: "bold"}}>Price in Eur:</span> {flight.price}</span><br /><br /> <hr />
              
              
              </div>
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
