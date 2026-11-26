/* Editor de código da aula: CodeMirror 6, mobile-first, sem dependências extras. */
import { useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import {
  EditorView,
  highlightActiveLine,
  highlightActiveLineGutter,
  keymap,
  lineNumbers,
  placeholder,
} from "@codemirror/view";
import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
import { bracketMatching, HighlightStyle, indentOnInput, syntaxHighlighting } from "@codemirror/language";
import { java } from "@codemirror/lang-java";
import { python } from "@codemirror/lang-python";
import { tags } from "@lezer/highlight";

const realce = HighlightStyle.define([
  { tag: [tags.keyword, tags.controlKeyword, tags.definitionKeyword], color: "#c4a7ff" },
  { tag: tags.string, color: "#ffd700" },
  { tag: tags.number, color: "#ffb27a" },
  { tag: tags.comment, color: "#8f88b3", fontStyle: "italic" },
  { tag: tags.function(tags.variableName), color: "#78c8ff" },
  { tag: tags.definition(tags.variableName), color: "#ece9fb" },
  { tag: tags.operator, color: "#9b82ff" },
]);

const tema = EditorView.theme(
  {
    "&": {
      fontSize: "14px",
      backgroundColor: "transparent",
      color: "#ece9fb",
      borderRadius: "12px",
    },
    "&.cm-focused": { outline: "none", boxShadow: "0 0 0 2px rgba(155,130,255,.35)" },
    ".cm-scroller": { fontFamily: "var(--font-mono)", lineHeight: "1.65", overflow: "auto" },
    ".cm-content": { padding: "12px 0", caretColor: "#9b82ff" },
    ".cm-line": { padding: "0 12px" },
    ".cm-gutters": {
      backgroundColor: "transparent",
      color: "#8f88b3",
      border: "none",
      paddingRight: "4px",
    },
    ".cm-activeLine": { backgroundColor: "rgba(155,130,255,.07)" },
    ".cm-activeLineGutter": { backgroundColor: "rgba(155,130,255,.07)", color: "#9b82ff" },
    ".cm-selectionBackground": { backgroundColor: "rgba(155,130,255,.24) !important" },
    ".cm-placeholder": { color: "#8f88b3" },
    "@media (max-width: 480px)": {
      "&": { fontSize: "16px" },
      ".cm-gutters": { display: "none" },
      ".cm-line": { padding: "0 8px" },
    },
  },
  { dark: true },
);

export interface EditorCodigoProps {
  value: string;
  linguagem: string;
  onChange: (codigo: string) => void;
  placeholderTexto?: string;
}

export function EditorCodigo({
  value,
  linguagem,
  onChange,
  placeholderTexto = "Escreva seu código aqui…",
}: EditorCodigoProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const mudouRef = useRef(onChange);
  mudouRef.current = onChange;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const extensoes = [
      lineNumbers(),
      highlightActiveLineGutter(),
      highlightActiveLine(),
      history(),
      indentOnInput(),
      bracketMatching(),
      syntaxHighlighting(realce),
      EditorView.lineWrapping,
      EditorView.contentAttributes.of({ "aria-label": "Editor de código" }),
      placeholder(placeholderTexto),
      keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
      tema,
      EditorView.updateListener.of((u) => {
        if (u.docChanged) mudouRef.current(u.state.doc.toString());
      }),
      linguagem === "java" ? java() : python(),
    ];

    const view = new EditorView({
      state: EditorState.create({ doc: value, extensions: extensoes }),
      parent: host,
    });
    viewRef.current = view;
    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // A linguagem recria o editor; o texto é sincronizado pelo efeito abaixo.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linguagem, placeholderTexto]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const atual = view.state.doc.toString();
    if (atual !== value) {
      view.dispatch({ changes: { from: 0, to: atual.length, insert: value } });
    }
  }, [value]);

  return <div ref={hostRef} className="min-h-48 overflow-hidden rounded-xl border border-border bg-surface-1/80" />;
}
