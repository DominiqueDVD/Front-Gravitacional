import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const Post: React.FC<{ post: any }> = ({ post }) => {
  const handlePostClick = () => {
    const params = new URLSearchParams({
      title: post.title,
      content: post.content,
      image: post.image
    });
    const url = `/PostDetails?${params.toString()}`;
    window.open(url, '_blank');
  };

  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', options);
  };

  return (
    <Card onClick={handlePostClick}>
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
        <br />
        <Typography variant="body2" color="text.secondary">
          {post.content.split(' ').slice(0, 30).join(' ')}... {/* Limita el contenido a 30 palabras */}
        </Typography>
        <br />
        <Typography variant="body2" color="text.secondary">
          Publicado el {formatDate(post.date)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
