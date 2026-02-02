"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hitCardIndex, setHitCardIndex] = useState<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type Peg = { x: number; y: number; r: number };
    type Chip = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      rotation: number;
      rotationSpeed: number;
    };

    const pegs: Peg[] = [];
    const chips: Chip[] = [];
    let bottomY = 0;

    const triggerCardHit = (cardIndex: number) => {
      setHitCardIndex(cardIndex);
      window.setTimeout(() => {
        setHitCardIndex((prev) => (prev === cardIndex ? null : prev));
      }, 200);
    };

    // build peg grid (3 to 7 pegs per row, 5 rows total)
    const buildPegGrid = () => {
      pegs.length = 0;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      const rows = 5;
      const maxCols = 7;
      const baseY = h * 0.15;

      // Much tighter spacing on mobile
      const gapY = w < 768 ? h * 0.12 : h * 0.18;

      // Smaller pegs on mobile
      const radius = w < 640 ? 3 : w < 768 ? 4 : 5;

      const stepX = w / (maxCols + 1);

      let lastRowY = baseY;

      for (let row = 0; row < rows; row++) {
        const cols = 3 + row; // 3,4,5,6,7
        const rowWidth = (cols - 1) * stepX;
        const startX = (w - rowWidth) / 2;
        const y = baseY + row * gapY;
        lastRowY = y;

        for (let col = 0; col < cols; col++) {
          pegs.push({
            x: startX + col * stepX,
            y,
            r: radius,
          });
        }
      }

      bottomY = lastRowY + h * 0.05;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      buildPegGrid();
    };

    resize();
    window.addEventListener("resize", resize);

    const spawnChip = () => {
      const w = canvas.clientWidth;
      const topY = -20;

      // Small on mobile, noticeably bigger on desktop
      let chipSize: number;
      if (w < 640) {
        chipSize = 6; // very small mobile
      } else if (w < 768) {
        chipSize = 8; // normal mobile
      } else if (w < 1024) {
        chipSize = 14; // tablet
      } else {
        chipSize = 20; // desktop – bigger
      }

      chips.push({
        x: w / 2 + (Math.random() - 0.5) * (w * 0.2),
        y: topY,
        vx: (Math.random() - 0.5) * 1.2,
        vy: 1 + Math.random() * 0.5,
        r: chipSize,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
      });
    };

    for (let i = 0; i < 3; i++) spawnChip();

    const gravity = 0.045;
    const friction = 0.995;
    let lastTime = performance.now();
    let animationFrameId: number;

    const animate = (time: number) => {
      const dt = (time - lastTime) / 16.67;
      lastTime = time;

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      ctx.clearRect(0, 0, w, h);

      // pegs
      ctx.fillStyle = "rgba(140,144,170,0.5)";
      for (const peg of pegs) {
        ctx.beginPath();
        ctx.arc(peg.x, peg.y, peg.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (isPlaying) {
        for (let i = 0; i < chips.length; i++) {
          const chip = chips[i];

          chip.vy += gravity * dt;
          chip.x += chip.vx * dt;
          chip.y += chip.vy * dt;
          chip.vx *= friction;
          chip.vy *= friction;
          chip.rotation += chip.rotationSpeed * dt;

          // walls
          if (chip.x < chip.r) {
            chip.x = chip.r;
            chip.vx *= -0.7;
          } else if (chip.x > w - chip.r) {
            chip.x = w - chip.r;
            chip.vx *= -0.7;
          }

          // peg collisions
          for (const peg of pegs) {
            const dx = chip.x - peg.x;
            const dy = chip.y - peg.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const minDist = chip.r + peg.r + 1;

            if (dist < minDist) {
              const nx = dx / (dist || 1);
              const ny = dy / (dist || 1);
              const overlap = minDist - dist;

              chip.x += nx * overlap;
              chip.y += ny * overlap;

              const dot = chip.vx * nx + chip.vy * ny;
              chip.vx -= 2 * dot * nx;
              chip.vy -= 2 * dot * ny;

              chip.vx *= 0.85;
              chip.vy *= 0.85;
            }
          }

          // card line: trigger bounce + "vanish"
          if (chip.y + chip.r >= bottomY && chip.vy > 0) {
            const cardsCount = 3;
            const columnWidth = w / cardsCount;
            let cardIndex = Math.floor(chip.x / columnWidth);
            cardIndex = Math.min(cardsCount - 1, Math.max(0, cardIndex));
            triggerCardHit(cardIndex);

            const topY = -20;
            chip.x = w / 2 + (Math.random() - 0.5) * (w * 0.2);
            chip.y = topY;
            chip.vx = (Math.random() - 0.5) * 1.2;
            chip.vy = 1 + Math.random() * 0.5;
            chip.rotation = Math.random() * Math.PI * 2;
          }
        }
      }

      // chips
      for (const chip of chips) {
        ctx.save();
        ctx.translate(chip.x, chip.y);

        const size = chip.r * 1.2;

        // glow
        const gradient = ctx.createRadialGradient(0, 0, 2, 0, 0, size * 2);
        gradient.addColorStop(0, "rgba(236,72,153,0.7)");
        gradient.addColorStop(1, "rgba(236,72,153,0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, size * 2, 0, Math.PI * 2);
        ctx.fill();

        // rotated square border
        ctx.save();
        ctx.rotate(chip.rotation + Math.PI / 4);
        ctx.strokeStyle = "#ec4899";
        ctx.lineWidth = 2.5;
        const half = size;
        ctx.strokeRect(-half, -half, half * 2, half * 2);
        ctx.restore();

        // S in center
        ctx.fillStyle = "#ec4899";
        ctx.font = `${
          size * 1.6
        }px system-ui, -apple-system, BlinkMacSystemFont, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("S", 0, 0);

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [isPlaying]);

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="relative flex justify-center min-h-[50vh] sm:min-h-screen w-full overflow-hidden"
    >
      {/* Background video with purple overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-[0.06]"
        >
          <source src="/homebg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-b from-[#0b0c1a]/10 via-[#0b0c1a]/5 to-[#0b0c1a]" />
      </div>

      <div className="w-full max-w-5xl px-4 sm:px-6 lg:px-8 pt-16 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 flex flex-col items-center text-center relative z-10">
        <h1 className="text-5xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.8rem] font-extrabold uppercase leading-[1.1] tracking-[0.08em]">
          CREATING THE
          <br className="hidden sm:block" /> TANZANITE STANDARD
        </h1>

        {/* Hide on mobile, show on desktop */}
        <p className="hidden sm:block mt-4 sm:mt-6 text-xs sm:text-sm md:text-base text-gray-300 max-w-xl mx-auto px-4">
          Brought to you with over{" "}
          <span className="font-semibold text-white">10 years</span> of
          experience in the crypto iGaming industry
        </p>

        {/* Plinko grid - tighter on mobile */}
        <div className="relative w-full mt-0 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            id="plinkoCanvas"
            className="w-full h-[350px] sm:h-[550px] md:h-[600px] lg:h-[650px] opacity-80 pointer-events-none absolute top-0"
            style={{ marginTop: "-60px" }}
          />
        </div>

        {/* Cards – mobile optimized with title only, reduced gap on mobile */}
        <div className="mt-45 sm:mt-[470px] md:mt-[520px] lg:mt-[570px] flex flex-row gap-2 sm:gap-6 md:gap-8 z-10 w-full max-w-4xl px-2 sm:px-4">
          {/* Card 1 */}
          <div
            className={[
              "px-2 sm:px-5 py-2 sm:py-4 card bounce text-center sm:text-left rounded-lg sm:rounded-xl border bg-[#131624]/90 shadow-lg transition-all duration-200 flex-1",
              hitCardIndex === 0
                ? "border-pink-500/50 shadow-pink-500/20 hit-bounce scale-105"
                : "border-gray-700",
            ].join(" ")}
          >
            <div className="card_title font-bold text-white text-xs sm:text-base">
              Innovative
            </div>
            <div className="carddesc hidden sm:block text-xs mt-2 text-gray-300">
              Leading the charge with innovative solutions.
            </div>
          </div>

          {/* Card 2 */}
          <div
            className={[
              "px-2 sm:px-5 py-2 sm:py-4 card bounce text-center sm:text-left rounded-lg sm:rounded-xl border bg-[#131624]/90 shadow-lg transition-all duration-200 flex-1",
              hitCardIndex === 1
                ? "border-pink-500/50 shadow-pink-500/20 hit-bounce scale-105"
                : "border-gray-700",
            ].join(" ")}
          >
            <div className="card_title font-bold text-white text-xs sm:text-base">
              Comprehensive
            </div>
            <div className="carddesc hidden sm:block text-xs mt-2 text-gray-300">
              Thorough analysis of the leading crypto casinos.
            </div>
          </div>

          {/* Card 3 */}
          <div
            className={[
              "px-2 sm:px-5 py-2 sm:py-4 card bounce text-center sm:text-left rounded-lg sm:rounded-xl border bg-[#131624]/90 shadow-lg transition-all duration-200 flex-1",
              hitCardIndex === 2
                ? "border-pink-500/50 shadow-pink-500/20 hit-bounce scale-105"
                : "border-gray-700",
            ].join(" ")}
          >
            <div className="card_title font-bold text-white text-xs sm:text-base">
              Data-driven
            </div>
            <div className="carddesc hidden sm:block text-xs mt-2 text-gray-300">
              Harnessing cutting edge technology to find value.
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-6 items-center z-10">
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="button play-button flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-[#151829] rounded-full border-1 border-gray-700 font-xs transition-all duration-200 cursor-pointer"
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
                className="sm:w-[18px] sm:h-[18px]"
              >
                <rect x="5" y="5" width="8" height="8" rx="1.5" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="white"
                className="sm:w-[18px] sm:h-[18px]"
              >
                <path d="M7 5L14 9.5L7 14V5Z" />
              </svg>
            )}
            <p className="text-xs sm:text-xs">{isPlaying ? "Stop" : "Play"}</p>
          </button>

          <div className="button pf-button flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/5 rounded-full font-xs transition-all duration-200 border border-white/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              className="sm:w-[18px] sm:h-[18px]"
            >
              <path d="M8.5 12L12.5 8L11.5 7L8.5 10L7 8.5L6 9.5L8.5 12Z" />
              <path d="M9 17C7.4 16.6 6.1 15.7 5.1 14.3C4.1 12.9 3.6 11.3 3.6 9.5V5.2L9 3L14.4 5.2V9.5C14.4 11.3 13.9 12.9 12.9 14.3C11.9 15.7 10.6 16.6 9 17Z" />
            </svg>
            <p className="text-xs sm:text-xs">Provably Fair</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes hit-bounce {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }

        .hit-bounce {
          animation: hit-bounce 0.3s ease-out;
        }
      `}</style>
    </motion.section>
  );
}
