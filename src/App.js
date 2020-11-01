
import React, { useState, useEffect } from "react";

function App() {
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("Charlottesville");
  const [clothes, setClothes] = useState("");
  const [input, setInput] = useState("")
  
  useEffect(() => {
    fetch("http://api.weatherapi.com/v1/current.json?key=812e865705374610804222718202810&q=" + location)
      .then((res) => res.json())
      .then(yeet => {
        console.log(yeet.current.temp_f);
        setTemp(yeet.current.temp_f)

     if (temp > 70) {
      setClothes("You can wear short sleeves and shorts!")
      }
     if (temp < 70 && temp > 60) {
      setClothes("Maybe throw on a light layer.")
      }
     if (temp < 60) {
      setClothes("Bundle up!")
     }
     
      })
    }, [temp, location]);

    const locationSet = () => {
      setLocation(input);
    }; 

  return (
    <div style={{textAlign: "center"}}>
      <h1>Where are you located?</h1>
      <input type="text" onChange={(e) => setInput(e.target.value)} />
      <button style={{backgroundColor: '#1D365F', color: '#FFFFFF'}} onClick={locationSet}>How should I dress?</button>
      <h2>It's {temp} degrees Fahrenheit right now in {location}.</h2>
      <h2>{clothes}</h2>
    </div>
  );
}

//api key: 
//for fetch: http://api.weatherapi.com/v1/current.json?key=812e865705374610804222718202810&q=London

export default App;
