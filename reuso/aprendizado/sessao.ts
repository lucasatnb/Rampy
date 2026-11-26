/* Sessão anônima usada pela IA e pela sincronização. */
export function sessao(): string {
  try {
    let s = localStorage.getItem("lunox_demo_sessao");
    if (!s) {
      s = "demo-" + Math.random().toString(36).slice(2, 10);
      localStorage.setItem("lunox_demo_sessao", s);
    }
    return s;
  } catch {
    return "demo-anon";
  }
}
