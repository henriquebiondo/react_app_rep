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
    { field: 'numSeqRegistro', headerName: 'Numero registro', width: 200 },
    { field: 'numSeqEsRegistro', headerName: 'Numero Entrada Saida Registro', width: 200 },
    { field: 'dataMarcacaoPonto', headerName: 'Data Registro', width: 150 },
    { field: 'horaMarcacaoPonto', headerName: 'Hora Registro', width: 150 },
    { field: 'marcacaoOnline', headerName: 'Online', width: 150 },
    { field: 'coletorRegistro', headerName: 'Coletor', width: 200 },
    { field: 'tipoMarcacao', headerName: 'Tipo Marcacao', width: 150 },
    { field: 'fonteMarcacao', headerName: 'Fonte Marcacao', width: 150, hide: true },
    {
      headerName: 'Ajustar',
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          console.log(params.row);
          //navigate('/editar-ponto', { state: { funcionario: params.row } });
        };
  
        return <Button variant="contained" color="secondary" onClick={onClick}>Ajustar</Button>;
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
              components={{Toolbar: GridToolbar}}
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