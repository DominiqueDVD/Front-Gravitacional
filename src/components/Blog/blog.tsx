import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './post';
import PostModal from './postModal';
import { Grid } from '@mui/material'; 
import { API_URL } from "../../auth/constants.ts";
import '../../styles/blog.css'

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${API_URL}/blog`)
      .then((response) => setPosts(response.data))
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  return (
    <Grid container spacing={2} justifyContent="center">

      {posts.map((post) => (
        <Grid key={post.id} item xs={12} sm={6} md={4}>
          <Post post={post} />
        </Grid>
      ))}
  
    
    
      <PostModal />
    </Grid>
  );
};

export default Feed;
