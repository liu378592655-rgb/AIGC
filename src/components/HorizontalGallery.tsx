import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from "motion/react";
import { X } from "lucide-react";
import { getOptimizedUrl } from "../utils/image";

const imageUrls = [
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/032.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/000.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/0000.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/000000.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/0001.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/001.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/002.jpg",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/003.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/004.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/005.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/006.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/007.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/008.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/009.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/010.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/011.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/012.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/013.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/014.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/015.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/016.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/017.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/018.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/019.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/020.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/021.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/022.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/023.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/024.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/025.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/026.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/027.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/028.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/029.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/030.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/033.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/034.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/035.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/036.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/037.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/038.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/039.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/040.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/041.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/042.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/043.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/044.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/045.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/046.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/047.jpg",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/048.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/049.jpg",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/050.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/051.png",
  "https://github.com/liu378592655-rgb/AIGC/releases/download/AIGC/052.png"
];

const images = imageUrls.map((url, i) => ({
  id: i,
  url,
  title: `PROJECT ${String(i + 1).padStart(2, '0')}`,
  category: ["PHOTOGRAPHY", "AI ART", "CONCEPT", "RENDER"][i % 4],
  year: "2024",
  desc: "A visual exploration of algorithmic patterns and digital aesthetics, pushing the boundaries of modern design."
}));

// Sub-component for individual items to handle their own 3D transforms
function GalleryItem({ 
  img, 
  index, 
  totalItems, 
  scrollYProgress, 
  setSelectedId,
  isMobile
}: { 
  img: any, 
  index: number, 
  totalItems: number, 
  scrollYProgress: MotionValue<number>,
  setSelectedId: (id: number) => void,
  isMobile: boolean
}) {
  // Calculate when this specific item is in the center of the scroll progress
  const centerProgress = index / (totalItems - 1);
  // Calculate distance from center (-1 to 1)
  const dist = useTransform(scrollYProgress, (val) => val - centerProgress);
  
  // Tighter, more elegant 3D math for a true editorial coverflow
  // The distance between items is roughly 0.05 (1/19). 
  // We animate over a range of [-0.1, 0.1] (about 2 items on each side).
  const rotateY = useTransform(dist, [-0.1, 0, 0.1], [45, 0, -45]);
  const scale = useTransform(dist, [-0.1, 0, 0.1], [0.8, 1, 0.8]);
  
  // Make z continuously decrease so items further away are strictly behind in 3D space.
  // This completely prevents 3D hit-testing overlaps where far items block near items due to DOM order.
  const z = useTransform(dist, (d) => {
    const absD = Math.abs(d);
    return absD < 0.1 ? -absD * 2000 : -200 - (absD - 0.1) * 1000;
  });
  
  const opacity = useTransform(dist, [-0.1, 0, 0.1], [0.2, 1, 0.2]);

  // High-end color grading effect: non-centered items are dark and grayscale
  const filter = useTransform(
    dist, 
    [-0.1, 0, 0.1], 
    ["grayscale(100%) brightness(0.3)", "grayscale(0%) brightness(1)", "grayscale(100%) brightness(0.3)"]
  );

  // PERFECT Z-INDEX STACKING: 
  // Ensure zIndex is always positive and strictly ordered
  const zIndex = useTransform(dist, (d) => 1000 - Math.round(Math.abs(d) * 1000));

  return (
    <motion.div
      layoutId={`gallery-card-${img.id}`}
      onClick={() => setSelectedId(img.id)}
      style={{ 
        rotateY, 
        scale, 
        z,
        opacity,
        zIndex,
        filter
      }}
      // Use a very smooth, non-bouncy spring for the layout transition
      transition={{ type: "spring", bounce: 0, duration: 0.8 }}
      // Sharp edges (no rounded corners), tall aspect ratio
      className="group relative h-[50vh] md:h-[65vh] w-[60vw] md:w-[18vw] shrink-0 overflow-hidden cursor-pointer origin-center flex items-center justify-center bg-black/20"
    >
      <img
        src={getOptimizedUrl(img.url, 800)}
        alt={img.title}
        className="max-h-full max-w-full object-contain"
        loading={isMobile ? "eager" : (index < 4 ? "eager" : "lazy")}
        decoding="async"
        referrerPolicy="no-referrer"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          if (target.src !== img.url) {
            target.src = img.url;
          }
        }}
      />
    </motion.div>
  );
}

export default function HorizontalGallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Responsive math for horizontal translation:
  const itemWidthVw = isMobile ? 60 : 18;
  const gapVw = isMobile ? 4 : 1;
  const stepVw = itemWidthVw + gapVw;
  const paddingXVw = 50 - (itemWidthVw / 2); // Center the first item
  
  // Total scroll distance to center the last item
  const totalScrollDistance = (images.length - 1) * stepVw;
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${totalScrollDistance}vw`]);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [wheelTimeout, setWheelTimeout] = useState<NodeJS.Timeout | null>(null);

  // Handle mouse wheel navigation when modal is open
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (selectedId !== null) {
        // Prevent default scrolling of the page behind the modal
        e.preventDefault();
        
        // Debounce the wheel event to prevent skipping multiple images at once
        if (wheelTimeout) return;

        if (e.deltaY > 30) {
          // Scroll down -> Next image
          const currentIndex = images.findIndex(img => img.id === selectedId);
          if (currentIndex < images.length - 1) {
            setSelectedId(images[currentIndex + 1].id);
            const timeout = setTimeout(() => setWheelTimeout(null), 500);
            setWheelTimeout(timeout);
          }
        } else if (e.deltaY < -30) {
          // Scroll up -> Previous image
          const currentIndex = images.findIndex(img => img.id === selectedId);
          if (currentIndex > 0) {
            setSelectedId(images[currentIndex - 1].id);
            const timeout = setTimeout(() => setWheelTimeout(null), 500);
            setWheelTimeout(timeout);
          }
        }
      }
    };

    if (selectedId !== null) {
      window.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (wheelTimeout) clearTimeout(wheelTimeout);
    };
  }, [selectedId, wheelTimeout]);

  return (
    <section ref={targetRef} className="relative bg-[#050505]" style={{ height: `${images.length * 20}vh` }}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden" style={{ perspective: '1000px' }}>
        
        {/* Minimalist Indicator */}
        <div className="absolute top-12 left-12 z-10 mix-blend-difference text-white pointer-events-none">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#c5a880] mb-1">
                Selected Works
            </h3>
            <p className="font-serif text-sm opacity-40 italic">
                Scroll to explore
            </p>
        </div>

        <motion.div 
          className="flex items-center h-full"
          style={{ gap: `${gapVw}vw`, x, transformStyle: "preserve-3d", paddingLeft: `${paddingXVw}vw`, paddingRight: `${paddingXVw}vw` }}
        >
          {images.map((img, i) => (
            <GalleryItem 
              key={img.id} 
              img={img} 
              index={i} 
              totalItems={images.length} 
              scrollYProgress={scrollYProgress} 
              setSelectedId={setSelectedId} 
              isMobile={isMobile}
            />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedId !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            // Warm, sophisticated gray background for the modal
            className="fixed inset-0 z-[60] flex items-center justify-center bg-[#e5e5e3] p-4 md:p-0 overflow-hidden"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedId(null)}
              className="absolute top-10 right-10 text-black/40 hover:text-black transition-colors z-50 group flex items-center gap-3"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">Close</span>
              <X size={28} strokeWidth={1.5} />
            </button>
            
            {(() => {
              const img = images.find(i => i.id === selectedId);
              if (!img) return null;
              
              return (
                <div className="w-full h-full relative flex flex-col items-center justify-center">
                  
                  {/* Huge Watermark Typography */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0 overflow-hidden">
                      <motion.h2 
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        // Color is slightly darker than background for an embossed look
                        className="text-[20vw] font-serif leading-[0.8] text-[#d0d0ce] tracking-tighter whitespace-nowrap uppercase"
                      >
                        {img.category.split(' ')[0]}
                      </motion.h2>
                      <motion.h2 
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-[20vw] font-serif leading-[0.8] text-[#d0d0ce] tracking-tighter whitespace-nowrap uppercase"
                      >
                        VISION
                      </motion.h2>
                  </div>

                  {/* Rotating Badge (Like the STUDIO example in video) */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-[20%] right-[10%] md:right-[20%] z-20 w-32 h-32 pointer-events-none hidden md:block mix-blend-difference text-[#c5a880]"
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_10s_linear_infinite]">
                      <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
                      <text className="font-mono text-[10px] uppercase tracking-[0.2em] fill-current">
                        <textPath href="#circlePath">
                          AIGC VISUAL DESIGN • DIGITAL ART • 
                        </textPath>
                      </text>
                    </svg>
                  </motion.div>

                  {/* Main Image - Auto sizing to respect original aspect ratio */}
                  <motion.div 
                    layoutId={`gallery-card-${img.id}`}
                    transition={{ type: "spring", bounce: 0, duration: 0.8 }}
                    className="relative z-10 shadow-2xl flex items-center justify-center"
                    style={{ maxWidth: '85vw', maxHeight: '80vh' }}
                  >
                     <img
                      src={getOptimizedUrl(img.url, 1920)}
                      alt={img.title}
                      className="w-auto h-auto max-w-full max-h-[80vh] object-contain"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== img.url) {
                          target.src = img.url;
                        }
                      }}
                    />
                  </motion.div>
                  
                  {/* Metadata - Top Left */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="absolute top-12 left-12 z-20 font-mono text-[10px] uppercase tracking-[0.2em] text-black/50 space-y-2 hidden md:block"
                  >
                      <div><span className="text-black/30 mr-4">Category</span> {img.category}</div>
                      <div><span className="text-black/30 mr-4">Year</span> {img.year}</div>
                      <div><span className="text-black/30 mr-4">Client</span> Personal</div>
                  </motion.div>

                  {/* Metadata - Bottom Right */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="absolute bottom-12 right-12 z-20 max-w-sm text-right hidden md:block"
                  >
                      <p className="font-sans text-sm text-black/70 leading-relaxed">
                        {img.desc}
                      </p>
                  </motion.div>
                  
                  {/* Mobile Metadata (simplified) */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="absolute bottom-8 left-8 right-8 z-20 text-center md:hidden"
                  >
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/50 mb-2">
                        {img.category} — {img.year}
                      </div>
                  </motion.div>

                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
