import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [ repositories, setRepositories ] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": "Danilo Salvador",
      "url": "http...",
      "techs": "ReactJS"
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(r => r.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(r => {
            return (
            <li key={r.id}>
              {r.title}
              <button onClick={() => handleRemoveRepository(r.id)}>
                Remover
              </button>
            </li>
            );
          })
        }
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
