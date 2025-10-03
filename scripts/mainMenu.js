
import data from "./jsonLib/links.json" with {type: "json"};

function populateMenu(){
    
    console.log(data);

    let text = "<ul class='topnav'>";
    text += "\n<li><a href='index.html'>Home</a></li>";
    text += "\n<li><a href="
    text += "'index.html'"
    text += ">"+"Home</a></li>";
    text += "\n</ul>";

    document.getElementById('jsonTest').innerHTML = text;
}

populateMenu();
/*
<ul class="topnav">
    <li><a href="index.html">Home</a></li>
    <li><a href="3js.html">3js</a></li>
    <li><a href="tie20.html">TIE-20</a></li>
    <li><a href="dogVids.html">DOGS</a></li>
    <li><a href="canvas.html">...bugs...</a></li>
</ul>
*/