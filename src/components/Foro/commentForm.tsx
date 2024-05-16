import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import '../../styles/foro.css';

const CommentForm = ({ onSubmit }) => {
  const [comentario, setComentario] = useState('');

  const handleSubmit = () => {
    onSubmit(comentario);
    setComentario('');
  };

  return (
    <div className="comment-form">
      <TextField
        fullWidth
        label="Deja tu comentario..."
        variant="outlined"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit}>Enviar</Button>
    </div>
  );
};

export default CommentForm;
