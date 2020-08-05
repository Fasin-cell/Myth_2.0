const SpoilersContent = document.querySelectorAll(".spoiler-content")
const SpoilersBtns = document.querySelectorAll(".spoiler-button");

for (i = 0; i < SpoilersBtns.length; i++) {
    SpoilersBtns[i].addEventListener('click', function() {
        let content = this.nextSibling.nextSibling;
        for (j = 0; j < SpoilersContent.length; j++) {
            if (SpoilersContent[j] == content) {
                if (!SpoilersContent[j].style.maxHeight)
                    SpoilersContent[j].style.maxHeight = SpoilersContent[j].scrollHeight + "px";
                else 
                SpoilersContent[j].style.maxHeight = null;
            }
        }
    });
}