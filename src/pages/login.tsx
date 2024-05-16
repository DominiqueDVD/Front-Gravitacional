import React, { useEffect, useState } from 'react'
import Carousel from '../components/login/carouselInformativo';
import Inicio from '../components/login/Inicio.tsx';
import Fondo from "../assets/fondoCarousel.jpg";

import '../styles/login.css'

function Login (){


    return(

        <div className="componenteLogin">

            <div className='componenteInputs'>

                    <Inicio></Inicio>

            </div>
            <div className='componenteCarousel' style={{backgroundImage: `url("${Fondo}")`}}>


                    <Carousel></Carousel>

            </div>
            
        </div>


    )

}
export default Login