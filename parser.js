let html = String(document.body.outerHTML);
mPf();
removeStyle();
getRidOfStrangeShit();
convertFormulas();
collapseElements();
console.log(html);
//locateProofs();

document.body.outerHTML = html;
removeEmptyElements();
removeComments();

function mPf() {

    while(html.indexOf("font-family:Marlett;") > -1) {
        let subString = html.substring(0, html.indexOf("font-family:Marlett;"));
        let beg = subString.lastIndexOf("<span");
        let end = html.substring(beg).indexOf("</span>") + "</span>".length + beg;
        subString = html.substring(end);
        end = subString.indexOf("font-family:Marlett;") + "font-family:Marlett;".length + end;
        subString = html.substring(end);
        end = subString.indexOf(">3</span>") + ">3</span>".length + end;
        subString = html.substring(beg, end);
        let Pf = "<div>" + subString + "</div>";
        console.log(Pf);
        while(Pf.indexOf("font-family:Marlett;") > -1) {
            Pf = Pf.replace("font-family:Marlett;", "");
        }
        html = html.substr(0, beg) + Pf + html.substr(end);
    }
}

function removeStyle() {
    while(html.indexOf("style") > -1 ) {
        let styleSubstr = html.substring(html.indexOf("style") - 1);
        styleSubstr = styleSubstr.substring(0, styleSubstr.indexOf("\">") + "\"".length);
        html = html.replace(styleSubstr, "");
    }
}

function convertFormulas() {
    while(html.indexOf("$") > -1) {
        html = html.replace("$", "\\(\\displaystyle ");
        html = html.replace("$", "\\)");
    }
    convertSystems();
    while(html.indexOf("\\[") > -1) {
        html = html.replace("\\[", "\\(\\displaystyle ");
        html = html.replace("\\]", "\\)");
    }
}

function convertSystems() {
    // Collapsing all p in one
    let beg = html.indexOf("\\[");
    let end = html.indexOf("\\]");
    while( beg > -1) {
        let subStr = html.substr(beg, end - beg + "\\]".length);
        let newSubStr = subStr;
        while(newSubStr.indexOf("<p>") > -1) {
            newSubStr = newSubStr.replace("<p>", "");
        }
        while(newSubStr.indexOf("</p>") > -1) {
            newSubStr = newSubStr.replace("</p>", "");
        }
        while(newSubStr.indexOf("&amp;") > -1) {
            newSubStr = newSubStr.replace("&amp;", "&");
        }
        html = html.replace(subStr, newSubStr);
        //console.log(subStr);
        //console.log(newSubStr);
        beg = html.substr(end).indexOf("\\[");
        if (beg > -1) {
            beg += end;
            end = html.substr(end).indexOf("\\]") + beg;
        }
    }
    // Collapsing all span in one
    beg = html.indexOf("\\[");
    end = html.indexOf("\\]");
    while( beg > -1) {
        let subStr = html.substr(beg, end - beg + "\\]".length);
        let newSubStr = subStr;
        while(newSubStr.indexOf("<span>") > -1) {
            newSubStr = newSubStr.replace("<span>", "");
        }
        while(newSubStr.indexOf("</span>") > -1) {
            newSubStr = newSubStr.replace("</span>", "");
        }
        html = html.replace(subStr, newSubStr);
        //console.log(subStr);
        //console.log(newSubStr);
        beg = html.substr(end).indexOf("\\[");
        if (beg > -1) {
            beg += end;
            end = html.substr(end).indexOf("\\]") + beg;
        }
    }

    beg = html.indexOf("\\(\\displaystyle ");
    end = html.indexOf("\\)");
    while( beg > -1) {
        let subStr = html.substr(beg, end - beg + "\\)".length);
        let newSubStr = subStr;
        while(newSubStr.indexOf("<span>") > -1) {
            newSubStr = newSubStr.replace("<span>", "");
        }
        while(newSubStr.indexOf("</span>") > -1) {
            newSubStr = newSubStr.replace("</span>", "");
        }
        html = html.replace(subStr, newSubStr);
        //console.log(subStr);
        //console.log(newSubStr);
        beg = html.substr(end).indexOf("\\(\\displaystyle ");
        if (beg > -1) {
            beg += end;
            end = html.substr(end).indexOf("\\)") + beg;
        }
    }

    beg = html.indexOf("\\(\\displaystyle ");
    end = html.indexOf("\\)");
    while( beg > -1) {
        let subStr = html.substr(beg, end - beg + "\\)".length);
        let newSubStr = subStr;
        while(newSubStr.indexOf("<p>") > -1) {
            newSubStr = newSubStr.replace("<p>", "");
        }
        while(newSubStr.indexOf("</p>") > -1) {
            newSubStr = newSubStr.replace("</p>", "");
        }
        html = html.replace(subStr, newSubStr);
        //console.log(subStr);
        //console.log(newSubStr);
        beg = html.substr(end).indexOf("\\(\\displaystyle ");
        if (beg > -1) {
            beg += end;
            end = html.substr(end).indexOf("\\)") + beg;
        }
    }
}

function removeEmptyElements() {
    let para = Array.from(document.getElementsByTagName("p"));
    para.forEach(p => {
        if (p.textContent === " ") {
            p.parentNode.removeChild(p);
        }
    });
}

function removeComments() {
    let divs = Array.from(document.querySelectorAll("div"));
    divs.forEach(div => {
        if (div.id.indexOf("_com_") > -1) {
            div.parentNode.removeChild(div);
        }
    });
    let anchors = Array.from(document.querySelectorAll("a"));
    anchors.forEach(a => {
        a.parentNode.parentNode.removeChild(a.parentNode);
    })
}

function collapseElements() {
    while(html.indexOf("<strong><span>") > -1) {
        html = html.replace("<strong><span>", "<strong>");
        html = html.replace("</span></strong>", "</strong>");
    }
}

function locateProofs() {
    while(html.indexOf("<span>4</span>") > -1) {
        html = html.replace("<span>4</span>", "<div>");
        html = html.replace("<span>3</span>", "</div>");
    }
}

function getRidOfStrangeShit() {
    while(html.indexOf("&nbsp;") > -1) {
        html = html.replace("&nbsp;", " ");
    }
}