import { Story } from "inkjs/full";

export function renderStory(story: Story, outputEl: HTMLElement) {
    while (story.canContinue) {
  
      const paragraph = document.createElement("p");
      paragraph.textContent = story.Continue();
      paragraph.className = "paragraph";
      outputEl.appendChild(paragraph);
  
      const tags = story.currentTags ?? [];
      if (tags.length > 0) {
        const tagBlock = document.createElement("div");
        tagBlock.className = "tag-block";
        tagBlock.innerHTML = `<span class="tag-block-span"># ${tags.join(' ')}</span>`;
        outputEl.appendChild(tagBlock);
      }
    }
  
    const oldChoices = outputEl.querySelectorAll(".choice-button");
    oldChoices.forEach(el => el.remove());
  
    const choicesContainer = document.createElement("div");
    choicesContainer.className = "choices-container";
  
    story.currentChoices.forEach((choice, index) => {
      const btn = document.createElement("button");
      btn.textContent = choice.text;
      btn.className = "choice-button";
      btn.onclick = () => {
        const divider = document.createElement("div");
        divider.className = "divider";
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
      endBlock.className = "end-block";
      endBlock.textContent = "— End of Story —";
      outputEl.appendChild(endBlock);
    }
  
    outputEl.scrollTo({ top: outputEl.scrollHeight, behavior: "smooth" });
  }