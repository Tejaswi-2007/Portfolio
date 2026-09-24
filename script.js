/* V3 configuration: add your own keys here when ready. Never put a private secret in this file. */
const CONFIG={
  emailjs:{publicKey:'YOUR_EMAILJS_PUBLIC_KEY',serviceId:'YOUR_EMAILJS_SERVICE_ID',templateId:'YOUR_EMAILJS_TEMPLATE_ID'},
  analyticsId:'G-XXXXXXXXXX'
};

const projects=[
{id:'01',category:'FULL STACK / LIVESTOCK',title:'SmartCattleCare',subtitle:'Livestock Management System',overview:'A web-based livestock management system developed to streamline cattle information, health records, vaccination tracking, scheduling, day-to-day activities, data entry, and dashboard insights.',features:['Cattle health record management','Vaccination tracking and scheduling','Day-to-day livestock activity tracking','Dashboard analytics and data-driven insights','User-friendly data entry and monitoring'],tech:['React','Firebase','Firestore','JavaScript','HTML','CSS'],focus:'Practical livestock management, real-time database handling, health tracking, responsive interfaces, and usable data monitoring.',context:'The established project record describes a React + Firebase application built around vaccination tracking, scheduling, data tracking, dashboard analytics, and efficient monitoring.'},
{id:'02',category:'AI / APPLICATION',title:'Narco Scan',subtitle:'Intelligent Scanning & Analysis',overview:'An AI-focused application for intelligent scanning and analysis. The project uses AI-based processing in a user-facing application to automate analysis and provide useful insights from scanned information.',features:['Intelligent scanning workflow','AI-assisted information analysis','Automated processing of scanned information','User-facing insight generation'],tech:['AI','Computer Vision','Scanning','Analysis'],focus:'Applying AI to automate information analysis through a practical application interface.',context:'The current project record establishes Nacro Scan as an AI-focused scanning and analysis application. Additional implementation metrics and links are intentionally not invented.'},
{id:'03',category:'COMPUTER VISION / HCI',title:'AirMouse AI',subtitle:'Touchless Computer Control',overview:'An AI-powered touchless computer-control system that uses computer vision and hand-gesture recognition to translate real-time hand movements into mouse actions, creating a hands-free human-computer interaction experience.',features:['Real-time hand-gesture detection','Gesture-to-mouse action mapping','Touchless computer interaction','Computer-vision based input processing'],tech:['Python','OpenCV','MediaPipe','Computer Vision','HCI'],focus:'Hands-free human-computer interaction using real-time vision and gesture recognition.',context:'The project is defined around Python, OpenCV, and MediaPipe for real-time hand-gesture recognition and mouse control. No unsupported accuracy or performance numbers are displayed.'},
{id:'04',category:'MACHINE LEARNING / NLP',title:'Fake Job Posting Detection',subtitle:'Fraudulent Job Post Classification',overview:'A machine-learning and NLP project focused on identifying potentially fraudulent job postings. It analyzes job-posting information and classifies listings for a recruitment-fraud use case.',features:['Job-posting data analysis','Text-oriented NLP processing','Fraudulent listing classification','Machine-learning based prediction workflow'],tech:['Python','NLP','Machine Learning','Classification'],focus:'Using machine learning and natural-language processing to support safer recruitment decisions.',context:'The available project description establishes the fraud-detection objective and the ML/NLP workflow, without a verified model score or deployment link.'},
{id:'05',category:'MACHINE LEARNING',title:'Hiring Prediction System',subtitle:'Predicting Hiring Outcomes',overview:'A machine-learning application for predicting hiring-related outcomes from candidate and recruitment data, with a workflow covering preprocessing, feature analysis, model training, and prediction.',features:['Candidate/recruitment data preprocessing','Feature analysis','Model training workflow','Hiring-outcome prediction'],tech:['Python','Machine Learning','Data Analysis','Prediction'],focus:'Applying predictive modeling to recruitment and hiring-related decision support.',context:'The project record establishes preprocessing, feature analysis, model training, and prediction as the core workflow. Verified performance figures are not included.'}
];

const stack=document.querySelector('#projectStack');
stack.innerHTML=projects.map((p,i)=>`<article class="project-card reveal" style="--i:${i}" tabindex="0" role="button" aria-label="Open ${p.title} case study" data-project="${i}"><div class="project-index">${p.id} // ${p.category}</div><div class="project-main"><div><h3>${p.title.split(' ').map((w,j)=>j%3===1?`<span>${w}</span>`:w).join(' ')}</h3><p>${p.overview}</p></div><div class="project-side">${p.tech.slice(0,5).map(t=>`<span>${t}</span>`).join('')}</div></div><div class="project-cta">OPEN CASE STUDY ↗</div></article>`).join('');

const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target)}}),{threshold:.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
const timeline=document.querySelector('.timeline');

if(timeline){
  const timelineItems=timeline.querySelectorAll('.timeline-item');

  function updateTimelineProgress(){
    const rect=timeline.getBoundingClientRect();
    const triggerPoint=window.innerHeight*0.70;

    let progress=(triggerPoint-rect.top)/rect.height;
    progress=Math.max(0,Math.min(1,progress));

    timeline.style.setProperty('--timeline-progress',progress);

    timelineItems.forEach(item=>{
      const itemRect=item.getBoundingClientRect();
      const itemPoint=itemRect.top+46;

      if(itemPoint<=triggerPoint){
        item.classList.add('active');
      }else{
        item.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll',updateTimelineProgress,{passive:true});
  window.addEventListener('resize',updateTimelineProgress);
  updateTimelineProgress();
}
const modal=document.querySelector('#projectModal');let currentProject=0;const modalTitle=document.querySelector('#modalTitle');
function renderProject(index){currentProject=(index+projects.length)%projects.length;const p=projects[currentProject];document.querySelector('#modalMeta').textContent=`${p.id} / ${p.category}`;document.querySelector('#modalCounter').textContent=`PROJECT ${p.id} OF ${projects.length}`;document.querySelector('#modalKicker').textContent=`CASE STUDY / ${p.id}`;modalTitle.textContent=p.title;document.querySelector('#modalSubtitle').textContent=p.subtitle;document.querySelector('#modalOverview').textContent=p.overview;document.querySelector('#modalContext').textContent=p.context;document.querySelector('#modalFocus').textContent=p.focus;document.querySelector('#modalFeatures').innerHTML=p.features.map(x=>`<li>${x}</li>`).join('');document.querySelector('#modalTech').innerHTML=p.tech.map(x=>`<span>${x}</span>`).join('')}
function openModal(index){renderProject(index);modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');document.querySelector('.modal-close').focus();track('project_open',{project:projects[currentProject].title})}
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open')}
stack.addEventListener('click',e=>{const card=e.target.closest('[data-project]');if(card)openModal(Number(card.dataset.project))});
stack.addEventListener('keydown',e=>{if((e.key==='Enter'||e.key===' ')&&e.target.closest('[data-project]')){e.preventDefault();openModal(Number(e.target.closest('[data-project]').dataset.project))}});
modal.addEventListener('click',e=>{if(e.target.hasAttribute('data-close'))closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal();if(e.key==='ArrowRight'&&modal.classList.contains('open'))renderProject(currentProject+1);if(e.key==='ArrowLeft'&&modal.classList.contains('open'))renderProject(currentProject-1)});
document.querySelector('#modalNext').addEventListener('click',()=>renderProject(currentProject+1));

const cards=[...document.querySelectorAll('.project-card')];window.addEventListener('scroll',()=>{cards.forEach(card=>{const rect=card.getBoundingClientRect();if(rect.top<=170&&rect.bottom>170){const progress=Math.min(1,Math.max(0,(170-rect.top)/Math.max(1,rect.height-120)));card.style.filter=`brightness(${1-progress*.08})`}})},{passive:true});
const navLinks=document.querySelectorAll('.nav nav a');const sections=[...document.querySelectorAll('main section[id]')];const navObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-35% 0px -55% 0px'});sections.forEach(s=>navObserver.observe(s));

const glow=document.querySelector('.cursor-glow');window.addEventListener('pointermove',e=>{if(glow){glow.style.left=`${e.clientX}px`;glow.style.top=`${e.clientY}px`}});

function track(name,params={}){if(typeof window.gtag==='function')window.gtag('event',name,params)}
document.querySelectorAll('[data-track]').forEach(el=>el.addEventListener('click',()=>track(el.dataset.track)));

/* Lightweight GA4 loader. It stays inactive until a real measurement ID is supplied. */
if(CONFIG.analyticsId&&!CONFIG.analyticsId.includes('XXXXXXXXXX')){const s=document.createElement('script');s.async=true;s.src=`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(CONFIG.analyticsId)}`;document.head.appendChild(s);window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config',CONFIG.analyticsId)}

const form=document.querySelector('#contactForm');const status=document.querySelector('#formStatus');const submit=form.querySelector('.submit-btn');const submitLabel=form.querySelector('.submit-label');const submitLoading=form.querySelector('.submit-loading');
function setStatus(text,type=''){status.textContent=text;status.className=`form-status ${type}`}
form.addEventListener('submit',async e=>{e.preventDefault();setStatus('');if(document.querySelector('#website').value)return; if(!form.checkValidity()){form.reportValidity();setStatus('Please complete the required fields correctly.','error');return}
  if(!window.emailjs||CONFIG.emailjs.publicKey.includes('YOUR_')){setStatus('Contact form is ready. Add your EmailJS keys in script.js to enable sending.','error');return}
  submit.disabled=true;submitLabel.hidden=true;submitLoading.hidden=false;
  try{emailjs.init({publicKey:CONFIG.emailjs.publicKey});await emailjs.sendForm(CONFIG.emailjs.serviceId,CONFIG.emailjs.templateId,form);form.reset();setStatus('Transmission sent successfully. Thank you.','success');track('contact_submit')}catch(err){console.error(err);setStatus('Transmission failed. Please email me directly instead.','error')}finally{submit.disabled=false;submitLabel.hidden=false;submitLoading.hidden=true}
});

/* 100-frame scroll sequence: frames are independent of the existing hero portrait. */
(function initCoreSequence(){
  const section=document.querySelector('#core-sequence');
  const canvas=document.querySelector('#coreCanvas');
  const counter=document.querySelector('#coreFrameCounter');
  if(!section||!canvas)return;
  const ctx=canvas.getContext('2d',{alpha:false});
  const total=100;
  const images=Array.from({length:total},(_,i)=>{const im=new Image();im.decoding='async';im.src=`assets/frame-sequence/frame_${String(i).padStart(3,'0')}.jpg`;return im});
  let current=-1, raf=0;
  function draw(index){
    index=Math.max(0,Math.min(total-1,index));
    if(index===current && images[index].complete)return;
    const im=images[index];
    if(!im.complete||!im.naturalWidth){im.onload=()=>draw(index);return}
    current=index;
    const scale=Math.min(canvas.width/im.naturalWidth,canvas.height/im.naturalHeight);
    const w=im.naturalWidth*scale,h=im.naturalHeight*scale;
    ctx.fillStyle='#080812';ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(im,(canvas.width-w)/2,(canvas.height-h)/2,w,h);
    if(counter)counter.textContent=`${String(index+1).padStart(2,'0')} / ${total}`;
  }
  function update(){
    raf=0;
    const max=Math.max(1,section.offsetHeight-window.innerHeight);
    const progress=Math.max(0,Math.min(1,(window.scrollY-section.offsetTop)/max));
    draw(Math.round(progress*(total-1)));
  }
  function requestUpdate(){if(!raf)raf=requestAnimationFrame(update)}
  window.addEventListener('scroll',requestUpdate,{passive:true});
  window.addEventListener('resize',requestUpdate,{passive:true});
  images[0].addEventListener('load',()=>draw(0),{once:true});
  draw(0);
})();
