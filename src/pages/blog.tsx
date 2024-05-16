import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from '../components/Blog/post';
import PostModal from '../components/Blog/postModal';
import { API_URL } from "../auth/constants";
import { Grid } from '@mui/material'; 
import SliderComponent from '../components/Blog/slider';
import '../styles/blog.css';
import img3 from '../assets/dashboard/undraw_profile_3.svg';

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios.get(`${API_URL}/blog`)
      .then((response) => setPosts(response.data.reverse())) // Invierte el orden de los posts
      .catch((error) => console.error('Error fetching posts:', error));
  };

  const handleDeletePost = (postId: string) => {
    axios.delete(`${API_URL}/blog/${postId}`)
      .then(() => {
        fetchPosts(); // Actualiza la lista de posts después de eliminar uno
      })
      .catch((error) => console.error('Error deleting post:', error));
  };

  const handleUpdatePost = (postId: string, updatedData: any) => {
    axios.put(`${API_URL}/blog/${postId}`, updatedData)
      .then(() => {
        fetchPosts(); // Actualiza la lista de posts después de actualizar uno
      })
      .catch((error) => console.error('Error updating post:', error));
  };

  // Transforma los posts en slides
  const slides = posts.map(post => ({
    id: post._id, // Asegúrate de tener un identificador único para cada slide
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
              <img className="rounded-circle2" src={img3} alt="..." />
            </div>
          </a>
        </div>
      </div>
      <div className="feed-container">
        <Grid container spacing={2} justifyContent="center">
          {posts.map((post, index) => (
            <Grid key={post._id} item xs={12} sm={6} md={6} lg={6}>
              <Post post={post} onDelete={handleDeletePost} onUpdate={handleUpdatePost} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default Feed;

