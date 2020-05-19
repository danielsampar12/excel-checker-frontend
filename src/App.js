import React, { useEffect, useState } from 'react';
import api from './services/api';
import GlobalStyle from './global';
import { Container , Content, TextContainer, Table} from './styles';


import { Link } from 'react-router-dom';

function App() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    loadEmps()
  }, []);

  async function loadEmps(){
    const response =  await api.get('/incidents');
    setIncidents(response.data);
  }

  async function handleDelete(id) {
    await api.delete(`/incidents/${id}`);
    setIncidents(incidents.filter(incident => incident._id !== id))
    
}

async function handleChecked(id){
  await api.put(`/incidents/${id}`);
  loadEmps();
}

  return (
    <Container>
      <GlobalStyle />
        
        <main>
          <header><Content><TextContainer><Link to={'/upload'}>Upload</Link></TextContainer></Content></header>
          <Table>
            <thead>
              <tr>
                <th>LINHA DA OCERRÊNCIA NA PLANILHA</th>
                <th>CNPJ CLIENTE</th>
                <th>CONTRATO</th>
                <th>RAZÃO SOCIAL DO CLEINTE</th>
                <th>PARCELA CONTESTADA</th>
                <th>DATA DE INCLUSÃO CONTRATO</th>
                <th>VCM VENDIDO</th>
                <th>VCM A RECEBER </th>
                <th>VCM RECEBIDO</th>
                <th>CONTESTAÇÃO</th>
                <th>Is checked?</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((incident, index) => (
                <tr key={index} >
                  <td>{incident.row}</td>
                  <td>{incident.nr_cnpj}</td>
                  <td>{incident.dc_chave_contrato}</td>
                  <td>{incident.dc_razao_social}</td>
                  <td>{incident.nr_nota_fiscal}</td>
                  <td>{incident.dt_inclusao_ctr}</td>
                  <td>{incident.vl_recorrente}</td>
                  <td>{incident.vl_comissao_calculado}</td>
                  <td>{incident.vl_comissao}</td>
                  <td>{incident.flag_erro_calculo && <strong>ERRO CALCULO</strong> || <strong>PARCELA NAO FOI PAGA</strong>}</td>
                  <td>{incident.flag_checked && 'SIM' || 'NAO'}</td>
                  <td><button onClick={() => handleDelete(incident._id)}>Excluir</button></td>
                  <td><button onClick={() => handleChecked(incident._id)}>Check</button></td>

                </tr>
              ))}
            </tbody>
          </Table>
        </main>
    </Container>
  );
}

export default App;
