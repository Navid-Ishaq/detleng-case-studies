(function () {

// =========================
// CHAT BUBBLE
// =========================

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

bubble.style.background =
"linear-gradient(135deg,#2563eb,#06b6d4)";

bubble.style.color = "white";

bubble.style.display = "flex";
bubble.style.alignItems = "center";
bubble.style.justifyContent = "center";

bubble.style.fontFamily =
"'Segoe UI',Arial,sans-serif";

bubble.style.cursor = "pointer";

bubble.style.userSelect = "none";

bubble.style.zIndex = "99999";

bubble.style.boxShadow =
"0 8px 22px rgba(37,99,235,.45)";

bubble.style.animation =
"aiPulse 1.8s infinite";


// Create animation

const style = document.createElement("style");

style.innerHTML = `

@keyframes aiPulse{

0%{

transform:scale(1);
box-shadow:0 0 12px rgba(37,99,235,.35);

}

50%{

transform:scale(1.12);
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
color:#1d4ed8;
cursor:pointer;
font-size:13px;
font-weight:600;
transition:.2s;

}

.quick-question:hover{

background:#2563eb;
color:white;

}

`;

document.head.appendChild(style);

  // =========================
  // CHAT PANEL
  // =========================

<div style="
background:#f8fbff;
padding:14px;
border-radius:10px;
margin-bottom:14px;
border:1px solid #dbeafe;
">

<div style="font-size:18px;font-weight:700;color:#2563eb;">
👋 Welcome to BI Tutor
</div>

<div style="margin-top:8px;">
Your AI Business Intelligence Assistant.
</div>

<div style="margin-top:10px;">
I can help you understand Data Engineering, Analytics, AI, Business Intelligence, ETL, BigQuery, Dashboards and real-world Case Studies.
</div>

<div style="
margin-top:14px;
font-weight:600;
color:#2563eb;
">
Try asking:
</div>

<div style="
display:flex;
flex-wrap:wrap;
gap:8px;
margin-top:10px;
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

  <div style="
      padding:10px;
      border-top:1px solid #ddd;
      display:flex;
      gap:8px;
  ">

    <input
      id="chatInput"
      type="text"
      placeholder="Ask anything about Data Engineering, BI, AI or Analytics..."
      style="
        flex:1;
        padding:8px;
        border:1px solid #ccc;
        border-radius:6px;
      "
    />

    <button
      id="sendBtn"
      style="
        padding:8px 12px;
        background:#2563eb;
        color:white;
        border:none;
        border-radius:6px;
        cursor:pointer;
      ">
      Ask AI
    </button>

  </div>
  `;

  // =========================
  // OPEN CLOSE
  // =========================

  bubble.onclick = () => {

    panel.style.display =
      panel.style.display === "none"
      ? "block"
      : "none";

  };

  document.body.appendChild(bubble);
  document.body.appendChild(panel);

  // =========================
  // CHAT LOGIC
  // =========================

function makeLinksClickable(text) {
  return text.replace(
    /(https?:\/\/[^\s<]+)/g,
    function(url) {

      const cleanUrl = url.replace(/[.,!?;:]+$/, '');

      return `<a href="${cleanUrl}" target="_blank"
        style="color:#2563eb;font-weight:bold;">
        ${cleanUrl}
      </a>`;
    }
  );
}

  setTimeout(() => {

    const sendBtn =
      document.getElementById("sendBtn");

    const chatInput =
      document.getElementById("chatInput");

    const chatMessages =
      document.getElementById("chatMessages");
      let chatHistory = [];

    sendBtn.onclick = async () => {

      const question = chatInput.value.trim();

      if (!question) return;

      chatMessages.innerHTML += `
        <div style="margin-top:10px;">
          <b>You:</b> ${question}
        </div>

document
.querySelectorAll(".quick-question")
.forEach(btn=>{

btn.onclick=()=>{

chatInput.value=btn.innerText;

sendBtn.click();

};

});      
        
      `;

      chatInput.value = "";

      try {

        const response = await fetch(
          "https://aapkaustaad-ai-backend.onrender.com/chat",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
               message: question,
               domain: window.location.origin,
               history: chatHistory
            })
          }
        );

        const data = await response.json();

const answer = data.answer || "";
        chatHistory.push({
    role: "user",
    content: question
});

chatHistory.push({
    role: "assistant",
    content: answer
});

chatMessages.innerHTML += `
  <div style="
    margin-top:10px;
    padding:8px;
    background:#f7f7f7;
    border-radius:8px;
  ">
    <b>📊 DeTLeng Analytics AI:</b><br>
    ${makeLinksClickable(answer)}
  </div>
`;

if (data.whatsapp) {

  chatMessages.innerHTML += `
    <div style="margin-top:12px;">

      <a href="${data.whatsapp}"
         target="_blank"
         style="
            display:inline-block;
            background:#25D366;
            color:white;
            padding:10px 18px;
            border-radius:8px;
            text-decoration:none;
            font-weight:bold;
        ">

        📩 Request a Free Consultation

      </a>

    </div>
  `;

}

chatMessages.scrollTop = chatMessages.scrollHeight;
            
      

      } catch (err) {

        chatMessages.innerHTML += `
          <div style="
            color:red;
            margin-top:10px;
          ">
            Unable to connect to the DeTLeng AI service. Please try again later.
          </div>
        `;

      }

      chatMessages.scrollTop =
        chatMessages.scrollHeight;
    };

    chatInput.addEventListener(
      "keypress",
      function(e){

        if(e.key === "Enter"){
          sendBtn.click();
        }

      }
    );

  }, 500);

})();
