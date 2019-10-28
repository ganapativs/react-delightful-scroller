import React, { useEffect } from 'react';
import styled from 'styled-components/macro';

const Loader = styled.div`
  text-align: center;
  color: var(--white);
  font-weight: bold;
`;

const Canvas = styled.canvas`
  background-color: transparent;
  border-radius: 100%;
  display: block;
  margin: ${p => p.margin};
`;

// https://codepen.io/MishaHahaha/pen/ONQQNY
// eslint-disable-next-line no-unused-vars
export const RenderLoader = ({
  size,
  itemsCount,
  batchSize,
  axis,
  showPageCount = true,
}) => {
  const canvasRef = React.useRef(null);
  const animation = React.useRef(null);

  useEffect(() => {
    const { current: canvas } = canvasRef;
    const context = canvas.getContext('2d');

    const radius = canvas.width / 3;
    const angleStep = (Math.PI * 2) / 360;
    let theta = 0;

    // change frequencies for getting various curves
    const frequencyX = 5;
    const frequencyY = 5;

    function draw() {
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);

      context.setTransform(1, 0, 0, 1, canvas.width / 2, canvas.height / 2);
      context.beginPath();

      for (let angle = 0; angle < Math.PI * 2; angle += angleStep) {
        const x =
          Math.sin(angle * frequencyX + theta) *
          Math.cos(angle + theta) *
          radius;
        const y =
          Math.cos(angle * frequencyY) * Math.sin(angle + theta) * radius;
        if (angle === 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      }

      context.lineWidth = 4;
      context.strokeStyle = '#ffe877';
      context.stroke();
      context.miterLimit = 0.1;
      context.closePath();

      theta += 0.04;
      animation.current = window.requestAnimationFrame(draw);
    }

    animation.current = window.requestAnimationFrame(draw);

    return () => window.cancelAnimationFrame(animation.current);
  }, []);

  return (
    <>
      <Canvas
        ref={canvasRef}
        width={100}
        height={100}
        margin={axis === 'y' ? '50px auto 15px auto' : 0}
      />
      {showPageCount && axis === 'y' ? (
        <Loader>
          {size / batchSize + 1}/{Math.ceil(itemsCount / batchSize)}
        </Loader>
      ) : null}
    </>
  );
};
