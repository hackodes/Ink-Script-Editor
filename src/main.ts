import { Compiler, Story } from "inkjs/full";


import * as monaco from 'monaco-editor';
import './index.css';


monaco.languages.register({ id: 'ink' });
monaco.languages.setMonarchTokensProvider('ink', {
  tokenizer: {
    root: [
      // Comments
      [/\/\/.*$/, 'comment'],

      // Tags (e.g. #tag)
      [/^\s*#\w+/, 'tag'],

      // Diverts (-> label or -> label -> label)
      [/->\s*\w+(\s*->\s*\w+)*/, 'keyword'],

      // Choices (* or +)
      [/^\s*[\*\+]/, 'keyword'],

      // Knots (=== knot ===)
      [/^={3,}\s*\w[\w\s]*\s*={3,}$/, 'type.identifier'],

      // Stitches (== stitch ==)
      [/^={2}\s*\w[\w\s]*\s*={2}$/, 'type'],

      // Ink keywords
      [/\b(VAR|CONST|LIST|INCLUDE|EXTERNAL|TEMP|RETURN)\b/, 'keyword'],

      // Inline logic operator (~)
      [/^\s*~\s*\w+/, 'variable'],

      // Strings
      [/".*?"/, 'string'],

      // Numbers
      [/\b\d+(\.\d+)?\b/, 'number'],

      // Logic operators and expressions
      [/\b(and|or|not)\b/, 'operator'],
      [/[=<>!]=?|[\+\-\*\/]/, 'operator'],

      // Function calls (e.g. RANDOM(), CHOICE_COUNT())
      [/\b\w+\s*\(/, 'function'],

      // Identifiers / variables
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
    { token: 'type.identifier', foreground: '267f99', fontStyle: 'bold' }
  ],
  colors: {
    'editor.background': '#ffffff',
    'editorLineNumber.foreground': '#aaaaaa',
    'editorGutter.background': '#f7f7f7',
    'editorCursor.foreground': '#333333',
    'editorIndentGuide.background': '#e0e0e0'
  }
});
monaco.editor.setTheme('inky-light');


const monacoEditor = monaco.editor.create(document.getElementById('editor')!, {
  value: `// Write your Ink script here`,
  language: 'ink', 
  theme: 'inky-light',
  automaticLayout: true,
  minimap: { enabled: false },
  lineNumbersMinChars: 3 // default is 5
});




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
  const inkSource = monacoEditor.getValue();

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
  monacoEditor.setValue(newContent);
  isProgrammaticChange = false;
}

monacoEditor.onDidChangeModelContent(() => {
  if (!isProgrammaticChange) {
    compileAndPlay(); // Only run when user edits
  }
});


// Copy editor content to clipboard
document.getElementById("copyBtn")?.addEventListener("click", () => {
  const text = monacoEditor.getValue();
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
  const model = monacoEditor.getModel();
  if (model) {
    const fullRange = model.getFullModelRange();
    monacoEditor.setSelection(fullRange);
    monacoEditor.focus();
  }
});

const editorTab = document.getElementById("editorTab");
const outputTab = document.getElementById("outputTab");
const editorPanel = document.getElementById("editorPanel");
const outputPanel = document.getElementById("outputPanel");

editorTab?.addEventListener("click", () => {
  editorPanel?.classList.remove("hidden");
  outputPanel?.classList.add("hidden");
  editorTab.classList.add("active");
  outputTab?.classList.remove("active");
});

outputTab?.addEventListener("click", () => {
  outputPanel?.classList.remove("hidden");
  editorPanel?.classList.add("hidden");
  outputTab.classList.add("active");
  editorTab?.classList.remove("active");
});
