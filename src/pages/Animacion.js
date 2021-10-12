import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";

const redirect = () =>{
    window.location.replace("http://localhost:3000/Buscador");
}
function Animacion() {


    return (
        <div className="containerAnimacion">
                <img src="https://tejados-cofam.es/wp-content/uploads/2021/02/Logo-TEJADOS-COFAM-MADRID.png" className="imgAnimacion" onClick={redirect}/>
        </div>
    )
}

export default Animacion
