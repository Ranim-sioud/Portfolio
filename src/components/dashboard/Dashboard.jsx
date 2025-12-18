import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Hero from "./Hero";
import Stats from "./Stats";
import Skills from "./Skills";
import Bio from "./Bio";
import Timeline from "./Timeline";
import Projects from "./Projects";
import ContactCTA from "./ContactCTA";

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95 
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6 
    }
  },
};

const cardHoverVariants = {
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};
export default function Dashboard({ data }) {
  const { colors } = data.design_system;
  const [showContactModal, setShowContactModal] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const timer = setTimeout(() => setIsLoading(false), 800);
      return () => clearTimeout(timer);
    }, []);

  return (
    <>
    <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-4 border-4 border-blue-200 border-t-blue-600 rounded-full"
              />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-slate-600 font-medium"
              >
                Chargement de votre portfolio...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 section-padding"
      style={{ background: colors.background }}
    >
      <Hero data={data} itemVariants={itemVariants} cardHoverVariants={cardHoverVariants} />
      <Stats
        stats={data.content.dashboard_grid.stats_cards}
        colors={colors}
      />
      <Skills
        skills={data.content.dashboard_grid.skills_chart}
        colors={colors}
        itemVariants={itemVariants} cardHoverVariants={cardHoverVariants}
      />

      <Bio
        bio={data.content.dashboard_grid.bio_card}
        colors={colors}
        itemVariants={itemVariants}
        cardHoverVariants={cardHoverVariants}
      /> 

      <Timeline
        education={data.content.dashboard_grid.bio_card.education}
        experience={data.content.dashboard_grid.experience}
        colors={colors}
        itemVariants={itemVariants}
      />

      <Projects
        projects={data.content.dashboard_grid.projects_list}
        colors={colors}
        itemVariants={itemVariants}
      />

      <ContactCTA
        colors={colors}
        linkedin={data.site_metadata.contact_info.linkedin}
        onMail={() => console.log("open mail modal")}
        itemVariants={itemVariants}
      />
    </motion.main>
    </>
  );
}