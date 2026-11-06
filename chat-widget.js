(function () {
  const API = "https://casestudy-ai-backend.onrender.com";
  const style = document.createElement("style");
  style.textContent = `
  .dt-ai-launcher{position:fixed;right:22px;bottom:22px;z-index:999999;border:0;border-radius:999px;background:linear-gradient(135deg,#155eef,#087f78);color:#fff;padding:13px 18px;display:flex;align-items:center;gap:9px;font:800 15px/1.2 Inter,"Segoe UI",Arial,sans-serif;box-shadow:0 12px 30px rgba(21,94,239,.28);cursor:pointer}.dt-ai-launcher:hover{transform:translateY(-2px)}
  .dt-ai-panel{position:fixed;right:22px;bottom:88px;z-index:999999;width:min(470px,calc(100vw - 28px));height:min(700px,calc(100vh - 112px));display:none;grid-template-rows:auto auto 1fr auto;background:#fff;border:1px solid #cedde5;border-radius:18px;overflow:hidden;box-shadow:0 24px 70px rgba(18,48,70,.24);font-family:Inter,"Segoe UI",Arial,sans-serif;color:#17384d}.dt-ai-panel.is-open{display:grid}.dt-ai-head{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:15px 17px;background:#143b57;color:#fff}.dt-ai-title{font-size:16px;font-weight:900}.dt-ai-close{border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.1);color:#fff;width:36px;height:36px;border-radius:9px;font-size:20px;font-weight:800;cursor:pointer}.dt-ai-context{padding:11px 16px;background:#edf7f4;border-bottom:1px solid #d7e8e2;font-size:14px;line-height:1.5;color:#234f49}.dt-ai-context a{color:#075f59;font-weight:900}.dt-ai-messages{overflow-y:auto;padding:16px;background:#fbfdfe}.dt-ai-welcome{background:#fff;border:1px solid #dce7ed;border-radius:14px;padding:16px}.dt-ai-welcome h2{font-size:20px!important;color:#155eef!important;margin:0 0 8px!important}.dt-ai-welcome p{font-size:15px!important;line-height:1.6!important;color:#3d596a!important}.dt-ai-questions{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}.quick-question{padding:8px 11px;border:1px solid #cfe0ee;border-radius:999px;background:#f1f7ff;color:#114eac;cursor:pointer;font-size:13px;font-weight:800}.dt-ai-message{margin-top:14px}.dt-ai-user{text-align:right}.dt-ai-bubble{display:inline-block;max-width:90%;padding:11px 14px;border-radius:12px}.dt-ai-user .dt-ai-bubble{background:#155eef;color:#fff}.dt-ai-assistant .dt-ai-bubble{background:#f4f7fb;border:1px solid #dce7ed;text-align:left}.dt-ai-speaker{font-weight:850;color:#155eef;margin-bottom:7px}.dt-ai-answer{font-size:15px;line-height:1.58;color:#17384d}.dt-ai-answer h3{font-size:16px!important;margin:13px 0 5px!important;color:#17384d!important}.dt-ai-answer ul{margin:7px 0;padding-left:21px}.dt-ai-answer p{margin:0 0 9px}.dt-ai-error{background:#fff5f5!important;border-color:#fecaca!important;color:#9f261e!important}.dt-ai-wait{display:block!important;max-width:100%!important;background:#f4f2ff!important;border:1px solid #c8c1ff!important}.dt-ai-wait-row{display:grid;grid-template-columns:auto 1fr;gap:12px;align-items:center}.dt-ai-spinner{width:24px;height:24px;border:3px solid #d6d1ff;border-top-color:#6657e8;border-radius:50%;animation:dtspin .85s linear infinite}.dt-ai-wait strong{display:block;color:#263b64;margin-bottom:3px}.dt-ai-elapsed{color:#4c5f86;font-weight:750}.dt-ai-thanks{margin:9px 0 0;color:#4c5f86;line-height:1.5}.dt-ai-cancel{margin-top:11px;padding:7px 10px;border:1px solid #b9b1ef;border-radius:8px;background:#fff;color:#3e347f;font-weight:800;cursor:pointer}.dt-ai-form{padding:12px;border-top:1px solid #dce7ed;display:flex;gap:8px;background:#fff}.dt-ai-form input{min-width:0;flex:1;padding:11px;border:1px solid #9fb8c7;border-radius:9px;font-size:15px;color:#17384d}.dt-ai-form button{padding:10px 15px;border:0;border-radius:9px;background:#155eef;color:#fff;font-weight:800;cursor:pointer}.dt-ai-form button:disabled{opacity:.58;cursor:wait}@keyframes dtspin{to{transform:rotate(360deg)}}
  @media(max-width:560px){.dt-ai-launcher{right:14px;bottom:14px}.dt-ai-panel{right:14px;bottom:76px;height:calc(100vh - 92px)}.dt-ai-title{font-size:14px}.dt-ai-form{flex-wrap:wrap}.dt-ai-form button{width:100%}}
  @media(prefers-reduced-motion:reduce){.dt-ai-launcher{transition:none}.dt-ai-spinner{animation:none}}
  `;
  document.head.appendChild(style);

  const launcher = document.createElement("button");
  launcher.type = "button";
  launcher.className = "dt-ai-launcher";
  launcher.setAttribute("aria-expanded", "false");
  launcher.setAttribute("aria-controls", "dt-ai-panel");
  launcher.innerHTML = '<span aria-hidden="true">📊</span><span>Ask Analytics AI</span>';

  const panel = document.createElement("section");
  panel.id = "dt-ai-panel";
  panel.className = "dt-ai-panel";
  panel.setAttribute("aria-label", "DeTLeng Analytics AI — Case Study CS-003");
  panel.innerHTML = `<div class="dt-ai-head"><div class="dt-ai-title">📊 DeTLeng Analytics AI — Case Study CS-003</div><button class="dt-ai-close" type="button" aria-label="Close Analytics AI">×</button></div><div class="dt-ai-context">This assistant belongs to Case Study CS-003. <a href="/ai-tasks.html">Explore all 100 AI analytics tasks →</a></div><div id="chatMessages" class="dt-ai-messages" aria-live="polite"><div class="dt-ai-welcome"><h2>Ask verified questions</h2><p>Explore the CS-003 architecture or request analytics supported by the connected BigQuery tools.</p><strong>Try asking</strong><div class="dt-ai-questions"><button class="quick-question" data-prompt="Show total revenue and explain what it means.">Total revenue</button><button class="quick-question" data-prompt="Show the total product count and a concise analysis.">Total products</button><button class="quick-question" data-prompt="Which KPIs are available?">Available KPIs</button></div></div></div><div class="dt-ai-form"><input id="chatInput" type="text" aria-label="Question for DeTLeng Analytics AI" placeholder="Ask about the CS-003 analytics system..."><button id="sendBtn" type="button">Ask AI</button></div>`;
  document.body.append(launcher, panel);

  const input = panel.querySelector("#chatInput");
  const sendButton = panel.querySelector("#sendBtn");
  const messages = panel.querySelector("#chatMessages");
  let history = [];
  let activeController = null;
  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[char]);

  function renderMarkdown(value) {
    let html = escapeHtml(value).replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>').replace(/^###\s+(.+)$/gm, "<h3>$1</h3>").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    const output = []; let list = false;
    html.split("\n").forEach(line => { if (/^[-*]\s+/.test(line)) { if (!list) { output.push("<ul>"); list = true; } output.push(`<li>${line.replace(/^[-*]\s+/, "")}</li>`); } else { if (list) { output.push("</ul>"); list = false; } if (line.trim() && !line.startsWith("<h3>")) output.push(`<p>${line}</p>`); else output.push(line); } });
    if (list) output.push("</ul>"); return output.join("");
  }

  function toggle(force) { const open = force !== undefined ? force : !panel.classList.contains("is-open"); panel.classList.toggle("is-open", open); launcher.setAttribute("aria-expanded", String(open)); if (open) input.focus(); }
  function prefill(prompt) { toggle(true); input.value = prompt; input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
  function waitingMessage(seconds) { if (seconds >= 60) return "The first request can take longer while the free Render service starts."; if (seconds >= 30) return "Still gathering verified evidence—thank you for your patience."; if (seconds >= 8) return "The analytics service may be waking up. Please keep this page open."; return "Connecting to the verified analytics service…"; }

  async function sendQuestion() {
    const question = input.value.trim(); if (!question || activeController) return;
    messages.insertAdjacentHTML("beforeend", `<div class="dt-ai-message dt-ai-user"><div class="dt-ai-bubble">${escapeHtml(question)}</div></div>`);
    input.value = ""; sendButton.disabled = true; sendButton.textContent = "Working…"; activeController = new AbortController();
    const waitId = `dt-wait-${Date.now()}`;
    messages.insertAdjacentHTML("beforeend", `<div class="dt-ai-message dt-ai-assistant" id="${waitId}"><div class="dt-ai-bubble dt-ai-wait"><div class="dt-ai-wait-row"><span class="dt-ai-spinner" aria-hidden="true"></span><div><strong class="dt-ai-wait-status">Connecting to the verified analytics service…</strong><span class="dt-ai-elapsed">0 seconds elapsed</span></div></div><p class="dt-ai-thanks">Thank you for your patience. The AI is checking the connected evidence before answering.</p><button type="button" class="dt-ai-cancel">Cancel request</button></div></div>`);
    const waitElement = document.getElementById(waitId); const started = Date.now();
    waitElement.querySelector(".dt-ai-cancel").addEventListener("click", () => activeController && activeController.abort());
    const timer = window.setInterval(() => { const elapsed = Math.floor((Date.now() - started) / 1000); waitElement.querySelector(".dt-ai-elapsed").textContent = `${elapsed} second${elapsed === 1 ? "" : "s"} elapsed`; waitElement.querySelector(".dt-ai-wait-status").textContent = waitingMessage(elapsed); }, 1000);
    messages.scrollTop = messages.scrollHeight;
    try {
      const response = await fetch(`${API}/chat`, {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:question,history}),signal:activeController.signal});
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json(); const answer = data.answer || "No response was returned.";
      history.push({role:"user",content:question},{role:"assistant",content:answer});
      waitElement.insertAdjacentHTML("afterend", `<div class="dt-ai-message dt-ai-assistant"><div class="dt-ai-bubble ${data.status === "error" ? "dt-ai-error" : ""}"><div class="dt-ai-speaker">📊 DeTLeng Analytics AI — CS-003</div><div class="dt-ai-answer">${renderMarkdown(answer)}</div></div></div>`);
    } catch (error) {
      const message = error.name === "AbortError" ? "Request cancelled. Your question remains available to try again." : "The Analytics AI service is still waking up or temporarily unavailable. Please wait a few seconds and try again.";
      waitElement.insertAdjacentHTML("afterend", `<div class="dt-ai-message dt-ai-assistant"><div class="dt-ai-bubble dt-ai-error">${message}</div></div>`);
      if (error.name === "AbortError") input.value = question;
    } finally {
      window.clearInterval(timer); waitElement.remove(); activeController = null; sendButton.disabled = false; sendButton.textContent = "Ask AI"; messages.scrollTop = messages.scrollHeight;
    }
  }

  launcher.addEventListener("click", () => toggle());
  panel.querySelector(".dt-ai-close").addEventListener("click", () => toggle(false));
  panel.addEventListener("click", event => { const button = event.target.closest("[data-prompt]"); if (button) prefill(button.dataset.prompt); });
  document.addEventListener("keydown", event => { if (event.key === "Escape") toggle(false); });
  sendButton.addEventListener("click", sendQuestion);
  input.addEventListener("keydown", event => { if (event.key === "Enter") sendQuestion(); });
  window.detlengAnalyticsAI = {open: () => toggle(true), prefill};

  // Wake both free Render services in the background before the visitor asks.
  fetch(`${API}/warmup`, {method:"GET",mode:"cors"}).catch(() => {});
})();
