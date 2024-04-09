import React, { useEffect, useState } from 'react'
import Carousel from '../components/login/carouselInformativo'
import fondo from '../assets/fondoCarousel.jpg'
import '../styles/login.css'
import Registro from '../components/login/registro.tsx'

function CrearCuenta(){


    return(

        <div className="componenteLogin">

            <div className='componenteInputs'>

                    <Registro></Registro>

            </div>
            <div className='componenteCarousel' style={{backgroundImage: `url("${fondo}")`}}>


                    <Carousel></Carousel>

            </div>
            
        </div>


    )

}
export default CrearCuenta