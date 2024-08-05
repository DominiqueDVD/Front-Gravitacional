import React from 'react';
import '../../styles/SelectSuelos.css';

const SelectSuelos = () => {
  return (
    <div className="select-suelos">
      <div className="select-container">
        <label htmlFor="uso-suelo">Uso de suelo</label>
        <select id="uso-suelo" defaultValue="">
          <option value="" disabled>Selecciona una opción</option>
          <option value="bosque">Bosque</option>
          <option value="pastizales">Pastizales</option>
          <option value="area-urbana">Área urbana</option>
          <option value="area-pavimentada">Área pavimentada</option>
        </select>
      </div>

      <div className="select-container">
        <label htmlFor="tipo-suelo">Tipo de suelo</label>
        <select id="tipo-suelo" defaultValue="">
          <option value="" disabled>Selecciona una opción</option>
          <option value="arenoso">Suelo arenoso</option>
          <option value="arcilloso">Suelo arcilloso</option>
          <option value="na">N/A</option>
        </select>
      </div>

      <div className="select-container">
        <label htmlFor="humedad-suelo">Humedad del suelo</label>
        <select id="humedad-suelo" defaultValue="">
          <option value="" disabled>Selecciona una opción</option>
          <option value="seco">Seco</option>
          <option value="moderado">Moderado</option>
          <option value="humedo">Húmedo</option>
        </select>
      </div>

      <div className="select-container">
        <label htmlFor="algo-suelo">Algo suelo</label>
        <select id="humedad-suelo" defaultValue="">
          <option value="" disabled>Selecciona una opción</option>
          <option value="seco">Areba Gruesa</option>
          <option value="moderado">Arena Fina</option>
          <option value="humedo">Arena Limosa</option>
          <option value="seco">Limo</option>
          <option value="moderado">Limo Arcilloso</option>
          <option value="humedo">Arcilla Arenosa</option>
          <option value="moderado">Arcilla</option>
          <option value="humedo">Suelo Orgánico</option>
        </select>
      </div>

      <div className="select-container">
        <label htmlFor="algo-suelo2">Algo suelo 2</label>
        <select id="humedad-suelo" defaultValue="">
          <option value="" disabled>Selecciona una opción</option>
          <option value="seco">Arena</option>
          <option value="moderado">Arena Limosa</option>
          <option value="humedo">Limo</option>
          <option value="seco">Limo Arcilloso</option>
          <option value="moderado">Arcilla Arenosa</option>
          <option value="humedo">Arcilla</option>
          <option value="humedo">Suelo Orgánico</option>
        </select>
      </div>
    </div>
  );
};

export default SelectSuelos;
