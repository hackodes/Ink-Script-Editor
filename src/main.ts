import { Compiler, Story } from "inkjs/full";
import { setupInkLanguageAndTheme, createEditor } from './editor';
import './index.css';

setupInkLanguageAndTheme();
const editor = createEditor(document.getElementById('editor')!);
let story: Story | null = null;
let hasStoryProgressed = false;
let hasPendingChanges = false;
let isProgrammaticChange = false;
let lastCompiledSource = editor.getValue(); // ✅ Initialize with starting content

function renderStory(story: Story, outputEl: HTMLElement) {
  while (story.canContinue) {
    hasStoryProgressed = true;

    const paragraph = document.createElement("p");
    paragraph.textContent = story.Continue();
    paragraph.className = "mb-2 text-base text-gray-800 leading-relaxed";
    outputEl.appendChild(paragraph);

    const tags = story.currentTags ?? [];
    if (tags.length > 0) {
      const tagBlock = document.createElement("div");
      tagBlock.className = "mb-2 flex flex-wrap gap-2 text-xs font-mono text-purple-600";
      tagBlock.innerHTML = tags.map(tag =>
        `<span class="bg-purple-100 px-2 py-1 rounded border border-purple-300">${tag}</span>`
      ).join("");
      outputEl.appendChild(tagBlock);
    }
  }

  const oldChoices = outputEl.querySelectorAll(".choice-button");
  oldChoices.forEach(el => el.remove());

  const choicesContainer = document.createElement("div");
  choicesContainer.className = "flex flex-wrap gap-2 mt-4";

  story.currentChoices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.className = "choice-button bg-indigo-100 hover:bg-indigo-200 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold transition shadow-sm";
    btn.onclick = () => {
      const divider = document.createElement("div");
      divider.className = "my-4 border-t border-gray-300";
      outputEl.appendChild(divider);

      story.ChooseChoiceIndex(index);
      renderStory(story, outputEl);
      choicesContainer.remove();
    };
    choicesContainer.appendChild(btn);
  });

  outputEl.appendChild(choicesContainer);

  if (!story.canContinue && story.currentChoices.length === 0) {
    const endBlock = document.createElement("div");
    endBlock.className = "mt-8 p-4 bg-gradient-to-r from-yellow-100 to-yellow-200 border border-yellow-300 rounded-lg text-center text-sm font-semibold text-yellow-800 shadow";
    endBlock.textContent = "— End of Story —";
    outputEl.appendChild(endBlock);
  }

  outputEl.scrollTo({ top: outputEl.scrollHeight, behavior: "smooth" });
}

function compileAndPlay(): void {
  const inkSource = editor.getValue();
  lastCompiledSource = inkSource; // ✅ Save compiled version

  const outputEl = document.getElementById("output") as HTMLElement;
  outputEl.innerHTML = "";
  outputEl.scrollTo({ top: 0 });
  hasStoryProgressed = false;

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
      outputEl.innerHTML = `<p class="text-red-600 font-mono text-sm">Compilation error: ${err.message}</p>`;
    }
  }
}

document.getElementById("restartBtn")?.addEventListener("click", () => {
  hasPendingChanges = false;
  compileAndPlay();
});

editor.onDidChangeModelContent(() => {
  if (!isProgrammaticChange) {
    const currentSource = editor.getValue();
    const restartBtn = document.getElementById("restartBtn");
    const toast = document.getElementById("toast");

    if (currentSource !== lastCompiledSource) {
      hasPendingChanges = true;

      if (restartBtn) {
        restartBtn.textContent = "Reload Story";
        restartBtn.classList.add("bg-orange-500", "hover:bg-orange-600");
      }

      if (toast) {
        toast.textContent = "Story updated — click Reload to see changes.";
        toast.classList.remove("opacity-0", "translate-y-4");
        toast.classList.add("opacity-100", "translate-y-0");

        setTimeout(() => {
          toast.classList.remove("opacity-100", "translate-y-0");
          toast.classList.add("opacity-0", "translate-y-4");
        }, 2000);
      }
    } else {
      hasPendingChanges = false;

      if (restartBtn) {
        restartBtn.textContent = "Restart Story";
        restartBtn.classList.remove("bg-orange-500", "hover:bg-orange-600");
      }
    }
  }
});

document.getElementById("copyBtn")?.addEventListener("click", () => {
  const text = editor.getValue();
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.getElementById("toast");
    if (toast) {
      toast.textContent = "Copied to clipboard!";
      toast.classList.remove("opacity-0", "translate-y-4");
      toast.classList.add("opacity-100", "translate-y-0");

      setTimeout(() => {
        toast.classList.remove("opacity-100", "translate-y-0");
        toast.classList.add("opacity-0", "translate-y-4");
      }, 2000);
    }
  }).catch(err => {
    console.error("Failed to copy:", err);
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
