import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material'; // Importamos componentes de Material-UI
import axios from 'axios';
import { API_URL } from "../../auth/constants.ts";
import '../../styles/blog.css'
const PostModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handlePost = async () => {
    try {
        const response = await axios.post(`${API_URL}/blog`, { title, content, image });

        console.log('Post creado con éxito:', response.data);
        handleClose();
    } catch (error) {
        console.error('Error al crear el post:', error);
    }
};

  return (
    <div>
      <Button onClick={() => setOpen(true)}>+</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Crear nueva publicación</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Título"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Contenido"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Imagen URL"
            type="text"
            fullWidth
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Calcelar</Button>
          <Button onClick={handlePost}>Publicar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PostModal;
