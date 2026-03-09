/* ========================================
   Portfolio JavaScript (Clean Version)
   Behavior Only – No Content
======================================== */

/* ========= Typing Animation ========= */

const typingText = document.getElementById("typingText");

const phrases = [
"Building scalable cloud systems",
"Crafting elegant backend solutions",
"Exploring AI & Machine Learning",
"Optimizing performance at scale"
];

let phraseIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

const phrase = phrases[phraseIndex];

if(deleting){
typingText.textContent = phrase.substring(0,charIndex--);
}else{
typingText.textContent = phrase.substring(0,charIndex++);
}

let delay = deleting ? 30 : 50;

if(!deleting && charIndex === phrase.length){
delay = 1500;
deleting = true;
}
else if(deleting && charIndex === 0){
deleting = false;
phraseIndex = (phraseIndex + 1) % phrases.length;
}

setTimeout(typeEffect,delay);
}

window.addEventListener("load",typeEffect);


/* ========= Mobile Menu ========= */

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click",()=>{
navMenu.classList.toggle("active");
hamburger.classList.toggle("active");
});


/* ========= Smooth Navigation ========= */

document.querySelectorAll(".nav-link").forEach(link => {

link.addEventListener("click", function(e){

const targetId = this.getAttribute("href");

if(targetId.startsWith("#")){

e.preventDefault();

const section = document.querySelector(targetId);

if(section){

section.scrollIntoView({
behavior:"smooth",
block:"start"
});

}

navMenu.classList.remove("active");
hamburger.classList.remove("active");

}

});

});


/* ========= Navbar Shrink ========= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll",()=>{

if(window.scrollY > 50){
navbar.classList.add("scrolled");
}else{
navbar.classList.remove("scrolled");
}

});


/* ========= Scroll Reveal ========= */

const animatedElements = document.querySelectorAll(".animate-on-scroll");

const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){
entry.target.classList.add("visible");
}

});

},{threshold:0.15});

animatedElements.forEach(el=>observer.observe(el));


/* ========= Resume Tabs ========= */

const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(button=>{

button.addEventListener("click",()=>{

const target = button.dataset.tab;

tabButtons.forEach(btn=>btn.classList.remove("active"));
tabContents.forEach(content=>content.classList.remove("active"));

button.classList.add("active");

document.getElementById(target).classList.add("active");

});

});


/* ========= Particles Background ========= */

const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");

let particles=[];
const particleCount=30;

function resizeCanvas(){
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
}

class Particle{

constructor(){
this.reset();
}

reset(){

this.x=Math.random()*canvas.width;
this.y=Math.random()*canvas.height;

this.size=Math.random()*2+1;

this.speedX=(Math.random()-0.5)*0.4;
this.speedY=(Math.random()-0.5)*0.4;

}

update(){

this.x+=this.speedX;
this.y+=this.speedY;

if(this.x<0||this.x>canvas.width) this.speedX*=-1;
if(this.y<0||this.y>canvas.height) this.speedY*=-1;

}

draw(){

ctx.fillStyle=document.body.classList.contains("dark-theme")
?"rgba(102,126,234,0.6)"
:"rgba(102,126,234,0.3)";

ctx.beginPath();
ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
ctx.fill();

}

}

function initParticles(){

particles=[];

for(let i=0;i<particleCount;i++){
particles.push(new Particle());
}

}

function animateParticles(){

ctx.clearRect(0,0,canvas.width,canvas.height);

particles.forEach(p=>{
p.update();
p.draw();
});

requestAnimationFrame(animateParticles);

}

resizeCanvas();
initParticles();
animateParticles();

window.addEventListener("resize",()=>{

resizeCanvas();
initParticles();

});


/* ========= Theme Toggle ========= */

const themeToggle=document.getElementById("themeToggle");
const themeIcon=document.getElementById("themeIcon");

themeToggle.addEventListener("click",()=>{

document.body.classList.toggle("dark-theme");

if(document.body.classList.contains("dark-theme")){

themeIcon.innerHTML=`<path d="M21.64 13a9 9 0 11-10.6-10.6 7 7 0 0010.6 10.6z"/>`;

}else{

themeIcon.innerHTML=`<path d="M12 4.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z"/>`;

}

});


/* ========= Back To Top ========= */

const backToTop=document.getElementById("backToTop");

window.addEventListener("scroll",()=>{

if(window.scrollY>500){
backToTop.classList.add("show");
}else{
backToTop.classList.remove("show");
}

});

backToTop.addEventListener("click",()=>{

window.scrollTo({
top:0,
behavior:"smooth"
});

});