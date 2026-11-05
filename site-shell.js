(function(){
  const path=location.pathname.toLowerCase();
  const current=path.includes('case-studies')||path.includes('/cs/')||path.includes('retail-sales')?'cases':path.includes('articles')?'articles':'home';
  const nav=document.querySelector('.detleng-nav');
  if(nav){
    nav.innerHTML=`<div class="site-nav-inner"><a class="site-brand" href="/index.html" aria-label="DeTLeng Case Studies home"><span class="site-brand-mark" aria-hidden="true">D</span><span class="site-brand-copy"><strong>DeTLeng Case Studies</strong><small>Systems, evidence, decisions</small></span></a><button class="menu-button" type="button" aria-expanded="false" aria-controls="site-menu">Menu</button><div class="site-menu" id="site-menu"><a href="/index.html" ${current==='home'?'aria-current="page"':''}>Home</a><a href="/case-studies.html" ${current==='cases'?'aria-current="page"':''}>Case Studies</a><a href="/articles.html" ${current==='articles'?'aria-current="page"':''}>Articles</a><a class="site-cta" href="https://automation.detleng.com/#desk" target="_blank" rel="noopener noreferrer" aria-label="Discuss at Automation Desk, opens in a new tab">Discuss at Automation Desk ↗</a></div></div>`;
    const button=nav.querySelector('.menu-button'),menu=nav.querySelector('.site-menu');
    button.addEventListener('click',()=>{const open=menu.classList.toggle('is-open');button.setAttribute('aria-expanded',String(open));});
  }
  document.querySelectorAll('a[href^="mailto:"]').forEach(a=>{const box=a.closest('div');if(box)box.classList.add('legacy-contact-hidden');else a.classList.add('legacy-contact-hidden');});
  document.querySelectorAll('.detleng-sticky-btn,.sticky-consultation,.consultation-button').forEach(el=>el.classList.add('legacy-contact-hidden'));
  if(!document.querySelector('.site-footer')){
    const footer=document.createElement('footer');footer.className='site-footer';
    footer.innerHTML=`<div class="footer-inner"><div class="footer-grid"><div><h2>DeTLeng Case Studies</h2><p>Practical data, analytics and AI systems—explained through evidence, architecture and honest build records.</p></div><div><h3>Explore</h3><div class="footer-links"><a href="/index.html">Home</a><a href="/case-studies.html">Case Studies</a><a href="/articles.html">Articles</a></div></div><div><h3>DeTLeng ecosystem</h3><div class="footer-links"><a href="https://www.detleng.com/" target="_blank" rel="noopener noreferrer">DeTLeng — Main website ↗</a><a href="https://lfds.detleng.com/" target="_blank" rel="noopener noreferrer">LFDS — Logic First Digital Solutions ↗</a><a href="https://network.detleng.com/" target="_blank" rel="noopener noreferrer">DeTLeng Network — Explore the network ↗</a></div></div><div><h3>Let’s talk</h3><p>Have a workflow or data problem that should work better? Start with the problem.</p><a href="https://automation.detleng.com/#desk" target="_blank" rel="noopener noreferrer" aria-label="Discuss at Automation Desk, opens in a new tab">Discuss at Automation Desk ↗</a></div></div><div class="footer-bottom"><span>casestudy.detleng.com</span><span>© ${new Date().getFullYear()} DeTLeng</span></div></div>`;
    document.body.appendChild(footer);
  }
})();
