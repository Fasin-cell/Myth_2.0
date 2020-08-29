let html = String(document.body.outerHTML);

makeSections();
removeStyle();
getRidOfStrangeShit();
convertFormulas();
collapseElements();
//locateProofs();
document.body.outerHTML = html;
removeEmptyElements();
removeComments();

constructHtml();

function constructProof(proof) {
    if (html.indexOf("font-family:Marlett;") > -1) {
        //let proof = getProof();
        proof = "<div class='spoiler'>\n<button class='spoiler-button'>Доказательство</button>\n" + proof + "\n</div>";
        return proof;
    }
}

function makeSections() {
    while(html.indexOf("font-family:Marlett;") > -1) {
        let subString = html.substring(0, html.indexOf("font-family:Marlett;"));
        let beg = subString.lastIndexOf("<span");
        let end = html.substring(beg).indexOf("</span>") + "</span>".length + beg;
        subString = html.substring(end);
        end = subString.indexOf("font-family:Marlett;") + "font-family:Marlett;".length + end;
        subString = html.substring(end);
        end = subString.indexOf(">3</span>") + ">3</span>".length + end;
        subString = html.substring(beg, end);
        let proof = "<div class='spoiler-content'>\n" + subString + "\n</div>";
        while(proof.indexOf("font-family:Marlett;") > -1) {
            proof = proof.replace("font-family:Marlett;", "");
        }
        proof = constructProof(proof);
        html = html.substr(0, beg) + proof + html.substr(end);
        subString = html.substr(0, beg);
        let closestTheorem = subString.lastIndexOf("Теорема");
        let closestExample = subString.lastIndexOf("Пример");
        let closestСonsequence = subString.lastIndexOf("Следствие");
        let closest = Math.max(Math.max(closestTheorem, closestExample), closestСonsequence);
        let type = '';
        if (closest === closestTheorem)
            type = "theorem";
        else if (closest === closestExample) 
            type = "example";
        else 
            type = "consequence";

        let endOfDiv = html.lastIndexOf("</div>") + "</div>".length;
        html = html.substring(0, closest) + `<section class='${type}'>` + html.substring(closest, endOfDiv) + "</section>" + html.substring(endOfDiv);
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
        if (p.textContent === "") {
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
        a.parentNode.removeChild(a);
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

function constructHtml() {
    let head = '<head>' +
    '<title>Математический анализ</title>' +
    '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">' +
    '<link href="style.css" type="text/css" rel="stylesheet">' +
    '<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">' +
    '<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>' +
    '</head>';

    let header = '<header class="header">' +
    '<h1>Математический анализ</h1>' +
    '</header>';

    let nav = '<nav class="side-menu">' +
    '<h2>Темы</h2>' +         
    '<ul class="no-dec">' +
    '<li>' +
    '<div class="spoiler spoiler-submenu">' +
    '<button class="spoiler-button spoiler-submenu">Интегралы, зависящие от параметра.</button>' +
    '<div class="spoiler-content spoiler-submenu">' +
    '<ul class="no-dec">' +
    '<li>' +
    '<p><a href="1.1. Равномерная сходимость функций по параметру.html">1.1. Равномерная сходимость функций по параметру.</a></p>' +
    '</li>' +
    '<li>' +
    '<p><a href="1.2. Собственные интегралы.html">1.2. Собственные интегралы.</a></p>' +
    '</li>' +
    '<li>' +
    '<p><a href="Общий случай.html">Общий случай.</a></p>' +
    '</li>' +                                                    
    '<li>' +	
    '<div class="spoiler spoiler-submenu">' +
    '<button class="spoiler-button spoiler-submenu">1.3 Несобственные интегралы.</button>' +
    '<div class="spoiler-content spoiler-submenu">' +
    '<ul class="no-dec">' +
    '<li>' +
    '<p><a href="">1.3.1. Основные определения.</a></p>' +
    '</li>' +
    '<li>' +
    '<p><a href="">1.3.2. Равномерная сходимость несобственных интегралов.</a></p>' +
    '</li>' +
    '<li>' +
    '<p><a href="">1.3.3. Признаки равномерной сходимости.</a></p>' +
    '</li>' +
    '<li>' +
    '<p><a href="">1.3.4. Свойства равномерно сходящихся интегралов.</a></p>' +
    '</li>' +
    '<li>' +
    '<p><a href="">1.3.5. Эйлеровы интегралы.</a></p>' +
    '</li>' +
    '</ul>' +
    '</div>' +	
    '</div>' +										
    '</li>' +								                                 
    '</ul>' +
    '</div>' +
    '</div>' +
    '</li>' +                       
    '</ul>' +
    '</nav>';

    let main = String(document.body.innerHTML).replace('<script src="parser.js"></script>', '');

    let footer = '<footer class="footer">' +
    '<h1>Учебные материалы</h1>' +
    '</footer>' +
    '<script src="main.js"></script>';

    let HTML = '<!doctype html>\n<html>\n' + head + '\n<body>\n' + header + '\n<div class="main-grid">\n' + nav + '\n<main class="main">\n' + main + '\n</main>\n</div>\n' + footer + "\n</body>\n</html>";
    document.outerHTML = HTML;
    HTML = document.outerHTML;
    console.log(HTML);
}