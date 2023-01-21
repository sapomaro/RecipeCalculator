export function autoResize(elem) {
	const style = elem.currentStyle || window.getComputedStyle(elem);
	const boxSizing = (style.boxSizing === 'border-box') ?
    parseInt(style.borderBottomWidth, 10) + parseInt(style.borderTopWidth, 10) : 0;

	elem.style.overflowY = 'hidden';
	elem.style.height = 'auto';
	elem.style.height = (elem.scrollHeight + boxSizing) + 'px'; 
};
