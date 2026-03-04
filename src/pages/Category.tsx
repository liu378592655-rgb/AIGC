import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { categories } from "../data";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useVelocity, useAnimationFrame, animate } from "motion/react";
import { ArrowLeft, X, ZoomIn, ArrowRight } from "lucide-react";
import { isVideo, getOptimizedUrl } from "../utils/image";

const AutoScrollModal = ({ 
  image, 
  onNext, 
  onClose, 
  total, 
  index 
}: { 
  image: { id: string | number, url: string, title: string }, 
  onNext: () => void, 
  onClose: () => void,
  total: number,
  index: number
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Reset state on image change
  useEffect(() => {
    setProgress(0);
    setIsAtBottom(false);
    setIsAutoScrolling(true);
    setIsLoading(true);
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  }, [image.id]);

  const checkScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll <= 10) {
      setProgress(1);
      setIsAtBottom(true);
    } else {
      setProgress(Math.min(el.scrollTop / maxScroll, 1));
      setIsAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 10);
    }
  };

  // Handle video ending
  const handleVideoEnded = () => {
    setIsAtBottom(true);
  };

  // Auto scroll logic
  useAnimationFrame((t, delta) => {
    if (isLoading) return;
    const el = containerRef.current;
    if (!el || isAtBottom || !isAutoScrolling) return;

    // Check if scrollable
    if (el.scrollHeight <= el.clientHeight + 10) {
      setIsAtBottom(true);
      return;
    }

    // Auto scroll speed (pixels per ms * delta)
    const speed = 0.08 * delta;
    el.scrollTop += speed;
    checkScroll();
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black overflow-hidden"
    >
      {/* Close Button */}
      <button 
        className="fixed top-6 right-6 md:top-8 md:right-8 text-white/50 hover:text-[#c5a880] transition-colors p-2 z-[110] bg-black/20 rounded-full backdrop-blur-sm"
        onClick={onClose}
      >
        <X size={32} />
      </button>

      {/* Scroll Container */}
      <div 
        ref={containerRef}
        className="w-full h-full overflow-y-auto no-scrollbar"
        style={{ scrollBehavior: 'auto' }}
        onScroll={checkScroll}
        onWheel={() => setIsAutoScrolling(false)}
        onTouchMove={() => setIsAutoScrolling(false)}
        onMouseDown={() => setIsAutoScrolling(false)}
      >
        <div className="w-full min-h-full flex flex-col items-center relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
              <div className="w-8 h-8 border-2 border-[#c5a880] border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          {isVideo(image.url) ? (
            <div className="w-full h-screen flex flex-col items-center justify-center bg-black relative">
              <video
                key={`video-${image.id}`}
                src={image.url}
                className={`w-full h-full object-contain transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                autoPlay
                playsInline
                muted={false}
                onEnded={handleVideoEnded}
                onLoadedData={() => {
                  setIsLoading(false);
                  checkScroll();
                }}
                onError={() => setIsLoading(false)}
              />
              <AnimatePresence>
                {isAtBottom && !isLoading && (
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    onClick={onNext}
                    className="absolute bottom-12 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full flex items-center gap-3 transition-colors border border-white/20 z-50"
                  >
                    <span className="tracking-widest uppercase text-sm">下一张 Next</span>
                    <ArrowRight size={18} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <div className="w-full max-w-4xl mx-auto bg-black min-h-screen relative flex flex-col">
               <img 
                key={`img-${image.id}`}
                src={getOptimizedUrl(image.url, 1920)} 
                alt={image.title}
                className={`w-full h-auto block transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  setIsLoading(false);
                  const target = e.target as HTMLImageElement;
                  if (target.src !== image.url) {
                    target.src = image.url;
                  }
                }}
                onLoad={() => {
                  setIsLoading(false);
                  checkScroll();
                }}
              />
              <div className={`p-12 text-center pb-32 flex-grow flex flex-col items-center justify-end transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                 <h2 className="text-3xl font-bold text-white mb-2">{image.title}</h2>
                 <p className="text-[#c5a880] font-mono text-sm tracking-widest uppercase mb-12">
                   {index + 1} / {total}
                 </p>
                 
                 <AnimatePresence>
                   {isAtBottom && !isLoading && (
                     <motion.button
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       exit={{ opacity: 0, y: 20 }}
                       onClick={onNext}
                       className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full flex items-center gap-3 transition-colors border border-white/20 mx-auto z-50"
                     >
                       <span className="tracking-widest uppercase text-sm">下一张 Next</span>
                       <ArrowRight size={18} />
                     </motion.button>
                   )}
                 </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar (Scroll Progress) */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-white/10 z-[110]">
        <motion.div
          className="h-full bg-[#c5a880]"
          style={{ width: `${progress * 100}%` }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ ease: "linear", duration: 0.1 }}
        />
      </div>
    </motion.div>
  );
};

export default function Category() {
  const { id } = useParams();
  const category = categories.find((c) => c.id === id);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  // Horizontal scroll logic
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollX = useMotionValue(0);
  const targetX = useRef(0);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Calculate scroll constraints
  useEffect(() => {
    const calculateConstraints = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.scrollWidth;
        const windowWidth = window.innerWidth;
        // If content is wider than window, allow scrolling
        // Negative value because we translate left
        const maxScroll = Math.min(0, -(containerWidth - windowWidth + 200)); // Extra padding
        setConstraints({ left: maxScroll, right: 0 });
        
        // Clamp current scroll position if it's out of bounds after resize
        const currentX = scrollX.get();
        if (currentX < maxScroll) {
          scrollX.set(maxScroll);
          targetX.current = maxScroll;
        }
        if (currentX > 0) {
          scrollX.set(0);
          targetX.current = 0;
        }
      }
    };

    calculateConstraints();
    window.addEventListener("resize", calculateConstraints);
    // Recalculate after a short delay to ensure images/layout are ready
    const timer = setTimeout(calculateConstraints, 500);
    
    return () => {
      window.removeEventListener("resize", calculateConstraints);
      clearTimeout(timer);
    };
  }, [category]);

  // Map vertical wheel to horizontal scroll
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Disable custom scroll on mobile
      if (window.innerWidth < 768) return;
      
      // Only hijack scroll if no modal is open
      if (selectedIndex !== null) return;

      // Prevent default vertical scrolling to avoid layout jumping
      e.preventDefault();

      // Accumulate target position for smooth scrolling
      targetX.current = targetX.current - e.deltaY;
      
      // Clamp target value
      targetX.current = Math.max(constraints.left, Math.min(constraints.right, targetX.current));
      
      // Use tween animation for smooth, non-jittery scrolling
      animate(scrollX, targetX.current, { type: "tween", ease: "easeOut", duration: 0.3 });
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [constraints, selectedIndex, scrollX]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#1a2622]">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
          <Link to="/" className="text-[#c5a880] hover:underline flex items-center gap-2 justify-center">
            <ArrowLeft size={20} /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Generate images or use custom ones
  const generatedImages = Array.from({ length: 10 }).map((_, i) => ({
    id: `gen-${i}`,
    url: `https://picsum.photos/seed/${category.seed}${i + 1}/800/1200`,
    title: `${category.title} 作品 ${i + 1}`
  }));

  const customImages = (category as any).customImages || [];
  const images = customImages.length > 0 ? customImages : generatedImages;
  
  const currentImage = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#1a2622] text-[#f4f1eb] relative">
      
      {/* Background Ambient */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <img 
          src={getOptimizedUrl(category.cover, 1920)} 
          alt="" 
          className="w-full h-full object-cover blur-3xl scale-110"
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (target.src !== category.cover) {
              target.src = category.cover;
            }
          }}
        />
      </div>

      {/* Header / Nav */}
      <header className="fixed top-0 left-0 w-full z-40 p-8 flex justify-between items-start pointer-events-none">
        <Link 
          to="/" 
          className="pointer-events-auto inline-flex items-center gap-3 text-white/70 hover:text-[#c5a880] transition-colors group"
        >
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#c5a880] transition-colors">
            <ArrowLeft size={16} />
          </div>
          <span className="uppercase tracking-widest text-xs font-medium">返回主页</span>
        </Link>

        <div className="text-right">
          <h2 className="text-[#c5a880] text-xs font-bold tracking-[0.3em] uppercase mb-1">
            {category.subtitle}
          </h2>
          <h1 className="text-4xl font-bold tracking-tighter text-white">
            {category.title}
          </h1>
        </div>
      </header>

      {/* Scroll Container */}
      <div className="h-full w-full overflow-y-auto md:overflow-hidden md:flex md:items-center pt-24 md:pt-0 pb-24 md:pb-0 px-6 md:px-0">
        <motion.div 
          ref={containerRef}
          style={{ x: isMobile ? 0 : scrollX }}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12 md:px-[15vw] md:h-[60vh] w-full md:w-auto"
          drag={isMobile ? false : "x"}
          dragConstraints={constraints}
          dragElastic={0.1}
          onDrag={(e, info) => {
            // Keep targetX in sync with drag
            targetX.current = scrollX.get();
          }}
        >
          {/* Intro Text Card */}
          <div className="w-full md:min-w-[400px] md:max-w-[400px] md:mr-12 mb-8 md:mb-0 text-center md:text-left">
            <h3 className="text-4xl md:text-6xl font-serif italic mb-4 md:mb-6 text-white/90">
              Collection
            </h3>
            <p className="text-base md:text-lg text-white/60 font-light leading-relaxed">
              探索AIGC在{category.title}领域的创新应用，结合商业需求与前沿审美，打造高品质视觉体验。
            </p>
            <div className="mt-6 md:mt-8 flex items-center justify-center md:justify-start gap-4 text-[#c5a880] text-sm tracking-widest uppercase opacity-60">
              <ArrowRight size={16} className="hidden md:block" />
              <span>{isMobile ? "Scroll down to explore" : "Scroll to explore"}</span>
            </div>
          </div>

          {/* Image Cards */}
          {images.map((img, idx) => (
            <motion.div
              key={img.id}
              layoutId={isMobile ? undefined : `card-${img.id}`}
              onClick={() => {
                if (!isMobile) setSelectedIndex(idx);
              }}
              className={`relative w-full md:min-w-[45vh] md:h-full group mb-12 md:mb-0 ${isMobile ? '' : 'cursor-pointer'}`}
              whileHover={{ scale: isMobile ? 1 : 1.02 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-full min-h-[300px] h-auto md:h-full overflow-hidden rounded-lg bg-black/20 relative flex items-center justify-center">
                {isVideo(img.url) ? (
                  <video
                    src={img.url}
                    className="w-full h-auto md:max-w-full md:max-h-full object-contain opacity-100 md:opacity-80 md:group-hover:opacity-100 transition-opacity duration-500"
                    muted
                    loop
                    playsInline
                    autoPlay
                  />
                ) : (
                  <img 
                    src={getOptimizedUrl(img.url, 800)} 
                    alt={img.title}
                    className="w-full h-auto md:max-w-full md:max-h-full object-contain opacity-100 md:opacity-80 md:group-hover:opacity-100 transition-opacity duration-500"
                    loading={isMobile ? "eager" : (idx < 4 ? "eager" : "lazy")}
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== img.url) {
                        target.src = img.url;
                      }
                    }}
                  />
                )}
                
                {/* Hover Overlay - Desktop Only */}
                <div className="absolute inset-0 bg-black/40 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 hidden md:flex flex-col justify-center items-center">
                   <span className="text-white font-serif italic text-3xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">View</span>
                </div>
              </div>

              {/* Number & Title below image */}
              <div className="mt-4 md:mt-0 md:absolute md:-bottom-16 left-0 w-full text-center md:text-left">
                <span className="text-xs font-mono text-white/40 block mb-1">{(idx + 1).toString().padStart(2, '0')}</span>
                <h3 className="text-base md:text-lg font-medium text-white md:group-hover:text-[#c5a880] transition-colors">
                  {img.title}
                </h3>
              </div>
            </motion.div>
          ))}
          
          {/* End Spacer */}
          <div className="hidden md:block min-w-[20vw]" />
        </motion.div>
      </div>

      {/* Progress Bar - Desktop Only */}
      <div className="hidden md:block fixed bottom-12 left-12 right-12 h-[1px] bg-white/10 overflow-hidden">
        <motion.div 
          className="h-full bg-[#c5a880]"
          style={{ 
            width: useTransform(scrollX, [constraints.left, constraints.right], ["100%", "0%"]) 
          }}
        />
      </div>

      {/* Fullscreen Auto-Scroll View */}
      <AnimatePresence>
        {currentImage && (
          <AutoScrollModal 
            image={currentImage} 
            onNext={() => {
              setSelectedIndex((prev) => {
                if (prev === null) return null;
                return (prev + 1) % images.length;
              });
            }}
            onClose={() => setSelectedIndex(null)}
            total={images.length}
            index={selectedIndex}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
