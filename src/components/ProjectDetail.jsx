import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, DownloadCloud, Maximize2 } from "lucide-react";

export default function ProjectDetail({ data }) {
  const { id } = useParams();
  const idx = Number(id);
  const projects = data?.content?.dashboard_grid?.projects_list?.list || [];
  const project = projects[idx];

  if (!project) return (
    <div className="p-8">Projet introuvable. <Link to="/">Retour</Link></div>
  );

  const media = Array.isArray(project.media) ? project.media : [];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const mediaRef = useRef(null);

  const openLightbox = (i = 0) => { setCurrent(i); setDir(1); setLightboxOpen(true); };
  const closeLightbox = () => setLightboxOpen(false);

  const showNext = useCallback(() => { if (media.length === 0) return; setDir(1); setCurrent(i => (i + 1) % media.length); }, [media.length]);
  const showPrev = useCallback(() => { if (media.length === 0) return; setDir(-1); setCurrent(i => (i - 1 + media.length) % media.length); }, [media.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key && e.key.toLowerCase() === 'f') {
        const el = mediaRef.current;
        if (el?.requestFullscreen) el.requestFullscreen();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, showNext, showPrev]);

  const toggleFullscreen = () => {
    const el = mediaRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen?.();
    else el.requestFullscreen?.();
  };

  const handleVideoError = (src) => {
    console.warn('Video failed to play:', src);
  };

  const techChips = (project.technologies || project.metric || '')
    .toString()
    .split(/,|\/|;/)
    .map(s => s.trim())
    .filter(Boolean);

  return (
    <div className="p-8 rounded-2xl card-base" style={{ background: data.design_system.colors.card_bg }}>
      <header className="mb-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-3">
              {project.metric ? (
                <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: data.design_system.colors.accents.soft_blue, color: data.design_system.colors.accents.primary_blue }}>{project.metric}</span>
              ) : null}
              <h1 className="text-2xl font-bold" style={{ color: data.design_system.colors.text_primary }}>{project.name}</h1>
            </div>
            <div className="mt-2 text-sm text-slate-500">{project.role || ''} {project.duration ? `• ${project.duration}` : ''}</div>
          </div>

          <div className="flex items-center gap-3">
            {project.link ? (
              <a href={project.link} target="_blank" rel="noreferrer" className="text-sm inline-flex items-center gap-2" style={{ color: data.design_system.colors.accents.primary_blue }}>Voir la démo <ExternalLink size={14} /></a>
            ) : null}
            <Link to="/" className="text-sm text-slate-500 inline-flex items-center gap-2">Retour <ArrowRight size={14} /></Link>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <main className="lg:col-span-2">
          <div className="prose max-w-none mb-4">
            <h3>Description</h3>
            <p className="text-sm text-slate-600">{project.description || 'Aucune description disponible.'}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {media.length === 0 ? (
              <div className="rounded-md p-6 text-sm text-slate-500 border" style={{ borderColor: data.design_system.colors.text_secondary + '10' }}>Aucun média disponible.</div>
            ) : media.map((m, i) => (
              <button key={i} onClick={() => openLightbox(i)} className="group rounded-md overflow-hidden border hover:shadow-lg transition-shadow text-left" style={{ borderColor: data.design_system.colors.text_secondary + '20' }}>
                {m.type === 'video' ? (
                  <div className="relative bg-black">
                    <video src={m.src} muted playsInline preload="metadata" poster={m.poster || ''} className="w-full h-48 object-cover" onError={() => handleVideoError(m.src)} />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="bg-white/90 p-2 rounded-full shadow">▶</div>
                    </div>
                  </div>
                ) : (
                  <img src={m.src} alt={m.caption || project.name} className="w-full h-48 object-cover" />
                )}
                {m.caption && <div className="p-2 text-xs text-slate-500">{m.caption}</div>}
              </button>
            ))}
          </div>
        </main>

        <aside className="lg:col-span-1">
          <div className="p-4 rounded-lg border" style={{ borderColor: data.design_system.colors.text_secondary + '10' }}>
            <h4 className="font-semibold mb-2">Technologies</h4>
            <div className="flex flex-wrap gap-2">
              {techChips.length === 0 ? (
                <div className="text-sm text-slate-500">Non spécifié</div>
              ) : techChips.map((t, i) => (
                <span key={i} className="text-xs px-3 py-1 rounded-full font-medium" style={{ background: data.design_system.colors.accents.soft_blue + '20', color: data.design_system.colors.accents.primary_blue }}>{t}</span>
              ))}
            </div>
          </div>

          <div className="mt-4 p-4 rounded-lg border" style={{ borderColor: data.design_system.colors.text_secondary + '10' }}>
            <h4 className="font-semibold mb-2">Liens</h4>
            <div className="flex flex-col gap-2">
              {project.link ? <a href={project.link} target="_blank" rel="noreferrer" className="text-sm" style={{ color: data.design_system.colors.accents.primary_blue }}>Voir la démo</a> : <span className="text-sm text-slate-500">Pas de démo</span>}
              {project.repo ? <a href={project.repo} target="_blank" rel="noreferrer" className="text-sm text-slate-600">Dépôt Git</a> : null}
            </div>
          </div>

          <div className="mt-4 p-4 rounded-lg border" style={{ borderColor: data.design_system.colors.text_secondary + '10' }}>
            <h4 className="font-semibold mb-2">Statut</h4>
            <div className="text-sm text-slate-600">{project.status || '—'}</div>
          </div>
        </aside>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/80" onClick={closeLightbox} />
            <div className="relative z-50 max-w-5xl w-full">
              <div className="bg-white rounded-lg overflow-hidden">
                <div className="flex items-center justify-between p-3 border-b">
                  <div className="flex items-center gap-2">
                    <button onClick={showPrev} className="p-2 rounded hover:bg-slate-100"><ChevronLeft /></button>
                    <button onClick={showNext} className="p-2 rounded hover:bg-slate-100"><ChevronRight /></button>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={media[current]?.src} target="_blank" rel="noreferrer" className="text-sm text-slate-600">Ouvrir</a>
                    <a href={media[current]?.src} download className="text-slate-600"><DownloadCloud /></a>
                    <button onClick={toggleFullscreen} title="Plein écran" className="p-2 rounded hover:bg-slate-100"><Maximize2 /></button>
                    <button onClick={closeLightbox} className="p-2 rounded hover:bg-slate-100"><X /></button>
                  </div>
                </div>

                <div className="p-4 bg-black flex items-center justify-center">
                  <motion.div key={current} initial={{ x: dir * 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: dir * -40, opacity: 0 }} transition={{ duration: 0.28 }} className="w-full flex items-center justify-center" ref={mediaRef}>
                    {media[current]?.type === 'video' ? (
                      <video controls autoPlay playsInline src={media[current]?.src} poster={media[current]?.poster || ''} className="w-full h-auto max-h-[70vh] bg-black" onError={() => handleVideoError(media[current]?.src)} />
                    ) : (
                      <img src={media[current]?.src} alt={media[current]?.caption || project.name} className="w-full h-auto max-h-[70vh] object-contain" />
                    )}
                  </motion.div>
                </div>

                {media[current]?.caption && <div className="p-3 text-sm text-slate-600">{media[current].caption}</div>}

                <div className="p-3 border-t overflow-x-auto">
                  <div className="flex gap-2">
                    {media.map((m, i) => (
                      <button key={i} onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); }} className={`rounded overflow-hidden border-2 transform transition-transform ${i === current ? 'border-blue-500 scale-105' : 'border-transparent hover:scale-105'}`} style={{ minWidth: 100 }}>
                        {m.type === 'video' ? (
                          <video src={m.src} muted playsInline preload="metadata" poster={m.poster || ''} className="w-24 h-16 object-cover" />
                        ) : (
                          <img src={m.src} alt={m.caption || project.name} className="w-24 h-16 object-cover" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
