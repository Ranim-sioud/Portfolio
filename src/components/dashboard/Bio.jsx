import { motion } from "framer-motion";
import { User, MapPin, Languages, Briefcase, Star, ChevronRight } from "lucide-react";

export default function Bio({ bio, colors, itemVariants, cardHoverVariants }) {

  const bioCard = bio || {};
  const bioContentText = bioCard.content || (Array.isArray(bioCard.education) && bioCard.education.length ? bioCard.education[0].degree : "");
  const bioTags = Array.isArray(bioCard.tags)
    ? bioCard.tags
    : Array.isArray(bioCard.certificates)
    ? bioCard.certificates.map((c) => c.title)
    : [];
  return (
    <motion.div 
          variants={itemVariants} 
          className="lg:col-span-4 col-span-1"
          whileHover="hover"
        >
          <motion.div
            variants={cardHoverVariants}
            className="rounded-3xl shadow-2xl p-8 border border-slate-100/50 h-full card-base relative overflow-hidden"
            style={{ backgroundColor: colors.card_bg }}
          >
            {/* Floating particles */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400/30 rounded-full" />
            <div className="absolute bottom-8 left-8 w-2 h-2 bg-purple-400/30 rounded-full" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg">
                  <Star className="w-5 h-5 text-blue-600" />
                </div>
                <h3
                  className="text-2xl font-bold"
                  style={{ color: colors.text_primary }}
                >
                  {bio.title}
                </h3>
              </div>
              
              <p
                className="leading-relaxed text-sm mb-6"
                style={{ color: colors.text_secondary }}
              >
                {bioContentText}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {bioTags.length > 0 ? (
                  bioTags.map((tag, idx) => (
                    <motion.span
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="text-xs px-4 py-2 rounded-full font-medium transition-all duration-300"
                      style={{
                        background: `linear-gradient(135deg, ${colors.accents.soft_blue}30, ${colors.accents.creative_purple}30)`,
                        color: colors.accents.primary_blue,
                        border: `1px solid ${colors.accents.soft_blue}50`,
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))
                ) : (
                  <span className="text-sm text-slate-400">Aucune étiquette disponible</span>
                )}
              </div>
              
              {/* Call to action */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowContactModal(true)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300"
                style={{
                  backgroundColor: colors.accents.primary_blue + "10",
                  color: colors.accents.primary_blue,
                }}
              >
                <span>En savoir plus sur moi</span>
                <ChevronRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
  );
}

/* ------------------ */
/* Small Info Card    */
/* ------------------ */
function InfoCard({ icon, label, value, colors }) {
  return (
    <div
      className="rounded-2xl p-5 border hover:shadow-lg transition"
      style={{
        borderColor: colors.text_secondary + "25",
        backgroundColor: colors.background,
      }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-9 h-9 flex items-center justify-center rounded-xl"
          style={{
            background: colors.accents.primary_blue + "20",
            color: colors.accents.primary_blue,
          }}
        >
          {icon}
        </div>

        <p
          className="text-xs uppercase font-semibold"
          style={{ color: colors.text_secondary }}
        >
          {label}
        </p>
      </div>

      <p
        className="text-sm font-medium"
        style={{ color: colors.text_primary }}
      >
        {value}
      </p>
    </div>
  );
}