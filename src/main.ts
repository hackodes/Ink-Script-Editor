import { Compiler, Story } from "inkjs/full";
import { setupInkLanguageAndTheme, createEditor } from './editor';

import './index.css';



setupInkLanguageAndTheme(); 
const editor = createEditor(document.getElementById('editor')!);


// Story instance
let story: Story | null = null;

// Render Ink story output
function renderStory(story: Story, outputEl: HTMLElement) {
  // Continue story and append paragraphs
  while (story.canContinue) {
    const paragraph = document.createElement("p");
    paragraph.textContent = story.Continue();
    paragraph.className = "mb-2 p-1"; // spacing between lines
    outputEl.appendChild(paragraph);
  }

  // Remove old choices (optional: only remove buttons, not story text)
  const oldChoices = outputEl.querySelectorAll(".choice-button");
  oldChoices.forEach(el => el.remove());

  // Add new choices
  const choicesContainer = document.createElement("div");
  choicesContainer.className = "flex flex-wrap gap-2 mt-4";

  story.currentChoices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.className = "choice-button bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded text-sm font-medium transition";
    btn.onclick = () => {
      // Insert a divider before continuing the story
      const divider = document.createElement("div");
      divider.className = "my-3 border-t border-gray-300";
      outputEl.appendChild(divider);
    
      story.ChooseChoiceIndex(index);
      renderStory(story, outputEl);
      // Delete the choicesContainer after a choice is made
      choicesContainer.remove();
    };
    choicesContainer.appendChild(btn);
  });

  outputEl.appendChild(choicesContainer);

  // Optional: scroll to bottom for new content
  outputEl.scrollTo({ top: outputEl.scrollHeight, behavior: "smooth" });

}


// Compile and play Ink story
function compileAndPlay(): void {
  const inkSource = editor.getValue();

  const outputEl = document.getElementById("output") as HTMLElement;
  outputEl.innerHTML = "";

  console.log("Compiler:", Compiler);
  console.log("Compiling Ink source...");

  try {
    story = new Compiler(inkSource).Compile();
    renderStory(story, outputEl);
  } catch (err: any) {
    outputEl.innerHTML = `<p style="color:red;">Compilation error: ${err.message}</p>`;
  }
}

// Restart button handler
document.getElementById("restartBtn")?.addEventListener("click", () => {
  compileAndPlay();
});


let isProgrammaticChange = false;

// Future updates to the editor content should not trigger compilation
function updateEditorContent(newContent: string) {
  isProgrammaticChange = true;
  editor.setValue(newContent);
  isProgrammaticChange = false;
}

editor.onDidChangeModelContent(() => {
  if (!isProgrammaticChange) {
    compileAndPlay(); // Only run when user edits
  }
});


// Copy editor content to clipboard
document.getElementById("copyBtn")?.addEventListener("click", () => {
  const text = editor.getValue();
  navigator.clipboard.writeText(text).then(() => {
    const toast = document.getElementById("toast");
    if (toast) {
      toast.classList.remove("opacity-0");
      toast.classList.add("opacity-100");

      setTimeout(() => {
        toast.classList.remove("opacity-100");
        toast.classList.add("opacity-0");
      }, 2000); // Hide after 2 seconds
    }
  }).catch(err => {
    console.error("Failed to copy:", err);
  });
});

// Select all text in the editor
document.getElementById("selectBtn")?.addEventListener("click", () => {
  const model = editor.getModel();
  if (model) {
    const fullRange = model.getFullModelRange();
    editor.setSelection(fullRange);
    editor.focus();
  }
});
