const brushCanvas = document.getElementById('brushEffect');
    const brushCtx = brushCanvas.getContext('2d');
    brushCanvas.width = window.innerWidth;
    brushCanvas.height = window.innerHeight;

    const cursor = document.getElementById('customCursor');
    let particles = [];

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 15 + 5;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.velocityX = Math.random() * 4 - 2;
        this.velocityY = Math.random() * 4 - 2;
      }
      update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.size *= 0.95;
      }
      draw() {
        brushCtx.beginPath();
        brushCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        brushCtx.fillStyle = this.color;
        brushCtx.fill();
      }
    }

    function handleParticles(x, y) {
      for (let i = 0; i < 10; i++) {
        particles.push(new Particle(x, y));
      }
    }

    function animate() {
      brushCtx.fillStyle = 'rgba(255, 238, 0, 0.94)';
      brushCtx.fillRect(0, 0, brushCanvas.width, brushCanvas.height);
      particles.forEach((p, index) => {
        p.update();
        p.draw();
        if (p.size < 0.5) {
          particles.splice(index, 1);
        }
      });
      requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', (e) => {
      handleParticles(e.clientX, e.clientY);
      cursor.style.top = `${e.clientY}px`;
      cursor.style.left = `${e.clientX}px`;
    });

    window.addEventListener('resize', () => {
      brushCanvas.width = window.innerWidth;
      brushCanvas.height = window.innerHeight;
    });