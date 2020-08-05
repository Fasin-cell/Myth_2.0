const SpoilersBtns = Array.from(document.querySelectorAll(".spoiler-button"));

SpoilersBtns.forEach(button => {
    button.addEventListener('click', e => {
        e.stopPropagation();
        let content = e.target.parentNode.querySelector('.spoiler-content');
        if (!content.style.maxHeight) {
            content.style.overflow = 'visible';
            content.style.maxHeight = content.scrollHeight + "px";
        }
        else {
            content.style.overflow = 'hidden';
            content.style.maxHeight = null;
        }
    })
})

