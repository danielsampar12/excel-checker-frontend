import React, { useEffect, useState } from 'react';
import api from './services/api';
import GlobalStyle from './global';

import { Link } from 'react-router-dom';

function App() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function loadEmps(){
      const response =  await api.get('/incidents');
      setIncidents(response.data);
    }
    loadEmps()
  }, []);

  return (
    <>
    <GlobalStyle />
      <div className="link">
        <Link to={'/upload'}>Upload</Link>
      </div>
      <main>
        <table id="incidentsTable">
          
        </table>
      </main>
    </>
  );
}

export default App;
