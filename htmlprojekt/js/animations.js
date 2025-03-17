// Конфигурация анимаций
const ANIMATION_CONFIG = {
    particleCount: 50,
    particleSize: 2,
    minSpeed: 0.1,
    maxSpeed: 0.5,
    color: '#4a90e2'
};

// Класс для создания частиц
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.speed = ANIMATION_CONFIG.minSpeed + Math.random() * 
            (ANIMATION_CONFIG.maxSpeed - ANIMATION_CONFIG.minSpeed);
        this.directionX = Math.random() * 2 - 1;
        this.directionY = Math.random() * 2 - 1;
        this.size = Math.random() * ANIMATION_CONFIG.particleSize;
        this.alpha = Math.random() * 0.5 + 0.5;
    }

    update() {
        this.x += this.directionX * this.speed;
        this.y += this.directionY * this.speed;

        if (this.x < 0 || this.x > this.canvas.width) this.directionX *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.directionY *= -1;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(74, 144, 226, ${this.alpha})`;
        this.ctx.fill();
    }
}

// Класс для управления анимацией
class ParticleAnimation {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.isAnimating = false;

        this.init();
    }

    init() {
        const container = document.querySelector('.stars-container');
        if (!container) return;

        container.appendChild(this.canvas);
        this.resize();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        for (let i = 0; i < ANIMATION_CONFIG.particleCount; i++) {
            this.particles.push(new Particle(this.canvas));
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        document.addEventListener('visibilitychange', () => {
            this.isAnimating = document.hidden ? false : true;
            if (this.isAnimating) this.animate();
        });
    }

    update() {
        this.particles.forEach(particle => particle.update());
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach(particle => particle.draw());
    }

    animate() {
        if (!this.isAnimating) return;

        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }

    start() {
        this.isAnimating = true;
        this.animate();
    }

    stop() {
        this.isAnimating = false;
    }
}

// Инициализация анимации при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const animation = new ParticleAnimation();
    animation.start();
}); 