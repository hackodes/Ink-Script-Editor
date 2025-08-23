import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { getLastCompiledSource } from '../script/compiler';
import { showToast } from '../utils/toast';

let hasShownToast = false;

export function setupEditorListeners(editor: monaco.editor.IStandaloneCodeEditor) {
  editor.onDidChangeModelContent(() => {
    const currentSource = editor.getValue();
    const restartBtn = document.getElementById("restartBtn");

    const isModified = currentSource !== getLastCompiledSource();

    if (restartBtn) {
      restartBtn.textContent = isModified ? "Reload Story" : "Restart Story";
      restartBtn.classList.toggle("bg-orange-500", isModified);
      restartBtn.classList.toggle("hover:bg-orange-600", isModified);
    }

    if (isModified && !hasShownToast) {
      showToast("Script updated — Reload to see changes");
      hasShownToast = true;
    }
  });
}

export function resetToastFlag() {
  hasShownToast = false;
}