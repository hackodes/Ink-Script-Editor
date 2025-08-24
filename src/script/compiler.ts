import { Compiler, Story } from "inkjs/full";
import monaco from "monaco-editor/esm/vs/editor/editor.api";
import { renderStory } from './renderer';

let story: Story | null = null;
let lastCompiledSource = "";

export function compileAndPlay(editor: monaco.editor.IStandaloneCodeEditor): void {
  const inkSource = editor.getValue();
  lastCompiledSource = inkSource;

  const outputEl = document.getElementById("output")!;
  outputEl.innerHTML = "";
  outputEl.scrollTo({ top: 0 });

  const restartBtn = document.getElementById("restartBtn");
  if (restartBtn) {
    restartBtn.textContent = "Restart Story";
    restartBtn.classList.remove("bg-orange-500", "hover:bg-orange-600");
  }

  try {
    story = new Compiler(inkSource).Compile();
    renderStory(story, outputEl);
  } catch (err: unknown) {
    if (err instanceof Error) {
      outputEl.innerHTML = `<p class="compiler-error">Compilation error: ${err.message}</p>`;
    }
  }
}

export function getLastCompiledSource() {
  return lastCompiledSource;
}
