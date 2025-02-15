// Classe d'animation simple
class Animation {
  constructor(canvas, duration = 2000) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.duration = duration; // durée en ms
    this.time = 0;
    this.isPlaying = false;
  }
  
  play() {
    this.isPlaying = true;
    this.time = 0;
    this.animate();
  }
  
  stop() {
    this.isPlaying = false;
  }
  
  animate() {
    if (!this.isPlaying) return;
    this.time += 16; // environ 60 fps
    if (this.time > this.duration) this.time = 0;
    let progress = this.time / this.duration;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Exemple : dégradé qui change selon le temps
    const grd = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
    grd.addColorStop(0, `rgba(${Math.floor(255 * progress)}, 100, 150, 1)`);
    grd.addColorStop(1, `rgba(50, 100, ${255 - Math.floor(255 * progress)}, 1)`);
    
    this.ctx.fillStyle = grd;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    requestAnimationFrame(this.animate.bind(this));
  }
}

// Initialisation
function initAnimation() {
  const canvas = document.getElementById('animationCanvas');
  const card = document.getElementById('card');
  
  // Ajuster le canvas pour les écrans haute résolution
  const dpr = window.devicePixelRatio || 1;
  canvas.width = canvas.clientWidth * dpr;
  canvas.height = canvas.clientHeight * dpr;
  canvas.getContext('2d').scale(dpr, dpr);
  
  const animation = new Animation(canvas, 2000);
  
  card.addEventListener('mouseenter', () => {
    canvas.style.opacity = '1';
    animation.play();
  });
  
  card.addEventListener('mouseleave', () => {
    canvas.style.opacity = '0';
    animation.stop();
  });
}

document.addEventListener('DOMContentLoaded', initAnimation);
