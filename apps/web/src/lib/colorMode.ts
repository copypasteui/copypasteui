// The site's light/dark choice: where it's kept, and the script that applies it before the page paints
// (in app/layout.tsx), so a saved choice never flashes the other colours first. Preview and share-image
// pages keep their own colours, so it skips them. See components/ColorModeSwitch.
export const COLOR_MODE_STORE = "copypasteui:color-mode";
export const COLOR_MODE_SCRIPT = `try{var p=location.pathname;if(p.indexOf("/preview/")!==0){var m=localStorage.getItem("${COLOR_MODE_STORE}");if(m==="light"||m==="dark")document.documentElement.dataset.theme=m}}catch(e){}`;
