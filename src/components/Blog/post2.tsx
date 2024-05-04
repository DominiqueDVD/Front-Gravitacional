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


  return (
    <div className='griDash'>
    <Card onClick={handlePostClick}>
      <CardMedia
        component="img"
        height="90"
        image={post.image}
        alt="Post Image"
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {post.title}
        </Typography>
        <br />
      
      </CardContent>
    </Card>
    </div>
  );
};

export default Post;
