import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { categories } from "../data";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, X, ZoomIn } from "lucide-react";

export default function Category() {
  const { id } = useParams();
  const category = categories.find((c) => c.id === id);
  const [selectedImage, setSelectedImage] = useState<{id: string | number, url: string, title: string} | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <Link to="/" className="text-[#c5a880] hover:underline flex items-center gap-2 justify-center">
            <ArrowLeft size={20} /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Generate 10 images based on the category seed
  const generatedImages = Array.from({ length: 10 }).map((_, i) => ({
    id: `gen-${i}`,
    url: `https://picsum.photos/seed/${category.seed}${i + 1}/800/1200`,
    title: `${category.title} 作品 ${i + 1}`
  }));

  const customImages = (category as any).customImages || [];
  
  // If custom images exist, use ONLY them. Otherwise, use generated images.
  const images = customImages.length > 0 ? customImages : generatedImages;

  // Helper to check if URL is a video
  const isVideo = (url: string) => {
    return url.toLowerCase().endsWith('.mp4') || url.toLowerCase().endsWith('.webm');
  };

  // Helper to optimize image URLs using images.weserv.nl
  const getOptimizedUrl = (url: string, width: number) => {
    if (isVideo(url)) return url;
    // Skip optimization for already optimized URLs or local paths if any
    if (url.includes('images.weserv.nl') || !url.startsWith('http')) return url;
    return `https://images.weserv.nl/?url=${encodeURIComponent(url)}&w=${width}&q=80&output=webp`;
  };

  return (
    <div className="min-h-screen bg-[#f4f1eb] text-[#1a2622]">
      {/* Category Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-[#1a2622] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={getOptimizedUrl(category.cover, 1920)} 
            alt={category.title} 
            className="w-full h-full object-cover blur-sm"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2622]/80 to-[#1a2622]" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <Link 
            to="/#works" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-[#c5a880] transition-colors mb-12 uppercase tracking-widest text-sm font-medium"
          >
            <ArrowLeft size={16} /> 返回作品列表
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-sm font-bold tracking-[0.3em] text-[#c5a880] uppercase mb-4">
              {category.subtitle}
            </h2>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter">
              {category.title}
            </h1>
            <p className="mt-6 text-xl text-white/60 max-w-2xl font-light leading-relaxed">
              探索AIGC在{category.title}领域的创新应用，结合商业需求与前沿审美，打造高品质视觉体验。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {images.map((img, idx) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
                onClick={() => {
                  setSelectedImage(img);
                  setIsZoomed(false);
                }}
                className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-white cursor-zoom-in"
              >
                {isVideo(img.url) ? (
                  <video
                    src={img.url}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                ) : (
                  <img 
                    src={getOptimizedUrl(img.url, 800)} 
                    alt={img.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2622]/90 via-[#1a2622]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                      <ZoomIn className="text-white w-8 h-8" />
                    </div>
                  </div>
                  <p className="text-[#c5a880] font-mono text-xs tracking-widest uppercase mb-2">
                    AIGC Artwork
                  </p>
                  <h3 className="text-white text-xl font-bold">
                    {img.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#1a2622]/98 backdrop-blur-xl overflow-y-auto"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="fixed top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-[#c5a880] transition-colors p-2 z-[110] bg-black/20 rounded-full backdrop-blur-sm"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>

            <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8" onClick={() => setSelectedImage(null)}>
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={`relative flex flex-col items-center transition-all duration-300 ${isZoomed ? "w-auto max-w-none" : "w-full max-w-[95vw]"}`}
                onClick={(e) => e.stopPropagation()}
              >
                {isVideo(selectedImage.url) ? (
                  <video
                    src={selectedImage.url}
                    className="max-w-full max-h-[90vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                    controls
                    autoPlay
                    playsInline
                  />
                ) : (
                  <img 
                    src={isZoomed ? selectedImage.url : getOptimizedUrl(selectedImage.url, 1600)} 
                    alt={selectedImage.title}
                    className={`rounded-lg shadow-2xl transition-all duration-300 ${
                      isZoomed 
                        ? "max-w-none max-h-none cursor-zoom-out" 
                        : "max-w-full max-h-[90vh] w-auto h-auto object-contain cursor-zoom-in"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsZoomed(!isZoomed);
                    }}
                    referrerPolicy="no-referrer"
                  />
                )}
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-bold text-white mb-1">{selectedImage.title}</h3>
                  <p className="text-[#c5a880] font-mono text-xs tracking-widest uppercase">AIGC Artwork</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
