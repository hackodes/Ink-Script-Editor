import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { getLastCompiledSource } from '../script/compiler';
import { showToast } from '../utils/toast';

export function setupEditorListeners(editor: monaco.editor.IStandaloneCodeEditor) {
  editor.onDidChangeModelContent(() => {
    const currentSource = editor.getValue();
    const restartBtn = document.getElementById("restartBtn");

    if (currentSource !== getLastCompiledSource()) {
      if (restartBtn) {
        restartBtn.textContent = "Reload Story";
        restartBtn.classList.add("bg-orange-500", "hover:bg-orange-600");
      }
      showToast("Story updated — click Reload to see changes.");
    } else {
      if (restartBtn) {
        restartBtn.textContent = "Restart Story";
        restartBtn.classList.remove("bg-orange-500", "hover:bg-orange-600");
      }
    }
  });
}
