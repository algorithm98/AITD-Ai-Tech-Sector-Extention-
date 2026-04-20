document.getElementById("scanBtn").onclick=async()=>{
const btn=document.getElementById("scanBtn");
const resultsEl=document.getElementById("results");

btn.textContent="Scanning...";
resultsEl.innerHTML="";

const [tab]=await chrome.tabs.query({active:true,currentWindow:true});

chrome.tabs.sendMessage(tab.id,{action:"scan"},(r)=>{
btn.textContent="Scan Website";

if(!r||!r.length){
resultsEl.innerHTML='<div class="card">No AI detected</div>';
return;
}

r.forEach(x=>{
const card=document.createElement("div");
card.className="card";
card.innerHTML=
"<strong>"+x.name+"</strong>"+
"<div class='meta'>Confidence: "+Math.round(x.confidence*100)+"%</div>";
resultsEl.appendChild(card);
});
});
};
