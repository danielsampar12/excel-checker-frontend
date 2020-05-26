import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Nav = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`;

export const Content = styled.div` 
    width: 100%;
    max-width: 400px;
    margin: 10px;
    background: #FFFF;
    border-radius: 4px;
    padding: 20px;
`;

export const TextContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const Table = styled.table`
    text-align: center;
    margin: 20px;
    background: #FFFF;
    border-radius: 4px;
    padding: 20px;
    th, td{
        padding: 0 10px;
        button{
                border: 0;
                background: transparent;
                color: #cc4141;
                margin-left: 5px;
                cursor: pointer;
            }
    }
    
    tr:hover {background-color: #ddd;}
    
`;

export const Tr = styled.tr`
    background-color: ${props => {
        if(props.isChecked){
            return  '#e57878'
        }else if(props.listIndex % 2 !== 0){
            return '#f2f2f2'
        }
        
        return '#FFF'
    }}

`;
