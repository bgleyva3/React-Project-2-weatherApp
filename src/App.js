import './App.css';
import {useState, useEffect} from "react"


function App() {
  const [inputOnChange, setInputOnChange] = useState("inputKeeper")
  const [cityInput, setCityInput] = useState(null)
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [temp, setTemp] = useState("")
  const [weather, setWeather] = useState("")
  const [icon, setIcon] = useState("")
  const [units, setUnits] = useState("")
  const [loading, setLoading] = useState(false)
  const [letInputRender, setLetInputRender] = useState(null)

  useEffect(()=>{
    if(cityInput !== null){
      console.log("Calling data")
      console.log("---------------------")
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=metric&appid=e6e87dada02bba6c6a163fe04f869432`)
      .then(response => response.json())
      .then(data => {
        setCity(data["name"])
        setCountry(data["sys"]["country"])
        setTemp(data["main"]["temp"])
        setUnits("°C")
        setWeather(data["weather"][0]["description"])
        setIcon(<img src={`https://openweathermap.org/img/wn/${data["weather"][0]["icon"]}@2x.png`}></img>)
        setLoading(false)
      })
      .catch(err => alert(err))
  }}, [cityInput])

  const submitFunc = (elem) => {
    elem.preventDefault();
    setLoading(true)
    setCityInput(null)
    setLetInputRender(Math.random())    
  }

  useEffect(()=>{
    if(letInputRender !== null){
        setCityInput(inputOnChange)
        setCity("")
        setCountry("")
        setTemp("")
        setUnits("")
        setWeather("")
        setIcon("")
    console.log(cityInput)
    }
  },[letInputRender])


  //-------------current Location----------

  const currentLocation = () => {
    setLoading(true)
    setCityInput(null)
        setCity("")
        setCountry("")
        setTemp("")
        setUnits("")
        setWeather("")
        setIcon("")
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
//---------------------------------------------

    const converter = () => {
      if(units === "°C"){
        const CtoF = (temp * (9/5)) + 32
        setTemp(CtoF.toFixed(1))
        setUnits("°F")
      } else {
        const FtoC = (temp - 32) * 5/9
        setTemp(FtoC.toFixed(1))
        setUnits("°C")
      }
      console.log(temp + units)
    }

  return (
    <div className="App">
      <form onSubmit={submitFunc}>
        <input placeholder="Enter City" onChange={(elem)=>setInputOnChange(elem.target.value)}></input>
        <input type="submit"></input>
        <br/>
      </form>
      <button onClick={currentLocation}>Current City</button>
      {
        loading ?
          <h1>LOADING</h1>
          : <div></div>
      }
      <h1>{city}</h1>
      <h1>{country}</h1>
      <h1>{temp}{units}</h1><button onClick={converter}>°C ⟷ °F</button>
      <h1>{weather}</h1>
      <div>{icon}</div>
    </div>
  );
}

export default App;
