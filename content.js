(function(){
function detect({html,scripts,network}){
const res=[];
if(network.some(n=>n.includes("openai")))
res.push({name:"OpenAI",confidence:0.95});
if(html.includes("gpt"))
res.push({name:"GPT Interface",confidence:0.7});
if(network.some(n=>n.includes("anthropic")))
res.push({name:"Claude",confidence:0.9});
return res;
}

chrome.runtime.onMessage.addListener((req,sender,sendResponse)=>{
if(req.action==="scan"){
const html=document.documentElement.innerHTML.toLowerCase();
const scripts=[...document.scripts].map(s=>s.src);

chrome.runtime.sendMessage({action:"getNetwork"},res=>{
const network=res.network||[];
const result=detect({html,scripts,network});
sendResponse(result);
});
return true;
}
});
})();
