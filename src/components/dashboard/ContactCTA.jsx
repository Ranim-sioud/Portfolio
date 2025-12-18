import { Mail, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import ContactFormModal from "../../modals/ContactFormModal";

export default function ContactCTA({ colors, linkedin, onMail, itemVariants }) {
  const [showFormModal, setShowFormModal] = useState(false);
  return (
    <>
    <motion.div 
          variants={itemVariants} 
          className="lg:col-span-12 col-span-1"
          whileHover={{ scale: 1.01 }}
        >
          <div
            className="rounded-3xl shadow-2xl p-12 border border-white/20 text-center relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${colors.accents.primary_blue}, ${colors.accents.creative_purple})`,
              color: "white",
            }}
          >
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32" />
            
            <div className="relative z-10">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="text-6xl mb-6"
              >
                ✨
              </motion.div>
              
              <h3 className="text-4xl font-bold mb-4">Prêt à collaborer ?</h3>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Vous avez un projet innovant ou une opportunité passionnante ? 
                Parlons-en et créons quelque chose d'extraordinaire ensemble !
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowFormModal(true)}
                  className="px-10 py-4 bg-white font-bold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                  style={{ color: colors.accents.primary_blue }}
                >
                  <Mail size={20} />
                  Envoyer un mail
                </motion.button>
                
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={`https://${linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-bold rounded-full transition-all duration-300 hover:bg-white/20 flex items-center justify-center gap-3"
                >
                  <Linkedin size={20} />
                  Connectons-nous
                </motion.a>
              </div>
              
              <p className="mt-8 text-sm text-white/70">
                Réponse garantée sous 24 heures
              </p>
            </div>
          </div>
        </motion.div>
        <ContactFormModal showFormModal={showFormModal} setShowFormModal={setShowFormModal} colors={colors} />
    </>
  );
}