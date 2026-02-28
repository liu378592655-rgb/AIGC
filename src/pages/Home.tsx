import { motion } from "motion/react";
import { personalInfo, categories } from "../data";
import { Link } from "react-router-dom";
import { ArrowRight, User, Briefcase, MapPin, Phone, Mail } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a2622] to-[#111a17] z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c5a880]/5 rounded-full blur-3xl z-0" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 w-fit">
              <span className="w-2 h-2 rounded-full bg-[#c5a880] animate-pulse" />
              <span className="text-sm font-medium tracking-wider text-white/80 uppercase">Available for work</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white">
              {personalInfo.name}
            </h1>
            <h2 className="text-2xl md:text-4xl font-light text-[#c5a880] tracking-wide">
              {personalInfo.title}
            </h2>
            
            <p className="text-lg text-white/60 max-w-md leading-relaxed">
              专注于AIGC视觉创作，精通ComfyUI、Midjourney等工具，致力于将前沿AI技术转化为商业落地价值。
            </p>
            
            <div className="flex gap-4 mt-4">
              <a href="#works" className="px-8 py-4 bg-[#c5a880] text-[#1a2622] font-bold rounded-full hover:bg-white transition-colors flex items-center gap-2">
                查看作品 <ArrowRight size={18} />
              </a>
              <a href="#about" className="px-8 py-4 bg-white/5 text-white font-medium rounded-full hover:bg-white/10 border border-white/10 transition-colors">
                了解更多
              </a>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative aspect-[3/4] md:aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
          >
            {/* Using a placeholder image that fits the vibe */}
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
              alt="Portrait" 
              className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a2622] via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Works Categories Section */}
      <section id="works" className="py-32 bg-[#1a2622] relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
          >
            <div>
              <h3 className="text-sm font-bold tracking-[0.2em] text-[#c5a880] uppercase mb-4">Portfolio</h3>
              <h2 className="text-5xl md:text-6xl font-bold text-white">作品展示</h2>
            </div>
            <p className="text-white/50 max-w-sm text-lg">
              探索四大核心领域的AIGC视觉创作，感受AI技术与商业设计的完美融合。
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Link 
                  to={`/category/${cat.id}`}
                  className="group block relative aspect-[4/3] rounded-3xl overflow-hidden bg-[#111a17]"
                >
                  <img 
                    src={cat.cover} 
                    alt={cat.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a2622] via-[#1a2622]/20 to-transparent opacity-80" />
                  
                  <div className="absolute inset-0 p-10 flex flex-col justify-end">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-[#c5a880] font-mono text-sm tracking-widest uppercase mb-2">
                        {cat.subtitle}
                      </p>
                      <h3 className="text-4xl font-bold text-white flex items-center justify-between">
                        {cat.title}
                        <ArrowRight className="w-8 h-8 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About & Skills Section */}
      <section id="about" className="py-32 bg-[#f4f1eb] text-[#1a2622]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Personal Info Sidebar */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4 flex flex-col gap-10"
            >
              <div>
                <h3 className="text-sm font-bold tracking-[0.2em] text-[#c5a880] uppercase mb-4">Profile</h3>
                <h2 className="text-4xl font-bold mb-8">个人信息</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <User className="w-6 h-6 text-[#c5a880] shrink-0" />
                    <div>
                      <p className="font-medium text-lg">{personalInfo.basic.join(" • ")}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Briefcase className="w-6 h-6 text-[#c5a880] shrink-0" />
                    <div>
                      <p className="font-medium text-lg">求职意向：{personalInfo.intention.role}</p>
                      <p className="text-[#1a2622]/60 mt-1">期望薪资：{personalInfo.intention.salary}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-[#c5a880] shrink-0" />
                    <div>
                      <p className="font-medium text-lg">期望城市：{personalInfo.intention.city}</p>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-[#1a2622]/10 space-y-4">
                    <div className="flex items-center gap-4">
                      <Phone className="w-5 h-5 text-[#1a2622]/40" />
                      <span className="font-mono">{personalInfo.contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Mail className="w-5 h-5 text-[#1a2622]/40" />
                      <span className="font-mono">{personalInfo.contact.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Advantages */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8"
            >
              <h3 className="text-sm font-bold tracking-[0.2em] text-[#c5a880] uppercase mb-4">Expertise</h3>
              <h2 className="text-4xl font-bold mb-12">个人优势</h2>
              
              <div className="space-y-8">
                {personalInfo.advantages.map((adv, idx) => (
                  <div 
                    key={idx} 
                    className="group bg-white p-8 md:p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-[#c5a880]/30"
                  >
                    <div className="flex items-start gap-6">
                      <span className="text-5xl font-light text-[#c5a880]/20 group-hover:text-[#c5a880] transition-colors font-mono">
                        0{idx + 1}
                      </span>
                      <div>
                        <h4 className="text-2xl font-bold mb-4">{adv.title}</h4>
                        <p className="text-lg text-[#1a2622]/70 leading-relaxed">
                          {adv.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
