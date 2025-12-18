import { ExternalLink, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Projects({ projects, colors, itemVariants }) {
  const [activeProject, setActiveProject] = useState(null);

  const handleProjectHover = (index) => {
    setActiveProject(index);
  };
  return (
    <motion.div variants={itemVariants} className="lg:col-span-12 col-span-1">
          <div
            className="rounded-3xl shadow-2xl p-8 border border-slate-100/50 card-base"
            style={{ backgroundColor: colors.card_bg }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ color: colors.text_primary }}
                >
                  {projects.title}
                </h3>
                <p
                  className="text-sm"
                  style={{ color: colors.text_secondary }}
                >
                  Découvrez mes réalisations récentes
                </p>
              </div>
              <div className="text-sm px-4 py-2 rounded-full"
                style={{
                  backgroundColor: colors.accents.primary_blue + "20",
                  color: colors.accents.primary_blue,
                }}
              >
                {projects.list.length} projets
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.list.map((project, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
                  onMouseEnter={() => handleProjectHover(idx)}
                  onMouseLeave={() => setActiveProject(null)}
                  className="rounded-2xl p-6 border transition-all duration-300 relative overflow-hidden group hover-lift"
                  style={{
                    backgroundColor: colors.background,
                    borderColor: colors.text_secondary + "20",
                  }}
                >
                  {/* Project hover effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4
                          className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors duration-300"
                          style={{ color: colors.text_primary }}
                        >
                          {project.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
                            {project.emoji_indicator}
                          </div>
                          {project.tech && (
                            <span className="text-xs px-2 py-1 rounded-full"
                              style={{
                                backgroundColor: colors.accents.soft_blue + "30",
                                color: colors.accents.primary_blue,
                              }}
                            >
                              {project.tech}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {activeProject === idx && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="p-2 bg-blue-100 rounded-lg"
                        >
                          <a href={`/project/${idx}`} aria-label={`Voir le projet ${project.name}`}>
                            <ExternalLink className="w-4 h-4 text-blue-600" />
                          </a>
                        </motion.div>
                      )}
                    </div>

                    <p
                      className="text-sm mb-4 line-clamp-2"
                      style={{ color: colors.text_secondary }}
                    >
                      {project.metric}
                    </p>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all duration-300"
                          style={{ color: colors.accents.primary_blue }}
                        >
                          <span>{project.status}</span>
                          <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform" />
                        </a>
                      ) : (
                        <span
                          className="text-sm font-semibold"
                          style={{ color: colors.text_secondary }}
                        >
                          {project.status}
                        </span>
                      )}
                      
                      {project.year && (
                        <span className="text-xs text-slate-400">
                          {project.year}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
  );
}