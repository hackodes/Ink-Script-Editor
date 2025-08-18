import { Compiler, Story } from "inkjs/full";

export function compileStory(source: string): Story {
  return new Compiler(source).Compile();
}

export function renderStory(story: Story, outputEl: HTMLElement): void {
  while (story.canContinue) {
    const paragraph = document.createElement("p");
    paragraph.textContent = story.Continue();
    paragraph.className = "mb-2 p-1";
    outputEl.appendChild(paragraph);
  }

  const oldChoices = outputEl.querySelectorAll(".choice-button");
  oldChoices.forEach(el => el.remove());

  const choicesContainer = document.createElement("div");
  choicesContainer.className = "flex flex-wrap gap-2 mt-4";

  story.currentChoices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;
    btn.className = "choice-button bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded text-sm font-medium transition";
    btn.onclick = () => {
      const divider = document.createElement("div");
      divider.className = "my-3 border-t border-gray-300";
      outputEl.appendChild(divider);

      story.ChooseChoiceIndex(index);
      renderStory(story, outputEl);
      choicesContainer.remove();
    };
    choicesContainer.appendChild(btn);
  });

  outputEl.appendChild(choicesContainer);
  outputEl.scrollTo({ top: outputEl.scrollHeight, behavior: "smooth" });
}
