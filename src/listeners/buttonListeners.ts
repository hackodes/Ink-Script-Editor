import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { compileAndPlay } from '../script/compiler';
import { showToast } from '../utils/toast';

export function setupButtonListeners(editor: monaco.editor.IStandaloneCodeEditor) {
  document.getElementById("restartBtn")?.addEventListener("click", () => {
    compileAndPlay(editor);
  });

  document.getElementById("copyBtn")?.addEventListener("click", () => {
    navigator.clipboard.writeText(editor.getValue()).then(() => {
      showToast("Copied to clipboard!");
    });
  });

  document.getElementById("selectBtn")?.addEventListener("click", () => {
    const model = editor.getModel();
    if (model) {
      const fullRange = model.getFullModelRange();
      editor.setSelection(fullRange);
      editor.focus();
    }
  });
}
