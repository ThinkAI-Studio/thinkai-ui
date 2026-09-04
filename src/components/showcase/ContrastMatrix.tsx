export function ContrastMatrix() {
  const comparisons = [
    {
      dimension: "Corner Geometry",
      generic: "rounded-xl / rounded-full pill shapes",
      thinkai: "100% Zero-Radius (rounded-none, sharp 90°)",
    },
    {
      dimension: "Surface Layers",
      generic: "Flat pure black #000000",
      thinkai: "Obsidian Depth (#08080a → #0d0d10 → #131316)",
    },
    {
      dimension: "Borders",
      generic: "Hardcoded opaque grays (#27272a)",
      thinkai: "Dynamic Alpha Hairlines (border-white/[0.07])",
    },
    {
      dimension: "Lighting Inset",
      generic: "Muddy heavy drop shadows",
      thinkai: "Linear-Grade 1px Top-Inset Highlight (white/8%)",
    },
    {
      dimension: "Motion Physics",
      generic: "Squishy bouncy rubber-banding",
      thinkai: "Tectonic Heavy Friction (damping: 32, stiffness: 280)",
    },
    {
      dimension: "Click Feedback",
      generic: "Opacity change only",
      thinkai: "Mechanical Compression (active:scale-[0.98])",
    },
    {
      dimension: "Typography",
      generic: "Pure 100% white (optical bleed)",
      thinkai: "Balanced Alpha (text-white/90, negative tracking)",
    },
    {
      dimension: "Status Telemetry",
      generic: "Flat blue dots",
      thinkai: "Optical LED Glow (Venice blue)",
    },
    {
      dimension: "Code Ownership",
      generic: "Opaque node_modules dependency",
      thinkai: "Registry-First: 100% source code in your project",
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/[0.08]">
      <div className="max-w-3xl mb-12">
        <h2 className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-white uppercase">
          Production Contrast Matrix
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-sans">
          How ThinkAI UI rejects generic design cliches in favor of infrastructure craft.
        </p>
      </div>

      <div className="bg-tai-sheet border border-white/[0.08] overflow-x-auto tai-inset-top">
        <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
          <thead>
            <tr className="border-b border-white/[0.08] bg-black/60 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
              <th className="p-4 sm:p-5">Dimension</th>
              <th className="p-4 sm:p-5 text-zinc-500">Generic AI UI</th>
              <th className="p-4 sm:p-5 text-white bg-white/[0.03]">ThinkAI Studio UI</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {comparisons.map((c, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                <td className="p-4 sm:p-5 font-bold text-white uppercase tracking-tight">
                  {c.dimension}
                </td>
                <td className="p-4 sm:p-5 text-zinc-500 line-through decoration-zinc-700">
                  {c.generic}
                </td>
                <td className="p-4 sm:p-5 text-emerald-400 font-semibold bg-white/[0.02]">
                  {c.thinkai}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
