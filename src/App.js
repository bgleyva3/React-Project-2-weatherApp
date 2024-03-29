import './App.css';
import {useState, useEffect} from "react"
import Loading from "./Loading"


function App() {
  const [reposition, setReposition] = useState(null)
  const [inputOnChange, setInputOnChange] = useState("inputKeeper")
  const [city, setCity] = useState("")
  const [country, setCountry] = useState("")
  const [temp, setTemp] = useState("")
  const [weather, setWeather] = useState("")
  const [icon, setIcon] = useState(null)
  const [units, setUnits] = useState("")
  const [loading, setLoading] = useState(false)
  const [letInputRender, setLetInputRender] = useState(null)
  const [backgroundColor, setBackgroundColor] = useState(null)
  const [iconCode, setIconCode] = useState(null)
  const [display, setDisplay] = useState("none")
  const [location, setLocation] = useState(0)
  const [url, setUrl] = useState(null)


  useEffect(()=>{
    if(url !== null){
      fetch(`https://api.openweathermap.org/data/2.5/weather?${url}&units=metric&appid=e6e87dada02bba6c6a163fe04f869432`)
      .then(response => response.json())
      .then(data => {
        setCity(data["name"]+" / ")
        setCountry(data["sys"]["country"])
        setTemp(data["main"]["temp"])
        setUnits(" C")
        setWeather(data["weather"][0]["description"])
        setIcon(<img src={`https://openweathermap.org/img/wn/${data["weather"][0]["icon"]}@2x.png`}></img>)
        setLoading(false)
        setIconCode(data["weather"][0]["icon"])
        setDisplay("inline-block")
      })
      .catch(err => alert(err))
  }}, [url])

  const submitFunc = (elem) => {
    elem.preventDefault();
    setLoading(true)
    setUrl(null)
    setLetInputRender(Math.random())
    setDisplay("none")    
    setReposition(true)
  }

  useEffect(()=>{
    if(letInputRender !== null){
        const urlCity = `q=${inputOnChange}`
        setUrl(urlCity)
        setCity("")
        setCountry("")
        setTemp("")
        setUnits("")
        setWeather("")
        setIcon("")
    }
  },[letInputRender])


  //-------------current Location----------

  useEffect(()=>{
    if(location>0){
      setLoading(true)
      setReposition(true)
      setUrl(null)
      setCity("")
      setCountry("")
      setTemp("")
      setUnits("")
      setWeather("")
      setIcon("")
      setDisplay("none")
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
    }
  },[location])
  
      const successCallback = (position) => {
        const {latitude, longitude} = position.coords
        setUrl(`lat=${latitude}&lon=${longitude}`)
      }
  
      const errorCallback = (err) => {
        alert(err.message)
      }
  
//---------------------------------------------

    const converter = () => {
      if(units === " C"){
        const CtoF = (temp * (9/5)) + 32
        setTemp(CtoF.toFixed(2))
        setUnits(" F")
      } else {
        const FtoC = (temp - 32) * 5/9
        setTemp(FtoC.toFixed(2))
        setUnits(" C")
      }
      console.log(temp + units)
    }


    useEffect(()=>{
      if(iconCode !== null){
        const colorRed = ["01d", "02d"]
        const colorBlueLight = ["03d", "04d", "09d", "10d"]
        const colorYellow = ["11d"]
        const colorBlue = ["13d"]
        const colorGray = ["50d"]
        const colorBlueDark = ["01n", "02n", "03n", "04n", "13n"]
        const colorPurple = ["09n", "10n", "11n"]
        const colorGrayDark = ["50n"]
        colorRed.forEach(elem => {
          if(elem === iconCode){
            setBackgroundColor("linear-gradient(rgb(132, 200, 255),rgb(255, 207, 118))")
          }
        })

        colorBlueLight.forEach(elem => {
          if(elem === iconCode){
            setBackgroundColor("linear-gradient(rgb(67, 133, 233),rgb(237, 238, 153))")
          }
        })

        colorYellow.forEach(elem => {
          if(elem === iconCode){
            setBackgroundColor("linear-gradient(rgb(109, 45, 194),rgb(253, 255, 161))")
          }
        })

        colorBlue.forEach(elem => {
          if(elem === iconCode){
            setBackgroundColor("linear-gradient(rgb(26, 124, 204),rgb(226, 249, 255))")
          }
        })

        colorGray.forEach(elem => {
          if(elem === iconCode){
            setBackgroundColor("linear-gradient(rgb(64, 106, 153), rgb(173, 194, 207))")
          }
        })

        colorBlueDark.forEach(elem => {
          if(elem === iconCode){
            console.log("BlueDark")
            setBackgroundColor("linear-gradient(rgb(23, 29, 90), rgb(79, 146, 235))")
          }
        })

        colorPurple.forEach(elem => {
          if(elem === iconCode){
            setBackgroundColor("linear-gradient(rgb(43, 30, 90),rgb(165, 156, 245))")
          }
        })

        colorGrayDark.forEach(elem => {
          if(elem === iconCode){
            setBackgroundColor("linear-gradient(rgb(105, 111, 194),rgb(42, 45, 65))")
          }
        })


      }
    }, [iconCode])

    useEffect(()=>{
      
      if(backgroundColor !== null){
        document.body.style.backgroundImage = backgroundColor
      }
    },[backgroundColor])
    

  return (
    <div className="App" > 
    {
      reposition === null ? 
        <div className="search-bar-start">
          <h1 id="weather-font-1">Weather App </h1>
          <i class="fas fa-sun fa-sun-1 fa-3x fa-spin slow-spin"></i>
            <br></br>
            <div className="container-style-1">
              <form onSubmit={submitFunc}>
                <input placeholder="Enter City" onChange={(elem)=>setInputOnChange(elem.target.value)}></input>
                <input type="submit" value="Search"></input>
              </form>
              <button id="current-city-1" onClick={()=>setLocation(location+1)}>Locate my City</button>
            </div>
        </div> 
      : 
        <div>
            <div className="search-bar-container">
            <h1 id="weather-font">Weather App</h1>
            <i class="fas fa-sun fa-sun-2 fa-2x"></i>
            <br></br>
            <div className="container-style">
              <form className="form-1" onSubmit={submitFunc}>
                <input placeholder="Enter City" onChange={(elem)=>setInputOnChange(elem.target.value)}></input>
                <input type="submit" value="Search"></input>
              </form>
              <button id="current-city" onClick={()=>setLocation(location+1)}>Locate my City</button>
            </div>
          </div>
          <div className="container-position">
            {
              loading ?
              <Loading></Loading>
                : <div></div>
            }
            <h1 className="city">{city}{country}</h1>
            <h1 className="degrees-style">{temp}<div className="units">{units}</div></h1>
            <div>{icon}</div>
            <h1 className="desc-style">{weather}</h1>
      
            <button className="CFbutton" style={{display: display}} onClick={converter}>°C ⟷ °F</button>
          </div>
        </div>
    }
      
    </div>
  );
}

export default App;
