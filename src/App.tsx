import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Ajuda } from "@/components/paginas/ajuda";
import { AvaliacoesFuncionario } from "@/components/paginas/avaliacoes-funcionario";
import { AvaliacoesGestor } from "@/components/paginas/avaliacoes-gestor";
import { Biblioteca } from "@/components/paginas/biblioteca";
import { ColaboradoresGestor } from "@/components/paginas/colaboradores-gestor";
import { ConteudoGestor } from "@/components/paginas/conteudo-gestor";
import { Configuracoes } from "@/components/paginas/configuracoes";
import { EmpresaGestor } from "@/components/paginas/empresa-gestor";
import { FuncionarioInicio } from "@/components/paginas/funcionario-inicio";
import { GestorInicio } from "@/components/paginas/gestor-inicio";
import { MeuPerfil } from "@/components/paginas/meu-perfil";
import { MinhasTrilhas } from "@/components/paginas/minhas-trilhas";
import { RelatoriosGestor } from "@/components/paginas/relatorios-gestor";
import { TrilhasGestor } from "@/components/paginas/trilhas-gestor";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/gestor" replace />} />

        <Route path="/gestor" element={<GestorInicio />} />
        <Route path="/gestor/colaboradores" element={<ColaboradoresGestor />} />
        <Route path="/gestor/trilhas" element={<TrilhasGestor />} />
        <Route path="/gestor/avaliacoes" element={<AvaliacoesGestor />} />
        <Route path="/gestor/relatorios" element={<RelatoriosGestor />} />
        <Route path="/gestor/conteudo" element={<ConteudoGestor />} />
        <Route path="/gestor/empresa" element={<EmpresaGestor />} />
        <Route path="/gestor/ajuda" element={<Ajuda perfil="gestor" />} />
        <Route path="/gestor/configuracoes" element={<Configuracoes perfil="gestor" />} />

        <Route path="/funcionario" element={<FuncionarioInicio />} />
        <Route path="/funcionario/trilhas" element={<MinhasTrilhas />} />
        <Route path="/funcionario/biblioteca" element={<Biblioteca />} />
        <Route path="/funcionario/avaliacoes" element={<AvaliacoesFuncionario />} />
        <Route path="/funcionario/perfil" element={<MeuPerfil />} />
        <Route path="/funcionario/ajuda" element={<Ajuda perfil="funcionario" />} />
        <Route path="/funcionario/configuracoes" element={<Configuracoes perfil="funcionario" />} />

        <Route path="*" element={<Navigate to="/gestor" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
