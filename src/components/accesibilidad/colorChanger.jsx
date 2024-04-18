import React, { useState } from 'react';
import { FaWrench, FaPalette, FaPlus, FaMinus } from 'react-icons/fa';
import '../../styles/ColorChanger.css';

function ColorChanger() {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  const handleClickOutside = (e) => {
    if (showOptions && e.target.className !== 'color-changer-button') {
      setShowOptions(false);
    }
  };

  return (
    <div onClick={handleClickOutside}>
    <div className="color-changer-button" onClick={toggleOptions}>
      <FaWrench />
      {showOptions && (
        <div className="options">
          <button onClick={(e) => e.stopPropagation()}><FaPalette /></button>
          <button onClick={(e) => e.stopPropagation()}><FaPlus /></button>
          <button onClick={(e) => e.stopPropagation()}><FaMinus /></button>
        </div>
      )}
    </div>
  </div>
  );
}

export default ColorChanger;
