import logo from './logo.svg';
import './App.css';

function App() {

  const loadData= async () => {
    const response = await fetch('https://api.skypicker.com/flights?fly_from=PRG&fly_to=VLC&partner=data4youcbp202106');
    const data = await response.json();
    console.log(data);
  }
  loadData();
  return (
    <div className="App">
      <h1>Helllo</h1>
    </div>
  );
}

export default App;
