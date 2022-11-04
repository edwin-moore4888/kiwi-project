import logo from "./logo.svg";
import "./App.css";
import Search from "./Search";
import { useState, useEffect } from "react";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const loadData = async () => {
    const response = await fetch(
      "https://api.skypicker.com/flights?fly_from=PRG&fly_to=VLC&partner=data4youcbp202106"
    );
    const data = await response.json();
  };
  loadData();

  return (
    <div className="App">
      <Search
        setSearchResults={setSearchResults}
        searchResults={searchResults}
      />
    </div>
  );
}

export default App;
