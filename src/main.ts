import { setupInkLanguageAndTheme, createEditor } from './editor';
import { compileAndPlay } from './script/compiler';
import { setupEditorListeners } from './listeners/editorListeners';
import { setupButtonListeners } from './listeners/buttonListeners';
import './index.css';

setupInkLanguageAndTheme();

const editor = createEditor(document.getElementById('editor')!);

compileAndPlay(editor); 
setupEditorListeners(editor);
setupButtonListeners(editor);
