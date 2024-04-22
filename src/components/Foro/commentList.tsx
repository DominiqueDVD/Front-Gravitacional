import React from 'react';
import { Typography } from '@mui/material';
import '../../styles/foro.css';
const CommentList = ({ comentarios }: { comentarios: { contenido: string; fechaComentario: string }[] }) => {
  return (
    <div className="comment-list">
      <Typography variant="h6">Comentarios:</Typography>
      <ul>
        {comentarios.map((comentario, index) => (
          <li key={index}>
            {comentario.contenido} - Publicado el {formatFecha(comentario.fechaComentario)}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Función para formatear la fecha
const formatFecha = (fecha: string) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const fechaFormateada = new Date(fecha).toLocaleDateString(undefined, options);
  return fechaFormateada;
};

export default CommentList;
