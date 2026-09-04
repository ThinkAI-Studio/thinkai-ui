"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Play, Gauge } from "lucide-react";
import { TAI_SPRING, TAI_EASE } from "@/lib/motion";

type PhysicsPreset = "default" | "stiff" | "gentle" | "luxury" | "snappy";

export function MotionPhysicsLab() {
  const [activePreset, setActivePreset] = useState<PhysicsPreset>("default");
  const [togglePosition, setTogglePosition] = useState(false);
  const [triggerCount, setTriggerCount] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const slabRef = useRef<HTMLDivElement>(null);
  const destinationRef = useRef<HTMLDivElement>(null);
  const [destinationX, setDestinationX] = useState<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const slab = slabRef.current;
    const destination = destinationRef.current;
    if (!track || !slab || !destination) return;

    const measureDestination = () => {
      // offsetLeft reads the flex layout position, not the current Motion
      // transform, so resizing while the slab is at the destination remains stable.
      setDestinationX(Math.max(0, destination.offsetLeft - slab.offsetLeft));
    };

    measureDestination();
    const observer = new ResizeObserver(measureDestination);
    observer.observe(track);
    observer.observe(slab);
    observer.observe(destination);
    return () => observer.disconnect();
  }, []);

  const getTransition = () => {
    switch (activePreset) {
      case "default":
        return TAI_SPRING.default;
      case "stiff":
        return TAI_SPRING.stiff;
      case "gentle":
        return TAI_SPRING.gentle;
      case "luxury":
        return { duration: 0.6, ease: TAI_EASE.luxury };
      case "snappy":
        return { duration: 0.35, ease: TAI_EASE.snappy };
    }
  };

  const presetDetails: Record<PhysicsPreset, { title: string; type: string; formula: string; useCase: string }> = {
    default: {
      title: "TAI_SPRING.default",
      type: "Spring Physics",
      formula: "damping: 32 · stiffness: 280 · mass: 1",
      useCase: "Card hover lifts, drawer sliding sheets, modal entrances",
    },
    stiff: {
      title: "TAI_SPRING.stiff",
      type: "High Resistance Spring",
      formula: "damping: 30 · stiffness: 400 · mass: 0.8",
      useCase: "Active click compression, mechanical button snap, micro-toggles",
    },
    gentle: {
      title: "TAI_SPRING.gentle",
      type: "Heavy Inertia Spring",
      formula: "damping: 38 · stiffness: 200 · mass: 1.2",
      useCase: "Large layout shifts, parallax perspective tilt, caustics",
    },
    luxury: {
      title: "TAI_EASE.luxury",
      type: "Cubic Bezier Easing",
      formula: "cubic-bezier(0.16, 1, 0.3, 1)",
      useCase: "WipeButton forward sweeps, typography reveals, page fades",
    },
    snappy: {
      title: "TAI_EASE.snappy",
      type: "Cubic Bezier Easing",
      formula: "cubic-bezier(0.19, 1, 0.22, 1)",
      useCase: "Tab indicators, instant tooltip reveals, menu flyouts",
    },
  };

  const handleTrigger = () => {
    setTogglePosition((prev) => !prev);
    setTriggerCount((c) => c + 1);
  };

  return (
    <section className="mx-auto min-w-0 max-w-7xl border-t border-white/[0.08] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 flex min-w-0 flex-col gap-6 border-b border-white/[0.08] pb-6 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <h2 className="break-words text-3xl font-mono font-bold uppercase tracking-tight text-white sm:text-4xl">
            Motion Physics Engine
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl font-sans">
            Test and benchmark ThinkAI Studio&apos;s physical springs vs luxury easing curves in real-time.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="flex flex-wrap gap-1.5 bg-tai-sheet p-1 border border-white/[0.08]">
          {(Object.keys(presetDetails) as PhysicsPreset[]).map((p) => (
            <button
              key={p}
              onClick={() => setActivePreset(p)}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider transition-colors active:translate-y-px ${
                activePreset === p
                  ? "bg-white text-black font-bold"
                  : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Physics Test Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Interactive Stage */}
        <div className="lg:col-span-2 bg-tai-sheet border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between tai-inset-top relative overflow-hidden">
          {/* Stage Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.06] mb-8">
            <div className="flex min-w-0 items-start gap-2 font-mono text-xs text-zinc-400">
              <Gauge className="w-4 h-4 text-emerald-400" />
              <span className="min-w-0 break-words">TEST BENCH · TARGET: [0px MECHANICAL SLAB]</span>
            </div>
            <div className="text-xs font-mono text-zinc-500">
              CYCLES: <span className="text-white font-bold">{triggerCount}</span>
            </div>
          </div>

          {/* Motion Visual Track */}
          <div ref={trackRef} className="relative flex min-w-0 min-h-[156px] items-center justify-between overflow-hidden border border-white/[0.06] bg-black/40 px-3 py-8 sm:min-h-[180px] sm:px-4 sm:py-12">
            {/* Track Grid Lines */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:2rem_100%]" />

            {/* Moving Physical Object */}
            <motion.div
              ref={slabRef}
              animate={{
                x: togglePosition && destinationX !== null ? destinationX : 0,
              }}
              transition={getTransition() as any}
              className="relative z-10 flex h-16 w-24 shrink-0 cursor-pointer select-none flex-col items-center justify-center bg-white p-2 text-black shadow-2xl sm:h-20 sm:w-32 sm:p-3"
              onClick={handleTrigger}
            >
              <div className="text-[10px] uppercase tracking-wider text-zinc-600">0px SLAB</div>
              <div className="text-xs font-mono font-black tracking-tight uppercase">
                {activePreset}
              </div>
            </motion.div>

            {/* Destination Target Marker */}
            <div ref={destinationRef} className="flex h-16 w-24 shrink-0 flex-col items-center justify-center border border-dashed border-white/20 text-center text-[10px] font-mono uppercase text-zinc-600 sm:h-20 sm:w-32">
              DESTINATION
            </div>
          </div>

          {/* Action Trigger Bar */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs font-mono text-zinc-400">
              Click the slab or use the trigger button to evaluate momentum & snap.
            </div>
            <button
              onClick={handleTrigger}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors active:scale-[0.98]"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>TRIGGER KINETIC DISPLACEMENT</span>
            </button>
          </div>
        </div>

        {/* Right 1 Col: Physics Telemetry Panel */}
        <div className="bg-tai-sheet border border-white/[0.08] p-6 flex flex-col justify-between tai-inset-top">
          <div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold font-mono text-white uppercase">
                  {presetDetails[activePreset].title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 font-sans">
                  {presetDetails[activePreset].type}
                </p>
              </div>

              <div>
                <div className="p-3 bg-black border border-white/[0.08] text-xs text-emerald-400">
                  <code>{presetDetails[activePreset].formula}</code>
                </div>
              </div>

              <div>
                <div className="text-xs text-zinc-300 leading-relaxed font-sans">
                  {presetDetails[activePreset].useCase}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/[0.06] text-[11px] font-mono text-zinc-500">
            Engine: Motion 13 Hardware-Accelerated (Zero Layout Thrashing)
          </div>
        </div>
      </div>
    </section>
  );
}
