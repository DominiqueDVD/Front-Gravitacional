import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import SliderComponent from '../../components/Blog/slider.tsx';
import img3 from '../../assets/dashboard/undraw_profile_3.svg';
import "../../styles/blog.css"

const PostDetails: React.FC = () => {
  // Obtener los parámetros de la URL
  const params = new URLSearchParams(window.location.search);
  const title = params.get('title') ?? ''; // Asigna una cadena vacía si title es null
  const content = params.get('content') ?? ''; // Asigna una cadena vacía si content es null
  const image = params.get('image') ?? ''; // Asigna una cadena vacía si image es null

  // Simular datos de la slide
  const slideData = [{ image: image }];

  return (
    <div className='blog'>
      <div className="slider-container">
        {/* Integra el componente SliderComponent aquí */}
        <SliderComponent slides={slideData} />
      </div>
      <div className="button-container">
        {/* Aquí van los botones y la imagen de perfil */}
        <a className="dropdown-item d-flex align-items-center" href="/dashboard">
                                <div className="dropdown-list-image mr-3">
                                    <img className="rounded-circle2" src={img3}
                                        alt="..." />
                                    
                                </div>
                               
                            </a>
      </div>
      <div className="feed">
        {/* Aquí va el contenido principal del post */}
        <h1>{title}</h1>
        <img src={image} alt="Post Image" />
        <p>{content}</p>
      </div>
    </div>
  );
};

export default PostDetails;
