const app = document.getElementById('app');

// Textarea auto-resize
const textarea = document.querySelector('.input-field');
textarea.addEventListener('input', () => {
  textarea.style.height = 'auto';
  textarea.style.height = Math.min(textarea.scrollHeight, 130) + 'px';
});

// Chips → textarea
document.querySelectorAll('.suggestion-chip').forEach(chip => {
  chip.addEventListener('click', () => { textarea.value = chip.textContent.trim(); textarea.focus(); });
});

// Chat title dropdown
const titleBtn = document.getElementById('topbar-title-btn');
const titleDropdown = document.getElementById('topbar-title-dropdown');
titleBtn.addEventListener('click', e => {
  e.stopPropagation();
  const open = titleDropdown.classList.toggle('open');
  titleBtn.classList.toggle('open', open);
});
document.addEventListener('click', e => {
  if (!titleDropdown.contains(e.target) && !titleBtn.contains(e.target)) {
    titleDropdown.classList.remove('open');
    titleBtn.classList.remove('open');
  }
});

// Chat items → chat title
document.querySelectorAll('.chat-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.chat-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    const t = item.querySelector('.chat-item-title');
    if (t) document.getElementById('topbar-title').textContent = t.textContent;
  });
});

// Profile amber arc
(function() {
  const TOTAL=44, RING_W=2.5, CENTER=22, RADIUS=22-RING_W/2-1;
  const PROGRESS=0.38, AMBER='#E8960A', TRACK='rgba(200,120,32,0.18)';
  const canvas = document.getElementById('pb-canvas');
  if (!canvas) return;
  canvas.width=TOTAL; canvas.height=TOTAL;
  canvas.style.width=TOTAL+'px'; canvas.style.height=TOTAL+'px';
  function draw(p, hovered) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,TOTAL,TOTAL);
    const tau=Math.PI*2, start=-Math.PI/2;
    ctx.beginPath(); ctx.arc(CENTER,CENTER,RADIUS,0,tau);
    ctx.strokeStyle=TRACK; ctx.lineWidth=RING_W; ctx.stroke();
    if (p>0) {
      const end=start+tau*p;
      ctx.beginPath(); ctx.arc(CENTER,CENTER,RADIUS,start,end);
      ctx.strokeStyle=AMBER; ctx.lineWidth=RING_W; ctx.lineCap='round'; ctx.stroke();
    }
    if (hovered) {
      ctx.beginPath(); ctx.arc(CENTER,CENTER,RADIUS,0,tau);
      ctx.strokeStyle='rgba(232,150,10,0.22)'; ctx.lineWidth=RING_W*3; ctx.stroke();
    }
  }
  const t0=performance.now();
  function animate(now) {
    const p=PROGRESS*(1-Math.pow(1-Math.min((now-t0)/900,1),3));
    draw(p,false);
    if (p<PROGRESS) requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
  const wrap=document.getElementById('avatar-btn');
  wrap.addEventListener('mouseenter',()=>draw(PROGRESS,true));
  wrap.addEventListener('mouseleave',()=>draw(PROGRESS,false));
})();

// Avatar dropdown
const avatarBtn=document.getElementById('avatar-btn');
const avatarDropdown=document.getElementById('avatar-dropdown');
avatarBtn.addEventListener('click', e=>{ e.stopPropagation(); avatarDropdown.classList.toggle('open'); });
document.addEventListener('click', ()=>avatarDropdown.classList.remove('open'));

// Views menu (formerly services)
const viewsMenuBtn=document.getElementById('views-menu-btn');
const viewsOverlay=document.getElementById('views-overlay');
const viewsOverlayClose=document.getElementById('views-overlay-close');

viewsMenuBtn.addEventListener('click', e=>{
  e.stopPropagation();
  const isOpen = viewsOverlay.classList.toggle('open');
  viewsMenuBtn.classList.toggle('menu-open', isOpen);
});
viewsOverlayClose.addEventListener('click', ()=>{
  viewsOverlay.classList.remove('open');
  viewsMenuBtn.classList.remove('menu-open');
});
document.addEventListener('click', e=>{
  if (!viewsOverlay.contains(e.target) && !viewsMenuBtn.contains(e.target)) {
    viewsOverlay.classList.remove('open');
    viewsMenuBtn.classList.remove('menu-open');
  }
});

// Column layout
let viewWidth=360;
function applyColumns() {
  const sw = app.classList.contains('sidebar-collapsed') ? 48 : 212;
  const collapsed = app.classList.contains('outer-collapsed');
  const ow = collapsed ? 0 : viewWidth;
  document.documentElement.style.setProperty('--sidebar-w', sw + 'px');
  document.documentElement.style.setProperty('--artifact-w', ow + 'px');
  app.style.gridTemplateColumns = sw + 'px 1fr ' + ow + 'px';
}
applyColumns();

// Sidebar toggle
document.getElementById('sidebar-toggle').addEventListener('click', () => {
  const c=app.classList.toggle('sidebar-collapsed');
  document.querySelector('#sidebar-toggle .icon-expanded').style.display=c?'none':'';
  document.querySelector('#sidebar-toggle .icon-collapsed').style.display=c?'':'none';
  applyColumns();
});

// Rename
document.getElementById('ttd-rename').addEventListener('click', () => {
  titleDropdown.classList.remove('open'); titleBtn.classList.remove('open');
  const span = document.getElementById('topbar-title');
  const current = span.textContent;
  const input = document.createElement('input');
  input.value = current;
  input.style.cssText = 'font-family:Outfit;font-size:13px;font-weight:400;color:var(--t0);border:none;outline:none;background:transparent;width:220px;padding:0';
  span.replaceWith(input);
  input.focus(); input.select();
  const finish = () => {
    const newSpan = document.createElement('span');
    newSpan.id = 'topbar-title';
    newSpan.textContent = input.value || current;
    input.replaceWith(newSpan);
  };
  input.addEventListener('blur', finish);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') input.blur(); if (e.key === 'Escape') { input.value = current; input.blur(); } });
});

// Star
document.getElementById('ttd-star').addEventListener('click', () => {
  titleDropdown.classList.remove('open'); titleBtn.classList.remove('open');
  const svg = document.querySelector('#ttd-star svg');
  const starred = svg.getAttribute('fill') === '#C87820';
  svg.setAttribute('fill', starred ? 'none' : '#C87820');
  svg.setAttribute('stroke', starred ? 'currentColor' : '#C87820');
});

// Delete
document.getElementById('ttd-delete').addEventListener('click', () => {
  titleDropdown.classList.remove('open'); titleBtn.classList.remove('open');
  if (confirm('Delete this conversation?')) { document.getElementById('topbar-title').textContent = 'New conversation'; }
});

// Assign
document.getElementById('ttd-assign').addEventListener('click', () => {
  titleDropdown.classList.remove('open'); titleBtn.classList.remove('open');
});

// View toggle (collapse/expand right panel)
const viewToggle=document.getElementById('view-toggle');
function setOuter(collapsed) {
  app.classList.toggle('outer-collapsed', collapsed);
  viewToggle.querySelector('.icon-expanded').style.display = collapsed ? 'none' : '';
  viewToggle.querySelector('.icon-collapsed').style.display = collapsed ? '' : 'none';
  applyColumns();
}
viewToggle.addEventListener('click', () => setOuter(!app.classList.contains('outer-collapsed')));

// Swap panels
document.getElementById('swap-btn').addEventListener('click', () => {
  app.classList.toggle('swapped');
  app.classList.remove('outer-collapsed');
  viewToggle.querySelector('.icon-expanded').style.display = '';
  viewToggle.querySelector('.icon-collapsed').style.display = 'none';
  applyColumns();
});

// Resize handle
const resizeHandle = document.getElementById('resize-handle');
let isResizing = false, startX = 0, startWidth = 0;
resizeHandle.addEventListener('mousedown', e => {
  if (app.classList.contains('outer-collapsed')) return;
  isResizing = true;
  startX = e.clientX;
  startWidth = viewWidth;
  resizeHandle.classList.add('dragging');
  document.body.style.cursor = 'col-resize';
  document.body.style.userSelect = 'none';
  e.preventDefault();
});
document.addEventListener('mousemove', e => {
  if (!isResizing) return;
  viewWidth = Math.max(280, Math.min(700, startWidth - (e.clientX - startX)));
  applyColumns();
});
document.addEventListener('mouseup', () => {
  if (!isResizing) return;
  isResizing = false;
  resizeHandle.classList.remove('dragging');
  document.body.style.cursor = '';
  document.body.style.userSelect = '';
});

// Chips carousel
const track=document.getElementById('chips-track');
const prevBtn=document.getElementById('carousel-prev');
const nextBtn=document.getElementById('carousel-next');
let offset=0;
function updateCarousel() {
  const max=Math.max(0,track.scrollWidth-track.parentElement.offsetWidth);
  offset=Math.max(0,Math.min(offset,max));
  track.style.transform='translateX(-'+offset+'px)';
  prevBtn.disabled=offset<=0; nextBtn.disabled=offset>=max;
}
prevBtn.addEventListener('click',()=>{ offset-=150; updateCarousel(); });
nextBtn.addEventListener('click',()=>{ offset+=150; updateCarousel(); });
window.addEventListener('resize',()=>{ offset=0; updateCarousel(); });
updateCarousel();

// Mobile preview
const mobileOverlay=document.getElementById('mobile-overlay');
document.getElementById('mobile-btn').addEventListener('click', ()=>{ mobileOverlay.classList.toggle('active'); });
document.getElementById('mobile-close')?.addEventListener('click', ()=>{ mobileOverlay.classList.remove('active'); });
document.querySelectorAll('.mobile-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.mobile-tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.mobile-panel').forEach(p=>p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById(tab.dataset.panel).classList.add('active');
  });
});

// Views switcher
const views = {
  'view-01': {
    tag: 'View 01', title: 'Contact Info',
    content: `
      <div class="view01">
        <div class="view01-header">
          <div class="view01-eyebrow">Contact Information</div>
          <div class="view01-title">Profile Details</div>
        </div>
        <div class="view01-form">
          <div class="view01-field">
            <label class="view01-label">Phone Number</label>
            <div class="view01-input-wrap">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <input class="view01-input" type="tel" placeholder="+1 (555) 000-0000" id="contact-phone" />
            </div>
          </div>
          <div class="view01-field">
            <label class="view01-label">Email Address</label>
            <div class="view01-input-wrap">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <input class="view01-input" type="email" placeholder="you@example.com" id="contact-email" />
            </div>
          </div>
          <div class="view01-field">
            <label class="view01-label">Address</label>
            <div class="view01-input-wrap view01-textarea-wrap">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-top:3px"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <textarea class="view01-input view01-textarea" placeholder="123 Main St, City, State, ZIP" id="contact-address" rows="3"></textarea>
            </div>
          </div>
          <button class="view01-save-btn" id="view01-save">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Save Contact Info
          </button>
          <div class="view01-saved" id="view01-saved" style="display:none">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            Saved
          </div>
        </div>
      </div>
    `
  },
  'view-02': { tag: 'View 02', title: 'View 02', content: `<div class="plan-header"><div class="plan-eyebrow">—</div><div class="plan-name">—</div><div class="plan-stats-row"><div class="plan-stat"><span class="plan-stat-val">38%</span><span class="plan-stat-lbl">Complete</span></div><div class="plan-stat"><span class="plan-stat-val">5</span><span class="plan-stat-lbl">Current wk</span></div><div class="plan-stat"><span class="plan-stat-val">91</span><span class="plan-stat-lbl">Days left</span></div><div class="plan-stat"><span class="plan-stat-val">3</span><span class="plan-stat-lbl">Pillars</span></div></div></div>` },
  'view-03': { tag: 'View 03', title: 'View 03', content: `<div class="plan-header"><div class="plan-eyebrow">—</div><div class="plan-name">—</div><div class="plan-stats-row"><div class="plan-stat"><span class="plan-stat-val">6</span><span class="plan-stat-lbl">Done</span></div><div class="plan-stat"><span class="plan-stat-val">1</span><span class="plan-stat-lbl">Active</span></div><div class="plan-stat"><span class="plan-stat-val">2</span><span class="plan-stat-lbl">Pending</span></div><div class="plan-stat"><span class="plan-stat-val">67%</span><span class="plan-stat-lbl">Progress</span></div></div></div>` },
};

document.querySelectorAll('.sov-item').forEach(item => {
  item.addEventListener('click', () => {
    const data = views[item.dataset.service];
    if (!data) return;
    document.querySelectorAll('.sov-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    viewsOverlay.classList.remove('open');
    viewsMenuBtn.classList.remove('menu-open');
    const topbarTitle = document.getElementById('topbar-artifact-title');
    if (topbarTitle) topbarTitle.textContent = data.title;
    const panelTitle = document.getElementById('view-panel-title');
    if (panelTitle) panelTitle.textContent = data.tag;
    const body = document.querySelector('.view-body');
    body.style.opacity = '0';
    body.style.transform = 'translateY(4px)';
    body.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
    setTimeout(() => {
      body.innerHTML = data.content;
      body.style.opacity = '1';
      body.style.transform = 'translateY(0)';
      if (item.dataset.service === 'view-01') initView01();
    }, 150);
  });
});

// View 01 — Contact Info logic & styles
function initView01() {
  // Inject styles if not already present
  if (!document.getElementById('view01-styles')) {
    const style = document.createElement('style');
    style.id = 'view01-styles';
    style.textContent = `
      .view01{display:flex;flex-direction:column;gap:20px;padding:4px 0}
      .view01-header{padding-bottom:14px;border-bottom:1px solid var(--rule-soft)}
      .view01-eyebrow{font-family:'DM Mono',monospace;font-size:7px;letter-spacing:0.26em;text-transform:uppercase;color:var(--t3);margin-bottom:5px}
      .view01-title{font-size:15px;font-weight:600;letter-spacing:-0.03em;color:var(--t0)}
      .view01-form{display:flex;flex-direction:column;gap:14px}
      .view01-field{display:flex;flex-direction:column;gap:6px}
      .view01-label{font-family:'DM Mono',monospace;font-size:8px;letter-spacing:0.18em;text-transform:uppercase;color:var(--t2)}
      .view01-input-wrap{display:flex;align-items:flex-start;gap:9px;background:var(--s0);border:1px solid var(--rule);border-radius:var(--r-md);padding:9px 12px;transition:border-color 0.15s,box-shadow 0.15s}
      .view01-input-wrap:focus-within{border-color:var(--slate-mid);box-shadow:0 0 0 3px rgba(30,45,74,0.07)}
      .view01-input-wrap svg{flex-shrink:0;color:var(--t3);margin-top:1px}
      .view01-input{flex:1;border:none;background:transparent;font-family:'Outfit',sans-serif;font-size:13.5px;font-weight:300;color:var(--t0);outline:none;line-height:1.5}
      .view01-input::placeholder{color:var(--t3)}
      .view01-textarea{resize:none}
      .view01-save-btn{display:flex;align-items:center;justify-content:center;gap:7px;padding:10px 16px;border-radius:var(--r-md);border:none;background:var(--slate);color:rgba(255,255,255,0.9);font-family:'Outfit',sans-serif;font-size:13px;font-weight:400;cursor:pointer;transition:all 0.15s;margin-top:4px}
      .view01-save-btn:hover{background:var(--slate-mid)}
      .view01-saved{display:flex;align-items:center;gap:6px;font-family:'DM Mono',monospace;font-size:8px;letter-spacing:0.18em;text-transform:uppercase;color:var(--green);justify-content:center;padding:4px 0}
    `;
    document.head.appendChild(style);
  }
  // Load saved data
  const saved = localStorage.getItem('contact-info');
  if (saved) {
    const { phone, email, address } = JSON.parse(saved);
    if (phone) document.getElementById('contact-phone').value = phone;
    if (email) document.getElementById('contact-email').value = email;
    if (address) document.getElementById('contact-address').value = address;
  }
  // Save button
  document.getElementById('view01-save').addEventListener('click', () => {
    const phone = document.getElementById('contact-phone').value;
    const email = document.getElementById('contact-email').value;
    const address = document.getElementById('contact-address').value;
    localStorage.setItem('contact-info', JSON.stringify({ phone, email, address }));
    const savedEl = document.getElementById('view01-saved');
    savedEl.style.display = 'flex';
    setTimeout(() => savedEl.style.display = 'none', 2000);
  });
}

// ── CHAT ──────────────────────────────────────────────────────────────────────

const messagesEl     = document.querySelector('.messages');
const chatContainer  = document.querySelector('.chat-container');
const emptyState     = document.querySelector('.empty-state');
const sendBtn        = document.querySelector('.send-btn');
const readyIndicator = document.querySelector('.ready-indicator');
const readyLabel     = document.querySelector('.ready-label');

let chatHistory = [];
let isSending   = false;

function setThinking(on) {
  isSending = on;
  sendBtn.disabled = on;
  if (readyIndicator) readyIndicator.classList.toggle('thinking', on);
  if (readyLabel)     readyLabel.textContent = on ? 'Thinking…' : 'Ready';
}

function appendMessage(role, text) {
  if (emptyState) emptyState.style.display = 'none';
  const wrap = document.createElement('div');
  wrap.className = role === 'user' ? 'msg user' : 'msg ai';
  if (role === 'assistant') {
    wrap.innerHTML = '<div class="msg-bubble"></div>';
  } else {
    wrap.innerHTML = '<div class="msg-bubble">' + text.replace(/\n/g, '<br>') + '</div>';
  }
  chatContainer.appendChild(wrap);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return wrap;
}

async function streamText(bubble, fullText) {
  const words = fullText.split(' ');
  let out = '';
  for (let i = 0; i < words.length; i++) {
    out += (i > 0 ? ' ' : '') + words[i];
    bubble.innerHTML = out.replace(/\n/g, '<br>');
    messagesEl.scrollTop = messagesEl.scrollHeight;
    await new Promise(r => setTimeout(r, 18));
  }
}

async function sendMessage() {
  if (isSending) return;
  const text = textarea.value.trim();
  if (!text) return;

  appendMessage('user', text);
  chatHistory.push({ role: 'user', content: text });
  textarea.value = '';
  textarea.style.height = 'auto';
  setThinking(true);

  const wrap   = appendMessage('assistant', '');
  const bubble = wrap.querySelector('.msg-bubble');
  bubble.textContent = '···';

  try {
    const res = await fetch('/.netlify/functions/chat', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ messages: chatHistory }),
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data  = await res.json();
    const reply = data.reply || '(no response)';
    await streamText(bubble, reply);
    chatHistory.push({ role: 'assistant', content: reply });
  } catch (err) {
    bubble.textContent = 'Something went wrong. Please try again.';
    console.error(err);
  }

  setThinking(false);
}

sendBtn.onclick = sendMessage;

textarea.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});