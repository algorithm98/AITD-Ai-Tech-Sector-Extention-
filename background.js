let networkLogs=[];
chrome.webRequest.onCompleted.addListener(
(d)=>networkLogs.push(d.url),
{urls:["<all_urls>"]}
);
chrome.runtime.onMessage.addListener((r,s,res)=>{
if(r.action==="getNetwork")res({network:networkLogs});
});
