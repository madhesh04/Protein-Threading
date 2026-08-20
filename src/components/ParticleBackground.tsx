import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
  reducedMotion?: boolean;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ reducedMotion = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes
    const aaSymbols = ['A', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'Y'];
    const particleCount = Math.min(Math.floor((width * height) / 22000), 65);

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      symbol: string;
      isAA: boolean;
      spin: number;
      spinSpeed: number;
    }[] = [];

    const colors = [
      '#ec4899', // magenta
      '#06b6d4', // cyan
      '#f59e0b', // amber
      '#84cc16', // lime
      '#818cf8', // indigo/violet
    ];

    for (let i = 0; i < particleCount; i++) {
      const isAA = Math.random() > 0.45;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * (reducedMotion ? 0.05 : 0.45),
        vy: (Math.random() - 0.5) * (reducedMotion ? 0.05 : 0.45),
        size: isAA ? Math.random() * 4 + 8 : Math.random() * 2 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.45 + 0.15,
        symbol: aaSymbols[Math.floor(Math.random() * aaSymbols.length)],
        isAA,
        spin: Math.random() * Math.PI * 2,
        spinSpeed: (Math.random() - 0.5) * 0.01,
      });
    }

    let time = 0;

    const render = () => {
      time += reducedMotion ? 0.002 : 0.01;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle glowing background gradient orbs
      const grad1 = ctx.createRadialGradient(width * 0.2, height * 0.3, 20, width * 0.2, height * 0.3, width * 0.5);
      grad1.addColorStop(0, 'rgba(168, 85, 247, 0.07)');
      grad1.addColorStop(1, 'rgba(11, 8, 25, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 20, width * 0.8, height * 0.7, width * 0.5);
      grad2.addColorStop(0, 'rgba(6, 182, 212, 0.06)');
      grad2.addColorStop(1, 'rgba(11, 8, 25, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Draw flowing sine ribbon waves (DNA/protein ribbon motif)
      ctx.lineWidth = 1.2;
      for (let r = 0; r < 2; r++) {
        ctx.beginPath();
        const ribbonColor = r === 0 ? 'rgba(236, 72, 153, 0.08)' : 'rgba(6, 182, 212, 0.08)';
        ctx.strokeStyle = ribbonColor;
        for (let x = 0; x < width; x += 25) {
          const y = height * (0.35 + r * 0.3) + Math.sin(x * 0.003 + time + r) * 70 + Math.cos(x * 0.006 - time * 0.5) * 30;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(130, 110, 210, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          p.spin += p.spinSpeed;

          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.spin);

        if (p.isAA) {
          ctx.font = `600 ${p.size}px "JetBrains Mono", monospace`;
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(p.symbol, 0, 0);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
