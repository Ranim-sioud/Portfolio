import SkillChart from "../../charts/SkillChart";
import { ChevronRight, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";


export default function Skills({ skills, colors, itemVariants, cardHoverVariants }) {
  return (
    <>
     {/* ============ SKILLS CHART amélioré ============ */}
        <motion.div 
          variants={itemVariants} 
          className="lg:col-span-8 col-span-1"
          whileHover="hover"
        >
          <motion.div
            variants={cardHoverVariants}
            className="rounded-3xl shadow-2xl p-8 border border-slate-100/50 card-base"
            style={{ backgroundColor: colors.card_bg }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ color: colors.text_primary }}
                >
                  {skills.title}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: colors.text_secondary }}
                >
                  {skills.description}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
            </div>

            <SkillChart data={skills.data} />
            
            {/* Skill legend */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex flex-wrap gap-4 justify-center">
                {skills.data.slice(0, 5).map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: skill.color || "#7C3AED" }}
                    />
                    <span 
                      className="text-xs font-medium"
                      style={{ color: colors.text_secondary }}
                    >
                      {skill.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
        
    </>
  );
}