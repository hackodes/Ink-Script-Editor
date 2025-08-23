import { Story } from "inkjs/full";

let hasStoryProgressed = false;

export function renderStory(story: Story, outputEl: HTMLElement) {
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