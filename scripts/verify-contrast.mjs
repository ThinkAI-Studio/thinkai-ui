const pairs = [
  ["dark text / background", "#f4f4f5", "#111315", 4.5],
  ["dark muted / background", "#a1a1aa", "#111315", 4.5],
  ["dark subtle / background", "#85858f", "#111315", 4.5],
  ["dark accent / background", "#4ade80", "#111315", 3],
  ["dark accent contrast / accent", "#052e16", "#4ade80", 4.5],
  ["light text / background", "#18181b", "#f1f0eb", 4.5],
  ["light muted / background", "#52525b", "#f1f0eb", 4.5],
  ["light subtle / background", "#626269", "#f1f0eb", 4.5],
  ["light accent / background", "#087f45", "#f1f0eb", 3],
  ["light accent contrast / accent", "#f0fdf4", "#087f45", 4.5],
  ["light focus / background", "#065f46", "#f1f0eb", 3],
  ["dark success / background", "#86efac", "#111315", 4.5],
  ["dark warning / background", "#fbbf24", "#111315", 4.5],
  ["dark danger / background", "#f87171", "#111315", 4.5],
  ["light success / background", "#056b3a", "#f1f0eb", 4.5],
  ["light warning / background", "#92400e", "#f1f0eb", 4.5],
  ["light danger / background", "#b91c1c", "#f1f0eb", 4.5],
  ["dark text / sheet", "#f4f4f5", "#1b1e22", 4.5],
  ["dark text / card", "#f4f4f5", "#272b30", 4.5],
  ["light text / sheet", "#18181b", "#faf9f5", 4.5],
  ["light text / card", "#18181b", "#e8e7e1", 4.5],
];

function channel(value) {
  const normalized = value / 255;
  return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
}

function luminance(hex) {
  const rgb = [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16));
  return 0.2126 * channel(rgb[0]) + 0.7152 * channel(rgb[1]) + 0.0722 * channel(rgb[2]);
}

const failures = pairs.filter(([, foreground, background, minimum]) => {
  const light = luminance(foreground);
  const dark = luminance(background);
  return (Math.max(light, dark) + 0.05) / (Math.min(light, dark) + 0.05) < minimum;
});

if (failures.length) {
  failures.forEach(([name, foreground, background, minimum]) => console.error(`${name}: ${foreground} on ${background} is below ${minimum}:1`));
  process.exit(1);
}

console.log(`✓ Contrast verified: ${pairs.length} dark/light token pairs meet their AA target`);
