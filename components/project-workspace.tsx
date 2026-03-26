"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, MessageSquare, LayoutTemplate, Send, Sparkles, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { createProjectAction } from "@/app/actions/project";
import { RemotionDynamicPlayer } from "./remotion-dynamic-player";

export function ProjectWorkspace({ project }: { project: any }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"chat" | "theme">("chat");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<any[]>([
    { role: "assistant", content: `I'm ready to generate your video based on:\n\n${project.prompt}\n\nWhat style or details would you like to refine?` }
  ]);

  const getInitialStep = (status: string) => {
    if (status === "analyzing") return 1;
    if (status === "composing") return 2;
    if (status === "rendering") return 3;
    if (status === "completed") return 4;
    return 0; // pending
  };

  const [progressStep, setProgressStep] = useState(getInitialStep(project.status));
  const [generatedData, setGeneratedData] = useState<any>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (progressStep < 4) {
      interval = setInterval(async () => {
        try {
          const res = await fetch(`/api/project/${project.id}`);
          if (res.ok) {
            const data = await res.json();
            const newStep = getInitialStep(data.status);
            if (newStep > progressStep) {
              setProgressStep(newStep);
            }
            if (data.videos && data.videos.length > 0) {
              setGeneratedData(data.videos[0]);
            }
          }
        } catch (error) {
          console.error("Polling error", error);
        }
      }, 3500); // Poll every 3.5 seconds
    } else {
        // Fallback fetch if it was already immediately completed on page load
        if (!generatedData) {
            fetch(`/api/project/${project.id}`).then(res => res.json()).then(data => {
                if (data.videos?.length > 0) setGeneratedData(data.videos[0]);
            }).catch(() => {});
        }
    }

    return () => clearInterval(interval);
  }, [project.id, progressStep, generatedData]);

  const steps = [
    { label: "Analyzing Prompt" },
    { label: "Composing Narrative" },
    { label: "Generating React Code" },
    { label: "Finalizing Video" }
  ];

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    
    const submittedText = chatInput.trim();
    setMessages((prev) => [...prev, { role: "user", content: submittedText }]);
    setChatInput("");

    try {
      // Modifies the active video project
      await createProjectAction({
        projectId: project.id,
        prompt: project.prompt + "\nRevision instruction: " + submittedText,
        duration: project.duration,
        aspectRatio: project.aspectRatio
      });

      setProgressStep(1); // Resume generating visual tracking sequence visually
      setMessages((prev) => [...prev, { role: "assistant", content: "Got it! Incorporating those details and rebuilding the pipeline. (15 credits deducted)" }]);
    } catch (e: any) {
      setMessages((prev) => [...prev, { role: "assistant", content: `Sorry, I couldn't update the sequence: ${e.message}` }]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#fcfcfd]" style={{ fontFamily: "DM Sans, sans-serif" }}>
      {/* ── Top App Bar ── */}
      <header className="h-[64px] flex items-center justify-between px-6 border-b border-[#eef0f6] bg-white shrink-0">
        <div className="flex items-center gap-5 flex-1 overflow-hidden">
          <button onClick={() => router.push("/")} className="flex items-center gap-1.5 text-[14px] font-semibold text-[#64748b] hover:text-[#0f172a] transition-colors">
            <ArrowLeft size={16} strokeWidth={2.5} />
            Back
          </button>
          
          <div className="flex items-center gap-3 w-[60%]">
            <div className="w-8 h-8 rounded-lg bg-[#f3e8ff] flex items-center justify-center shrink-0">
              <Sparkles size={16} className="text-[#9333ea]" />
            </div>
            <p className="text-[14px] font-bold text-[#1e293b] truncate">
              {project.prompt}
            </p>
            <span className="px-2.5 py-0.5 rounded-full bg-[#f1f5f9] text-[#64748b] text-[10px] font-extrabold uppercase tracking-widest shrink-0 border border-[#e2e8f0]">
              Pending
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button className="px-5 py-2 rounded-full border border-[#cbd5e1] text-[13px] font-bold text-[#334155] hover:bg-[#f8fafc] transition-colors">
            Share
          </button>
          <button className="px-5 py-2 rounded-full bg-[#7e22ce] text-white text-[13px] font-bold shadow-[0_2px_12px_rgba(126,34,206,0.3)] hover:scale-105 transition-transform active:scale-95">
            Export
          </button>
        </div>
      </header>

      {/* ── Main Layout ── */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* ── Left Sidebar (Chat/Theme) ── */}
        <aside className="w-[340px] lg:w-[380px] bg-white border-r border-[#eef0f6] flex flex-col shrink-0">
          {/* Tabs Container */}
          <div className="p-4 border-b border-[#eef0f6] shrink-0">
            <div className="bg-[#f8fafc] p-1 rounded-xl flex gap-1 border border-[#f1f5f9]">
              <button
                onClick={() => setActiveTab("chat")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[13px] font-bold transition-all ${
                  activeTab === "chat" 
                    ? "bg-white text-[#1e293b] shadow-sm border border-[#e2e8f0]" 
                    : "text-[#64748b] hover:text-[#1e293b]"
                }`}
              >
                <MessageSquare size={14} strokeWidth={2.5} />
                Chat
              </button>
              <button
                onClick={() => setActiveTab("theme")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[13px] font-bold transition-all ${
                  activeTab === "theme" 
                    ? "bg-white text-[#1e293b] shadow-sm border border-[#e2e8f0]" 
                    : "text-[#64748b] hover:text-[#1e293b]"
                }`}
              >
                <LayoutTemplate size={14} strokeWidth={2.5} />
                Theme
              </button>
            </div>
          </div>

          {/* Chat Content */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            {activeTab === "chat" ? (
              <>
                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex items-start gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      {m.role === "assistant" && (
                        <div className="w-8 h-8 rounded-full bg-[#f3e8ff] flex items-center justify-center shrink-0 border border-[#e9d5ff]">
                          <Sparkles size={14} className="text-[#9333ea]" />
                        </div>
                      )}
                      
                      {m.role === "user" && (
                         <div className="w-8 h-8 rounded-full bg-[#1e293b] flex items-center justify-center shrink-0 shadow-sm text-[10px] font-bold text-white tracking-widest">
                           ME
                         </div>
                      )}

                      <div 
                        className={`px-4 py-3 text-[13px] leading-relaxed relative ${
                          m.role === "user" 
                            ? "bg-[#7e22ce] text-white shadow-md rounded-2xl rounded-tr-md" 
                            : "bg-[#f8fafc] border border-[#f1f5f9] text-[#334155] shadow-sm rounded-2xl rounded-tl-md w-[85%]"
                        }`}
                      >
                         <p className="whitespace-pre-wrap">{m.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 bg-white border-t border-[#eef0f6] shrink-0">
                  <div className="w-full relative flex items-center border-2 border-[#f1f5f9] rounded-[24px] bg-white p-1 hover:border-[#e2e8f0] focus-within:border-[#c084fc] transition-colors">
                    <textarea
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask AI to refine details..."
                      className="w-full bg-transparent border-none outline-none resize-none max-h-24 text-[13px] font-medium text-[#1e293b] px-3 py-2.5 placeholder:text-[#94a3b8] no-scrollbar"
                      rows={1}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!chatInput.trim()}
                      className="shrink-0 w-9 h-9 rounded-full bg-[#7e22ce] flex items-center justify-center text-white disabled:bg-[#cbd5e1] transition-colors active:scale-95 shadow-sm ml-1"
                    >
                      <Send size={15} strokeWidth={2.5} className="ml-[-2px] mt-[1px]" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-[#94a3b8] text-[13px] font-medium">
                Visual parameters will appear here.
              </div>
            )}
          </div>
        </aside>

        {/* ── Right Main Area ── */}
        <main className="flex-1 overflow-y-auto flex items-center justify-center p-8 bg-[#f8fafc]">
           
           <div className="w-full h-full max-w-[960px] flex flex-col items-center justify-center bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.02)] border border-[#f1f5f9] p-10 relative overflow-hidden">
              
              {progressStep < 4 ? (
                <div className="w-full max-w-[480px] flex flex-col items-center z-10">
                  
                  {/* Outer Pulsing Aura overlay */}
                  <div className="absolute inset-0 bg-[#fbf5ff] opacity-40 pointer-events-none" />

                  {/* Circular Spinner "C" Match */}
                  <div className="relative flex items-center justify-center w-[120px] h-[120px] mb-8">
                    {/* Glow ring */}
                    <div className="absolute inset-0 bg-[#d8b4fe] rounded-full opacity-30 blur-2xl animate-pulse" />
                    {/* Faded background circle */}
                    <div className="absolute inset-2 bg-[#f3e8ff] rounded-full border border-[#e9d5ff]" />
                    {/* The C spinner track */}
                    <div className="w-16 h-16 rounded-full border-[5px] border-[#e9d5ff] z-10 flex items-center justify-center relative">
                       {/* The active rotating C */}
                       <div className="absolute inset-[-5px] rounded-full border-[5px] border-t-[#7e22ce] border-r-transparent border-b-transparent border-l-transparent animate-[vm-spin-slow_1.2s_cubic-bezier(0.4,0,0.2,1)_infinite]" />
                       <span className="text-xl font-syne font-bold text-[#7e22ce]">C</span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold font-syne text-[#0f172a] text-center tracking-tight">
                    Generating your video...
                  </h2>
                  <p className="text-[13px] font-medium text-[#64748b] mt-2 mb-10 text-center">
                    Analyzing prompt and generating scenes
                  </p>

                  {/* Progress Bar Container */}
                  <div className="w-full mb-8">
                    <div className="flex justify-between items-center mb-2 px-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#64748b]">
                        Scene {Math.min(progressStep + 1, steps.length)} of {steps.length}
                      </span>
                      <span className="text-[11px] font-extrabold tracking-wider text-[#7e22ce]">
                        {Math.floor((Math.max(0.5, progressStep) / steps.length) * 100)}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-[#f1f5f9] rounded-full overflow-hidden relative">
                       <div 
                         className="absolute top-0 left-0 h-full bg-[#7e22ce] transition-all duration-[800ms] ease-out rounded-full"
                         style={{ width: `${Math.max(15, Math.min(100, (progressStep / steps.length) * 100))}%` }}
                       />
                    </div>
                  </div>

                  {/* List of Checkmarks Box */}
                  <div className="w-[85%] bg-white border border-[#f1f5f9] rounded-2xl p-6 shadow-[0_2px_18px_rgba(0,0,0,0.02)] space-y-4">
                     {steps.map((step, idx) => {
                       const isPast = progressStep > idx;
                       const isCurrent = progressStep === idx;
                       
                       return (
                         <div key={idx} className="flex items-center gap-4">
                           <div className="relative flex items-center justify-center w-5 h-5 shrink-0">
                             {isPast ? (
                               <div className="w-5 h-5 rounded-full bg-[#d8b4fe] flex items-center justify-center text-[#581c87]">
                                 <div className="w-2.5 h-2.5 rounded-full bg-[#7e22ce]" />
                               </div>
                             ) : isCurrent ? (
                               <>
                                <div className="absolute inset-[-4px] bg-[#d8b4fe] rounded-full opacity-40 animate-ping" />
                                <div className="w-[8px] h-[8px] rounded-full bg-[#7e22ce] z-10" />
                                <div className="absolute inset-0 rounded-full border-[1.5px] border-[#c084fc]" />
                               </>
                             ) : (
                               <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-[#e2e8f0] bg-transparent" />
                             )}
                           </div>
                           <span className={`text-[13px] font-bold transition-colors duration-300 ${isCurrent ? 'text-[#7e22ce]' : isPast ? 'text-[#334155]' : 'text-[#94a3b8]'}`}>
                             {step.label}
                           </span>
                         </div>
                       )
                     })}
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 z-10">
                   {generatedData ? (
                     <div className="w-full h-full flex flex-col items-center justify-center border-4 border-[#1e293b] rounded-[24px] overflow-hidden bg-black relative shadow-[0_20px_60px_rgba(0,0,0,0.15)] group">
                        <RemotionDynamicPlayer 
                          compositionCode={generatedData.compositionCode} 
                          themeConfig={JSON.parse(generatedData.themeConfig || "{}")} 
                          aspectRatio={project.aspectRatio}
                          durationFrames={parseInt(project.duration.replace("s", "")) * 30}
                        />
                     </div>
                   ) : (
                     <div className="flex animate-pulse items-center gap-2 text-[#64748b] font-medium">
                        <div className="w-4 h-4 rounded-full bg-[#9333ea] animate-bounce" />
                        Fetching Generated Composition...
                     </div>
                   )}
                </div>
              )}

           </div>

        </main>
      </div>
      
      <style>{`
        body { overflow: hidden; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
