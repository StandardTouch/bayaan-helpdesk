import{d as F,l as T,c as K,f as S,m as A,T as E,aX as M,e as k,bh as N,I as y,G as v,u as m,C as O,W as P,b6 as W,bf as j,B as V,J as Y,Y as G,F as J,z as X,A as Q}from"./index-BFr06o_V.js";import{I as U}from"./dot-Ch5tNn1R.js";import{O as Z}from"./TypingIndicator.vue_vue_type_style_index_0_scoped_cd1167c4_lang-BmMetMKR.js";import"./config-DoJiaUP6.js";import{b as ee}from"./globe-Bd_f_C10.js";import{s as D}from"./index-cZMmDczO.js";const te=["srcdoc"],ne=F({__name:"EmailContent",props:{content:{type:String,required:!0}},setup(d){const w=d,u=T(null),c=T(w.content),_=A(()=>E.value==="dark"?N(c.value):c.value),x=A(()=>{const e=document.querySelectorAll('link[rel="stylesheet"]');for(const o of e){const t=o.getAttribute("href");if(t!=null&&t.includes("/assets/helpdesk/desk/")&&t.endsWith(".css"))return t}return"/assets/helpdesk/desk/index.css"}),s=new DOMParser().parseFromString(c.value,"text/html"),$=s.querySelectorAll("div.gmail_quote"),H=s.querySelectorAll("div#appendonsend"),I=s.querySelectorAll("p.reply-to-content");if(s.body.children.length===0){const e=s.body.innerHTML.replace(/\n\n/g,`
`);c.value=`<div class="whitespace-pre-wrap">${e}</div>`}else $.length?c.value=C(s,"div.gmail_quote",!0):H.length?c.value=C(s,"div#appendonsend"):I.length&&(c.value=C(s,"p.reply-to-content"));function C(e,o,t=!1){function n(a){const r=a.querySelectorAll(o);if(r.length===0)return;const p=r[0];R(p,t),n(a)}return n(e),e.body.innerHTML}function R(e,o){var p,h,l;if(!e)return;const t=Math.random().toString(36).substring(2,7),n=s.createElement("div");n.classList.add("replied-content");const a=s.createElement("label");a.classList.add("collapse"),a.setAttribute("for",t),a.innerHTML="...",n.appendChild(a);const r=s.createElement("input");if(r.setAttribute("id",t),r.setAttribute("class","replyCollapser"),r.setAttribute("type","checkbox"),n.appendChild(r),o){const i=e.previousElementSibling;i&&i.tagName==="BR"&&i.remove();const f=e.cloneNode(!0);f.classList.remove("gmail_quote"),n.appendChild(f)}else{const i=Array.from(((p=e.parentElement)==null?void 0:p.children)||[]),f=i.indexOf(e),q=i.slice(f+1);if(q.length===0)return;const B=q.map(g=>g.cloneNode(!0)),L=s.createElement("div");L.append(...B),n.append(L);for(let g=f+1;g<i.length;g++)(h=e.parentElement)==null||h.removeChild(i[g])}(l=e.parentElement)==null||l.replaceChild(n,e)}const z=A(()=>`
  <!DOCTYPE html>
  <html>
  <head>
    <link rel="stylesheet" href="${x.value}" />
    <base target="_blank" />
    <style>
      :root {
        --bg-surface-gray-3: #ededed;
        --bg-surface-gray-4: #e2e2e2;
      }
      [data-theme='dark'] {
        --bg-surface-gray-3: #343434;
        --bg-surface-gray-4: #424242;
      }
      .replied-content .collapse {
        margin: 10px 0 10px 0;
        visibility: visible;
        cursor: pointer;
        display: flex;
        font-size: larger;
        font-weight: 700;
        height: 12px;
        line-height: 0.1;
        color: #383838;
        background: #e8eaed;
        width: 23px;
        justify-content: center;
        border-radius: 5px;
      }
      .replied-content .collapse:hover {
        background: #dadce0;
      }
      [data-theme='dark'] .replied-content .collapse {
        color: #e2e2e2;
        background: #424242;
      }
      [data-theme='dark'] .replied-content .collapse:hover {
        background: #525252;
      }
      .replied-content .collapse + input {
        display: none;
      }
      .replied-content .collapse + input + div {
        display: none;
      }
      .replied-content .collapse + input:checked + div {
        display: block;
      }
      .email-content {
        word-break: break-word;
      }
      
          
      .email-content :is(:where(img):not(:where([class~='not-prose'], [class~='not-prose'] *))) {
        border-width: 0;
      }
      .email-content :where(img):not(:where([class~='not-prose'], [class~='not-prose'] *)) {
        margin: 0;
      }
      .email-content :where(blockquote p:first-of-type):not(:where([class~='not-prose'], [class~='not-prose'] *))::before {
        content: none;
      }
      .email-content :where(blockquote p:last-of-type):not(:where([class~='not-prose'], [class~='not-prose'] *))::after {
        content: none;
      }

    </style>
  </head>
  <body>
    <div class="email-content prose-f">${_.value}</div>
  </body>
  </html>
  `);return K(u,e=>{e&&(e.onload=()=>{var r,p,h;const o=(r=e.contentWindow)==null?void 0:r.document.querySelector(".email-content");if(!o)return;const t=o.closest("html");if(!t)return;t.setAttribute("data-theme",E.value);const n=M(c.value);n&&o.classList.add(n),e.style.height=t.offsetHeight+1+"px",(p=e.contentDocument)==null||p.addEventListener("pointerdown",()=>{document.dispatchEvent(new PointerEvent("pointerdown",{bubbles:!0}))}),(h=e.contentDocument)==null||h.addEventListener("keydown",l=>{document.dispatchEvent(new KeyboardEvent("keydown",{key:l.key,code:l.code,ctrlKey:l.ctrlKey,metaKey:l.metaKey,shiftKey:l.shiftKey,altKey:l.altKey,bubbles:!0}))});const a=o.querySelectorAll(".replyCollapser");a.length&&a.forEach(l=>{l.addEventListener("change",()=>{e.style.height=t.offsetHeight+1+"px"})})})}),K(E,e=>{var t,n;const o=(n=(t=u.value)==null?void 0:t.contentDocument)==null?void 0:n.documentElement;o&&o.setAttribute("data-theme",e)}),(e,o)=>(k(),S("iframe",{ref_key:"iframeRef",ref:u,srcdoc:z.value,class:"prose-f block h-10 max-h-[500px] w-full"},null,8,te))}}),oe={class:"border flex-1 px-3 pt-2.5 mb-4 border-transparent bg-surface-base rounded-5 shadow text-base leading-6 transition-all duration-300 ease-in-out"},se={class:"mb-4 flex items-center justify-between text-base"},le={class:"flex items-center gap-0.5"},ae={class:"text-ink-gray-5"},re={class:"flex flex-wrap gap-2 mb-2"},he=F({__name:"TicketCommunication",props:{content:{},date:{},user:{},cc:{default:()=>""},bcc:{default:()=>""},attachments:{default:()=>[]}},setup(d){function w(u){return D(u,{allowedTags:D.defaults.allowedTags.concat(["img","video"]),allowedAttributes:{"*":["style","align","valign","width","height","bgcolor"],a:["href"],video:["src","controls"],img:["src"],table:["border","cellpadding","cellspacing","data-type"],td:["colspan","rowspan"],th:["colspan","rowspan"]}})}return(u,c)=>{const _=U,x=ne;return k(),S("div",oe,[y("div",se,[y("div",le,[v(m(ee),O(d.user,{size:"lg",expand:"",strong:"","hide-avatar":!0}),null,16),v(_,{class:"text-ink-gray-4 size-4"}),v(m(P),{text:m(W)(d.date,m(j))},{default:V(()=>[y("span",ae,Y(m(G)(d.date)),1)]),_:1},8,["text"])])]),v(x,{content:w(d.content)},null,8,["content"]),y("div",re,[(k(!0),S(J,null,X(d.attachments,b=>(k(),Q(m(Z),{key:b.file_url,label:b.file_name,url:b.file_url},null,8,["label","url"]))),128))])])}}});export{he as _};
