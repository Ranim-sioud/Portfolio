import { Mail, Github, Linkedin, ArrowRight, Sparkles, Zap, Target, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import ContactOptionsModal from "../../modals/ContactOptionsModal";


export default function Hero({ data, itemVariants, cardHoverVariants }) {
  const [showContactModal, setShowContactModal] = useState(false); // pour "Me contacter"
  const { content, design_system } = data;
  const { colors } = design_system;
  const contactInfo = data.site_metadata.contact_info;

  return (
    <>
    <motion.div 
        variants={itemVariants} 
        className="lg:col-span-8 col-span-1"
        whileHover="hover"
      >
        <motion.div
          variants={cardHoverVariants}
          className="rounded-3xl shadow-2xl p-10 border border-slate-100/50 relative overflow-hidden card-base"
          style={{ backgroundColor: colors.card_bg }}
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-blue-50/20 to-purple-50/20 rounded-full -ml-24 -mb-24" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
              <span 
                className="text-sm font-semibold px-3 py-1 rounded-full"
                style={{
                  backgroundColor: colors.accents.primary_blue + "20",
                  color: colors.accents.primary_blue,
                }}
              >
                {content.header.badge || "DÉVELOPPEUR FULL-STACK"}
              </span>
            </div>
            <motion.h1
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-5xl sm:text-6xl md:text-7xl font-bold leading-tight"
              style={{ color: colors.text_primary }}
            >
              <span className="text-gradient block mb-2">
                {content.header.greeting.split(' ')[0]}
              </span>
              <span className="block">
                {content.header.greeting.split(' ').slice(1).join(' ')}
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 max-w-2xl text-lg leading-relaxed"
              style={{ color: colors.text_secondary }}
            >
              {content.header.main_question}
            </motion.p>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 flex items-center gap-2 text-sm font-medium"
              style={{ color: colors.accents.primary_blue }}
            >
              <Zap className="w-4 h-4" />
              {content.header.sub_date}
            </motion.p>
            {/* Contact Links améliorés */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowContactModal(true)}
                className="flex items-center gap-3 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${colors.accents.primary_blue}, ${colors.accents.creative_purple})`,
                  color: "white",
                }}
              >
                <Mail size={18} /> 
                <span>Me contacter</span>
                <ArrowRight size={16} />
              </motion.a>
              
              <div className="flex gap-3">
                {[
                  { icon: Github, href: `https://${contactInfo.github}`, label: "GitHub", color: colors.text_primary },
                  { icon: Linkedin, href: `https://${contactInfo.linkedin}`, label: "LinkedIn", color: "#0A66C2" }
                ].map((social, idx) => (
                  <motion.a
                    key={idx}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
                    style={{
                      backgroundColor: social.color + "10",
                      color: social.color,
                    }}
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
      {/* ============ HIGHLIGHT CARD ============ */}
        <motion.div 
          variants={itemVariants} 
          className="lg:col-span-4 col-span-1"
          whileHover="hover"
        >
          <motion.div
            variants={cardHoverVariants}
            className="rounded-3xl shadow-2xl p-8 border border-slate-100/50 h-full flex flex-col justify-between relative overflow-hidden card-base"
            style={{
              backgroundColor: colors.card_bg,
              background: `linear-gradient(135deg, ${content.dashboard_grid.hero_card.main_color}20, transparent)`,
            }}
          >
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200/20 to-purple-200/20 rounded-full -mr-16 -mt-16" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: colors.text_secondary }}
                >
                  {content.dashboard_grid.hero_card.title}
                </p>
              </div>
              
              <h2
                className="text-2xl font-bold mt-2 mb-6"
                style={{ color: colors.text_primary }}
              >
                {content.dashboard_grid.hero_card.status}
              </h2>

              <div className="flex items-end justify-between">
                  <p
                    className="text-sm max-w-xs leading-relaxed"
                    style={{ color: colors.text_secondary }}
                  >
                    {content.dashboard_grid.hero_card.quote}
                  </p>
                  <motion.div 
                    className="text-7xl filter drop-shadow-lg floating"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity }}
                  >
                    {content.dashboard_grid.hero_card.icon_emoji}
                  </motion.div>
                </div>
            </div>

            {/* Progress indicator */}
            <div className="mt-8 pt-4 border-t border-slate-100">
              <div className="flex justify-between text-xs mb-2">
                <span style={{ color: colors.text_secondary }}>Progression</span>
                {/* intentionally no numeric percent shown */}
                <span style={{ color: colors.text_secondary }} className="font-medium">&nbsp;</span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "70%" }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${colors.accents.primary_blue}, ${colors.accents.creative_purple})` }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        <ContactOptionsModal
          showContactModal={showContactModal}
          setShowContactModal={setShowContactModal}
          colors={colors}
          content={data.content}
          contactInfo={data.site_metadata.contact_info}
        />
      </>
  );
}