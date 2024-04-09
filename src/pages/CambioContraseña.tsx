import React, { useEffect, useState } from 'react'
import Carousel from '../components/login/carouselInformativo'
import fondo from '../assets/fondoCarousel.jpg'
import '../styles/login.css'
import Contraseña from '../components/login/Contraseña.tsx'
function CambioContraseña(){


    return(

        <div className="componenteLogin">

            <div className='componenteInputs'>

                    <Contraseña></Contraseña>

            </div>
            <div className='componenteCarousel' style={{backgroundImage: `url("${fondo}")`}}>


                    <Carousel></Carousel>

            </div>
            
        </div>


    )

}
export default CambioContraseña