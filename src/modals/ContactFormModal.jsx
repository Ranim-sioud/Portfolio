import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
//import { useContactForm } from "../../hooks/useContactForm";
import emailjs from "emailjs-com";
import { useState } from "react";

export default function ContactFormModal({ showFormModal, setShowFormModal, colors }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSend = (e) => {
    e.preventDefault();
    setLoading(true);

    // Exemple avec EmailJS (ou ton backend)
    emailjs.send(
      "service_jymj9tr",
      "template_qwhhe8o",
      {
        name: name,
        email: email,
        message: message,
      },
      "T5mp8fSjpryGm5E-d"
    )
    .then(() => {
      setLoading(false);
      setSuccess(true);
      setName("");
      setEmail("");
      setMessage("");
    })
    .catch((err) => {
      console.error(err);
      setLoading(false);
      alert("Erreur lors de l'envoi !");
    });
  };

  return (
    <AnimatePresence>
        {showFormModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFormModal(false)}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-slate-100 relative"
            >
              <motion.button
                whileHover={{ rotate: 90 }}
                onClick={() => setShowFormModal(false)}
                className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={24} className="text-slate-600" />
              </motion.button>

              <h2 className="text-2xl font-bold mb-4">Envoyer un mail</h2>
              {success && <p className="text-green-600 mb-4">Message envoyé avec succès !</p>}

              <form className="space-y-4" onSubmit={handleSend}>
                <input
                  type="text"
                  placeholder="Votre nom"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-3 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="email"
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <textarea
                  placeholder="Votre message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full p-3 border rounded-xl border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
                  style={{ backgroundColor: colors.accents.creative_purple }}
                >
                  {loading ? "Envoi..." : "Envoyer"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
  );
}