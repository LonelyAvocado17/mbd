const screens = document.querySelectorAll(".screen");
const surpriseBtn = document.getElementById("surpriseBtn");
const replayBtn = document.getElementById("replayBtn");

function showScreen(id) {
  screens.forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

document.body.addEventListener("click", () => {
  if (document.getElementById("screen1").classList.contains("active")) {
    showScreen("screen2");
  }
});

surpriseBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  showScreen("screen3");
  startConfetti();
});

replayBtn.addEventListener("click", () => {
  location.reload();
});

/* Confetti */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

function startConfetti() {
  particles = [];
  for (let i = 0; i < 120; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 5 + 2,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`
    });
  }
  requestAnimationFrame(updateConfetti);
}

function updateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    p.y += p.d;
    if (p.y > canvas.height) p.y = -10;
  });
  requestAnimationFrame(updateConfetti);
}
