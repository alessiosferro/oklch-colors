import { useEffect, useState } from "react";

const defaultHues = Array.from<number>({ length: 360 }).reduce(
  (acc, _, index) => ({
    ...acc,
    [index]: index,
  }),
  {}
);

function App() {
  const [lightness, setLightness] = useState(0.5);
  const [chroma, setChroma] = useState(0.2);
  const [animate, setAnimate] = useState(false);

  const [hues, setHues] = useState<Record<string, number>>(defaultHues);

  const updateHues = () => {
    setHues((hues) =>
      Object.entries(hues).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: (value + 1) % 360,
        }),
        {}
      )
    );

    window.requestAnimationFrame(() => {
      updateHues();
    });
  };

  useEffect(() => {
    if (!animate) {
      return setHues(defaultHues);
    }

    updateHues();
  }, [animate]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexFlow: "column",
        gap: 16,
        marginTop: 40,
        marginBottom: 40,
        alignItems: "center",
      }}
    >
      <input
        type="number"
        name="lightness"
        step={0.01}
        value={lightness}
        onChange={(e) => setLightness(+e.target.value)}
      />

      <input
        step={0.01}
        type="number"
        name="chroma"
        onChange={(e) => setChroma(+e.target.value)}
        value={chroma}
      />

      <div>
        <label>
          <input
            type="checkbox"
            name="animate"
            checked={animate}
            onChange={(e) => setAnimate(e.target.checked)}
          />
          Animate
        </label>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          maxWidth: "600px",
        }}
      >
        {Object.entries(hues).map(([key]) => (
          <div
            className="box"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: `oklch(${lightness} ${chroma} ${hues[key]})`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
