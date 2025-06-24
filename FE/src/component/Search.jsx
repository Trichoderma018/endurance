import React, { useState, useEffect } from 'react';
import '../style/search.css'; // Asegúrate de que existe este archivo con los estilos que deseas

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [allPeople, setAllPeople] = useState([]);

  useEffect(() => {
    // Simulación de datos traídos desde una API
    const fetchPeople = async () => {
      try {
        const response = await fetch();
        setAllPeople(data);
        setResults(data); // Inicialmente mostramos todos
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchPeople();
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    const filtered = allPeople.filter(person =>
      person.username.toLowerCase().includes(value.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Buscar por username..."
        value={query}
        onChange={handleInputChange}
      />
      <ul>
        {results.map(person => (
          <li key={person.id}>{person.username}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;