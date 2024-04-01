import React, { useEffect, useState } from 'react'
import Carousel from '../components/login/carouselInformativo'
import InicioSesion from '../components/login/inicioSesión'
import fondo from '../assets/fondoCarousel.jpg'
import '../styles/login.css'

function Login (){


    return(

        <div className="componenteLogin">

            <div className='componenteInputs'>

                    <InicioSesion></InicioSesion>

            </div>
            <div className='componenteCarousel' style={{backgroundImage: `url("${fondo}")`}}>


                    <Carousel></Carousel>

            </div>
            
        </div>


    )

}
export default Login