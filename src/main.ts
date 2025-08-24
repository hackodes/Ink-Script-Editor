import { setupInkLanguageAndTheme, createEditor } from './script/editor';
import { compileAndPlay } from './script/compiler';
import { setupEditorListeners } from './listeners/editorListeners';
import { setupButtonListeners } from './listeners/buttonListeners';
import { loadIcons } from './script/iconLoader';
import './index.css';

setupInkLanguageAndTheme();
loadIcons();
const editor = createEditor(document.getElementById('editor')!);

compileAndPlay(editor); 
setupEditorListeners(editor);
setupButtonListeners(editor);