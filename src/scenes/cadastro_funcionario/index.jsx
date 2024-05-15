import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

import { Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";

import { createFuncionario } from '../../services/api';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import Empregado from '../../model/Empregado';
import Telefone from '../../model/Telefone';


import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import {useState} from "react";

const CadastroFuncionario = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const handleFormSubmit = async (data) => {

    const telefone = new Telefone(data.telefone, '43' ,false);

    const empregado = new Empregado(
        data.nome + " " + data.sobrenome,
        data.cpf,
        "2023-01-01",
        data.email,
        data.departamento,
        data.cargo,
        data.banco,
        data.agencia,
        data.conta,
        data.codIdefCtps,
        data.codIdefCaepf,
        data.codIdefCno,
        data.codMatriculaEsocial,
        "9f9a3bc1-7e5e-4ade-b71b-3c116c627217",
        "1",
        telefone,
        "56023a7e-7c21-4548-9f80-8a02069f9901",
        "c54fcea1-b172-4c7c-8df4-fee205c0e97d"
    );

    console.log(empregado);

    const novoEmpregado = await createFuncionario(empregado);

    if (novoEmpregado) {
      setOpenDialog(true);
    } else {
      enqueueSnackbar('Ocorreu um erro ao criar o funcionário.', { variant: 'error' });
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate('/');
  };

  return (
    <Box m="20px">
      <Header
        title="Cadastrar Funcionário"
        subtitle="Cadastra um novo funcionário no sistema"
      />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >

              <Dialog
                  open={openDialog}
                  onClose={handleCloseDialog}
              >
                <DialogTitle>{"Funcionário cadastrado com sucesso"}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    O funcionário foi cadastrado com sucesso.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button type="submit" color="secondary" variant="contained" onClick={handleCloseDialog}>
                    OK
                  </Button>
                </DialogActions>
              </Dialog>

              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px", gridColumn: "span 4" }}
              >
                Dados Pessoais
              </Typography>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nome"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.nome}
                name="nome"
                error={!!touched.nome && !!errors.nome}
                helperText={touched.nome && errors.nome}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Sobrenome"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.sobrenome}
                name="sobrenome"
                error={!!touched.sobrenome && !!errors.sobrenome}
                helperText={touched.sobrenome && errors.sobrenome}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="tel"
                label="Telefone de Contato"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.telefone}
                name="telefone"
                error={!!touched.telefone && !!errors.telefone}
                helperText={touched.telefone && errors.telefone}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="tel"
                label="Whatsapp"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.whatsApp}
                name="whatsApp"
                error={!!touched.whatsApp && !!errors.whatsApp}
                helperText={touched.whatsApp && errors.whatsApp}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="CPF"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cpf}
                name="cpf"
                error={!!touched.cpf && !!errors.cpf}
                helperText={touched.cpf && errors.cpf}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="RG"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.rg}
                name="rg"
                error={!!touched.rg && !!errors.rg}
                helperText={touched.rg && errors.rg}
                sx={{ gridColumn: "span 2" }}
              />

              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px", gridColumn: "span 4" }}
              >
                Endereco Funcionario
              </Typography>
              <TextField
                fullWidth
                variant="filled"
                type="tel"
                label="Logradouro"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.logradouro}
                name="logradouro"
                error={!!touched.logradouro && !!errors.logradouro}
                helperText={touched.logradouro && errors.logradouro}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="tel"
                label="Bairro"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.bairro}
                name="bairro"
                error={!!touched.bairro && !!errors.bairro}
                helperText={touched.bairro && errors.bairro}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Numero"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.numero}
                name="numero"
                error={!!touched.numero && !!errors.numero}
                helperText={touched.numero && errors.numero}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Cidade"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cidade}
                name="cidade"
                error={!!touched.cidade && !!errors.cidade}
                helperText={touched.cidade && errors.cidade}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="tel"
                label="Cep"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cep}
                name="cep"
                error={!!touched.cep && !!errors.cep}
                helperText={touched.cep && errors.cep}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="tel"
                label="Complemento"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.complemento}
                name="complemento"
                error={!!touched.complemento && !!errors.complemento}
                helperText={touched.complemento && errors.complemento}
                sx={{ gridColumn: "span 2" }}
              />

              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px", gridColumn: "span 4" }}
              >
                Dados de Registro
              </Typography>
              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Data de Admissão"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.data_admissao}
                name="data_admissao"
                error={!!touched.data_admissao && !!errors.data_admissao}
                helperText={touched.data_admissao && errors.data_admissao}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Banco"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.banco}
                name="banco"
                error={!!touched.banco && !!errors.banco}
                helperText={touched.banco && errors.banco}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Agencia"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.agencia}
                name="agencia"
                error={!!touched.agencia && !!errors.agencia}
                helperText={touched.agencia && errors.agencia}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Conta"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.conta}
                name="conta"
                error={!!touched.conta && !!errors.conta}
                helperText={touched.conta && errors.conta}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="CTPS"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.ctps}
                name="ctps"
                error={!!touched.ctps && !!errors.ctps}
                helperText={touched.ctps && errors.ctps}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="CAEPF"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.caepf}
                name="caepf"
                error={!!touched.caepf && !!errors.caepf}
                helperText={touched.caepf && errors.caepf}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="E-SOCIAL"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cod_matriculo_esocial}
                name="cod_matriculo_esocial"
                error={
                  !!touched.cod_matriculo_esocial &&
                  !!errors.cod_matriculo_esocial
                }
                helperText={
                  touched.cod_matriculo_esocial && errors.cod_matriculo_esocial
                }
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Endereço da Alocação"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.alocacao}
                name="alocacao"
                error={!!touched.alocacao && !!errors.alocacao}
                helperText={touched.alocacao && errors.alocacao}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                cadastrar funcionario
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  nome: yup.string().required("required"),
  sobrenome: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  telefone: yup
    .string()
    .matches(phoneRegExp, "Numero de telefone nao e valido")
    .required("required"),
  whatsApp: yup
    .string()
    .matches(phoneRegExp, "Numero de whatsapp nao e valido")
    .required("required"),
  logradouro: yup.string().required("required"),
  cidade: yup.string().required("required"),
});

const initialValues = {
  nome: "",
  sobrenome: "",
  email: "",
  cpf: "",
  rg: "",
  logradouro: "",
  bairro: "",
  numero: "",
  cidade: "",
  cep: "",
  complemento: "",
  data_admissao: "",
  departamento: "",
  cargo: "",
  banco: "",
  agencia: "",
  conta: "",
  ctps: "",
  caepf: "",
  cno: "",
  cod_matriculo_esocial: "",
  telefone: "",
  whatsApp: "",
  alocacao: "",
};

export default CadastroFuncionario;
