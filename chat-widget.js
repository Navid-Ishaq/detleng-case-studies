(function () {

// =====================================================
// DeTLeng Case Study AI Widget
// Part 1
// UI + Layout
// =====================================================

// =====================================
// Floating Bubble
// =====================================

const bubble = document.createElement("div");

bubble.innerHTML = `
<div style="
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
line-height:1.1;
">

<div style="font-size:28px;">
🤖
</div>

<div style="
font-size:18px;
font-weight:700;
margin-top:2px;
">
Ask AI
</div>

</div>
`;

bubble.style.position = "fixed";
bubble.style.bottom = "20px";
bubble.style.right = "20px";
bubble.style.width = "82px";
bubble.style.height = "82px";
bubble.style.borderRadius = "50%";
bubble.style.background = "linear-gradient(135deg,#2563eb,#06b6d4)";
bubble.style.color = "#fff";
bubble.style.display = "flex";
bubble.style.alignItems = "center";
bubble.style.justifyContent = "center";
bubble.style.fontFamily = "'Segoe UI',Arial,sans-serif";
bubble.style.cursor = "pointer";
bubble.style.userSelect = "none";
bubble.style.zIndex = "999999";
bubble.style.boxShadow = "0 8px 24px rgba(37,99,235,.40)";
bubble.style.animation = "aiPulse 1.8s infinite";

// =====================================
// CSS
// =====================================

const style = document.createElement("style");

style.innerHTML = `

@keyframes aiPulse{

0%{
transform:scale(1);
box-shadow:0 0 12px rgba(37,99,235,.35);
}

50%{
transform:scale(1.10);
box-shadow:
0 0 24px rgba(37,99,235,.70),
0 0 40px rgba(6,182,212,.40);
}

100%{
transform:scale(1);
box-shadow:0 0 12px rgba(37,99,235,.35);
}

}

.quick-question{

padding:8px 12px;
border:none;
border-radius:20px;
background:#eff6ff;
color:#2563eb;
cursor:pointer;
font-size:13px;
font-weight:600;
transition:.25s;

}

.quick-question:hover{

background:#2563eb;
color:white;

}

`;

document.head.appendChild(style);

// =====================================
// Chat Panel
// =====================================

const panel = document.createElement("div");

panel.style.position = "fixed";
panel.style.bottom = "110px";
panel.style.right = "20px";
panel.style.width = "390px";
panel.style.height = "620px";
panel.style.background = "#ffffff";
panel.style.border = "1px solid #dbeafe";
panel.style.borderRadius = "14px";
panel.style.display = "none";
panel.style.zIndex = "999999";
panel.style.overflow = "hidden";
panel.style.boxShadow = "0 10px 30px rgba(0,0,0,.20)";

panel.innerHTML = `

<div style="
background:#2563eb;
color:white;
padding:14px;
font-size:18px;
font-weight:700;
">

📊 DeTLeng Analytics AI

</div>

<div
id="chatMessages"

style="
height:455px;
overflow-y:auto;
padding:15px;
font-family:'Segoe UI',Arial,sans-serif;
font-size:14px;
line-height:1.6;
background:white;
">

<div
style="
background:#f8fbff;
border:1px solid #dbeafe;
border-radius:10px;
padding:14px;
">

<div
style="
font-size:19px;
font-weight:700;
color:#2563eb;
">

👋 Welcome

</div>

<div style="margin-top:10px;">

I'm your AI Business Intelligence Assistant.

</div>

<div style="margin-top:12px;">

I can explain concepts, recommend architectures, discuss analytics projects, Data Engineering, BigQuery, ETL, dashboards and Case Studies.

</div>

<div
style="
margin-top:16px;
font-weight:700;
color:#2563eb;
">

Try asking

</div>

<div
style="
display:flex;
flex-wrap:wrap;
gap:8px;
margin-top:12px;
">

<button class="quick-question">
What is Data Engineering?
</button>

<button class="quick-question">
Explain ETL
</button>

<button class="quick-question">
What is Analytics Engineering?
</button>

<button class="quick-question">
How does BigQuery work?
</button>

<button class="quick-question">
Explain Business Intelligence
</button>

<button class="quick-question">
What is a Data Warehouse?
</button>

<button class="quick-question">
How can AI help my business?
</button>

<button class="quick-question">
Show available Case Studies
</button>

</div>

</div>

</div>

<div
style="
padding:12px;
border-top:1px solid #e5e7eb;
display:flex;
gap:8px;
background:white;
">

<input

id="chatInput"

type="text"

placeholder="Ask about AI, Data Engineering, ETL, BI, BigQuery..."

style="
flex:1;
padding:10px;
border:1px solid #cbd5e1;
border-radius:8px;
outline:none;
font-size:14px;
"/>

<button

id="sendBtn"

style="
padding:10px 16px;
background:#2563eb;
color:white;
border:none;
border-radius:8px;
cursor:pointer;
font-weight:600;
">

Ask AI

</button>

</div>

`;

// =====================================
// Open / Close
// =====================================

bubble.onclick = () => {

panel.style.display =
panel.style.display === "none"
? "block"
: "none";

};

document.body.appendChild(bubble);
document.body.appendChild(panel);

// =====================================
// Helper
// =====================================

function makeLinksClickable(text){

return text.replace(

/(https?:\/\/[^\s<]+)/g,

function(url){

const cleanUrl=url.replace(/[.,!?;:]+$/,'');

return `
<a
href="${cleanUrl}"
target="_blank"
style="
color:#2563eb;
font-weight:bold;
text-decoration:none;
">
${cleanUrl}
</a>
`;

}

);

}

// =====================================================
// PART 2 STARTS FROM HERE
// =====================================================

// =====================================
// CHAT LOGIC
// =====================================

setTimeout(() => {

const sendBtn =
document.getElementById("sendBtn");

const chatInput =
document.getElementById("chatInput");

const chatMessages =
document.getElementById("chatMessages");

let chatHistory = [];

// =====================================
// Quick Questions
// =====================================

document
.querySelectorAll(".quick-question")
.forEach(btn=>{

btn.onclick=()=>{

chatInput.value=btn.innerText;

sendBtn.click();

};

});

// =====================================
// Send Message
// =====================================

sendBtn.onclick = async ()=>{

const question =
chatInput.value.trim();

if(!question) return;

// User Message

chatMessages.innerHTML += `

<div
style="
margin-top:12px;
text-align:right;
">

<div
style="
display:inline-block;
background:#2563eb;
color:white;
padding:10px 14px;
border-radius:12px;
max-width:85%;
">

${question}

</div>

</div>

`;

chatInput.value="";

chatMessages.scrollTop=
chatMessages.scrollHeight;

try {

const response = await fetch(

"https://casestudy-ai-backend.onrender.com/chat",

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

message:question,

history:chatHistory

})

}

);


const data =
await response.json();

const answer =
data.answer || "No response.";

chatHistory.push({

role:"user",
content:question

});

chatHistory.push({

role:"assistant",
content:answer

});

// AI Message

chatMessages.innerHTML += `

<div
style="
margin-top:14px;
">

<div
style="
display:inline-block;
background:#f4f7fb;
padding:12px;
border-radius:12px;
max-width:90%;
border:1px solid #e5e7eb;
">

<div
style="
font-weight:700;
color:#2563eb;
margin-bottom:6px;
">

📊 DeTLeng Analytics AI

</div>

${makeLinksClickable(answer)}

</div>

</div>

`;

chatMessages.scrollTop=
chatMessages.scrollHeight;

}

catch(err){

chatMessages.innerHTML += `

<div
style="
margin-top:15px;
padding:12px;
background:#fff5f5;
border:1px solid #fecaca;
border-radius:10px;
color:#dc2626;
">

Unable to connect to the Analytics AI backend.

</div>

`;

}

chatMessages.scrollTop=
chatMessages.scrollHeight;

};

// =====================================
// ENTER KEY
// =====================================

chatInput.addEventListener(

"keypress",

function(e){

if(e.key==="Enter"){

sendBtn.click();

}

}

);

},500);

// =====================================
// END
// =====================================

})();
 
