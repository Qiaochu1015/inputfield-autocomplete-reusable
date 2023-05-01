import { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import movies from "./data/movieData"

function App() {
  const [value, setValue] = useState("")
  const handleChange = (e) => {
    setValue(e.target.value)
  }
  return (
    <div className="App">
     <InputField options={movies} value={value} onChange={handleChange} open={true}/>
    </div>
  );
}

export default App;
