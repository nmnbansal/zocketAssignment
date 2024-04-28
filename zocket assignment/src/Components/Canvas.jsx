import { useEffect, useRef } from "react";

const Canvas = ({ image, backgroundColor, adContent, cta }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const drawCanva = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (image) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 30, 20, 330, 270);
        };
        img.src = image;
      }

      ctx.fillStyle = "black";
      ctx.font = "20px Arial";
      ctx.fillText(adContent, 20, canvas.height - 50);

      ctx.fillText(cta, 20, canvas.height - 20);

      ctx.beginPath();
      ctx.rect(140, 10, 240, 330);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "black";
      ctx.lineCap = "round";

      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(170, 0);
      ctx.lineTo(400, 400);
      ctx.lineWidth = 250;
      ctx.strokeStyle = backgroundColor;
      ctx.stroke();
    };

    drawCanva();
  }, [image, backgroundColor, adContent, cta]);

  return (
    <div className="border-[3px] h-[400px]">
      <canvas ref={canvasRef} width={400} height={400} />
    </div>
  );
};

export default Canvas;
