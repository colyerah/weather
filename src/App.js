
import React, { useState, useEffect } from "react";
import Default from "./images/Default SB.png";
import Background from "./images/wallpaper.jpg";
import Rain from "./images/Rain SB.png";
import UV from "./images/UV SB.png";
import Snow from "./images/Snow SB.png";
import Wind from "./images/Wind SB.png";
import Frame from "./images/frame.png";
import Hot from "./images/Hot SB.png";
import Cold from "./images/Cold SB.png";

function App() {
  const [temp, setTemp] = useState(0);
  const [location, setLocation] = useState("Charlottesville");
  const [tmessage, setTmessage] = useState("");
  const [input, setInput] = useState("");
  const [rain, setRain] = useState(0);
  const [uv, setUv] = useState(0);
  const [wind, setWind] = useState(0);
  const [snow, setSnow] = useState ("");
  const [text, setText] = useState("");
  const [wmessage, setWmessage] = useState("");
  const [window, setWindow] = useState(Default);

  useEffect(() => {
    fetch("https://api.weatherapi.com/v1/current.json?key=812e865705374610804222718202810&q=" + location)
      .then((res) => res.json())
      .then(yeet => {
        console.log(yeet.current.temp_f);
        console.log(yeet.current.precip_in);
        console.log(yeet.current.wind_mph);
        console.log(yeet.current.uv);
        console.log(yeet.current.condition.text);
        setTemp(yeet.current.temp_f);
        setRain(yeet.current.precip_in);
        setWind(yeet.current.wind_mph);
        setUv(yeet.current.uv);
        setText(yeet.current.condition.text);

     if (temp > 70) {
      setTmessage("It's hot out today.");
      setWindow(Hot);
      }
     if (temp < 70 && temp > 60) {
      setTmessage("It's nicely mild today.");
      }
     if (temp < 60) {
      setTmessage("It's cold out today.");
      setWindow(Cold);
     }
     
     if (text.includes("snow")) {
       setSnow(text);
       setWindow(Snow);
       setWmessage("And there is " + snow + " today!");
     }

     if (wind > 25) {
       //display wind window
       setWindow(Wind);
       setWmessage("And it's windy! " + wind + " mph")
     }

     if (rain > 0.10) {
       //display rain window
       setWindow(Rain);
       setWmessage("And it's rainy! " + rain + " inches of it.");
     }

     if (uv > 6) {
       //display uv window
       setWindow(UV);
       setWmessage("And UV is high! " + uv + " UV index.")
     }

     if (uv < 6 && rain < 0.10 && wind < 25) {
       //display default window
       if (temp > 55 && temp < 75) {
         setWindow(Default);
       setWmessage("");
       }  
     }

      })
    }, [temp, location, rain, uv, wind, snow, text, wmessage]);

    const locationSet = () => {
      setLocation(input);
    }; 

  return (
    <div style={{textAlign: "center", 
    backgroundImage: `url(${Background})`,
    minHeight: '100vh',
    minWidth: '100vw',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    color: 'white',
    fontFamily: 'Arial Black',
    padding: '10px'}}>
      <img alt="window" src={window} width="350vw" height="275vh" paddingBottom='0px'></img>
      <div style={{backgroundImage: `url(${Frame})`, 
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      textAlign: 'center',
      padding: '12vmax',
      paddingTop: '6vmax',
      paddingBottom: '10vmax',
      fontSize: '1.8vmin',
      width: '78vw',
      height: '18vh'}}>
        <h1 style={{lineHeight: '75%'}} >Where are you?</h1>
        <input style={{width: '10.5vw', height: '1.7vh'}} type="text" onChange={(e) => setInput(e.target.value)} />
        <button style={{backgroundColor: '#E0C885', 
                        color: 'black', 
                        fontFamily: 'Arial Black', 
                        borderRadius: '7px',
                        fontSize: '115%'}} 
                onClick={locationSet}>See Weather</button>
        <h2>It's {temp}°F in {location}.</h2>
        <h2 style={{lineHeight: '85%'}}>{tmessage}</h2>
        <h2>{wmessage}</h2>
      </div>
    </div>
  );
}

//api key: 
//for fetch: http://api.weatherapi.com/v1/current.json?key=812e865705374610804222718202810&q=London

export default App;
