const SpoilersBtns = Array.from(document.querySelectorAll(".spoiler-button"));

SpoilersBtns.forEach(button => {
    button.addEventListener('click', e => {
        e.stopPropagation();
        let content = e.target.parentNode.querySelector('.spoiler-content');
        if (!content.style.maxHeight) {
	content.style.maxHeight = content.scrollHeight + "px";
	// TODO: change it ASAP
	setTimeout(() => content.style.overflow = 'visible', 200);
        }
        else {
            content.style.overflow = 'hidden';
            content.style.maxHeight = null;
        }
    })
})

