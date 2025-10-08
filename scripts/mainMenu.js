
import data from "./jsonLib/menuLinks.json" with {type: "json"};

function populateMenu(){
    
    let text = "<ul class='topnav'>";
    for (let i in data.menuTop){
        console.log(i)
        text += "\n<li><a href="
        console.log(i)
        text += "'" + data.menuTop[i].link + "'"
        console.log(i)
        text += ">"+ data.menuTop[i].name + "</a></li>";
        console.log(i)
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

