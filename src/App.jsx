import React, { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from "@react-three/drei";

// 3D Animated Sphere Component
function AnimatedSphere() {
  const meshRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t / 4) * 0.2;
      meshRef.current.rotation.y = Math.sin(t / 2) * 0.3;
      meshRef.current.rotation.z = Math.cos(t / 3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5}>
        <MeshDistortMaterial
          color="#4a9eff"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
}

export default function AIPoweredPortfolio() {
  const sampleData = {
    name: "Kaustav Chakraborty",
    title: "ML & Embedded Systems Student",
    headline:
      "I build ML systems, IoT devices and web apps that make the impossible reproducible.",
    bio:
      "Student at JIS College. I work on deepfake detection, vocal emotion recognition, TrackBot for rails, and autonomous dustbin systems. I love combining hardware with light ML models.",
    avatar: "assets/images/my-profile-pic.png",
    socials: {
      github: "https://github.com/Kaustav-coder-hub/",
      linkedin: "https://www.linkedin.com/in/kaustav-chakraborty-2009292a9/",
      twitter: "https://twitter.com/your-handle"
    },
    projects: [
      {
        id: 1,
        title: "Deepfake Detection Web App",
        short: "ConvNeXt/Vit-based detector with 94% accuracy. Full-stack web application with Streamlit/Flask backend and real-time video frame analysis.",
        tags: ["ML", "Computer Vision", "Flask", "Streamlit", "PyTorch"],
        demo: null,
        status: "active",
        completionDate: "2024",
        github: "https://github.com/Kaustav-coder-hub/deepfake-detection",
        deployed: true
      },
      {
        id: 2,
        title: "TrackBot (Railway Crack Detector)",
        short: "Production-ready IoT system with ultrasonic sensors, vibration analysis, and real-time reporting dashboard for railway maintenance.",
        tags: ["IoT", "Embedded", "Raspberry Pi", "Python", "MQTT"],
        demo: null,
        status: "active",
        completionDate: "2024",
        github: null,
        deployed: false
      },
      {
        id: 3,
        title: "Autonomous Dustbin System",
        short: "Smart waste management with 7-sensor classification (metal, plastic, glass, organic), solar power management, and automated sorting mechanism.",
        tags: ["IoT", "Sustainability", "Arduino", "Machine Learning"],
        demo: null,
        status: "completed",
        completionDate: "2023",
        github: null,
        deployed: false
      },
      {
        id: 4,
        title: "VocalEmotion Recognition",
        short: "ML-powered emotion detection from voice with LSTM networks. Classifies 7 emotions with 87% accuracy using MFCC features.",
        tags: ["ML", "Audio Processing", "TensorFlow", "Python"],
        demo: null,
        status: "inactive",
        completionDate: "2022",
        github: null,
        deployed: false
      }
    ],
    timeline: [
      { year: "2019", event: "Started programming; built small Arduino projects" },
      { year: "2022", event: "First ML project: VocalEmotion" },
      { year: "2024", event: "Deepfake detection web app deployed" }
    ],
    skills: [
      "Python", "Pytorch", "TensorFlow", "Embedded C", "Node.js", "React", "Tailwind", "Docker"
    ]
  };

  const [messages, setMessages] = useState([
    { from: "assistant", text: `Hi 👋 I'm Kaustav's professional AI assistant. Ask me about his projects, skills, or technical expertise. I only discuss professional topics.` }
  ]);
  const [input, setInput] = useState("");
  const [projects, setProjects] = useState(sampleData.projects);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    let raf;
    const canvas = document.getElementById("neural-orb");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = canvas.clientWidth);
    let h = (canvas.height = canvas.clientHeight);

    const nodes = [];
    const NODE_COUNT = 28;

    for (let i = 0; i < NODE_COUNT; i++) {
      const angle = (i / NODE_COUNT) * Math.PI * 2;
      nodes.push({
        baseX: w / 2 + Math.cos(angle) * Math.min(w, h) * 0.22,
        baseY: h / 2 + Math.sin(angle) * Math.min(w, h) * 0.22,
        r: 2 + Math.random() * 3,
        phase: Math.random() * Math.PI * 2
      });
    }

    function resize() {
      w = canvas.width = canvas.clientWidth;
      h = canvas.height = canvas.clientHeight;
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      const grd = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, Math.max(w, h));
      grd.addColorStop(0, "rgba(60,130,240,0.12)");
      grd.addColorStop(1, "rgba(15,15,20,0.0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      ctx.beginPath();
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const ax = a.baseX + Math.sin(t / 900 + a.phase) * 8;
        const ay = a.baseY + Math.cos(t / 700 + a.phase) * 8;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const bx = b.baseX + Math.sin(t / 900 + b.phase) * 8;
          const by = b.baseY + Math.cos(t / 700 + b.phase) * 8;
          const d = Math.hypot(ax - bx, ay - by);
          if (d < 140) {
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
          }
        }
      }
      ctx.strokeStyle = 'rgba(80,180,255,0.08)';
      ctx.lineWidth = 1.0;
      ctx.stroke();

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const x = n.baseX + Math.sin(t / 900 + n.phase) * 6;
        const y = n.baseY + Math.cos(t / 700 + n.phase) * 6;
        const r = n.r + Math.sin(t / 400 + n.phase) * 0.8;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(120,200,255,0.95)';
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    draw(0);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  async function sendMessage(evt) {
    evt && evt.preventDefault();
    if (!input.trim() || isTyping) return;
    
    const userMsg = { from: "user", text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsTyping(true);

    // Professional context about Kaustav
    const professionalContext = `
You are a professional AI assistant for Kaustav Chakraborty's portfolio website. 

STRICT RULES:
1. ONLY answer questions about his professional work, projects, skills, and technical expertise
2. NEVER discuss personal life, relationships, family, or private matters
3. If asked personal questions, politely redirect to professional topics
4. Base answers on this professional information:

PROFESSIONAL PROFILE:
- Name: Kaustav Chakraborty
- Role: ML & Embedded Systems Student at JIS College
- Expertise: Machine Learning, IoT, Computer Vision, Embedded Systems

PROJECTS:
1. Deepfake Detection Web App (2024, Active, Deployed)
   - ConvNeXt/Vit-based detector with 94% accuracy
   - Full-stack: Streamlit/Flask backend, real-time video analysis
   - Tech: ML, Computer Vision, Flask, Streamlit, PyTorch

2. TrackBot - Railway Crack Detector (2024, Active)
   - Production IoT system for railway maintenance
   - Ultrasonic sensors, vibration analysis, real-time dashboard
   - Tech: IoT, Embedded, Raspberry Pi, Python, MQTT

3. Autonomous Dustbin System (2023, Completed)
   - Smart waste management with 7-sensor classification
   - Classifies: metal, plastic, glass, organic materials
   - Solar-powered with automated sorting
   - Tech: IoT, Sustainability, Arduino, Machine Learning

4. VocalEmotion Recognition (2022, Inactive)
   - ML-powered emotion detection from voice using LSTM
   - 87% accuracy, classifies 7 emotions using MFCC features
   - Tech: ML, Audio Processing, TensorFlow, Python

SKILLS:
Python, PyTorch, TensorFlow, Embedded C, Node.js, React, Tailwind, Docker

CONTACT:
- GitHub: https://github.com/Kaustav-coder-hub/
- LinkedIn: https://www.linkedin.com/in/kaustav-chakraborty-2009292a9/

Answer professionally, technically, and concisely. If question is personal, respond: "I can only discuss Kaustav's professional work and technical projects. Would you like to know about his [projects/skills/technical expertise]?"
`;

    try {
      // Check if API key is configured
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
      
      if (!apiKey || apiKey === 'your_openai_api_key_here') {
        // Use fallback responses immediately if no API key
        throw new Error('No API key configured');
      }

      // Call OpenAI API
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: professionalContext },
            { role: 'user', content: userMsg.text }
          ],
          temperature: 0.7,
          max_tokens: 300
        })
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const aiResponse = data.choices[0].message.content;

      setMessages((m) => [
        ...m,
        { from: "assistant", text: aiResponse }
      ]);
    } catch (error) {
      // Silently use fallback - no console errors for better UX
      
      // Fallback local responses if API fails
      const lower = userMsg.text.toLowerCase();
      let fallbackResponse = "";

      // Check for personal questions
      if (lower.match(/\b(personal|family|girlfriend|boyfriend|relationship|private|age|birthday|address|phone)\b/)) {
        fallbackResponse = "I can only discuss Kaustav's professional work and technical projects. Would you like to know about his projects, skills, or technical expertise?";
      }
      // Project-specific responses
      else if (lower.includes("deepfake") || lower.includes("fake")) {
        fallbackResponse = "The Deepfake Detection project uses ConvNeXt/ViT-based models achieving 94% accuracy. It's a full-stack web app with Streamlit/Flask backend and real-time video frame analysis. Technologies: PyTorch, Computer Vision, Flask. It's currently deployed and active!";
      }
      else if (lower.includes("trackbot") || lower.includes("railway")) {
        fallbackResponse = "TrackBot is a production-ready IoT system for railway crack detection using ultrasonic sensors and vibration analysis. It has a real-time reporting dashboard for maintenance teams. Built with Raspberry Pi, Python, and MQTT protocol.";
      }
      else if (lower.includes("dustbin") || lower.includes("waste")) {
        fallbackResponse = "The Autonomous Dustbin is a smart waste management system with 7-sensor classification for metal, plastic, glass, and organic materials. It features solar power management and automated sorting mechanisms using Arduino and ML.";
      }
      else if (lower.includes("vocal") || lower.includes("emotion")) {
        fallbackResponse = "VocalEmotion is an ML-powered system that detects 7 emotions from voice with 87% accuracy using LSTM networks and MFCC features. Built with TensorFlow and Python for audio processing.";
      }
      else if (lower.includes("skill") || lower.includes("technology")) {
        fallbackResponse = `Kaustav's technical skills include: ${sampleData.skills.join(", ")}. He specializes in ML systems, IoT devices, and combining hardware with lightweight ML models.`;
      }
      else if (lower.includes("project")) {
        fallbackResponse = `Kaustav has ${projects.length} major projects: ${projects.map(p => p.title).join(", ")}. Which one would you like to know more about?`;
      }
      else if (lower.includes("contact") || lower.includes("reach") || lower.includes("email")) {
        fallbackResponse = "You can reach Kaustav through GitHub (https://github.com/Kaustav-coder-hub/) or LinkedIn (https://www.linkedin.com/in/kaustav-chakraborty-2009292a9/). Feel free to connect for professional collaborations!";
      }
      else {
        fallbackResponse = `I'm here to discuss Kaustav's professional work. You can ask about:\n• His 4 major projects (Deepfake Detection, TrackBot, Autonomous Dustbin, VocalEmotion)\n• Technical skills and expertise\n• Technologies he works with\n• How to collaborate or get in touch`;
      }

      setMessages((m) => [
        ...m,
        { from: "assistant", text: fallbackResponse }
      ]);
    } finally {
      setIsTyping(false);
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  }

  function quickOpenProject(id) {
    const el = document.getElementById("project-" + id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function handleDemoUpload(e, projectId) {
    const file = e.target.files[0];
    if (!file) return;
    setProjects((ps) =>
      ps.map((p) => (p.id === projectId ? { ...p, demo: file.name } : p))
    );
  }

  function updateProject(projectId, fields) {
    setProjects((ps) => ps.map((p) => (p.id === projectId ? { ...p, ...fields } : p)));
  }

  function handleContact(e) {
    e.preventDefault();
    alert("Contact form submitted. Replace this with EmailJS or backend call.");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050a15] via-[#05060a] to-[#0a0e1a] text-gray-200 antialiased">
      {/* Animated background gradient */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-[1920px] mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8 grid grid-cols-12 gap-3 sm:gap-4 lg:gap-6 relative">
        {/* Left dock - Enhanced */}
        <aside className="col-span-12 lg:col-span-3 xl:col-span-2 bg-gradient-to-br from-[#0a1628]/80 to-[#071423]/60 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:sticky lg:top-4 h-fit border border-cyan-500/20 shadow-2xl shadow-cyan-500/5">
          <div className="flex flex-col items-center text-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-md opacity-50 animate-pulse"></div>
              <img src={sampleData.avatar} alt="avatar" className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full ring-4 ring-cyan-400/50 shadow-xl" />
            </div>
            <div className="mt-4">
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">{sampleData.name}</h1>
              <p className="text-sm text-cyan-300 mt-1">{sampleData.title}</p>
            </div>
          </div>

          <p className="mt-6 text-sm text-gray-300 leading-relaxed text-center">{sampleData.headline}</p>

          <div className="mt-8">
            <h3 className="text-xs uppercase text-cyan-400 font-semibold tracking-wider mb-3">Connect</h3>
            <div className="space-y-3">
              <a href={sampleData.socials.github} target="_blank" rel="noreferrer" className="group flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/50 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center border border-cyan-400/30 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-cyan-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium text-gray-300">GitHub</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                    Active
                  </div>
                </div>
              </a>
              <a href={sampleData.socials.linkedin} target="_blank" rel="noreferrer" className="group flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-white/5 hover:bg-blue-500/10 border border-white/10 hover:border-blue-400/50 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center border border-blue-400/30 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-xs font-medium text-gray-300">LinkedIn</div>
                  <div className="text-xs text-gray-500">Professional</div>
                </div>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-cyan-500/10">
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-4 border border-cyan-500/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-cyan-300">{projects.length}</div>
                  <div className="text-xs text-gray-400 mt-1">Active Projects</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
                  <div className="text-lg font-bold text-purple-300">{sampleData.skills.length}</div>
                  <div className="text-xs text-gray-500 mt-1">Skills</div>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
                  <div className="text-lg font-bold text-blue-300">{sampleData.timeline.length}</div>
                  <div className="text-xs text-gray-500 mt-1">Milestones</div>
                </div>
              </div>
              <div className="text-xs text-center text-gray-500 pt-2">
                <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-3 border border-cyan-500/20">
                  ✨ AI-Powered Portfolio
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main column */}
        <main className="col-span-12 lg:col-span-6 xl:col-span-7 space-y-4 sm:space-y-6 lg:space-y-8">
          <section className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-[#0a1628] via-[#071423] to-[#050a15] shadow-2xl shadow-cyan-500/5 border border-cyan-500/20">
            {/* 3D Background */}
            <div className="absolute inset-0 opacity-60">
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4a9eff" />
                <Suspense fallback={null}>
                  <AnimatedSphere />
                  <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Suspense>
              </Canvas>
            </div>

            <div className="relative z-10 p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-full">
                  <div className="inline-block px-3 sm:px-4 py-1.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-400/30 mb-3 sm:mb-4">
                    <span className="text-xs sm:text-sm font-semibold text-cyan-300 tracking-wider">ML & EMBEDDED SYSTEMS</span>
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent leading-tight">
                    {sampleData.name}
                  </h2>
                  
                  <p className="mt-2 sm:mt-3 text-base sm:text-lg text-cyan-200/80">{sampleData.title}</p>
                  <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-300 leading-relaxed max-w-3xl mx-auto">{sampleData.bio}</p>

                  <div className="mt-4 sm:mt-6 flex gap-3 sm:gap-4 justify-center flex-wrap">
                    <a 
                      href={sampleData.socials.github} 
                      className="group relative px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/50"
                    >
                      <span className="relative z-10 font-semibold">View Code</span>
                    </a>
                    <button 
                      onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })} 
                      className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105"
                    >
                      Explore Projects
                    </button>
                  </div>

                  <div className="mt-6 flex gap-3 justify-center md:justify-start">
                    <a href={sampleData.socials.github} target="_blank" rel="noreferrer" 
                       className="w-10 h-10 rounded-full bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/50 flex items-center justify-center transition-all duration-300 hover:scale-110">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                    <a href={sampleData.socials.linkedin} target="_blank" rel="noreferrer" 
                       className="w-10 h-10 rounded-full bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/50 flex items-center justify-center transition-all duration-300 hover:scale-110">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                  </div>
                </div>

                <div className="relative w-full md:w-auto flex-shrink-0">
                  <div className="w-48 h-48 md:w-56 md:h-56 mx-auto rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-600/20 p-1 shadow-2xl shadow-cyan-500/30 ring-4 ring-cyan-500/10">
                    <img src={sampleData.avatar} alt="avatar" className="w-full h-full rounded-full object-cover ring-2 ring-white/10" />
                  </div>
                  <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-gradient-to-r from-cyan-500/90 to-blue-600/90 rounded-full backdrop-blur-sm shadow-lg">
                    <span className="text-xs font-semibold text-white">Available for Collaboration</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects / Project Lab - Enhanced */}
          <section id="projects" className="mt-4 sm:mt-6 lg:mt-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30 flex-shrink-0">
                  <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">Project Lab</h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">Interactive workspace • Real-time editing</p>
                </div>
              </div>
              <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-cyan-500/10 rounded-full border border-cyan-500/30 animate-pulse">
                <span className="text-xs font-semibold text-cyan-300 whitespace-nowrap">{projects.length} Active Projects</span>
              </div>
            </div>

            <div className="mt-4 sm:mt-6 grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              {projects.map((p, idx) => (
                <div 
                  key={p.id} 
                  id={`project-${p.id}`} 
                  className="group relative bg-gradient-to-br from-[#0f1621] to-[#0a1218] backdrop-blur-xl rounded-2xl p-6 shadow-2xl shadow-black/60 border border-white/20 hover:border-cyan-400/60 transition-all duration-500 hover:scale-[1.01] hover:shadow-cyan-500/20"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Project number badge */}
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/40 font-bold text-white text-sm border-2 border-[#0a1218]">
                    #{p.id}
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/30 to-blue-500/30 flex items-center justify-center border border-cyan-400/40 flex-shrink-0 group-hover:border-cyan-400/60 transition-colors">
                        <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <input 
                          className="text-xl font-bold bg-transparent w-full outline-none text-white focus:text-cyan-300 transition-colors" 
                          value={p.title} 
                          onChange={(e) => updateProject(p.id, { title: e.target.value })} 
                          placeholder="Project Title"
                        />
                      </div>
                    </div>

                    <div className="mt-3 max-h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-500/20 scrollbar-track-transparent pr-2">
                      <textarea 
                        className="text-sm bg-transparent w-full outline-none text-gray-300 leading-relaxed resize-none focus:text-gray-100 transition-colors" 
                        value={p.short} 
                        onChange={(e) => updateProject(p.id, { short: e.target.value })}
                        placeholder="Project description..."
                        rows="3"
                      />
                    </div>

                    <div className="mt-4 space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {p.tags.map((t, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/40 hover:border-cyan-400/60 transition-colors"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {p.status === 'active' && (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/15 border border-green-500/40">
                              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50"></div>
                              <span className="text-xs text-green-300 font-medium">Active</span>
                            </div>
                          )}
                          {p.status === 'completed' && (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/15 border border-blue-500/40">
                              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                              <span className="text-xs text-blue-300 font-medium">Completed</span>
                            </div>
                          )}
                          {p.status === 'inactive' && (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-500/15 border border-gray-500/40">
                              <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                              <span className="text-xs text-gray-300 font-medium">Inactive</span>
                            </div>
                          )}
                          {p.deployed && (
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-500/15 border border-purple-500/40">
                              <svg className="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                              <span className="text-xs text-purple-300 font-medium">Deployed</span>
                            </div>
                          )}
                        </div>
                        <span className="text-xs text-gray-400 font-medium">{p.completionDate}</span>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-2 pt-4 border-t border-white/10">
                      {p.github && (
                        <a 
                          href={p.github}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1a2332] hover:bg-[#243447] border border-white/20 hover:border-cyan-400/60 transition-all duration-300"
                        >
                          <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          <span className="text-xs font-medium text-gray-300">Code</span>
                        </a>
                      )}

                      <label className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1a2332] hover:bg-[#243447] border border-white/20 hover:border-cyan-400/60 transition-all duration-300 group/upload">
                          <svg className="w-4 h-4 text-gray-300 group-hover/upload:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-xs font-medium text-gray-300">Demo</span>
                          <input type="file" className="hidden" onChange={(e) => handleDemoUpload(e, p.id)} />
                        </div>
                      </label>

                      <button 
                        onClick={() => quickOpenProject(p.id)} 
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-white font-semibold text-xs transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-cyan-400/50 border border-cyan-400/30"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Timeline + Skills - Enhanced */}
          <section id="timeline" className="mt-4 sm:mt-6 lg:mt-8 bg-gradient-to-br from-[#0a1628]/60 to-[#071423]/40 backdrop-blur-xl p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">Journey</h3>
            </div>
            
            <ol className="mt-4 sm:mt-6 space-y-4 sm:space-y-6 relative">
              
              {sampleData.timeline.map((t, i) => (
                <li key={i} className="relative pl-20 sm:pl-24 group">
                  {/* Year badge */}
                  <div className="absolute left-0 w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-2xl bg-gradient-to-br from-cyan-500/30 to-blue-600/30 flex items-center justify-center border-2 border-cyan-400/40 group-hover:border-cyan-400/70 transition-all duration-300 group-hover:scale-105 shadow-lg shadow-cyan-500/20">
                    <span className="text-base sm:text-lg font-black text-cyan-200 font-mono tracking-tight">{t.year}</span>
                  </div>
                  
                  {/* Event */}
                  <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-xl p-3 sm:p-4 group-hover:bg-white/10 transition-all duration-300 border border-white/10 group-hover:border-cyan-400/40 shadow-lg">
                    <p className="text-sm sm:text-base text-gray-300 group-hover:text-gray-100 leading-relaxed">{t.event}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div id="skills" className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400/20 to-purple-500/20 flex items-center justify-center border border-blue-400/30">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-300">Skills & Technologies</h4>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {sampleData.skills.map((s, i) => (
                  <div 
                    key={i} 
                    className="group/skill px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <span className="text-sm font-medium text-gray-300 group-hover/skill:text-blue-300">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact - Enhanced */}
          <section id="contact" className="mt-8 p-8 rounded-3xl bg-gradient-to-br from-[#0a1628]/80 to-[#071423]/60 backdrop-blur-xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">Get In Touch</h3>
                <p className="text-sm text-gray-400 mt-1">Let's create something amazing together</p>
              </div>
            </div>
            
            <form onSubmit={handleContact} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-1 md:col-span-2">
                <input 
                  placeholder="Your name" 
                  className="w-full p-4 rounded-xl bg-white/5 backdrop-blur-sm outline-none border border-white/10 focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300 placeholder-gray-500 text-gray-200"
                />
              </div>
              
              <input 
                placeholder="Email address" 
                type="email"
                className="col-span-1 p-4 rounded-xl bg-white/5 backdrop-blur-sm outline-none border border-white/10 focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300 placeholder-gray-500 text-gray-200"
              />
              
              <input 
                placeholder="Subject" 
                className="col-span-1 p-4 rounded-xl bg-white/5 backdrop-blur-sm outline-none border border-white/10 focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300 placeholder-gray-500 text-gray-200"
              />
              
              <textarea 
                placeholder="Your message..." 
                rows="5"
                className="col-span-1 md:col-span-2 p-4 rounded-xl bg-white/5 backdrop-blur-sm outline-none border border-white/10 focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300 placeholder-gray-500 text-gray-200 resize-none"
              />
              
              <button 
                type="submit" 
                className="col-span-1 md:col-span-2 py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/50 flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </form>
          </section>
        </main>

        {/* Right AI Lab Dock - Enhanced */}
        <aside className="col-span-12 lg:col-span-3 xl:col-span-3 rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-gradient-to-br from-[#0a1628]/80 to-[#071423]/60 backdrop-blur-xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/5 lg:sticky lg:top-4 h-fit overflow-hidden">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400/20 to-pink-500/20 flex items-center justify-center border border-purple-400/30 flex-shrink-0">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-lg font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">AI Lab</h4>
              <p className="text-xs text-gray-400">Your smart assistant</p>
            </div>
          </div>

          <div className="mt-4 bg-black/40 backdrop-blur-sm rounded-2xl p-3 sm:p-4 h-60 sm:h-72 lg:h-80 overflow-y-auto overflow-x-hidden border border-white/10 scroll-smooth scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent">
            <div className="space-y-3">
              {messages.map((m, i) => (
                <div key={i} className={`${m.from === 'assistant' ? 'text-left' : 'text-right'}`}> 
                  <div className={`inline-block p-3 rounded-2xl text-sm max-w-[85%] ${
                    m.from === 'assistant' 
                      ? 'bg-gradient-to-br from-[#1a2332] to-[#0f1621] text-gray-200 border border-white/20 shadow-lg' 
                      : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="text-left">
                  <div className="inline-block p-3 rounded-2xl text-sm bg-gradient-to-r from-white/10 to-white/5 text-gray-200 border border-white/10">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <form onSubmit={sendMessage} className="mt-4 flex gap-2 w-full">
            <input 
              ref={inputRef} 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Ask me anything..." 
              className="flex-1 min-w-0 p-3 rounded-xl bg-[#0f1621] backdrop-blur-sm outline-none border border-white/20 focus:border-purple-400/60 focus:bg-[#1a2332] transition-all duration-300 placeholder-gray-500 text-gray-200 text-sm"
            />
            <button 
              type="submit" 
              className="py-3 px-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 font-semibold text-white transition-all duration-300 border border-purple-400/40 hover:border-purple-400/60 hover:shadow-lg hover:shadow-purple-500/30 flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>

          <div className="mt-4 space-y-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-400/30">
              <p className="text-xs text-gray-300 leading-relaxed">
                <span className="text-purple-300 font-semibold">🤖 Professional AI:</span> Ask about projects, skills, or technical work only
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setInput("Tell me about the Deepfake Detection project")}
                className="px-3 py-2 text-xs rounded-lg bg-[#1a2332] hover:bg-purple-500/20 border border-white/20 hover:border-purple-400/50 transition-all text-gray-300 hover:text-purple-300 font-medium"
              >
                🎭 Deepfake
              </button>
              <button 
                onClick={() => setInput("What technologies does Kaustav use?")}
                className="px-3 py-2 text-xs rounded-lg bg-[#1a2332] hover:bg-purple-500/20 border border-white/20 hover:border-purple-400/50 transition-all text-gray-300 hover:text-purple-300 font-medium"
              >
                ⚙️ Tech Stack
              </button>
              <button 
                onClick={() => setInput("Tell me about TrackBot")}
                className="px-3 py-2 text-xs rounded-lg bg-[#1a2332] hover:bg-purple-500/20 border border-white/20 hover:border-purple-400/50 transition-all text-gray-300 hover:text-purple-300 font-medium"
              >
                🤖 TrackBot
              </button>
              <button 
                onClick={() => setInput("How can I contact Kaustav?")}
                className="px-3 py-2 text-xs rounded-lg bg-[#1a2332] hover:bg-purple-500/20 border border-white/20 hover:border-purple-400/50 transition-all text-gray-300 hover:text-purple-300 font-medium"
              >
                📧 Contact
              </button>
            </div>
            <div className="p-2.5 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/30">
              <p className="text-xs text-green-300 flex items-center gap-1.5 font-medium">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Privacy Protected: No personal data shared
              </p>
            </div>
          </div>
        </aside>
      </div>

      <footer className="max-w-[1920px] mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 text-center border-t border-white/5 mt-8 sm:mt-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent">
            Built with <span className="text-red-400">❤️</span> by {sampleData.name} • © {new Date().getFullYear()}
          </p>
          <div className="flex gap-4">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
              ↑ Back to Top
            </button>
            <a href={sampleData.socials.github} className="text-xs text-gray-500 hover:text-gray-400 transition-colors">
              View Source
            </a>
          </div>
        </div>
        <p className="text-xs text-gray-600 mt-4">
          Powered by React, Three.js & AI • {projects.length} Projects • {sampleData.skills.length} Technologies
        </p>
      </footer>
    </div>
  );
}
