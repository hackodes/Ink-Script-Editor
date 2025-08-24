import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { compileAndPlay } from '../script/compiler';
import { showToast } from '../utils/toast';
import { resetToastFlag } from './editorListeners';

export function setupButtonListeners(editor: monaco.editor.IStandaloneCodeEditor) {
  document.getElementById("restartBtn")?.addEventListener("click", () => {
    compileAndPlay(editor);
    resetToastFlag(); 
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

  const editorTab = document.getElementById("editorTab");
  const outputTab = document.getElementById("outputTab");
  const editorPanel = document.getElementById("editorPanel");
  const outputPanel = document.getElementById("outputPanel");
  
  if (editorTab && outputTab && editorPanel && outputPanel) {
    editorTab.addEventListener("click", () => {
      editorPanel.classList.remove("hidden");
      outputPanel.classList.add("hidden");
      editorTab.classList.add("active");
      outputTab.classList.remove("active");
    });
  
    outputTab.addEventListener("click", () => {
      outputPanel.classList.remove("hidden");
      editorPanel.classList.add("hidden");
      outputTab.classList.add("active");
      editorTab.classList.remove("active");
    });
  }
  
}
