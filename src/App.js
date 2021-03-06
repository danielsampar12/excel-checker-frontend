import React, { useEffect, useState } from 'react';
import api from './services/api';
import GlobalStyle from './global';
import { Container , Content, Nav, TextContainer, Table, Tr} from './styles';

import { format } from 'date-fns'

import { Link } from 'react-router-dom';

function App() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    loadEmps()
  }, []);

  async function loadEmps(){
    const response =  await api.get('/incidents');
    response.data.sort((a,b) => a.row - b.row);
    response.data.sort((a,b) => a.flag_checked - b.flag_checked);
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
          <Nav><Content><TextContainer><Link to={'/upload'}>Upload</Link></TextContainer></Content></Nav>
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
              </tr>
            </thead>
            <tbody>
              {incidents.map((incident, index) => (
                <Tr isChecked={incident.flag_checked} key={index} listIndex={index}>
                  <td>{incident.row}</td>
                  <td>{incident.nr_cnpj}</td>
                  <td>{incident.dc_chave_contrato}</td>
                  <td>{incident.dc_razao_social}</td>
                  <td>{incident.nr_nota_fiscal}</td>
                  <td>{format(new Date(incident.dt_inclusao_ctr), 'dd/MM/yyyy')}</td>
                  <td>{incident.vl_recorrente}</td>
                  <td>{incident.vl_comissao_calculado}</td>
                  <td>{incident.vl_comissao}</td>
                  <td>{incident.flag_erro_calculo ? <strong>ERRO CALCULO</strong> : <strong>PARCELA NAO FOI PAGA</strong>}</td>
                  <td><button onClick={() => window.confirm('Deseja deletar o registro da linha de ocorrencia: ' + incident.row + ' e Razão Social: '
                                      + incident.dc_razao_social + '?') ? handleDelete(incident._id) : ''}>Excluir</button></td>
                  <td><button onClick={() => handleChecked(incident._id)}>Check</button></td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </main>
    </Container>
  );
}

export default App;
