import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../components/Blog/post.tsx';
import PostModal from '../components/Blog/postModal.tsx';
import { API_URL } from "../auth/constants.ts";
import { Grid, Button, } from '@mui/material'; 
import SliderComponent from '../components/Blog/slider.tsx';
import '../styles/blog.css';
import { Link } from 'react-router-dom';
import img3 from '../assets/dashboard/undraw_profile_3.svg'

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/blog`)
      .then((response) => setPosts(response.data.reverse())) // Invierte el orden de los posts
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  // Transforma los posts en slides
  const slides = posts.map(post => ({
    id: post.id, // Asegúrate de tener un identificador único para cada slide
    image: post.image // Asegúrate de que 'image' sea la URL de la imagen del post
  }));

  return (
      <div className='blog-container'>
          <div className="slider-container">
            <SliderComponent slides={slides} />
            <div className="button-container">
             {!openModal && (
                <PostModal open={openModal} onClose={() => setOpenModal(false)} />
               )}
              <a className="dropdown-item d-flex align-items-center" href="/dashboard">
                                <div className="dropdown-list-image mr-3">
                                    <img className="rounded-circle2" src={img3}
                                        alt="..." />
                                    
                                </div>
                               
                            </a>
             </div>
           </div>
          <div className="feed-container">
            
           <Grid container spacing={2} justifyContent="center">
              {posts.map((post, index) => (
              <Grid key={post.id} item xs={12} sm={6} md={6} lg={6}>
               <Post post={post} />
              </Grid>
            ))}
            </Grid>
          </div>
    </div>
  );
};

export default Feed;
