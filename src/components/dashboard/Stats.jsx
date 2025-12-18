import { motion } from "framer-motion";

export default function Stats({ stats, colors }) {
  return (
    <>
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          className="lg:col-span-4 col-span-1"
          whileHover={{ y: -8, scale: 1.02 }}
        >
          <div
            className="rounded-3xl shadow-2xl p-8 border h-full card-base"
            style={{
              backgroundColor: colors.card_bg,
              background: `linear-gradient(135deg, ${stat.color || colors.accents.soft_blue}15, transparent)`,
              borderColor: colors.text_secondary + "20",
            }}
          >
            <div className="flex justify-between mb-6">
              <p className="text-xs font-semibold uppercase" style={{ color: colors.text_secondary }}>
                {stat.title}
              </p>
              <div className="text-2xl">{stat.icon}</div>
            </div>

            <h4 className="text-2xl font-semibold" style={{ color: colors.text_primary }}>
              {stat.subtext}
            </h4>

            <p className="mt-3 text-sm" style={{ color: colors.text_secondary }}>
              {stat.description}
            </p>

            <div
              className="h-1 mt-6 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${stat.color || colors.accents.primary_blue}, transparent)`
              }}
            />
          </div>
        </motion.div>
      ))}
    </>
  );
}