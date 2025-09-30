import { useState, useRef, useEffect } from "react";
import { FiPlus, FiMinus, FiRefreshCw } from "react-icons/fi";

export default function VirtualAbacus() {
  const canvasRef = useRef(null);
  const [rowCount, setRowCount] = useState(8);
  const [abacusState, setAbacusState] = useState(null);
  const [hoveredBead, setHoveredBead] = useState(-1);

  const BEAD_PER_LINE = 5;
  const BEAD_SEP = 3;
  const BEAD_HEIGHT = 40;
  const BEAD_SPACING = 80;
  const BEAD_WIDTH = 60;

  // Initialize abacus
  useEffect(() => {
    initAbacus();
  }, [rowCount]);

  const initAbacus = () => {
    const beads = [];
    let id = 0;

    for (let i = 0; i < rowCount; i++) {
      for (let j = 0; j < BEAD_PER_LINE; j++) {
        const bead = {
          id: id,
          line: i,
          position: [
            580 - i * BEAD_SPACING,
            60 + BEAD_PER_LINE * BEAD_HEIGHT - j * BEAD_HEIGHT,
          ],
          value: 1,
          active: false,
        };

        if (j > BEAD_SEP) {
          bead.position[1] =
            60 +
            BEAD_PER_LINE * BEAD_HEIGHT -
            (j * BEAD_HEIGHT + 2 * BEAD_HEIGHT);
          bead.value = 5;
        }

        beads.push(bead);
        id++;
      }
    }

    setAbacusState(beads);
  };

  const resetAbacus = () => {
    initAbacus();
  };

  const activateBead = (beadId) => {
    if (!abacusState) return;

    const newState = [...abacusState];
    const bead = newState[beadId];
    const line = bead.line;
    const beadInLine = beadId - line * BEAD_PER_LINE;

    const active = bead.active;
    bead.active = !active;

    const dir = beadInLine > BEAD_SEP ? -1 : 1;
    const offset = active ? dir * BEAD_HEIGHT : dir * -1 * BEAD_HEIGHT;

    bead.position[1] += offset;

    // Move other beads in the same group
    if (beadInLine <= BEAD_SEP) {
      for (let j = 0; j < BEAD_PER_LINE; j++) {
        const n = line * BEAD_PER_LINE + j;
        if (j <= BEAD_SEP && j !== beadInLine) {
          if ((!active && j > beadInLine) || (active && j < beadInLine)) {
            if (newState[n].active === active) {
              newState[n].position[1] += offset;
              newState[n].active = !newState[n].active;
            }
          }
        }
      }
    } else {
      for (let j = 0; j < BEAD_PER_LINE; j++) {
        const n = line * BEAD_PER_LINE + j;
        if (j > BEAD_SEP && j !== beadInLine) {
          if ((!active && j < beadInLine) || (active && j > beadInLine)) {
            if (newState[n].active === active) {
              newState[n].position[1] += offset;
              newState[n].active = !newState[n].active;
            }
          }
        }
      }
    }

    setAbacusState(newState);
  };

  // Canvas drawing
  useEffect(() => {
    if (!canvasRef.current || !abacusState) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 40 + rowCount * BEAD_SPACING;
    canvas.height = 60 + (BEAD_PER_LINE + 2) * BEAD_HEIGHT;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw frame
    ctx.strokeStyle = "#8B4513";
    ctx.lineWidth = 5;

    // Vertical lines
    for (let i = 0; i < rowCount; i++) {
      const x = -30 + rowCount * BEAD_SPACING - i * BEAD_SPACING;
      const y = 20 + (BEAD_PER_LINE + 2) * BEAD_HEIGHT;
      ctx.beginPath();
      ctx.moveTo(x, 20);
      ctx.lineTo(x, y);
      ctx.stroke();
    }

    // Horizontal lines
    for (let j = 0; j < 3; j++) {
      let y = 20;
      if (j === 1) y = 20 + (BEAD_PER_LINE - BEAD_SEP) * BEAD_HEIGHT;
      if (j === 2) y = 20 + (BEAD_PER_LINE + 2) * BEAD_HEIGHT;
      ctx.beginPath();
      ctx.moveTo(20, y);
      ctx.lineTo(20 + rowCount * BEAD_SPACING, y);
      ctx.stroke();
    }

    // Draw beads
    abacusState.forEach((bead, index) => {
      const x = bead.position[0];
      const y = bead.position[1];

      // Shadow
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      drawRoundRect(ctx, x + 3, y + 5, BEAD_WIDTH, BEAD_HEIGHT - 4, 15);

      // Bead color
      if (bead.value === 5) {
        ctx.fillStyle = hoveredBead === index ? "#ef4444" : "#dc2626";
      } else {
        ctx.fillStyle = hoveredBead === index ? "#60a5fa" : "#3b82f6";
      }
      drawRoundRect(ctx, x, y + 2, BEAD_WIDTH, BEAD_HEIGHT - 4, 15);

      // Inner circle effect
      ctx.fillStyle = bead.value === 5 ? "#f87171" : "#93c5fd";
      ctx.beginPath();
      ctx.arc(x + BEAD_WIDTH / 2, y + BEAD_HEIGHT / 2, 12, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw values
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.font = "bold 24pt Arial";
    const textY = 50 + (BEAD_PER_LINE + 2) * BEAD_HEIGHT;

    for (let i = 0; i < rowCount; i++) {
      const textX = -30 + rowCount * BEAD_SPACING - i * BEAD_SPACING;
      let valueSum = 0;

      for (let j = 0; j < BEAD_PER_LINE; j++) {
        const n = i * BEAD_PER_LINE + j;
        if (abacusState[n].active) {
          valueSum += abacusState[n].value;
        }
      }

      ctx.fillText(valueSum.toString(), textX, textY);
    }
  }, [abacusState, hoveredBead, rowCount]);

  const drawRoundRect = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
  };

  const handleCanvasClick = (e) => {
    if (!canvasRef.current || !abacusState) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if click is on a bead
    for (let i = 0; i < abacusState.length; i++) {
      const bead = abacusState[i];
      const bx = bead.position[0];
      const by = bead.position[1] + 2;

      if (
        x >= bx &&
        x <= bx + BEAD_WIDTH &&
        y >= by &&
        y <= by + BEAD_HEIGHT - 4
      ) {
        activateBead(i);
        break;
      }
    }
  };

  const handleCanvasMouseMove = (e) => {
    if (!canvasRef.current || !abacusState) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let found = -1;
    for (let i = 0; i < abacusState.length; i++) {
      const bead = abacusState[i];
      const bx = bead.position[0];
      const by = bead.position[1] + 2;

      if (
        x >= bx &&
        x <= bx + BEAD_WIDTH &&
        y >= by &&
        y <= by + BEAD_HEIGHT - 4
      ) {
        found = i;
        break;
      }
    }

    if (found !== hoveredBead) {
      setHoveredBead(found);
    }
  };

  const calculateTotal = () => {
    if (!abacusState) return 0;
    let total = 0;

    for (let i = 0; i < rowCount; i++) {
      let lineValue = 0;
      for (let j = 0; j < BEAD_PER_LINE; j++) {
        const n = i * BEAD_PER_LINE + j;
        if (abacusState[n].active) {
          lineValue += abacusState[n].value;
        }
      }
      total += lineValue * Math.pow(10, i);
    }

    return total;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Virtual Abakus <span className="text-amber-600">(Soroban)</span>
          </h1>
          <p className="text-gray-600">Yapon abakus simulyatori</p>
        </div>

        {/* Abacus Canvas */}
        <div className="bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 rounded-3xl shadow-2xl p-8">
          <div className="bg-amber-100 rounded-2xl p-6 border-8 border-amber-900 flex justify-center items-center">
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              onMouseMove={handleCanvasMouseMove}
              className="cursor-pointer"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
