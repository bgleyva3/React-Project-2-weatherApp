import './App.css';
import {useState, useEffect} from "react"


function App() {
  const [inputKeeper, setInputKeeper] = useState("inputKeeper")
  const [cityInput, setCityInput] = useState(null)
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [temp, setTemp] = useState("")
  const [weather, setWeather] = useState("")
  const [icon, setIcon] = useState("")

  useEffect(()=>{
    if(cityInput !== null){
      console.log("Calling data")
      console.log("---------------------")
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=e6e87dada02bba6c6a163fe04f869432`)
      .then(response => response.json())
      .then(data => {
        setCity(data["name"])
        setCountry(data["sys"]["country"])
        setTemp(data["main"]["temp"]+"°C")
        setWeather(data["weather"][0]["description"])
        setIcon(<img src={`http://openweathermap.org/img/wn/${data["weather"][0]["icon"]}@2x.png`}></img>)
        
      })
      .catch(err => alert(err))

      //.catch(err => alert(err))
  }}, [cityInput])

  const submitFunc = (elem) => {
    elem.preventDefault();
    setCityInput(inputKeeper)
    console.log(cityInput)
  }


  //-------------current Location----------

  const currentLocation = () => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
  }

    const successCallback = (position) => {
      console.log(position)
      const {latitude, longitude} = position.coords
      console.log(latitude, longitude)
      fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=1fa3200a72be4c8c8d0f6849981d3882`)
        .then(response => response.json())
        .then(data => {
          const stringAddress = data.results[0].formatted;
          const emptyAddress = stringAddress.replace(/\d+/g, '') 
          const arrayAddress = emptyAddress.split(",")
          arrayAddress.splice(0,1)
          arrayAddress.splice(0,1)
          let currentAddress = arrayAddress.join()
          currentAddress = currentAddress.trim()
          setCityInput(currentAddress)
          console.log(cityInput)
          console.log(currentAddress)
        })
    }

    const errorCallback = (err) => {
      alert(err.message)
    }

  return (
    <div className="App">
      <form onSubmit={submitFunc}>
        <input placeholder="Enter City" onChange={(elem)=>setInputKeeper(elem.target.value)}></input>
        <input type="submit"></input>
        <br/>
      </form>
      <button onClick={currentLocation}>Current City</button>
      <h1>{city}</h1>
      <h1>{country}</h1>
      <h1>{temp}</h1>
      <h1>{weather}</h1>
      <div>{icon}</div>
    </div>
  );
}

export default App;
