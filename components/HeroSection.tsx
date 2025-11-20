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
    let bottomY = 0; // collision line above cards

    const triggerCardHit = (cardIndex: number) => {
      setHitCardIndex(cardIndex);
      window.setTimeout(() => {
        setHitCardIndex((prev) => (prev === cardIndex ? null : prev));
      }, 200);
    };

    // build peg grid (rows 3 → 7), and set bottomY just below last row
    const buildPegGrid = () => {
      pegs.length = 0;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;

      const rows = 5;
      const maxCols = 7;
      const baseY = h * 0.12;
      const gapY = h * 0.13;
      const radius = 3;

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

      bottomY = lastRowY + h * 0.08; // small gap under last row
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
      const topY = canvas.clientHeight * 0.02;

      chips.push({
        x: w / 2 + (Math.random() - 0.5) * (w * 0.2),
        y: topY,
        vx: (Math.random() - 0.5) * 1.2,
        vy: 1 + Math.random() * 0.5,
        r: 14,
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
      ctx.fillStyle = "rgba(140,144,170,0.4)";
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

            // immediately "respawn" at top (so it looks like it vanished)
            const topY = canvas.clientHeight * 0.02;
            chip.x = w / 2 + (Math.random() - 0.5) * (w * 0.2);
            chip.y = topY;
            chip.vx = (Math.random() - 0.5) * 1.2;
            chip.vy = 1 + Math.random() * 0.5;
            chip.rotation = Math.random() * Math.PI * 2;
          }
        }
      }

      // chips (render as your rotated “S” square)
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
      className="relative flex justify-center min-h-[100vh] w-full bg-gradient-to-b from-indigo-900/10 via-purple-800/5 to-[#0a0d1a] overflow-hidden"
    >
      <div className="w-full max-w-4xl px-6 pt-32 pb-16 flex flex-col items-center text-center">
        <h1 className="text-[3.2rem] md:text-[5.8rem] font-extrabold uppercase leading-none tracking-[0.08em]">
          CREATING THE
          <br className="hidden md:block" /> TANZANITE STANDARD
        </h1>

        <p className="mt-6 text-sm md:text-base text-gray-300 max-w-xl mx-auto">
          Brought to you with over{" "}
          <span className="font-semibold text-white">10 years</span> of
          experience in the crypto iGaming industry
        </p>

        {/* Bigger Plinko grid */}
        <div className="relative w-full mt-6 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            id="plinkoCanvas"
            className="w-full opacity-80 pointer-events-none"
          />
        </div>

        {/* Cards – almost flush with grid */}
        <div className="-mt-2 flex flex-col md:flex-row gap-6 md:gap-8 z-[10]">
          {/* Card 1 */}
          <div
            className={[
              "px-5 py-4 card bounce text-left rounded-xl border bg-[#131624]/90 shadow-lg transition-all duration-200",
              hitCardIndex === 0
                ? "border-gray-700 hit-bounce" // ← bounce applied
                : "border-gray-700",
            ].join(" ")}
          >
            <div className="card_title font-bold text-white">Innovative</div>
            <div className="carddesc text-xs mt-2 text-gray-300">
              Leading the charge with innovative solutions.
            </div>
          </div>

          {/* Card 2 */}
          <div
            className={[
              "px-5 py-4 card bounce text-left rounded-xl border bg-[#131624]/80 transition-all duration-200",
              hitCardIndex === 1
                ? "border-gray-700 hit-bounce"
                : "border-gray-700",
            ].join(" ")}
          >
            <div className="card_title font-bold text-white">Comprehensive</div>
            <div className="carddesc text-xs mt-2 text-gray-300">
              Thorough analysis of the leading crypto casinos.
            </div>
          </div>

          {/* Card 3 */}
          <div
            className={[
              "px-5 py-4 card bounce text-left rounded-xl border bg-[#131624]/80 transition-all duration-200",
              hitCardIndex === 2
                ? "border-gray-700 hit-bounce"
                : "border-gray-700",
            ].join(" ")}
          >
            <div className="card_title font-bold text-white">Data-driven</div>
            <div className="carddesc text-xs mt-2 text-gray-300">
              Harnessing cutting edge technology to find value.
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex gap-6 items-center z-[10]">
          <button
            onClick={() => setIsPlaying((p) => !p)}
            className="button play-button flex items-center gap-2 px-4 py-2"
          >
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="white"
              >
                <rect x="6" y="6" width="10" height="10" rx="1.5" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="white"
              >
                <path d="M8 6L16 11L8 16V6Z" />
              </svg>
            )}
            <p>{isPlaying ? "Stop" : "Play"}</p>
          </button>

          <div className="button pf-button flex items-center gap-2 px-4 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="white"
            >
              <path d="M9.12495 12.9635L13.8333 8.25521L12.6458 7.06771L9.12495 10.5885L7.37495 8.83854L6.18745 10.026L9.12495 12.9635Z" />
              <path d="M9.99995 18.3385C8.06939 17.8524 6.47564 16.7448 5.2187 15.0156C3.96175 13.2865 3.33328 11.3663 3.33328 9.25521V4.17187L9.99995 1.67188L16.6666 4.17187V9.25521C16.6666 11.3663 16.0381 13.2865 14.7812 15.0156C13.5243 16.7448 11.9305 17.8524 9.99995 18.3385Z" />
            </svg>
            <p>Provably Fair</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
