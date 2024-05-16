import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { API_URL } from "../auth/constants.ts";
import '../styles/foro.css';

const ForoPage = () => {
  const [aportes, setAportes] = useState([]);
  const [nuevoAporte, setNuevoAporte] = useState('');
  const [esPregunta, setEsPregunta] = useState(false);
  const [nuevosComentarios, setNuevosComentarios] = useState({});
  const [editAporte, setEditAporte] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [editComentario, setEditComentario] = useState(null);
  const [editComentarioContent, setEditComentarioContent] = useState('');

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
      await axios.post(`${API_URL}/foro`, { contenido: nuevoAporte, tipo: esPregunta ? 'pregunta' : 'comentario' });
      setNuevoAporte('');
      setEsPregunta(false);
      fetchAportes();
    } catch (error) {
      console.error('Error submitting aporte:', error);
    }
  };

  const handleComentarioSubmit = async (id: any, comentario: any) => {
    try {
      await axios.post(`${API_URL}/foro/${id}/comentarios`, { contenido: comentario });
      fetchAportes();
      setNuevosComentarios({ ...nuevosComentarios, [id]: '' });
    } catch (error) {
      console.error('Error submitting comentario:', error);
    }
  };

  const handleDeleteAporte = async (id: any) => {
    try {
      await axios.delete(`${API_URL}/foro/${id}`);
      fetchAportes();
    } catch (error) {
      console.error('Error deleting aporte:', error);
    }
  };

  const handleUpdateAporte = async (id: any) => {
    try {
      await axios.put(`${API_URL}/foro/${id}`, { contenido: editContent });
      setEditAporte(null);
      setEditContent('');
      fetchAportes();
    } catch (error) {
      console.error('Error updating aporte:', error);
    }
  };

  const handleDeleteComentario = async (aporteId: any, comentarioId: any) => {
    try {
      console.log(`Deleting comment ${comentarioId} from aporte ${aporteId}`);
      await axios.delete(`${API_URL}/foro/${aporteId}/comentarios/${comentarioId}`);
      fetchAportes();
    } catch (error) {
      console.error('Error deleting comentario:', error);
    }
  };

  const handleUpdateComentario = async (aporteId: any, comentarioId: any) => {
    try {
      await axios.put(`${API_URL}/foro/${aporteId}/comentarios/${comentarioId}`, { contenido: editComentarioContent });
      setEditComentario(null);
      setEditComentarioContent('');
      fetchAportes();
    } catch (error) {
      console.error('Error updating comentario:', error);
    }
  };

  const formatFecha = (fecha: string | number | Date) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', options);
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
          <FormControlLabel
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
              {editAporte === aporte._id ? (
                <div>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <Button variant="contained" onClick={() => handleUpdateAporte(aporte._id)}>Guardar</Button>
                  <Button variant="contained" onClick={() => { setEditAporte(null); setEditContent(''); }}>Cancelar</Button>
                </div>
              ) : (
                <div>
                  <div style={{display:"flex", justifyContent:"space-between"}}>
                    <Typography style={{fontSize:"x-large"}} variant="body1">{aporte.contenido}</Typography>
                    <div style={{display:"flex", gap:"10px"}}>
                      <Button variant="contained" onClick={() => { setEditAporte(aporte._id); setEditContent(aporte.contenido); }}>Editar</Button>
                      <Button variant="contained" onClick={() => handleDeleteAporte(aporte._id)}>Eliminar</Button>
                    </div>
                  </div>
                  <Typography variant="body2" color="textSecondary">{`Publicado el ${formatFecha(aporte.fechaPublicacion)}`}</Typography>
                </div>
              )}
              <br />
              <div className='comentarios'>
                <TextField
                  fullWidth
                  label="Realizar comentario"
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
                {aporte.comentarios.map((comentario: { _id: React.SetStateAction<null>; contenido: number | boolean | React.SetStateAction<string> | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined; fechaComentario: any; }, index: React.Key | null | undefined) => (
                  <li key={index}>
                    {editComentario === comentario._id ? (
                      <div>
                        <TextField
                          fullWidth
                          variant="outlined"
                          value={editComentarioContent}
                          onChange={(e) => setEditComentarioContent(e.target.value)}
                        />
                        <Button variant="contained" onClick={() => handleUpdateComentario(aporte._id, comentario._id)}>Guardar</Button>
                        <Button variant="contained" onClick={() => { setEditComentario(null); setEditComentarioContent(''); }}>Cancelar</Button>
                      </div>
                    ) : (
                      <div style={{justifyContent:"space-between", display:"flex", paddingTop:"20px"}}>
                        {comentario.contenido} - Comentado el {formatFecha(comentario.fechaComentario)}
                        <div style={{display:"flex", gap:"10px"}}>
                          <Button variant="contained" onClick={() => { setEditComentario(comentario._id); setEditComentarioContent(comentario.contenido); }}>Editar</Button>
                          <Button variant="contained" onClick={() => handleDeleteComentario(aporte._id, comentario._id)}>Eliminar</Button>
                        </div>
                      </div>
                    )}
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
