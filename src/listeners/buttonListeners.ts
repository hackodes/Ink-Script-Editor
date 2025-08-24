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

  document.getElementById("saveBtn")?.addEventListener("click", async () => {
    const content = editor.getValue();
  
    try {
      const fileHandle = await (window as any).showSaveFilePicker({
        suggestedName: "script.ink",
        types: [
          {
            description: "Ink Script",
            accept: { "text/plain": [".ink"] },
          },
        ],
      });
  
      const writable = await fileHandle.createWritable();
      await writable.write(content);
      await writable.close();
  
      showToast(`Saved to ${fileHandle.name}`);
    } catch (err: any) {
      if (err.name !== "AbortError") {
        console.error("Save failed:", err);
        showToast("Failed to save file.");
      }
    }    
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
