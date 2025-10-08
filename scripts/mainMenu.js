
import data from "./jsonLib/menuLinks.json" with {type: "json"};

function populateMenu(){
    
    let text = "<ul class='topnav'>";
    for (let i in data.menuTop){
        if (Array.isArray(data.menuTop[i].link)){
            text += "\n<div class=\"dropdown\">"
            text += "\n<li class=\"drpbtn\"><a>"+ data.menuTop[i].name + "</a></li>";
            text += "\n<div class=\"dropdown-content\">"
            for (let j in data.menuTop[i].link){
                text += "\n<a href="
                text += "'" + data.menuTop[i].link[j].link + "'"
                text += ">"+ data.menuTop[i].link[j].name + "</a>";
                console.log(data.menuTop[i].link[j].name)
            }
            text += "</div>";
            text +="</a>";
            text += "</div>";
        }else{
            text += "\n<li><a href="
            text += "'" + data.menuTop[i].link + "'"
            text += ">"+ data.menuTop[i].name + "</a></li>";
        }
    }
    text += "\n</ul>";

    document.getElementById('menuBar').innerHTML = text;
}

console.log("\n\nummmmm\n\n");
populateMenu();

/*
The loop should produce something that looks like the following: 

<ul class="topnav">
    <li><a href="index.html">Home</a></li>
    <li><a href="3js.html">3js</a></li>
    <li><a href="tie20.html">TIE-20</a></li>
    <li><a href="dogVids.html">DOGS</a></li>
    <li><a href="canvas.html">...bugs...</a></li>
</ul>
*/

