import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { EmBreve } from "@/components/paginas/em-breve";
import { FuncionarioInicio } from "@/components/paginas/funcionario-inicio";
import { GestorInicio } from "@/components/paginas/gestor-inicio";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/gestor" replace />} />
        <Route path="/gestor" element={<GestorInicio />} />
        <Route path="/gestor/:secao" element={<EmBreve perfil="gestor" />} />
        <Route path="/funcionario" element={<FuncionarioInicio />} />
        <Route path="/funcionario/:secao" element={<EmBreve perfil="funcionario" />} />
        <Route path="/ajuda" element={<EmBreve perfil="gestor" />} />
        <Route path="/configuracoes" element={<EmBreve perfil="gestor" />} />
        <Route path="*" element={<Navigate to="/gestor" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
