
"use client";
import { useState, useEffect, useRef } from "react";
import {motion} from "framer-motion";
const GRID_SIZE = 20;

const getRandomPosition = () => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
});

export default function SnakeGame() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const directionRef = useRef({ x: 0, y: -1 });
  const touchStartRef = useRef(null);

  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState(getRandomPosition());
  const [direction, setDirection] = useState({ x: 0, y: -1 });
  const [speed, setSpeed] = useState(200);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [cellSize, setCellSize] = useState(15);
  const [isMobile, setIsMobile] = useState(false);

  // Leaderboard state
  const [playerName, setPlayerName] = useState("");
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingBoard, setLoadingBoard] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Detect mobile & compute responsive cell size
  useEffect(() => {
    const computeSize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // On mobile, fit the grid within available width minus padding
      const maxCanvasWidth = mobile
        ? Math.min(window.innerWidth - 48, 320)
        : 300;
      setCellSize(Math.floor(maxCanvasWidth / GRID_SIZE));
    };
    computeSize();
    window.addEventListener("resize", computeSize);
    return () => window.removeEventListener("resize", computeSize);
  }, []);

  const canvasWidth = GRID_SIZE * cellSize;
  const canvasHeight = GRID_SIZE * cellSize;

  // Keep directionRef in sync
  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  // Helper: Change direction safely (prevents 180° reversal)
  const changeDirection = (newDir) => {
    const current = directionRef.current;
    if (
      snake.length > 1 &&
      newDir.x === -current.x &&
      newDir.y === -current.y
    )
      return;
    setDirection(newDir);
    if (!gameStarted) setGameStarted(true);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      let newDirection;
      switch (e.key) {
        case "ArrowUp":    newDirection = { x: 0, y: -1 }; break;
        case "ArrowDown":  newDirection = { x: 0, y: 1 };  break;
        case "ArrowLeft":  newDirection = { x: -1, y: 0 }; break;
        case "ArrowRight": newDirection = { x: 1, y: 0 };  break;
        default: return;
      }
      e.preventDefault();
      changeDirection(newDirection);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [direction, snake.length, gameStarted]);

  // Swipe gesture controls for mobile
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    };

    const handleTouchEnd = (e) => {
      if (!touchStartRef.current) return;
      const touch = e.changedTouches[0];
      const dx = touch.clientX - touchStartRef.current.x;
      const dy = touch.clientY - touchStartRef.current.y;
      const minSwipe = 30;

      if (Math.abs(dx) < minSwipe && Math.abs(dy) < minSwipe) return;

      let newDirection;
      if (Math.abs(dx) > Math.abs(dy)) {
        newDirection = dx > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 };
      } else {
        newDirection = dy > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 };
      }
      changeDirection(newDirection);
      touchStartRef.current = null;
    };

    canvas.addEventListener("touchstart", handleTouchStart, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [direction, snake.length, gameStarted]);

  // Main Game Loop
  useEffect(() => {
    if (gameOver || !gameStarted) return;

    const moveSnake = () => {
      const newSnake = [...snake];
      const head = {
        x: newSnake[0].x + direction.x,
        y: newSnake[0].y + direction.y,
      };

      // Wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        return;
      }

      // Self collision
      for (let i = 1; i < newSnake.length; i++) {
        if (newSnake[i].x === head.x && newSnake[i].y === head.y) {
          setGameOver(true);
          return;
        }
      }

      newSnake.unshift(head);

      // Food collision
      if (head.x === food.x && head.y === food.y) {
        setScore((s) => s + 10);
        setFood(getRandomPosition());
        if (speed > 50) setSpeed((s) => s - 5);
      } else {
        newSnake.pop();
      }

      setSnake(newSnake);
    };

    const intervalId = setInterval(moveSnake, speed);
    return () => clearInterval(intervalId);
  }, [snake, direction, food, gameOver, speed, gameStarted]);

  // Canvas Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#1a1a2e";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw grid lines (subtle)
    ctx.strokeStyle = "rgba(255,255,255,0.03)";
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvasHeight);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvasWidth, i * cellSize);
      ctx.stroke();
    }

    // Draw food with glow
    ctx.shadowColor = "#ff4d4d";
    ctx.shadowBlur = 8;
    ctx.fillStyle = "#ff4d4d";
    ctx.beginPath();
    ctx.arc(
      food.x * cellSize + cellSize / 2,
      food.y * cellSize + cellSize / 2,
      cellSize / 2.5,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;

    // Draw snake
    snake.forEach((part, index) => {
      const isHead = index === 0;
      ctx.fillStyle = isHead ? "#86efac" : "#4ade80";
      if (isHead) {
        ctx.shadowColor = "#4ade80";
        ctx.shadowBlur = 6;
      }

      const padding = 1;
      ctx.beginPath();
      ctx.roundRect(
        part.x * cellSize + padding,
        part.y * cellSize + padding,
        cellSize - padding * 2,
        cellSize - padding * 2,
        isHead ? 4 : 2
      );
      ctx.fill();
      ctx.shadowBlur = 0;
    });
  }, [snake, food, cellSize, canvasWidth, canvasHeight]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(getRandomPosition());
    setDirection({ x: 0, y: -1 });
    directionRef.current = { x: 0, y: -1 };
    setSpeed(200);
    setScore(0);
    setGameOver(false);
    setGameStarted(false);
    setSubmitted(false);
    setPlayerName("");
  };

  // Leaderboard: fetch top 10
  const fetchLeaderboard = async () => {
    setLoadingBoard(true);
    try {
      const res = await fetch("/api/leaderboard");
      const data = await res.json();
      setLeaderboard(data);
    } catch (err) {
      console.error("Failed to fetch leaderboard:", err);
    } finally {
      setLoadingBoard(false);
    }
  };

  // Leaderboard: submit score
  const submitScore = async () => {
    if (!playerName.trim() || submitting) return;
    setSubmitting(true);
    try {
      await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: playerName.trim(), score }),
      });
      setSubmitted(true);
      fetchLeaderboard();
    } catch (err) {
      console.error("Failed to submit score:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // D-pad button handler
  const handleDpadPress = (newDir) => {
    changeDirection(newDir);
  };

  const dpadBtnStyle = {
    width: 48,
    height: 48,
    borderRadius: 12,
    border: "1px solid rgba(74, 222, 128, 0.3)",
    backgroundColor: "rgba(74, 222, 128, 0.1)",
    color: "#4ade80",
    fontSize: "1.2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.15s ease",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
  };

  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      ref={containerRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        touchAction: "none",
      }}
    >
      {/* Score */}
      <motion.div
       initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          color: "white",
          fontSize: "1.1rem",
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ color: "#4ade80" }}>🐍</span> Score: {score}
      </motion.div>

      {/* Canvas */}
      <div style={{ position: "relative" }}>
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          style={{
            border: "2px solid rgba(74, 222, 128, 0.4)",
            borderRadius: 10,
            display: "block",
          }}
        />

        {/* Overlay (start / game over) */}
        {(gameOver || !gameStarted) && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.88)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              borderRadius: 10,
              padding: 16,
            }}
          >
            {gameOver && (
              <h2
                style={{
                  color: "#ff4d4d",
                  marginBottom: 4,
                  fontSize: "1.3rem",
                }}
              >
                Game Over!
              </h2>
            )}
            {gameOver && (
              <p style={{ color: "#ccc", marginBottom: 8, fontSize: "0.9rem" }}>
                Score: {score}
              </p>
            )}

            {/* Score submission on game over */}
            {gameOver && !submitted && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    if (e.key === "Enter") submitScore();
                  }}
                  maxLength={20}
                  style={{
                    padding: "8px 14px",
                    borderRadius: 8,
                    border: "1px solid rgba(74, 222, 128, 0.4)",
                    backgroundColor: "rgba(255,255,255,0.08)",
                    color: "#fff",
                    fontSize: "0.85rem",
                    outline: "none",
                    width: 180,
                    textAlign: "center",
                  }}
                />
                <button
                  onClick={submitScore}
                  disabled={!playerName.trim() || submitting}
                  style={{
                    padding: "7px 18px",
                    background: playerName.trim()
                      ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
                      : "rgba(255,255,255,0.1)",
                    color: playerName.trim() ? "#000" : "#666",
                    border: "none",
                    borderRadius: 8,
                    cursor: playerName.trim() ? "pointer" : "default",
                    fontWeight: "bold",
                    fontSize: "0.8rem",
                    transition: "all 0.2s",
                  }}
                >
                  {submitting ? "Saving..." : "🏆 Submit Score"}
                </button>
              </div>
            )}

            {gameOver && submitted && (
              <p
                style={{
                  color: "#4ade80",
                  fontSize: "0.85rem",
                  marginBottom: 10,
                }}
              >
                ✅ Score submitted!
              </p>
            )}

            {!gameStarted && (
              <h2
                style={{
                  color: "#4ade80",
                  marginBottom: 8,
                  fontSize: "1.3rem",
                }}
              >
                🐍 Snake Game
              </h2>
            )}

            <p
              style={{
                marginBottom: 12,
                fontSize: "0.75rem",
                color: "#888",
                textAlign: "center",
              }}
            >
              {isMobile
                ? "Swipe or use controls below"
                : "Use arrow keys to play"}
            </p>

            <button
              onClick={() => {
                resetGame();
                setGameStarted(true);
              }}
              style={{
                padding: "9px 22px",
                background: "linear-gradient(135deg, #4ade80, #22c55e)",
                color: "#000",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "0.85rem",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              {gameOver ? "Play Again" : "Start Game"}
            </button>
          </div>
        )}
      </div>

      {/* Mobile D-Pad Controls */}
      {isMobile && gameStarted && !gameOver && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            marginTop: 4,
          }}
        >
          {/* Up */}
          <button
            onClick={() => handleDpadPress({ x: 0, y: -1 })}
            style={dpadBtnStyle}
            onTouchStart={(e) => {
              e.preventDefault();
              handleDpadPress({ x: 0, y: -1 });
            }}
          >
            ▲
          </button>
          {/* Left, Center, Right */}
          <div style={{ display: "flex", gap: 4 }}>
            <button
              onClick={() => handleDpadPress({ x: -1, y: 0 })}
              style={dpadBtnStyle}
              onTouchStart={(e) => {
                e.preventDefault();
                handleDpadPress({ x: -1, y: 0 });
              }}
            >
              ◀
            </button>
            <div
              style={{
                ...dpadBtnStyle,
                backgroundColor: "transparent",
                border: "none",
                color: "#555",
                fontSize: "0.7rem",
              }}
            >
              🎮
            </div>
            <button
              onClick={() => handleDpadPress({ x: 1, y: 0 })}
              style={dpadBtnStyle}
              onTouchStart={(e) => {
                e.preventDefault();
                handleDpadPress({ x: 1, y: 0 });
              }}
            >
              ▶
            </button>
          </div>
          {/* Down */}
          <button
            onClick={() => handleDpadPress({ x: 0, y: 1 })}
            style={dpadBtnStyle}
            onTouchStart={(e) => {
              e.preventDefault();
              handleDpadPress({ x: 0, y: 1 });
            }}
          >
            ▼
          </button>
        </div>
      )}

      {/* Leaderboard Toggle Button */}
      <button
        onClick={() => {
          setShowLeaderboard(!showLeaderboard);
          if (!showLeaderboard) fetchLeaderboard();
        }}
        style={{
          padding: "8px 20px",
          background: showLeaderboard
            ? "rgba(251, 191, 36, 0.15)"
            : "transparent",
          border: "1px solid rgba(251, 191, 36, 0.4)",
          borderRadius: 8,
          color: "#fbbf24",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "0.8rem",
          transition: "all 0.2s",
          marginTop: 4,
        }}
      >
        {showLeaderboard ? "Hide Leaderboard" : "🏆 Leaderboard"}
      </button>

      {/* Leaderboard Panel */}
      {showLeaderboard && (
        <div
          style={{
            width: "100%",
            maxWidth: canvasWidth,
            backgroundColor: "rgba(20, 20, 40, 0.95)",
            border: "1px solid rgba(251, 191, 36, 0.3)",
            borderRadius: 14,
            padding: "16px 16px 12px",
            marginTop: 6,
            backdropFilter: "blur(12px)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(251,191,36,0.08)",
          }}
        >
          {/* Header */}
          <div
            style={{
              textAlign: "center",
              marginBottom: 12,
              paddingBottom: 10,
              borderBottom: "1px solid rgba(251, 191, 36, 0.15)",
            }}
          >
            <h3
              style={{
                color: "#fbbf24",
                fontSize: "0.95rem",
                fontWeight: 700,
                margin: 0,
                letterSpacing: "0.02em",
              }}
            >
              🏆 Top 10 Players
            </h3>
          </div>

          {loadingBoard ? (
            <div
              style={{
                textAlign: "center",
                padding: "20px 0",
              }}
            >
              <div
                style={{
                  display: "inline-block",
                  width: 20,
                  height: 20,
                  border: "2px solid rgba(251,191,36,0.3)",
                  borderTopColor: "#fbbf24",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }}
              />
              <p style={{ color: "#888", fontSize: "0.8rem", marginTop: 8 }}>
                Loading scores...
              </p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : leaderboard.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "24px 16px",
                color: "#666",
              }}
            >
              <span style={{ fontSize: "1.5rem", display: "block", marginBottom: 8 }}>🎯</span>
              <p style={{ fontSize: "0.82rem", margin: 0 }}>
                No scores yet. Be the first!
              </p>
            </div>
          ) : (
            <div
              data-lenis-prevent
              style={{
                maxHeight: 240,
                overflowY: "auto",
                overflowX: "hidden",
                marginRight: -4,
                paddingRight: 4,
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(251,191,36,0.3) transparent",
              }}
            >
              {/* Table header row */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "40px 1fr 60px",
                  padding: "0 8px 6px",
                  marginBottom: 4,
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span style={{ fontSize: "0.7rem", color: "#666", fontWeight: 600, textAlign: "center", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Rank
                </span>
                <span style={{ fontSize: "0.7rem", color: "#666", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Player
                </span>
                <span style={{ fontSize: "0.7rem", color: "#666", fontWeight: 600, textAlign: "right", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Score
                </span>
              </div>

              {/* Player rows */}
              {leaderboard.map((entry, i) => {
                const isTop3 = i < 3;
                const rankColors = ["#fbbf24", "#c0c0c0", "#cd7f32"];
                const rankBgColors = [
                  "rgba(251,191,36,0.1)",
                  "rgba(192,192,192,0.08)",
                  "rgba(205,127,50,0.08)",
                ];
                const medals = ["🥇", "🥈", "🥉"];

                return (
                  <div
                    key={entry._id || i}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "40px 1fr 60px",
                      alignItems: "center",
                      padding: "8px 8px",
                      borderRadius: 8,
                      marginBottom: 2,
                      backgroundColor: isTop3
                        ? rankBgColors[i]
                        : i % 2 === 1
                        ? "rgba(255,255,255,0.02)"
                        : "transparent",
                      transition: "background-color 0.15s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      if (!isTop3)
                        e.currentTarget.style.backgroundColor =
                          "rgba(255,255,255,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isTop3)
                        e.currentTarget.style.backgroundColor =
                          i % 2 === 1
                            ? "rgba(255,255,255,0.02)"
                            : "transparent";
                    }}
                  >
                    {/* Rank */}
                    <div style={{ textAlign: "center" }}>
                      {isTop3 ? (
                        <span style={{ fontSize: "1rem" }}>{medals[i]}</span>
                      ) : (
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 22,
                            height: 22,
                            borderRadius: 6,
                            backgroundColor: "rgba(255,255,255,0.06)",
                            color: "#888",
                            fontSize: "0.72rem",
                            fontWeight: 600,
                          }}
                        >
                          {i + 1}
                        </span>
                      )}
                    </div>

                    {/* Player name */}
                    <span
                      style={{
                        color: isTop3 ? "#f5f5f5" : "#d1d5db",
                        fontWeight: isTop3 ? 600 : 400,
                        fontSize: "0.82rem",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        paddingRight: 8,
                      }}
                    >
                      {entry.name}
                    </span>

                    {/* Score */}
                    <span
                      style={{
                        textAlign: "right",
                        color: isTop3 ? rankColors[i] : "#4ade80",
                        fontWeight: 700,
                        fontSize: "0.82rem",
                        fontFamily: "'SF Mono', 'Cascadia Code', 'Consolas', monospace",
                      }}
                    >
                      {entry.score}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}