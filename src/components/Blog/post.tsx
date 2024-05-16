import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Modal, TextField, Button } from '@mui/material';

const Post: React.FC<{ post: any, onDelete: (postId: string) => void, onUpdate: (postId: string, updatedData: any) => void }> = ({ post, onDelete, onUpdate }) => {
  const [openModal, setOpenModal] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(post.title);
  const [updatedContent, setUpdatedContent] = useState(post.content);

  const handlePostClick = () => {
    setOpenModal(true);
  };

  const handleUpdatePost = () => {
    onUpdate(post._id, {
      title: updatedTitle,
      content: updatedContent,
      image: post.image
    });
    setOpenModal(false);
  };

  const handleDeletePost = () => {
    onDelete(post._id);
  };

  return (
    <div>
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
          <br />
          <Typography variant="body2" color="text.secondary">
            {post.content.split(' ').slice(0, 30).join(' ')}...
          </Typography>
          <br />
          <Button onClick={handlePostClick} variant="contained" color="primary">Editar</Button>
          <Button onClick={handleDeletePost} variant="contained" color="primary">Eliminar</Button>
        </CardContent>
      </Card>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '8px', width: '400px' }}>
          <Typography variant="h5" component="div" gutterBottom>
            Actualizar Post
          </Typography>
          <TextField
            label="Título"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Contenido"
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="normal"
          />
          <Button variant="contained" onClick={handleUpdatePost}>Actualizar</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Post;
