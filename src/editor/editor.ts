import * as monaco from 'monaco-editor';

export function setupInkLanguageAndTheme() {
  monaco.languages.register({ id: 'ink' });

  monaco.languages.setMonarchTokensProvider('ink', {
    tokenizer: {
      root: [
        [/\/\/.*$/, 'comment'],
        [/^\s*#\w+/, 'tag'],
        [/->\s*\w+(\s*->\s*\w+)*/, 'keyword'],
        [/^\s*[\*\+]/, 'keyword'],
        [/^={3,}\s*\w[\w\s]*\s*={3,}$/, 'typeIdentifier'],
        [/^={2}\s*\w[\w\s]*\s*={2}$/, 'type'],
        [/\b(VAR|CONST|LIST|INCLUDE|EXTERNAL|TEMP|RETURN)\b/, 'keyword'],
        [/^\s*~\s*\w+/, 'variable'],
        [/".*?"/, 'string'],
        [/\b\d+(\.\d+)?\b/, 'number'],
        [/\b(and|or|not)\b/, 'operator'],
        [/[=<>!]=?|[\+\-\*\/]/, 'operator'],
        [/\b\w+\s*\(/, 'function'],
        [/\b[a-zA-Z_][a-zA-Z0-9_]*\b/, 'identifier'],
      ]
    }
  });

  monaco.editor.defineTheme('inky-light', {
    base: 'vs',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '888888', fontStyle: 'italic' },
      { token: 'keyword', foreground: '005fa3' },
      { token: 'tag', foreground: 'aa00aa' },
      { token: 'string', foreground: 'a31515' },
      { token: 'number', foreground: '098658' },
      { token: 'function', foreground: '795e26' },
      { token: 'typeIdentifier', foreground: '267f99', fontStyle: 'bold' }
    ],
    colors: {
      'editor.background': '#ffffff',
      'editorLineNumber.foreground': '#aaaaaa',
      'editorGutter.background': '#f7f7f7',
      'editorCursor.foreground': '#333333',
      'editorIndentGuide.background': '#e0e0e0'
    }
  });
}

export function createEditor(container: HTMLElement): monaco.editor.IStandaloneCodeEditor {
  monaco.editor.setTheme('inky-light');
  return monaco.editor.create(container, {
    value: `// Write your Ink script here`,
    language: 'ink',
    theme: 'inky-light',
    automaticLayout: true,
    minimap: { enabled: false },
    lineNumbersMinChars: 3
  });
}
