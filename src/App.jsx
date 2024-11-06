import { useState } from "react"



export const App = () => {

const [ciudad, setCiudad] = useState('')
const [dataClima, setDataClima] = useState(null)
const urlBase='https://api.openweathermap.org/data/2.5/weather'
const API_KEY='620a3b587a6e8793b99a63abf3ffb818'
const difKelvin = 273.15

  const fetchClima=async()=>{
    try {
      const response = await fetch(`${urlBase}?q=${ciudad}&appid=${API_KEY}`)
      const data = await response.json()
      setDataClima(data)
    }catch(error){
      console.error('Ocurrió el siguiente problema: ', error)
      
    }
  }

   const handleCuidadCambio =(e)=>{
    setCiudad(e.target.value)

    }

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(ciudad.length > 0) fetchClima()

  }

    

  return (
    <div className="container">
      <h1>Aplicacion de Clima</h1>


      <form action="" onSubmit={handleSubmit}>
        <input 
        type="text" 
        value={ciudad}
        onChange={handleCuidadCambio}/>

       <button type="submit" >Buscar</button>

      </form>
      {

      dataClima && (
        <div>
          <h1>{dataClima.name}</h1>
          
          <h2>{parseInt(dataClima?.main?.temp-difKelvin)}</h2>
          
          <p>Condición meteorológica: {dataClima.weather[0].description}</p>
          <img src={`https://openweathermap.org/img/wn/${dataClima.weather[0].icon}@2x.png`}/>
          
        </div>
      
      )

     
      
      }

    </div>
  )
}

