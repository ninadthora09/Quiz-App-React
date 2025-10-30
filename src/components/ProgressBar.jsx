import React, { useEffect, useState, useRef } from "react";
import { motion as Motion, useAnimation } from "framer-motion";

/**
 * Professional ProgressBar
 * Props:
 *  - current: number (current progress)
 *  - total: number (total / max)
 */
const ProgressBar = ({ current = 0, total = 1 }) => {
  // clamp and compute percent
  const rawPercent = total > 0 ? (current / total) * 100 : 0;
  const percent = Math.max(0, Math.min(100, Number(rawPercent.toFixed(2)))); // 2 decimals
  const rounded = Math.round(percent); // for display

  const [hovered, setHovered] = useState(false);
  const controls = useAnimation();
  const prevPercentRef = useRef(percent);

  // animate width and a subtle pulse when progress increases
  useEffect(() => {
    // animate width using spring-like motion
    controls.start({
      width: `${percent}%`,
      transition: { type: "spring", stiffness: 150, damping: 24 },
    });

    // if progressed forward, quick soft pulse
    if (percent > prevPercentRef.current) {
      controls.start({
        boxShadow: [
          "0 0 0px rgba(34,211,238,0.0)",
          "0 0 18px rgba(34,211,238,0.18)",
          "0 0 6px rgba(34,211,238,0.08)",
        ],
        transition: { duration: 0.7 },
      });
    }
    prevPercentRef.current = percent;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent]);

  // animate stripes movement with framer (looping)
  const stripeAnim = {
    animate: {
      backgroundPositionX: ["0px", "-120px"],
      transition: { repeat: Infinity, repeatType: "loop", ease: "linear", duration: 2.4 },
    },
  };

  return (
    <div className="w-full">
      <div
        role="progressbar"
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="relative h-3 md:h-4 rounded-full bg-gray-800/60 ring-1 ring-black/40 overflow-visible"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Background glow / subtle inner shadow */}
        <div className="absolute inset-0 rounded-full pointer-events-none" style={{
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02), inset 0 -6px 18px rgba(0,0,0,0.4)"
        }} />

        {/* Animated filled portion */}
        <Motion.div
          animate={controls}
          initial={{ width: "0%", boxShadow: "0 0 0px rgba(0,0,0,0)" }}
          className="h-full rounded-full relative overflow-hidden"
          style={{
            background: "linear-gradient(90deg, rgba(34,211,238,0.95) 0%, rgba(96,165,250,0.95) 50%, rgba(168,85,247,0.95) 100%)",
            willChange: "width, box-shadow",
          }}
        >
          {/* Moving diagonal stripes overlay */}
          <Motion.div
            {...stripeAnim}
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 8px, rgba(255,255,255,0) 8px 16px)",
              backgroundSize: "160px 160px",
              mixBlendMode: "overlay",
            }}
          />

          {/* optional percentage badge on the bar (small, right aligned) */}
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs md:text-sm font-semibold text-gray-900 bg-white/90 px-2 py-0.5 rounded-lg shadow-sm backdrop-blur-sm">
            {rounded}%
          </div>
        </Motion.div>

        {/* Floating tooltip above when hovered */}
        {hovered && (
          <div
            className="absolute -top-10 left-1/2 -translate-x-1/2 text-xs md:text-sm select-none pointer-events-none"
            aria-hidden="true"
          >
            <div className="inline-flex items-center gap-3 bg-gray-900/95 text-white px-3 py-1 rounded-full shadow-lg ring-1 ring-white/10">
              <span className="font-medium">{current}</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-300">{total}</span>
              <span className="ml-2 text-cyan-300 font-semibold">{rounded}%</span>
            </div>

            {/* tooltip caret */}
            <div className="w-3 h-3 bg-gray-900/95 rotate-45 mx-auto mt-1" style={{ transformOrigin: "center" }} />
          </div>
        )}
      </div>

      {/* Beneath the bar: friendly textual summary (small, unobtrusive) */}
      <div className="mt-2 flex items-center justify-between text-xs md:text-sm text-gray-400">
        <div>Progress</div>
        <div>{current} / {total} • {rounded}%</div>
      </div>
    </div>
  );
};

export default ProgressBar;
