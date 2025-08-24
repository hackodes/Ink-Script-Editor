import { createElement, Copy, TextSelect, Save } from 'lucide';

export function loadIcons() {
    document.getElementById('copyBtn')!.innerHTML = createElement(Copy, { class: 'w-5 h-5 text-white' }).outerHTML;
    document.getElementById('selectBtn')!.innerHTML = createElement(TextSelect, { class: 'w-5 h-5 text-white' }).outerHTML;    
    document.getElementById('saveBtn')!.innerHTML = createElement(Save, { class: 'w-5 h-5 text-white' }).outerHTML;
}
