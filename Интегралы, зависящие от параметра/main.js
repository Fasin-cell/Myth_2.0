const spoilersBtns = Array.from(document.querySelectorAll(".spoiler-button"));

spoilersBtns.forEach(button => {
    button.addEventListener('click', e => {
        e.stopPropagation();
        e.target.classList.add("active");
        let content = e.target.parentNode.querySelector('.spoiler-content');
        if (!content.style.maxHeight) {
	content.style.maxHeight = content.scrollHeight + "px";
	// TODO: change it ASAP
	setTimeout(() => content.style.overflow = 'visible', 200);
        }
        else {
            e.target.classList.remove("active");
            content.style.overflow = 'hidden';
            content.style.maxHeight = null;
        }
    });
});

const toolTipsTriggers = Array.from(document.querySelectorAll(".tooltip-trigger"));

toolTipsTriggers.forEach(trigger => {
    trigger.addEventListener("mouseenter", e => {
        const tooltip = e.target.parentNode.querySelector(".tooltip");
        const tooltipTail = e.target.parentNode.querySelector(".tooltip-tail");
        if (!tooltip.classList.contains("active")) {
            tooltip.style.left = e.clientX + "px";
            tooltip.style.top = e.target.scrollHeight + "30px";
    
            tooltipTail.style.left = e.clientX + "px";
            tooltipTail.style.bottom = tooltip.offsetHeight + 1 + "px";
            tooltip.classList.add("active");
            tooltipTail.classList.add("active");
        }

        tooltip.addEventListener("mouseleave", e => {
            tooltip.classList.remove("active");
            tooltipTail.classList.remove("active");
        });

        e.target.parentNode.addEventListener("mouseleave", e => {
            tooltip.classList.remove("active");
            tooltipTail.classList.remove("active");
        });
    });
});