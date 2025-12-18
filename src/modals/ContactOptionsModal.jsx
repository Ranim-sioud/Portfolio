import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, X, ChevronRight } from "lucide-react";

export default function ContactOptionsModal({
  showContactModal,
  setShowContactModal,
  colors,
  content,
  contactInfo,
}) {

  return (
    <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowContactModal(false)}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-slate-100 relative"
            >
              {/* Close button */}
              <motion.button
                whileHover={{ rotate: 90 }}
                onClick={() => setShowContactModal(false)}
                className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
                aria-label="Fermer"
              >
                <X size={24} className="text-slate-600" />
              </motion.button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ color: colors.text_primary }}
                >
                  {content.interaction.modal_trigger.modal_content.title}
                </h2>
                <p
                  className="text-slate-600"
                >
                  {content.interaction.modal_trigger.modal_content.subtitle}
                </p>
              </div>

              <div className="space-y-4">
                {content.interaction.modal_trigger.modal_content.options.map(
                  (option, idx) => (
                    <motion.a
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      href={option.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group"
                      style={{
                        borderColor: colors.text_secondary + "20",
                      }}
                    >
                      <span className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
                        {option.icon}
                      </span>
                      <div className="flex-1 text-left">
                        <span
                          className="font-semibold block"
                          style={{ color: colors.text_primary }}
                        >
                          {option.label}
                        </span>
                        <span className="text-sm text-slate-500">
                          {option.description || "Cliquez pour me contacter"}
                        </span>
                      </div>
                      <ChevronRight 
                        size={20} 
                        className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" 
                      />
                    </motion.a>
                  )
                )}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                <p className="text-sm text-slate-500">
                  Vous pouvez aussi me contacter directement à{" "}
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    {contactInfo.email}
                  </a>
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  );
}