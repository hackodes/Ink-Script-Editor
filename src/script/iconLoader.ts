import { createElement, Copy, TextSelect, Save, FolderOpen } from 'lucide';

export function loadIcons() {
  const copyBtn = document.getElementById('copyBtn')!;
  copyBtn.innerHTML = '';
  copyBtn.appendChild(createElement(Copy, { class: 'w-5 h-5' }));
  const copyLabel = document.createElement('span');
  copyLabel.textContent = 'Copy';
  copyLabel.className = 'text-[12px]';
  copyBtn.appendChild(copyLabel);

  const selectBtn = document.getElementById('selectBtn')!;
  selectBtn.innerHTML = '';
  selectBtn.appendChild(createElement(TextSelect, { class: 'w-5 h-5' }));
  const selectLabel = document.createElement('span');
  selectLabel.textContent = 'Select';
  selectLabel.className = 'text-[12px]';
  selectBtn.appendChild(selectLabel);

  const saveBtn = document.getElementById('saveBtn')!;
  saveBtn.innerHTML = '';
  saveBtn.appendChild(createElement(Save, { class: 'w-5 h-5' }));
  const saveLabel = document.createElement('span');
  saveLabel.textContent = 'Save';
  saveLabel.className = 'text-[12px]';
  saveBtn.appendChild(saveLabel);

  const loadBtn = document.getElementById('loadBtn')!;
  loadBtn.innerHTML = ''; 
  loadBtn.appendChild(createElement(FolderOpen, { class: 'w-5 h-5' }));
  const loadLabel = document.createElement('span');
  loadLabel.textContent = 'Load';
  loadLabel.className = 'text-[12px]';
  loadBtn.appendChild(loadLabel);
}
