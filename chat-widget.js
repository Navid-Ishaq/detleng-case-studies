(function () {
  const API = "https://detleng-case-studies.onrender.com";
  const style = document.createElement("style");
  style.textContent = `
  .dt-ai-proofsql-button{display:block;margin-top:12px;padding:10px 13px;border:1px solid #126b65;border-radius:9px;background:#eaf8f3;color:#07534d;font:800 13px/1.3 Inter,"Segoe UI",Arial,sans-serif;cursor:pointer}.dt-ai-proofsql-button:hover{background:#d8f4e8}.dt-ai-proofsql-button:disabled{opacity:.62;cursor:progress}
  .dt-ai-retry{margin-top:8px;padding:8px 12px;border:1px solid #a4bad1;border-radius:8px;background:#fff;color:#155eef;font-weight:800;cursor:pointer}
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
  let selectedTool = null;
  let selectedTaskNumber = null;
  let lastFocus = null;
  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[char]);

  function renderMarkdown(value) {
    let html = escapeHtml(value).replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>').replace(/^###\s+(.+)$/gm, "<h3>$1</h3>").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    const output = []; let list = false;
    html.split("\n").forEach(line => { if (/^[-*]\s+/.test(line)) { if (!list) { output.push("<ul>"); list = true; } output.push(`<li>${line.replace(/^[-*]\s+/, "")}</li>`); } else { if (list) { output.push("</ul>"); list = false; } if (line.trim() && !line.startsWith("<h3>")) output.push(`<p>${line}</p>`); else output.push(line); } });
    if (list) output.push("</ul>"); return output.join("");
  }

  function toggle(force) { const open = force !== undefined ? force : !panel.classList.contains("is-open"); if (open && !panel.classList.contains("is-open")) lastFocus = document.activeElement; panel.classList.toggle("is-open", open); document.body.classList.toggle("dt-ai-open", open); launcher.setAttribute("aria-expanded", String(open)); if (open) input.focus(); else { if (activeController) activeController.abort(); if (lastFocus && lastFocus.isConnected) lastFocus.focus(); else launcher.focus(); } }
  function prefill(prompt, tool, taskNumber) { toggle(true); selectedTool = tool || null; selectedTaskNumber = Number.isInteger(taskNumber) && taskNumber > 0 ? taskNumber : null; input.value = prompt; input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
  function waitingMessage(seconds) { if (seconds >= 60) return "The first request can take longer while the free Render service starts."; if (seconds >= 30) return "Still gathering verified evidence—thank you for your patience."; if (seconds >= 8) return "The analytics service may be waking up. Please keep this page open."; return "Connecting to the verified analytics service…"; }

  const COLD_START_MS = 95000;
  const sleep = (ms, signal) => new Promise((resolve, reject) => {
    if (signal.aborted) return reject(new DOMException("Cancelled", "AbortError"));
    const onAbort = () => { clearTimeout(timer); reject(new DOMException("Cancelled", "AbortError")); };
    const timer = setTimeout(() => { signal.removeEventListener("abort", onAbort); resolve(); }, ms);
    signal.addEventListener("abort", onAbort, {once:true});
  });
  async function requestWithTimeout(url, options, ms, signal) {
    const controller = new AbortController();
    const abort = () => controller.abort();
    signal.addEventListener("abort", abort, {once:true});
    const timer = setTimeout(() => controller.abort(), ms);
    try { return await fetch(url, {...options, signal:controller.signal}); }
    finally { clearTimeout(timer); signal.removeEventListener("abort", abort); }
  }
  async function wake(signal, started) {
    let count = 0;
    while (Date.now() - started < COLD_START_MS) {
      if (signal.aborted) throw new DOMException("Cancelled", "AbortError");
      const remaining = COLD_START_MS - (Date.now()-started);
      try {
        const response = await requestWithTimeout(`${API}/warmup`, {method:"GET",mode:"cors"}, Math.min(20000,remaining),signal);
        if (response.ok) {
          const state = await response.json();
          if (state.status === "ready") return;
          if (state.status === "unavailable") throw new Error("Service configuration unavailable");
        }
      } catch (error) {
        if (signal.aborted) throw error;
        if (error.message === "Service configuration unavailable") throw error;
      }
      count++;
      await sleep(Math.min(7000, 900*Math.pow(1.6, Math.min(count,5)), COLD_START_MS-(Date.now()-started)),signal);
    }
    throw new Error("Cold-start recovery window expired");
  }
  async function sendQuestion() {
    const question = input.value.trim(); if (!question || activeController) return;
    const tool = selectedTool; const taskNumber = selectedTaskNumber; selectedTool = null; selectedTaskNumber = null;
    messages.insertAdjacentHTML("beforeend", `<div class="dt-ai-message dt-ai-user"><div class="dt-ai-bubble">${escapeHtml(question)}</div></div>`);
    input.value = ""; sendButton.disabled = true; sendButton.textContent = "Working…";
    const controller = new AbortController(); activeController = controller;
    const waitElement = document.createElement("div"); waitElement.className = "dt-ai-message dt-ai-assistant";
    waitElement.innerHTML = `<div class="dt-ai-bubble dt-ai-wait"><div class="dt-ai-wait-row"><span class="dt-ai-spinner" aria-hidden="true"></span><div><strong class="dt-ai-wait-status">Connecting to the verified analytics service…</strong><span class="dt-ai-elapsed">0 seconds elapsed</span></div></div><p class="dt-ai-thanks">Thank you for your patience. Your original question will be submitted automatically.</p><button type="button" class="dt-ai-cancel">Cancel request</button></div>`;
    messages.append(waitElement);
    waitElement.querySelector(".dt-ai-cancel").addEventListener("click", () => controller.abort());
    const started = Date.now();
    const timer = setInterval(() => { const elapsed=Math.floor((Date.now()-started)/1000); waitElement.querySelector(".dt-ai-elapsed").textContent=`${elapsed} seconds elapsed`; waitElement.querySelector(".dt-ai-wait-status").textContent=waitingMessage(elapsed); },1000);
    messages.scrollTop=messages.scrollHeight;
    try {
      await wake(controller.signal, started);
      let data;
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const response = await requestWithTimeout(`${API}/chat`, {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:question,history,tool})}, 65000,controller.signal);
          if (!response.ok) {
            const retryable = [429,502,503,504].includes(response.status);
            if (retryable && attempt === 0) { await sleep(1600, controller.signal); continue; }
            throw new Error(`HTTP ${response.status}`);
          }
          data = await response.json();
          if (data.status !== "success" && data.code === "temporary_upstream_failure" && attempt === 0) {
            await sleep(1600, controller.signal); continue;
          }
          break;
        } catch (error) {
          if (controller.signal.aborted || attempt !== 0 || error.message.startsWith("HTTP 4")) throw error;
          await sleep(1600, controller.signal);
        }
      }
      if (!data || data.status !== "success") throw new Error(data?.answer || "The analytics service could not answer this question.");
      const answer = data.answer || "No response was returned.";
      history.push({role:"user",content:question},{role:"assistant",content:answer});
      waitElement.insertAdjacentHTML("afterend", `<div class="dt-ai-message dt-ai-assistant"><div class="dt-ai-bubble"><div class="dt-ai-speaker">📊 DeTLeng Analytics AI — CS-003</div><div class="dt-ai-answer">${renderMarkdown(answer)}</div></div></div>`);
      // Keep the original answer unchanged. Only attach verification when the
      // backend supplies exact numeric KPI evidence for this allowlisted tool.
      const answerElement = waitElement.nextElementSibling;
      const evidence = data.verification;
      if (evidence && evidence.tool && evidence.metrics && (!tool || evidence.tool === tool)) {
        const supported = ["total_revenue","total_orders","total_products","product_count","average_order_value","delivery_success_rate","on_time_deliveries","executive_dashboard","business_summary","sales_summary","delivery_summary"];
        if (supported.includes(evidence.tool) || Array.isArray(evidence.records)) {
          const verifyButton = document.createElement("button");
          verifyButton.type = "button";
          verifyButton.className = "dt-ai-proofsql-button";
          verifyButton.textContent = "⚖ Verify with SQL";
          verifyButton.setAttribute("aria-label", "Verify this AI result using independent browser SQL");
          answerElement.querySelector(".dt-ai-bubble").appendChild(verifyButton);
          verifyButton.addEventListener("click", async () => {
            verifyButton.disabled = true;
            const oldLabel = verifyButton.textContent;
            verifyButton.textContent = "Opening ProofSQL…";
            try {
              const module = await import("/proofsql/engine/proofsql-verifier.js");
              await module.openVerification({
                tool: evidence.tool, taskNumber, originalAnswer: answer,
                evidence, trigger: verifyButton,
              });
            } catch (error) {
              console.error("ProofSQL popup could not open", error);
              window.alert("ProofSQL could not open. Check your connection and retry.");
            } finally {
              verifyButton.disabled = false;
              verifyButton.textContent = oldLabel;
            }
          });
        }
      }
    } catch (error) {
      input.value = question; selectedTool = tool; selectedTaskNumber = taskNumber;
      const cancelled = controller.signal.aborted;
      const errorElement=document.createElement("div");errorElement.className="dt-ai-message dt-ai-assistant";
      errorElement.innerHTML=`<div class="dt-ai-bubble dt-ai-error"><p>${cancelled ? "Request cancelled. Your question is ready to retry." : "The request could not be completed automatically. Your question has been preserved."}</p>${cancelled ? "" : '<button type="button" class="dt-ai-retry">Retry original question</button>'}</div>`;
      waitElement.after(errorElement);
      const retry=errorElement.querySelector(".dt-ai-retry"); if (retry) retry.addEventListener("click", () => { errorElement.remove();sendQuestion(); });
    } finally {
      clearInterval(timer);waitElement.remove();activeController=null;sendButton.disabled=false;sendButton.textContent="Ask AI";messages.scrollTop=messages.scrollHeight;
    }
  }

  launcher.addEventListener("click", () => toggle());
  panel.querySelector(".dt-ai-close").addEventListener("click", () => toggle(false));
  panel.addEventListener("click", event => { const button = event.target.closest("[data-prompt]"); if (button) prefill(button.dataset.prompt); });
  document.addEventListener("keydown", event => { if (event.key === "Escape") toggle(false); });
  sendButton.addEventListener("click", sendQuestion);
  input.addEventListener("keydown", event => { if (event.key === "Enter") sendQuestion(); });
  panel.addEventListener("keydown", event => {
    if (event.key !== "Tab" || !panel.classList.contains("is-open")) return;
    const focusable = [...panel.querySelectorAll('a[href],button:not([disabled]),input:not([disabled])')];
    if (!focusable.length) return;
    const first=focusable[0], last=focusable[focusable.length-1];
    if (event.shiftKey && document.activeElement === first) {event.preventDefault();last.focus();}
    else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
  });
  window.detlengAnalyticsAI = {open: () => toggle(true), prefill};

  // No background wake storm: wake the single service only when a question is sent.
})();
