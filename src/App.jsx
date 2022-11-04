
import logo from "./logo.svg";
import "./App.scss";
import Search from "./Search";
import { useState, useEffect } from "react";


function App() {
  const [searchResults, setSearchResults] = useState([]);

  const loadData = async () => {
    const response = await fetch(
      "https://api.skypicker.com/flights?fly_from=PRG&fly_to=VLC&partner=data4youcbp202106"
    );
    const data = await response.json();
    console.log(data);
  };
  loadData();

  return (
    <div className="App">
      <h1 className='App__header'>Let the journey begin</h1>
      <Search
        setSearchResults={setSearchResults}
        searchResults={searchResults}
      />
    </div>
  );
}

export default App;
