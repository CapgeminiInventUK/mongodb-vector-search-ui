// src/utils/colorUtil.ts

interface RGB {
  r: number;
  g: number;
  b: number;
}

const calculateColor = (score: number): string => {
  let startColor: RGB, endColor: RGB;

  if (score >= 0.5) {
    startColor = { r: 230, g: 196, b: 43 }; // #E6C42B
    endColor = { r: 0, g: 103, b: 74 }; // #00674A
    score = (score - 0.5) * 2;
  } else {
    startColor = { r: 218, g: 47, b: 48 }; // #DA2F30
    endColor = { r: 230, g: 196, b: 43 }; // #E6C42B
    score *= 2;
  }

  const r = Math.round(startColor.r + score * (endColor.r - startColor.r));
  const g = Math.round(startColor.g + score * (endColor.g - startColor.g));
  const b = Math.round(startColor.b + score * (endColor.b - startColor.b));

  return `rgb(${r}, ${g}, ${b})`;
};

const calculateTextColor = (rgb: RGB): string => {
  const luminance = calculateLuminance(rgb);
  return luminance < 0.5 ? "white" : "black";
};

const calculateLuminance = ({ r, g, b }: RGB): number => {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
};

export { calculateColor, calculateTextColor, calculateLuminance };
