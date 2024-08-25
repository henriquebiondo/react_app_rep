import { Box, Typography, useTheme, Tooltip, Button } from "@mui/material";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import InfoIcon from '@mui/icons-material/Info';

import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getFuncionarios } from "../../services/api";
import { useNavigate } from 'react-router-dom';

const ControlePonto = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [funcionarios, setFuncionarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFuncionarios = async () => {
      const data = await getFuncionarios(
        "56023a7e-7c21-4548-9f80-8a02069f9901"
      );
      setFuncionarios(data);
    };

    fetchFuncionarios();
  }, []);

  const columns = [
    { field: "numSeqRegistro", headerName: "Número de Registro", flex: 1 },
    {
      field: "empNome",
      headerName: "Nome",
      flex: 2,
      cellClassName: "name-column--cell",
    },
    {
      field: "cargo",
      headerName: "Cargo",
      flex: 2,
    },
    {
      field: "statusJornada",
      headerName: "Status de Jornada",
      flex: 2,
      renderCell: ({ row: { statusJornada } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              statusJornada === "SEM_APONTAMENTO"
                ? colors.greenAccent[600]
                : statusJornada === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {statusJornada === "SEM_APONTAMENTO" && <AdminPanelSettingsOutlinedIcon />}
            {statusJornada === "manager" && <SecurityOutlinedIcon />}
            {statusJornada === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {statusJornada}
            </Typography>
          </Box>
        );
      },
    },
    {
      headerName: (
        (
          <Box display="flex" alignItems="center">
            Espelho de Ponto
            <Tooltip title="Consulta o espelho de ponto do empregado, podendo realizar ajustes de jornada">
              <InfoIcon sx={{ marginLeft: 1 }} />
            </Tooltip>
          </Box>
        )
      ),
      sortable: false,
      width: 150,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const onClick = () => {
          console.log(params.row);
          navigate('/espelho-ponto', { state: { funcionario: params.row } });
        };
  
        return <Button variant="contained" color="secondary" onClick={onClick}>ver / ajustar</Button>;
      }
    }
  ];

  return (
    <Box m="20px">
      <Header 
        title="Controle de Ponto" 
        subtitle="Consulta e ajusta registros de ponto de um funcionário" />
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
          //checkboxSelection
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

export default ControlePonto;
