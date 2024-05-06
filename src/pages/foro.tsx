import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography, Checkbox, FormControlLabel } from '@mui/material'; // Importa Checkbox y FormControlLabel
import { API_URL } from "../auth/constants.ts";
import '../styles/foro.css';

const ForoPage = () => {
  const [aportes, setAportes] = useState([]);
  const [nuevoAporte, setNuevoAporte] = useState('');
  const [esPregunta, setEsPregunta] = useState(false); // Estado para el checkbox
  const [nuevosComentarios, setNuevosComentarios] = useState({});

  useEffect(() => {
    fetchAportes();
  }, []);

  const fetchAportes = async () => {
    try {
      const response = await axios.get(`${API_URL}/foro`);
      setAportes(response.data);
    } catch (error) {
      console.error('Error fetching aportes:', error);
    }
  };

  const handleAporteSubmit = async () => {
    try {
      await axios.post(`${API_URL}/foro`, { contenido: nuevoAporte, tipo: esPregunta ? 'pregunta' : 'comentario' }); // Incluye el tipo en la solicitud
      setNuevoAporte('');
      setEsPregunta(false); // Resetea el estado del checkbox
      fetchAportes();
    } catch (error) {
      console.error('Error submitting aporte:', error);
    }
  };

  const handleComentarioSubmit = async (id, comentario) => {
    try {
      await axios.post(`${API_URL}/foro/${id}/comentarios`, { contenido: comentario });
      fetchAportes();
      setNuevosComentarios({ ...nuevosComentarios, [id]: '' }); // Limpiar el comentario después de enviarlo
    } catch (error) {
      console.error('Error submitting comentario:', error);
    }
  };

  // Función para formatear la fecha
  const formatFecha = (fecha) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const fechaFormateada = new Date(fecha).toLocaleDateString('es-ES', options);
    return fechaFormateada;
  };

  return (
    <div>
    <div className="foro-container">
      <div className="nuevo-aporte">
        <TextField
          fullWidth
          label="Nueva publicación"
          variant="outlined"
          value={nuevoAporte}
          onChange={(e) => setNuevoAporte(e.target.value)}
        />
        <FormControlLabel // Agrega el checkbox
          control={<Checkbox checked={esPregunta} onChange={(e) => setEsPregunta(e.target.checked)} />}
          label="Es una pregunta"
        />
        <Button variant="contained" onClick={handleAporteSubmit}>Enviar publicación</Button>
      </div>
      </div>
      <div className="aportes-container">
        {aportes.map(aporte => (
          <Card key={aporte._id} className="aporte-card">
            <CardContent>
              <Typography variant="body1">{aporte.contenido}</Typography>
              <br />
              <Typography variant="body2" color="textSecondary">{`Publicado el ${formatFecha(aporte.fechaPublicacion)}`}</Typography>
              <div className='comentarios'>
              <TextField
                fullWidth
                label="Comentario"
                variant="outlined"
                value={nuevosComentarios[aporte._id] || ''}
                onChange={(e) => setNuevosComentarios({ ...nuevosComentarios, [aporte._id]: e.target.value })}
              />
              <Button
                variant="contained"
                onClick={() => handleComentarioSubmit(aporte._id, nuevosComentarios[aporte._id])}
              >
                Enviar Comentario
              </Button>
              </div>
              <ul>
                {aporte.comentarios.map((comentario, index) => (
                  <li key={index}>
                    {comentario.contenido} - Comentado el {formatFecha(comentario.fechaComentario)}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
    </div>
    </div>
  );
};

export default ForoPage;
