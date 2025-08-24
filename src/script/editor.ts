import * as monaco from 'monaco-editor';
import defaultInk from '../../assets/example.ink?raw';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'

self.MonacoEnvironment = {
  getWorker() {
    return new editorWorker()
  }
}

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
      { token: 'comment', foreground: '7f8c8d', fontStyle: 'italic' },   
      { token: 'keyword', foreground: '1f4b99' },                          
      { token: 'tag', foreground: 'b40082' },                             
      { token: 'string', foreground: 'd35400' },                          
      { token: 'number', foreground: '27ae60' },                          
      { token: 'function', foreground: '8e44ad' },                        
      { token: 'typeIdentifier', foreground: '2980b9', fontStyle: 'bold' } 
    ]
    ,
    colors: {
      'editor.background': '#fdfdfd',
      'editorLineNumber.foreground': '#aaaaaa',
      'editorGutter.background': '#f7f7f7',
      'editorCursor.foreground': '#333333',
      'editorIndentGuide.background': '#e0e0e0',
      'editor.lineHighlightBackground': '#f5f5f5',
      'editor.selectionBackground': '#cce2ff'
    }
  });
}

export function createEditor(container: HTMLElement): monaco.editor.IStandaloneCodeEditor {
  monaco.editor.setTheme('inky-light');
  
  return monaco.editor.create(container, {
    value: defaultInk,
    language: 'ink',
    theme: 'inky-light',
    automaticLayout: true,
    minimap: { enabled: false },
    lineNumbersMinChars: 3
  });
}
