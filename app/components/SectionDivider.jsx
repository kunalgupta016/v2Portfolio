export default function SectionDivider() {
  return (
    <div
      style={{
        width: "100%",
        height: 1,
        position: "relative",
        margin: "0 auto",
        maxWidth: 1100,
        padding: "0 24px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, var(--accent-dim) 20%, var(--accent) 50%, var(--accent-dim) 80%, transparent 100%)",
          opacity: 0.5,
        }}
      />
    </div>
  );
}
