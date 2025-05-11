import { useEffect, useState } from "react";
import "./styles.css";

const RandomColor = () => {
  const [color, setColor] = useState<string>("#ffffff");

  const hexArr: string[] = [
    "0", "1", "2", "3", "4", "5", "6", "7",
    "8", "9", "A", "B", "C", "D", "E", "F"
  ];

  const generateColor = (): string => {
    let newColor = "#";
    for (let i = 0; i < 6; i++) {
      newColor += hexArr[Math.floor(Math.random() * hexArr.length)];
    }
    return newColor;
  };

  useEffect(() => {
    setColor(generateColor());
  }, []);

  return (
    <div className="container" style={{ backgroundColor: color }}>
      <button onClick={() => setColor(generateColor())}>
        Generate Random Colour
      </button>
      <h3>{color}</h3>
    </div>
  );
};

export default RandomColor;
