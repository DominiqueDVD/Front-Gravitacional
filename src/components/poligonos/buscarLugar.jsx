import React from 'react';
import '../../styles/searchForm.css'

function SearchForm() {
  return (
    <form>
      <div className="form-group">
        <input
          id="pac-input"
          className="form-control form-control-lg"
          type="text"
          placeholder="Buscar un lugar"
        />
      </div>
    </form>
  );
}

export default SearchForm;
