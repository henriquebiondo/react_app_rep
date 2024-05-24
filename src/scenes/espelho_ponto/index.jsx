import {Box, useTheme, Button, Select, MenuItem} from "@mui/material";
import {DataGrid, GridToolbar} from "@mui/x-data-grid";
import {tokens} from "../../theme";
import Header from "../../components/Header";
import {useEffect, useState} from "react";
import {getEspelhoPonto} from '../../services/api';
import { useLocation } from "react-router-dom";


const EspelhoPonto = () => {
  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();

  const funcionario = location.state.funcionario;
  const [espelhoPonto, setEspelhoPonto] = useState([]);
  const [mes, setMes] = useState(meses[0]);
  
  const handleChange = (event) => {
    setMes(event.target.value);
  };

  useEffect(() => {
    const fetchEspelhoPonto = async () => {
      const data = await getEspelhoPonto(funcionario.idEmpregado, mes);
      console.log(funcionario);
      setEspelhoPonto(data);
    }; 

    fetchEspelhoPonto();
  }, [mes, funcionario]);


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
      headerName: 'Editar',
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          console.log(params.row);
          //navigate('/editar-funcionarios', { state: { funcionario: params.row } });
        };
  
        return <Button variant="contained" color="secondary" onClick={onClick}>Editar</Button>;
      }
    },
  ];


  return (
    <Box m="20px">
        <Header
          title="Espelho de Ponto"
          subtitle="Lista os registros de ponto de um funcionário no mês selecionado."
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
          <Select sx={{ backgroundColor: "secondary", width: 400, margin:"0 0 5px 0" }} variant="filled" size="small" value={mes} onChange={handleChange}>
            {meses.map((mes) => (
              <MenuItem key={mes} value={mes}>
                {mes}
              </MenuItem>
            ))}
          </Select>

          <DataGrid
              rows={espelhoPonto}
              columns={columns}
              //components={{Toolbar: GridToolbar}}
              getRowId={(row) => row.numSeqRegistro}
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
}

export default EspelhoPonto;