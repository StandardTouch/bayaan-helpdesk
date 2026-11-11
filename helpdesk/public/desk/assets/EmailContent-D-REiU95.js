import{r as f,ae as q,aM as _,a as A,b as E}from"./index-z8Gru4JE.js";const F={__name:"EmailContent",props:{content:{type:String,required:!0}},setup(g){const b=g,y=import.meta.globEager("/src/index.css",{query:"?inline"})["/src/index.css"].default,h=f(null),i=f(b.content),n=new DOMParser().parseFromString(i.value,"text/html"),w=n.querySelectorAll("div.gmail_quote"),v=n.querySelectorAll("div#appendonsend"),x=n.querySelectorAll("p.reply-to-content");w.length?i.value=d(n,"div.gmail_quote",!0):v.length?i.value=d(n,"div#appendonsend"):x.length&&(i.value=d(n,"p.reply-to-content"));function d(e,s,r=!1){function t(l){const a=l.querySelectorAll(s);if(a.length===0)return;const o=a[0];k(o,r),t(l)}return t(e),e.body.innerHTML}function k(e,s){if(!e)return;let r=Math.random().toString(36).substring(2,7);const t=n.createElement("div");t.classList.add("replied-content");const l=n.createElement("label");l.classList.add("collapse"),l.setAttribute("for",r),l.innerHTML="...",t.appendChild(l);const a=n.createElement("input");if(a.setAttribute("id",r),a.setAttribute("class","replyCollapser"),a.setAttribute("type","checkbox"),t.appendChild(a),s){const o=e.previousElementSibling;o&&o.tagName==="BR"&&o.remove();let c=e.cloneNode(!0);c.classList.remove("gmail_quote"),t.appendChild(c)}else{const o=Array.from(e.parentElement.children),c=o.indexOf(e),u=o.slice(c+1);if(u.length===0)return;let S=u.map(p=>p.cloneNode(!0));const m=n.createElement("div");m.append(...S),t.append(m);for(let p=c+1;p<o.length;p++)e.parentElement.removeChild(o[p])}e.parentElement.replaceChild(t,e)}const C=`
  <!DOCTYPE html>
  <html>
  <head>
	<style>
	  ${y}
  
	  .replied-content .collapse {
		margin: 10px 0 10px 0;
		visibility: visible;
		cursor: pointer;
		display: flex;
		font-size: larger;
		font-weight: 700;
		height: 12px;
		line-height: 0.1;
		background: #e8eaed;
		width: 23px;
		justify-content: center;
		border-radius: 5px;
	  }
  
	  .replied-content .collapse:hover {
		background: #dadce0;
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
	  .email-content
		  :is(:where(table):not(:where([class~='not-prose'], [class~='not-prose']
			  *))) {
	  table-layout: auto;
	  }
  
	  .email-content
		  :where(table):not(:where([class~='not-prose'], [class~='not-prose'] *)) {
	  width: unset;
	  table-layout: auto;
	  text-align: unset;
	  margin-top: unset;
	  margin-bottom: unset;
	  font-size: unset;
	  line-height: unset;
	  }
  
	  /* tr */
  
	  .email-content
		  :where(tbody tr):not(:where([class~='not-prose'], [class~='not-prose']
			  *)) {
	  border-bottom-width: 0;
	  border-bottom-color: transparent;
	  }
  
	  /* td */
  
	  .email-content
		  :is(:where(td):not(:where([class~='not-prose'], [class~='not-prose'] *))) {
	  position: unset;
	  border-width: 0;
	  border-color: transparent;
	  padding: 0;
	  }
  
	  .email-content
		  :where(tbody td):not(:where([class~='not-prose'], [class~='not-prose']
			  *)) {
	  vertical-align: revert;
	  }
  
	  /* image */
	  .email-content
		  :is(:where(img):not(:where([class~='not-prose'], [class~='not-prose']
			  *))) {
	  border-width: 0;
	  }
  
	  .email-content
		  :where(img):not(:where([class~='not-prose'], [class~='not-prose'] *)) {
	  margin: 0;
	  }
  
	  /* before & after */
  
	  .email-content
		  :where(blockquote
		  p:first-of-type):not(:where([class~='not-prose'], [class~='not-prose']
			  *))::before {
	  content: none;
	  }
  
	  .email-content
		  :where(blockquote
		  p:last-of-type):not(:where([class~='not-prose'], [class~='not-prose']
			  *))::after {
	  content: none;
	  }
	</style>
  </head>
  <body>
	  <div ref="emailContentRef" class="email-content prose-f">${i.value}</div>
  </body>
  <base target="_blank" />
  </html>
  `;return q(h,e=>{e&&(e.onload=()=>{const s=e.contentWindow.document.querySelector(".email-content");let r=s.closest("html");s.classList.add(_(i.value)),e.style.height=r.offsetHeight+1+"px";let t=s.querySelectorAll(".replyCollapser");t.length&&t.forEach(l=>{l.addEventListener("change",()=>{e.style.height=r.offsetHeight+1+"px"})})})}),(e,s)=>(A(),E("iframe",{ref_key:"iframeRef",ref:h,srcdoc:C,class:"prose-f block h-10 max-h-[500px] w-full"},null,512))}};export{F as _};
