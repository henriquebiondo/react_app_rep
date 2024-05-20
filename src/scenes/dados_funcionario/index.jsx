import {Box, useTheme, Button} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {tokens} from "../../theme";
import Header from "../../components/Header";
import { useNavigate } from 'react-router-dom';

import {getFuncionarios} from '../../services/api';
import {useEffect, useState} from "react";

const DadosFuncionario = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [funcionarios, setFuncionarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFuncionarios = async () => {
      const data = await getFuncionarios('56023a7e-7c21-4548-9f80-8a02069f9901');
      setFuncionarios(data);
    };

    fetchFuncionarios();
  }, []);

  const columns = [
    { field: 'idEmpregado', headerName: 'ID do Empregado', width: 250 },
    { field: 'numSeqRegistro', headerName: 'Número de Registro', width: 150 },
    { field: 'empNome', headerName: 'Nome do Empregado', width: 400 },
    { field: 'cpf', headerName: 'CPF', width: 150 },
    { field: 'dataAdmissao', headerName: 'Data de Admissão', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'departamento', headerName: 'Departamento', width: 200, hide: true },
    { field: 'cargo', headerName: 'Cargo', width: 150 },
    { field: 'banco', headerName: 'Banco', width: 150, hide: true },
    { field: 'agencia', headerName: 'Agência', width: 150, hide: true },
    { field: 'conta', headerName: 'Conta', width: 150, hide: true },
    { field: 'telefone.telefone', headerName: 'Telefone', width: 150, hide: true },
    { field: 'telefone.codOperadora', headerName: 'Código da Operadora', width: 200, hide: true },
    { field: 'telefone.whatsapp', headerName: 'WhatsApp', width: 150, hide: true },
    {
      field: 'editar',
      headerName: 'Editar',
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          console.log(params.row);
          navigate('/editar-funcionarios', { state: { funcionario: params.row } });
        };
  
        return <Button variant="contained" color="secondary" onClick={onClick}>Editar</Button>;
      }
    },
  ];

  return (
      <Box m="20px">
        <Header
            title="Funcionários"
            subtitle="Lista os funcionários cadastrados no sistema"
        />
        <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
        >
          <DataGrid
              rows={funcionarios}
              columns={columns}
              components={{Toolbar: GridToolbar}}
              getRowId={(row) => row.idEmpregado}
              localeText={{
                toolbarDensity: 'Densidade',
                toolbarFilters: 'Filtros',
                toolbarColumns: 'Colunas',
                toolbarExport: 'Exportar',
                // Adicione mais traduções conforme necessário
              }}
          />
        </Box>
      </Box>
  );
};

export default DadosFuncionario;
