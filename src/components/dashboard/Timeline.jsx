import { GraduationCap, Briefcase, Calendar, Building2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Timeline({ education, experience, colors, itemVariants }) {
  return (
    <motion.div variants={itemVariants} className="lg:col-span-12 col-span-1">
        <div 
          className="rounded-3xl shadow-2xl p-8 border border-slate-100/50 card-base relative overflow-hidden" 
          style={{ backgroundColor: colors.card_bg }}
        >
          {/* Background Decoration */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-blue-100 to-transparent opacity-50" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* --- Colonne ÉDUCATION --- */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 shadow-sm">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: colors.text_primary }}>
                  Parcours Académique
                </h3>
              </div>
              <div className="space-y-8 relative pl-2">
                {/* Ligne verticale de timeline */}
                <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-slate-100" />
                {(Array.isArray(education) ? education : []).map((edu, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="relative pl-12 group"
                  >
                    {/* Point sur la timeline */}
                    <div 
                      className="absolute left-[10px] top-2 w-5 h-5 rounded-full border-4 border-white shadow-md z-10 transition-colors duration-300 group-hover:scale-110"
                      style={{ backgroundColor: colors.accents.soft_blue }} 
                    />
                    
                    {/* Carte contenu */}
                    <div 
                      className="p-5 rounded-2xl border border-slate-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/50 hover:bg-white"
                      style={{ borderColor: colors.text_secondary + "15" }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-lg leading-tight" style={{ color: colors.text_primary }}>
                          {edu.institution}
                        </h4>
                        <span 
                          className="text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1 shrink-0"
                          style={{ backgroundColor: colors.background, color: colors.text_secondary }}
                        >
                          <Calendar size={12} />
                          {edu.period}
                        </span>
                      </div>
                      <p className="font-medium mb-1" style={{ color: colors.accents.primary_blue }}>
                        {edu.degree}
                      </p>
                      {edu.description && (
                        <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* --- Colonne EXPÉRIENCE --- */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-2xl bg-purple-50 text-purple-600 shadow-sm">
                  <Briefcase size={24} />
                </div>
                <h3 className="text-2xl font-bold" style={{ color: colors.text_primary }}>
                  Expérience Pro
                </h3>
              </div>
              <div className="space-y-8 relative pl-2">
                {/* Ligne verticale de timeline */}
                <div className="absolute left-[19px] top-2 bottom-2 w-[2px] bg-slate-100" />
                {(Array.isArray(experience) ? experience : []).map((exp, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="relative pl-12 group"
                  >
                    {/* Point sur la timeline */}
                    <div 
                      className="absolute left-[10px] top-2 w-5 h-5 rounded-full border-4 border-white shadow-md z-10 transition-colors duration-300 group-hover:scale-110"
                      style={{ backgroundColor: colors.accents.creative_purple }} 
                    />
                    {/* Carte contenu */}
                    <div 
                      className="p-5 rounded-2xl border border-slate-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/50 hover:bg-white"
                      style={{ borderColor: colors.text_secondary + "15" }}
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                        <div>
                          <h4 className="font-bold text-lg" style={{ color: colors.text_primary }}>
                            {exp.role}
                          </h4>
                          <div className="flex items-center gap-2 text-sm font-medium opacity-80" style={{ color: colors.accents.creative_purple }}>
                            <Building2 size={14} />
                            {exp.company}
                          </div>
                        </div>
                        <span 
                          className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 text-slate-500 whitespace-nowrap self-start"
                        >
                          {exp.period}
                        </span>
                      </div>
                      
                      <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                        {exp.description}
                      </p>
                      {/* Technologies Tags */}
                      {exp.technologies && (
                        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-50">
                          {exp.technologies.split(',').map((tech, tIdx) => (
                            <span 
                              key={tIdx}
                              className="text-[11px] font-semibold px-2 py-1 rounded-md transition-colors hover:bg-purple-100 hover:text-purple-700"
                              style={{ 
                                backgroundColor: colors.background, 
                                color: colors.text_secondary 
                              }}
                            >
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
  );
}