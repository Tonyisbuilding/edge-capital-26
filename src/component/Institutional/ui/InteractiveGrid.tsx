import { useEffect, useRef } from "react";

interface InteractiveGridProps {
    className?: string;
}

interface Cell {
    x: number;
    y: number;
    opacity: number;
}

export function InteractiveGrid({ className = "" }: InteractiveGridProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const gridSize = 40;
        const gridColor = "rgba(29, 43, 47, 0.6)";
        const cellFadeSpeed = 0.015;
        const map = new Map<string, Cell>();

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resize);
        resize();

        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const col = Math.floor(x / gridSize);
            const row = Math.floor(y / gridSize);

            const cellX = col * gridSize;
            const cellY = row * gridSize;
            const key = `${cellX},${cellY}`;

            map.set(key, {
                x: cellX,
                y: cellY,
                opacity: 1
            });
        };
        window.addEventListener("mousemove", onMouseMove);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.beginPath();
            ctx.strokeStyle = gridColor;
            ctx.lineWidth = 1;

            for (let x = 0; x <= canvas.width; x += gridSize) {
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
            }
            for (let y = 0; y <= canvas.height; y += gridSize) {
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
            }
            ctx.stroke();

            map.forEach((cell, key) => {
                ctx.fillStyle = `rgba(255, 255, 255, ${cell.opacity * 0.15})`;
                ctx.fillRect(cell.x + 1, cell.y + 1, gridSize - 2, gridSize - 2);

                cell.opacity -= cellFadeSpeed;
                if (cell.opacity <= 0) {
                    map.delete(key);
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} />;
}
