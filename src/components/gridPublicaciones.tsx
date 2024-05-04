import React from 'react';
import { Grid } from '@mui/material';
import Post from '../components/Blog/post2'; 

const GridDePublicaciones = ({ posts }) => {
  return (
    <Grid container spacing={2} justifyContent="center">
      {posts.map((post, index) => (
        <Grid key={post.id} item xs={12} sm={6} md={4} lg={3}> {/* Cambia md={6} a md={4} y lg={6} a lg={3} */}
          <Post post={post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default GridDePublicaciones;
