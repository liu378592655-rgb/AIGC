import { useParams, Link } from "react-router-dom";
import { categories } from "../data";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

export default function Category() {
  const { id } = useParams();
  const category = categories.find((c) => c.id === id);

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
  const images = [...customImages, ...generatedImages].slice(0, 10);

  return (
    <div className="min-h-screen bg-[#f4f1eb] text-[#1a2622]">
      {/* Category Hero */}
      <section className="relative pt-32 pb-20 px-6 bg-[#1a2622] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={category.cover} 
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
                className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-white"
              >
                <img 
                  src={img.url} 
                  alt={img.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2622]/90 via-[#1a2622]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
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
    </div>
  );
}
