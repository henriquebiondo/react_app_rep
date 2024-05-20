import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Inicio from "./scenes/inicio";
import ControlePonto from "./scenes/controle_ponto";
import DadosFuncionario from "./scenes/dados_funcionario";
import CadastroFuncionario from "./scenes/cadastro_funcionario";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import EditarFuncionario from "./scenes/editar_funcionario";
import ArquivoAej from "./scenes/arquivo_aej";
import ArquivoAfd from "./scenes/arquivo_afd";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/controle-ponto" element={<ControlePonto />} />
              <Route path="/cadastro-funcionario" element={<CadastroFuncionario />} />
              <Route path="/dados-funcionarios" element={<DadosFuncionario />} />
              <Route path="/editar-funcionarios" element={<EditarFuncionario />} />
              <Route path="/arquivo-aej" element={<ArquivoAej />} />
              <Route path="/arquivo-afd" element={<ArquivoAfd />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;