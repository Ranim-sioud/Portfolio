import React from "react";
import { motion } from "framer-motion";


// SkillChart component — accepts `data` (preferred) or legacy `categories`.
export default function SkillChart({ data, categories }) {
  const normalized = Array.isArray(data)
    ? data
    : Array.isArray(categories)
    ? categories.flatMap((cat) => (cat.items || []).map((it) => ({ ...it, color: cat.color, emoji: cat.icon })))
    : [];

  const maxLevel = 100;

  if (!Array.isArray(normalized) || normalized.length === 0) {
    return <p className="text-slate-500 text-sm">No skills data available.</p>;
  }

  const maxHeight = 220;

  return (
    <div className="w-full">
      <div className="overflow-x-auto pb-4">
        <div className="flex items-end justify-start gap-8" style={{ minWidth: Math.max(640, normalized.length * 100) }}>
          {normalized.map((skill, i) => {
            // Decide color based on skill name groups (user preference):
            // - highSkills: shown with stronger/primary colors (e.g., React, Node, MongoDB)
            // - midSkills: neutral/purple
            // - lowSkills: softer/orange/pink
            const nameKey = (skill.label || skill.name || "").toString().toLowerCase();

            const highSkills = ["react", "node", "mongodb", "javascript", "html5"];
            const midSkills = ["next", "bootstrap", "sql", "mysql"];
            const lowSkills = ["python", "laravel", "c", "css3", "css"];

            const pickColor = () => {
              // exact contains check so 'react.js' or 'react' match
              if (highSkills.some((k) => nameKey.includes(k))) return "linear-gradient(180deg,#2DD4BF,#5E81F4)"; // teal -> blue
              if (midSkills.some((k) => nameKey.includes(k))) return "linear-gradient(180deg,#A78BFA,#7C3AED)"; // purple
              if (lowSkills.some((k) => nameKey.includes(k))) return "linear-gradient(180deg,#FFB17A,#F472B6)"; // orange -> pink
              // fallback: use provided color or a neutral gradient
              if (skill.color) return skill.color;
              return "linear-gradient(180deg,#60A5FA,#A29BFE)";
            };

            const barColor = pickColor();

            // Compute bar height from skill.level when available, mapping 0-100 -> [70,95]
            // Then apply small group offsets so lowSkills render slightly lower than highSkills.
            const rawLevel = (() => {
              const v = skill.level ?? skill.levelPct ?? skill.value ?? skill.score;
              if (typeof v === "string") {
                const num = Number(v.replace(/[^0-9.-]+/g, ""));
                return Number.isFinite(num) ? num : null;
              }
              return typeof v === "number" ? v : null;
            })();

            const clamp = (n, a, b) => Math.min(Math.max(n, a), b);

            // base mapping function: map level 0 -> 50, level 100 -> 70 (lower overall)
            const mapToDisplay = (level) => 50 + (clamp(level, 0, 100) / 100) * 20;

            let displayVal = rawLevel != null ? mapToDisplay(rawLevel) : 60; // default mid value lower than before

            // apply smaller group offsets but ensure final values remain <= 70
            if (lowSkills.some((k) => nameKey.includes(k))) displayVal -= 6; // softer group
            if (highSkills.some((k) => nameKey.includes(k))) displayVal += 4; // stronger group

            // clamp final visual range so max is 70
            const heightPercent = clamp(Math.round(displayVal), 40, 70);

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, type: "spring", stiffness: 90, damping: 14 }}
                className="flex flex-col items-center flex-shrink-0"
              >
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05 + 0.12, type: "spring" }} className="mb-3 text-3xl">
                  {skill.emoji || skill.icon || "✨"}
                </motion.div>

                <div className="relative w-14 flex items-end justify-center" style={{ height: maxHeight }}>
                  <div className="absolute inset-0 bg-slate-100 rounded-full opacity-30" />

                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(heightPercent / maxLevel) * 100}%` }}
                    transition={{ type: "spring", stiffness: 80, damping: 16, delay: i * 0.06 }}
                    style={{ background: barColor }}
                    className="w-12 rounded-full shadow-lg"
                  />
                </div>

                <div className="mt-4 text-center w-full">
                  <div className="text-xs font-bold text-slate-900 leading-tight">{skill.label || skill.name || "Skill"}</div>
                  {/* no numeric or textual proficiency shown on purpose */}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}