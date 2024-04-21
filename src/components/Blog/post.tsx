import React from 'react';
import '../../styles/blog.css'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'; // Importamos componentes de Material-UI

const Post: React.FC<{ post: any }> = ({ post }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={post.image}
        alt="Post Image"
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
