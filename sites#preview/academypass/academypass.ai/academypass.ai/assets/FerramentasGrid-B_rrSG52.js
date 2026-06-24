import {
    a as e
} from "./rolldown-runtime-C_ttsnZz.js";
import {
    C as a,
    w as o
} from "./query-BYnN4WbX.js";
import {
    o as i
} from "./ui-BxzeyedK.js";
import {
    C as s
} from "./index-W86zpBsQ.js";
var d = e(o(), 1),
    n = a(),
    r = [{
        name: "Gemini",
        icon: "✨",
        desc: "Modelo multimodal do Google para texto, código e imagens."
    }, {
        name: "Claude",
        icon: "🧠",
        desc: "Assistente de IA para análise, escrita e raciocínio complexo."
    }, {
        name: "Freepik",
        icon: "🎨",
        desc: "Geração e edição de imagens com IA integrada."
    }, {
        name: "Nano Banana",
        icon: "🍌",
        desc: "Plataforma criativa de IA para geração de conteúdo visual."
    }, {
        name: "Flux",
        icon: "⚡",
        desc: "Modelo open-source de geração de imagens de alta qualidade."
    }, {
        name: "Ideogram",
        icon: "🔤",
        desc: "Geração de imagens com tipografia e texto integrado."
    }, {
        name: "Recraft",
        icon: "🖼️",
        desc: "Criação e edição de imagens vetoriais e raster com IA."
    }, {
        name: "Krea AI",
        icon: "🎯",
        desc: "Geração e aprimoramento de imagens em tempo real."
    }, {
        name: "Visual Electric",
        icon: "💡",
        desc: "Ferramenta de geração de imagens focada em designers."
    }, {
        name: "ImageFX",
        icon: "🖌️",
        desc: "Geração de imagens do Google com controles avançados."
    }, {
        name: "Whisk",
        icon: "🌀",
        desc: "Remixagem visual de imagens com IA do Google."
    }, {
        name: "Luma Dream Machine",
        icon: "🌐",
        desc: "Geração de vídeos e cenas 3D realistas com IA."
    }, {
        name: "Kling AI",
        icon: "🎞️",
        desc: "Geração de vídeos com controle de câmera e movimento."
    }, {
        name: "Runway",
        icon: "🎬",
        desc: "Edição e geração de vídeo com IA: Gen-3 e Aleph."
    }, {
        name: "Veo 3",
        icon: "📹",
        desc: "Modelo de geração de vídeo do Google DeepMind."
    }, {
        name: "Higgsfield",
        icon: "🎥",
        desc: "Geração de vídeos personalizados com IA."
    }, {
        name: "Seedream",
        icon: "🌱",
        desc: "Modelo de geração de imagens de alta fidelidade."
    }, {
        name: "Seedance",
        icon: "💃",
        desc: "Geração de vídeos com movimento e dança via IA."
    }, {
        name: "LTX Studio",
        icon: "🎬",
        desc: "Produção de vídeo completa com IA generativa."
    }, {
        name: "HeyGen",
        icon: "🗣️",
        desc: "Criação de vídeos com avatares digitais e IA."
    }, {
        name: "ElevenLabs",
        icon: "🎙️",
        desc: "Clonagem e geração de voz com qualidade profissional."
    }, {
        name: "MusicFX",
        icon: "🎵",
        desc: "Geração de músicas e efeitos sonoros com IA do Google."
    }, {
        name: "Google AI Studio",
        icon: "🔊",
        desc: "Text-to-Speech avançado com vozes naturais."
    }, {
        name: "Magnific AI",
        icon: "🔍",
        desc: "Upscaling e aprimoramento de imagens com IA."
    }, {
        name: "Topaz Labs",
        icon: "💎",
        desc: "Ferramentas profissionais de upscaling e denoising."
    }, {
        name: "NotebookLM",
        icon: "📝",
        desc: "Assistente de pesquisa do Google com fontes personalizadas."
    }, {
        name: "Mixboard",
        icon: "🎛️",
        desc: "Plataforma de mixagem e criação de áudio com IA."
    }, {
        name: "Fall.ai",
        icon: "🤖",
        desc: "Automação criativa e geração de conteúdo com IA."
    }, {
        name: "Deep Research",
        icon: "🔬",
        desc: "Pesquisa aprofundada e análise de dados com IA."
    }],
    t = () => {
        const [e, a] = (0, d.useState)(null), {
            ferramentas: o
        } = s(), t = (o.length > 0 ? o : r).filter(e => "canva ai" !== e.name.trim().toLowerCase());
        return (0, n.jsx)("section", {
            className: "relative pt-28 md:pt-40 pb-16 md:pb-20 overflow-hidden",
            style: {
                backgroundColor: "#0E0E10"
            },
            children: (0, n.jsx)("div", {
                className: "relative z-10 w-full px-4 md:px-8",
                children: (0, n.jsxs)("div", {
                    className: "max-w-[1400px] mx-auto",
                    children: [(0, n.jsxs)(i.div, {
                        initial: {
                            opacity: 0,
                            y: 20
                        },
                        whileInView: {
                            opacity: 1,
                            y: 0
                        },
                        viewport: {
                            once: !0
                        },
                        className: "mb-10 md:mb-14",
                        children: [(0, n.jsx)("span", {
                            className: "text-[10px] text-primary font-body tracking-[0.25em] uppercase mb-4 block",
                            children: "Ferramentas"
                        }), (0, n.jsxs)("h2", {
                            className: "font-display text-4xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight leading-[0.9] mb-5",
                            children: ["+20 ferramentas", " ", (0, n.jsx)("span", {
                                className: "bg-gradient-to-r from-primary via-[hsl(195,25%,55%)] to-primary bg-clip-text text-transparent",
                                children: "pra te ajudar"
                            }), (0, n.jsx)("br", {}), "na criação"]
                        }), (0, n.jsx)("p", {
                            className: "text-white/40 font-body max-w-md text-sm",
                            children: "Aprenda a dominar as principais ferramentas de IA do mercado criativo. Cada uma com cursos, labs e tutoriais dedicados."
                        })]
                    }), (0, n.jsx)("div", {
                        className: "grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 md:gap-2.5",
                        children: t.map((o, s) => (0, n.jsxs)(i.div, {
                            initial: {
                                opacity: 0,
                                scale: .9
                            },
                            whileInView: {
                                opacity: 1,
                                scale: 1
                            },
                            viewport: {
                                once: !0
                            },
                            transition: {
                                delay: .02 * s,
                                ease: [.16, 1, .3, 1]
                            },
                            className: "relative group",
                            onMouseEnter: () => a(s),
                            onMouseLeave: () => a(null),
                            children: [(0, n.jsxs)("div", {
                                className: "aspect-square rounded-2xl overflow-hidden flex flex-col border transition-all duration-300 cursor-default " + (e === s ? "border-primary/30 scale-105 shadow-[0_0_30px_rgba(100,180,200,0.15)]" : "border-white/[0.06] hover:border-white/[0.1]"),
                                children: [(0, n.jsx)("div", {
                                    className: "flex-1 relative",
                                    children: (0, n.jsx)("img", {
                                        src: o.thumb || "/assets/tool-thumb-_K4GuAHK.png",
                                        alt: o.name,
                                        className: "absolute inset-0 w-full h-full object-cover"
                                    })
                                }), (0, n.jsx)("div", {
                                    className: "px-1.5 py-1.5 bg-white/[0.04] border-t border-white/[0.06]",
                                    children: (0, n.jsx)("span", {
                                        className: "text-[9px] md:text-[10px] font-body text-white/60 text-center block leading-tight truncate",
                                        children: o.name
                                    })
                                })]
                            }), e === s && (0, n.jsxs)(i.div, {
                                initial: {
                                    opacity: 0,
                                    y: 8
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0
                                },
                                transition: {
                                    duration: .15
                                },
                                className: "absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3 rounded-xl bg-[hsl(222,25%,12%)] border border-white/10 shadow-2xl pointer-events-none",
                                children: [(0, n.jsx)("p", {
                                    className: "text-xs font-body font-semibold text-white mb-1",
                                    children: o.name
                                }), (0, n.jsx)("p", {
                                    className: "text-[11px] font-body text-white/50 leading-relaxed",
                                    children: o.desc
                                }), (0, n.jsx)("div", {
                                    className: "absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 rotate-45 bg-[hsl(222,25%,12%)] border-r border-b border-white/10"
                                })]
                            })]
                        }, o.name))
                    })]
                })
            })
        })
    };
export {
    t as
    default
};