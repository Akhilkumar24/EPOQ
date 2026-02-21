import { useState, useEffect, useRef } from 'react';
import { Download, FolderOpen, SlidersHorizontal, Activity, BarChart2, Rocket, Terminal, Info, Github, Sun, Moon } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import EnergyBeam from './components/ui/energy-beam';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Parallax Setup
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [100, -100]);

  useEffect(() => {
    // Check initial system preference or localStorage
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setDarkMode(true);
    }
  };

  return (
    <div className="antialiased scroll-smooth bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 w-full min-h-screen font-inter transition-colors duration-300">
      {/* Navbar */}
      <nav className="fixed w-full z-50 top-4 left-0 transition-colors duration-300 flex justify-center px-4 pointer-events-none">
        <div className="bg-white/10 dark:bg-black/10 backdrop-blur-2xl backdrop-saturate-150 border border-white/30 dark:border-white/10 p-2 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] shadow-black/10 flex items-center justify-between pointer-events-auto max-w-7xl w-full">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center pl-4 pr-2">
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-2 drop-shadow-sm">
              <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-600 to-orange-400 border border-white/30 flex items-center justify-center text-white text-sm shadow-[inset_0_1px_3px_rgba(255,255,255,0.4)]">E</span>
              EPOQ
            </span>
          </div>
          
          {/* Main Links */}
          <div className="hidden md:flex items-center space-x-1 bg-white/5 dark:bg-black/20 p-1 rounded-full border border-white/10 shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]">
            <a className="text-sm font-semibold text-slate-100 hover:text-white hover:bg-white/20 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] px-5 py-2 rounded-full transition-all" href="#features">Features</a>
            <a className="text-sm font-semibold text-slate-100 hover:text-white hover:bg-white/20 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] px-5 py-2 rounded-full transition-all" href="#how-it-works">Architecture</a>
            <a className="text-sm font-semibold text-slate-100 hover:text-white hover:bg-white/20 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] px-5 py-2 rounded-full transition-all" href="#tech-stack">Tech</a>
            <a className="text-sm font-semibold text-slate-100 hover:text-white hover:bg-white/20 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] px-5 py-2 rounded-full transition-all" href="#installation">Install</a>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1 sm:space-x-2 pr-1">
            <button 
              onClick={toggleTheme}
              className="p-2.5 text-slate-200 hover:text-white transition-all rounded-full hover:bg-white/20 focus:outline-none"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <div className="w-px h-6 bg-white/20 hidden sm:block mx-1"></div>
            <a className="hidden sm:flex text-slate-200 hover:text-white transition-all p-2.5 rounded-full hover:bg-white/20" href="https://github.com/Sree14hari/EPOQ" target="_blank" rel="noreferrer">
              <Github className="w-4 h-4" />
            </a>
            <a className="bg-white/20 hover:bg-white/30 border border-white/30 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)] backdrop-blur-md hover:-translate-y-0.5 ml-2" href="#installation">
              Start Free
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 z-0">
          <EnergyBeam className="opacity-90 dark:opacity-50" />
        </div>
        
        {/* Foreground Content */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-900/30 border border-orange-100 dark:border-orange-800/50 text-orange-700 dark:text-orange-300 text-xs font-semibold uppercase tracking-wide"
          >
            <span className="flex h-2 w-2 rounded-full bg-orange-600 dark:bg-orange-400 animate-pulse"></span>
            v1.0.0 Now Available
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 drop-shadow-md"
          >
            Train Image Models <br className="hidden sm:block"/>
            <span className="gradient-text drop-shadow-[0_0_15px_rgba(234,88,12,0.8)]">Directly on Your Desktop</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-slate-200 dark:text-slate-300 mb-10 drop-shadow-sm font-medium"
          >
            A powerful, cross-platform application for training state-of-the-art image classification models. No complex CLI scripts, just a sleek GUI with real-time feedback.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 mb-16"
          >
            <a className="flex items-center gap-2 bg-orange-600 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-orange-700 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md shadow-orange-500/30 dark:shadow-orange-900/40" href="#installation">
              <Download className="w-5 h-5" /> Download App
            </a>
            <a className="flex items-center gap-2 bg-white/10 dark:bg-slate-900/40 text-white border border-white/20 dark:border-slate-700/50 px-8 py-3.5 rounded-lg font-semibold hover:bg-white/20 dark:hover:bg-slate-800/60 backdrop-blur-md transition-all hover:-translate-y-0.5" href="https://github.com/Sree14hari/EPOQ" target="_blank" rel="noreferrer">
              <Github className="w-5 h-5" /> View Source
            </a>
          </motion.div>

          {/* Target Image Preview */}
          <div ref={parallaxRef} className="w-full relative max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
            >
              <motion.div 
                style={{ y: yParallax }}
                className="relative mx-auto rounded-xl shadow-2xl shadow-orange-900/20 dark:shadow-orange-900/50 border border-slate-200/20 dark:border-slate-800/50 overflow-hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm group"
              >
                <div className="absolute top-0 left-0 w-full h-8 bg-slate-100/90 dark:bg-slate-800/90 border-b border-slate-200/50 dark:border-slate-700/50 flex items-center px-4 space-x-2 z-10 transition-colors backdrop-blur-md">
                  <div className="w-3 h-3 rounded-full bg-red-400 dark:bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400 dark:bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400 dark:bg-green-500"></div>
                </div>
                <div className="pt-8 overflow-hidden transition-colors">
                  <img 
                    alt="EPOQ App Interface" 
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-[1.02] dark:opacity-90" 
                    src="/app-interface.png" 
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-slate-900 transition-colors" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Why Choose EPOQ?</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Built for developers and researchers who need a robust local environment for deep learning experiments.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Smart Dataset Management", desc: "Easily select folders with train/val structures or auto-split flat folders. Export prepared datasets to ZIP with one click.", icon: <FolderOpen className="w-6 h-6" />, color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-100 dark:bg-orange-900/30" },
              { title: "Flexible Config", desc: "Choose from modern architectures like ResNet18, DCN, and EVA02. Customize epochs, batch sizes, and learning rates to suit your hardware.", icon: <SlidersHorizontal className="w-6 h-6" />, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-100 dark:bg-purple-900/30" },
              { title: "Real-Time Analytics", desc: "Monitor training with live PyTorch logs and dynamic, interactive Loss and Accuracy Charts powered by Recharts.", icon: <Activity className="w-6 h-6" />, color: "text-green-600 dark:text-green-400", bg: "bg-green-100 dark:bg-green-900/30" },
              { title: "Comprehensive Results", desc: "Dive into detailed metrics after training with a full Classification Report and visual Confusion Matrix.", icon: <BarChart2 className="w-6 h-6" />, color: "text-orange-600 dark:text-orange-400", bg: "bg-orange-100 dark:bg-orange-900/30" },
              { title: "Native Performance", desc: "Engineered with Rust and Tauri for a lightweight desktop footprint (~10x smaller than Electron), paired with Next.js.", icon: <Rocket className="w-6 h-6" />, color: "text-red-600 dark:text-red-400", bg: "bg-red-100 dark:bg-red-900/30" },
              { title: "Visual Feedback", desc: "Say goodbye to complex CLI scripts. Get immediate visual feedback on your training progress in a modern UI.", icon: <Terminal className="w-6 h-6" />, color: "text-cyan-600 dark:text-cyan-400", bg: "bg-cyan-100 dark:bg-cyan-900/30" }
            ].map((feature, i) => (
              <div key={i} className="feature-card p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 group transition-colors">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${feature.bg} ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 border-y border-slate-200 dark:border-slate-800 transition-colors overflow-hidden" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">How it Works</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg">EPOQ uses a robust three-layer architecture to bridge web technologies with high-performance system operations and ML workflows.</p>
              <div className="space-y-8">
                {[
                  { title: "Next.js Frontend (UI Layer)", step: "1", color: "bg-orange-600 dark:bg-orange-500", desc: "React components, Tailwind styling, and Framer Motion animations handle user interaction and data visualization." },
                  { title: "Rust Core (Tauri Backend)", step: "2", color: "bg-orange-500 dark:bg-orange-500", desc: "Manages the filesystem, OS integrations, and spawns the Python subprocesses. It acts as the secure bridge." },
                  { title: "Python + PyTorch (ML Worker)", step: "3", color: "bg-green-600 dark:bg-green-500", desc: "Executes the actual training loop, loading models (ResNet, EVA02) and calculating metrics via scikit-learn." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-110 transition-transform ${item.color}`}>
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-lg">{item.title}</h4>
                      <p className="text-slate-600 dark:text-slate-400 mt-2">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-100 to-transparent dark:from-orange-900/20 blur-3xl opacity-50 rounded-full"></div>
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100/50 dark:border-slate-800/50 relative">
                <div className="flex flex-col items-center space-y-6">
                  {/* Web Layer */}
                  <motion.div whileHover={{ scale: 1.02 }} className="w-full p-5 bg-orange-50/80 dark:bg-orange-900/20 backdrop-blur border border-orange-200 dark:border-orange-800/50 rounded-xl text-center shadow-sm relative z-10 transition-colors hover:bg-orange-50 dark:hover:bg-orange-900/30">
                    <span className="block text-orange-800 dark:text-orange-300 font-bold mb-1 text-lg">🖥️ Desktop App Window</span>
                    <span className="text-xs text-orange-600 dark:text-orange-400 uppercase tracking-widest font-bold">Tauri v2 WebView</span>
                    <div className="mt-4 p-4 bg-white/90 dark:bg-slate-800/90 rounded-lg border border-orange-100 dark:border-orange-800/30 shadow-sm">
                      <span className="font-bold text-slate-800 dark:text-slate-200">Next.js Frontend</span>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">UI Controls • Charts • Logs</div>
                    </div>
                  </motion.div>
                  
                  {/* Arrow Indicator */}
                  <div className="h-10 w-0.5 bg-gradient-to-b from-orange-300 to-orange-300 dark:from-orange-600 dark:to-orange-600 relative z-0">
                    <div className="absolute -left-[5px] -bottom-[2px] w-3 h-3 rounded-full bg-orange-300 dark:bg-orange-500"></div>
                  </div>
                  
                  {/* Core Layer */}
                  <motion.div whileHover={{ scale: 1.02 }} className="w-full p-5 bg-orange-50/80 dark:bg-orange-900/20 backdrop-blur border border-orange-200 dark:border-orange-800/50 rounded-xl text-center shadow-sm relative z-10 transition-colors hover:bg-orange-50 dark:hover:bg-orange-900/30">
                    <span className="block text-orange-800 dark:text-orange-300 font-bold mb-1 text-lg">⚙️ Rust Backend</span>
                    <span className="text-xs text-orange-600 dark:text-orange-400 uppercase tracking-widest font-bold">System Bridge</span>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-3 font-medium">Spawns Processes • IPC • File I/O</div>
                  </motion.div>
                  
                  {/* Arrow Indicator */}
                  <div className="h-10 w-0.5 bg-gradient-to-b from-orange-300 to-green-300 dark:from-orange-600 dark:to-green-600 relative z-0">
                    <div className="absolute -left-[5px] -bottom-[2px] w-3 h-3 rounded-full bg-green-300 dark:bg-green-500"></div>
                  </div>
                  
                  {/* Worker Layer */}
                  <motion.div whileHover={{ scale: 1.02 }} className="w-full p-5 bg-green-50/80 dark:bg-green-900/20 backdrop-blur border border-green-200 dark:border-green-800/50 rounded-xl text-center shadow-sm relative z-10 transition-colors hover:bg-green-50 dark:hover:bg-green-900/30">
                    <span className="block text-green-800 dark:text-green-300 font-bold mb-1 text-lg">🐍 Python ML Worker</span>
                    <span className="text-xs text-green-600 dark:text-green-400 uppercase tracking-widest font-bold">PyTorch Engine</span>
                    <div className="text-sm text-slate-600 dark:text-slate-400 mt-3 font-medium">Training Loop • Model Factory • Metrics</div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 bg-white dark:bg-slate-900 transition-colors" id="tech-stack">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">Built With Modern Tech</h2>
          <div className="overflow-hidden border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
              <thead className="bg-slate-50 dark:bg-slate-950">
                <tr>
                  <th className="px-8 py-5 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest" scope="col">Layer</th>
                  <th className="px-8 py-5 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest" scope="col">Technologies</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-slate-900 divide-y divide-slate-100 dark:divide-slate-800">
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-8 py-6 whitespace-nowrap text-sm font-semibold text-slate-900 dark:text-white">Frontend</td>
                  <td className="px-8 py-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Next.js, React, Tailwind CSS, Framer Motion, Lucide Icons, Recharts</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-8 py-6 whitespace-nowrap text-sm font-semibold text-slate-900 dark:text-white">Desktop Platform</td>
                  <td className="px-8 py-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Tauri v2, Rust</td>
                </tr>
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-8 py-6 whitespace-nowrap text-sm font-semibold text-slate-900 dark:text-white">Machine Learning</td>
                  <td className="px-8 py-6 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Python, PyTorch, Torchvision, Scikit-learn, Pandas, Matplotlib</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden" id="installation">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-orange-600/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-purple-600/20 blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Ready to Start?</h2>
            <p className="text-slate-400 text-lg">Follow these simple steps to get EPOQ running locally.</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-slate-800/80 backdrop-blur rounded-2xl p-8 border border-slate-700/50 hover:border-slate-600 transition-colors">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-lg text-white flex items-center gap-3">
                  <span className="bg-orange-600/20 text-orange-400 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span> 
                  Clone the repository
                </h3>
              </div>
              <div className="bg-slate-950 rounded-xl p-5 overflow-x-auto border border-slate-800 font-mono text-sm group">
                <code className="text-green-400">
                  git clone https://github.com/Sree14hari/EPOQ.git<br/>
                  <span className="text-slate-500">cd</span> EPOQ
                </code>
              </div>
            </div>
            
            <div className="bg-slate-800/80 backdrop-blur rounded-2xl p-8 border border-slate-700/50 hover:border-slate-600 transition-colors">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-lg text-white flex items-center gap-3">
                  <span className="bg-orange-600/20 text-orange-400 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span> 
                  Install Node dependencies
                </h3>
              </div>
              <div className="bg-slate-950 rounded-xl p-5 overflow-x-auto border border-slate-800 font-mono text-sm">
                <code className="text-green-400">
                  <span className="text-slate-500">cd</span> image-trainer<br/>
                  npm install
                </code>
              </div>
            </div>
            
            <div className="bg-slate-800/80 backdrop-blur rounded-2xl p-8 border border-slate-700/50 hover:border-slate-600 transition-colors">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-lg text-white flex items-center gap-3">
                  <span className="bg-orange-600/20 text-orange-400 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span> 
                  Start Development Server
                </h3>
              </div>
              <div className="bg-slate-950 rounded-xl p-5 overflow-x-auto border border-slate-800 font-mono text-sm">
                <code className="text-green-400">
                  npm run tauri dev
                </code>
              </div>
              <p className="text-sm text-slate-400 mt-5 flex items-center gap-2 bg-slate-800/50 p-3 rounded-lg border border-slate-700/30">
                <Info className="w-4 h-4 text-orange-400" />
                This will compile the Rust backend and launch the app window.
              </p>
            </div>
          </div>
          
          <div className="mt-12 p-8 bg-orange-900/20 border border-orange-500/20 rounded-2xl backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
            <h4 className="font-bold text-orange-400 mb-3 flex items-center gap-2 text-lg">
              <Info className="w-5 h-5" />
              Prerequisites
            </h4>
            <p className="text-orange-100/80 leading-relaxed mb-4">
              Ensure you have <strong className="text-white">Node.js (v18+)</strong>, <strong className="text-white">Rust</strong>, and <strong className="text-white">Python (3.9+)</strong> installed. You'll also need the ML dependencies:
            </p>
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 font-mono overflow-x-auto text-sm">
              <code className="text-slate-300">pip install torch torchvision pandas scikit-learn matplotlib seaborn</code>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white inline-flex items-center gap-2">EPOQ</span>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Open Source Image Classification Trainer</p>
          </div>
          <div className="flex flex-wrap justify-center space-x-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <a className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors" href="#features">Features</a>
            <a className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors" href="https://github.com/Sree14hari/EPOQ/blob/main/LICENSE" target="_blank" rel="noreferrer">License</a>
            <a className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors" href="https://github.com/Sree14hari/EPOQ" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-8 border-t border-slate-100 dark:border-slate-800/50 text-center text-sm text-slate-400 dark:text-slate-500">
          Made with ❤️ by Sreehari R
        </div>
      </footer>
    </div>
  );
}

export default App;
