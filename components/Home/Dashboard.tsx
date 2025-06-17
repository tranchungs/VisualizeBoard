"use client";
import { useEffect, useRef } from "react";

const TYPES = [
  { name: "Transfer", color: "blue" },
  { name: "Swap", color: "green" },
  { name: "Mint", color: "purple" },
  { name: "Burn", color: "orange" },
  { name: "Stake", color: "yellow" },
  { name: "Other", color: "gray" },
];

function getTxType(tx: any): string {
  const sig = tx.methodSignature;
  if (!sig) return "Other";

  if (sig === "0xa9059cbb") return "Transfer";
  if (sig === "0x38ed1739" || sig === "0x18cbafe5") return "Swap";
  if (sig === "0x40c10f19") return "Mint";
  if (sig === "0x9dc29fac") return "Burn";
  if (sig === "0xa694fc3a") return "Stake";
  return "Other";
}

export function Dashboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heightsRef = useRef<number[]>([0, 0, 0, 0, 0, 0]);
  const headsRef = useRef<number[]>([0, 0, 0, 0, 0, 0]);
  const tpsRef = useRef<number>(0);
  const blockRef = useRef<number>(0);

  useEffect(() => {
    const audio = new Audio("chill.mp3");
    audio.loop = true;
    audio.volume = 0.8; // giảm âm lượng cho dễ chịu
    audio.play().catch((e) => {
      console.log(e);
      console.warn("Autoplay blocked. Will require user interaction.");
    });
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = 420;

    const pixelSize = 6;
    const glowBlur = 20;

    const socket = new WebSocket("wss://indexer-devhub.kadzu.dev/ws/analytics");

    socket.onopen = () => {
      socket.send(
        JSON.stringify({ type: "subscribe", topic: "new_transaction" })
      );
      socket.send(
        JSON.stringify({ type: "subscribe", topic: "network_stats" })
      );
    };

    socket.onmessage = (event) => {
      const json = JSON.parse(event.data);

      if (json.type === "new_transaction") {
        const tx = json.data;
        const type = getTxType(tx);
        const index = TYPES.findIndex((t) => t.name === type);
        if (index >= 0) {
          heightsRef.current[index] = 1;
          headsRef.current[index] = 1;
        }
      }

      if (json.type === "network_stats") {
        tpsRef.current = json.data.tps;
        blockRef.current = json.data.blockNumber;
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = canvas.width / TYPES.length;
      const chartHeight = 240;

      heightsRef.current.forEach((h, i) => {
        const totalPixels = Math.floor((h * chartHeight) / pixelSize);
        const x = i * barWidth + 10;
        const barInnerWidth = barWidth - 20;

        ctx.shadowColor = TYPES[i].color;
        ctx.shadowBlur = glowBlur;

        for (let p = 0; p < totalPixels; p++) {
          const y = chartHeight - (p + 1) * pixelSize;
          ctx.fillStyle = TYPES[i].color;
          ctx.fillRect(x, y, barInnerWidth, pixelSize - 1);
        }

        const headY =
          chartHeight - headsRef.current[i] * chartHeight - pixelSize;
        ctx.fillStyle = "white";
        ctx.shadowBlur = 0;
        ctx.fillRect(x, headY, barInnerWidth, pixelSize);

        ctx.shadowBlur = 0;
        ctx.fillStyle = "white";
        ctx.font = "12px monospace";
        ctx.textAlign = "center";
        ctx.fillText(TYPES[i].name, x + barInnerWidth / 2, chartHeight + 18);
      });

      const arcX = canvas.width / 2;
      const arcY = canvas.height - 20;
      const arcRadius = 70;

      ctx.beginPath();
      ctx.strokeStyle = "cyan";
      ctx.shadowColor = "cyan";
      ctx.shadowBlur = 25;
      ctx.lineWidth = 2;
      ctx.arc(arcX, arcY, arcRadius, Math.PI, 2 * Math.PI);
      ctx.stroke();
      ctx.shadowBlur = 0;

      const angle = Math.PI + (Math.min(tpsRef.current, 300) / 300) * Math.PI;
      const needleLength = arcRadius * 0.8;
      const needleX = arcX + needleLength * Math.cos(angle);
      const needleY = arcY + needleLength * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(arcX, arcY);
      ctx.lineTo(needleX, needleY);
      ctx.strokeStyle = "red";
      ctx.shadowColor = "red";
      ctx.shadowBlur = 25;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = "cyan";
      ctx.shadowColor = "cyan";
      ctx.shadowBlur = 12;
      ctx.font = "14px monospace";
      ctx.textAlign = "center";
      ctx.fillText(`TPS: ${tpsRef.current.toFixed(2)}`, arcX, arcY - 20);
      ctx.fillText(`#: ${blockRef.current}`, arcX, arcY);
      ctx.shadowBlur = 0;

      heightsRef.current = heightsRef.current.map((v) =>
        Math.max(0, v - 0.015)
      );
      headsRef.current = headsRef.current.map((v, i) =>
        Math.max(heightsRef.current[i], v - 0.005)
      );

      requestAnimationFrame(draw);
    };

    draw();
    return () => {
      socket.close();
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  return (
    <div className="bg-black w-full h-screen flex flex-col items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-[420px]" />
      <p className="text-white mt-4 font-mono text-sm">
        Live Monad Transaction Visualizer
      </p>
    </div>
  );
}
