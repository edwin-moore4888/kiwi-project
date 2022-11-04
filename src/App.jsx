import logo from "./logo.svg";
import "./App.css";
import Search from "./Search";
import { useState, useEffect } from "react";

function App() {
  const [searchResults, setSearchResults] = useState([]);
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
