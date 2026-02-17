import { Link } from 'react-router-dom';
import { ArrowRight, Code, Zap, Layers, Terminal, ChevronRight, Globe, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Landing() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#D90429] selection:text-white relative overflow-x-hidden">
            {/* Background Gradients/Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#D90429]/10 to-transparent opacity-40"></div>

            {/* Header */}
            <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                        <div className="w-8 h-8 rounded bg-gradient-to-br from-[#D90429] to-[#8d021f] flex items-center justify-center text-xs font-mono">SF</div>
                        <span>SAWABONA<span className="text-[#D90429] font-mono ml-1">TECH</span></span>
                    </div>
                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
                        <Link to="/docs" className="hover:text-white transition-colors">{t('nav.docs', 'Documentation')}</Link>
                        <a href="https://github.com" className="hover:text-white transition-colors">{t('nav.github', 'GitHub')}</a>

                        {/* Language Switcher */}
                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                            <Globe size={14} />
                            <button
                                onClick={() => changeLanguage('en')}
                                className={`hover:text-white transition-colors ${i18n.language === 'en' ? 'text-white font-bold' : ''}`}
                            >EN</button>
                            <span className="text-white/20">|</span>
                            <button
                                onClick={() => changeLanguage('pt')}
                                className={`hover:text-white transition-colors ${i18n.language === 'pt' ? 'text-white font-bold' : ''}`}
                            >PT</button>
                        </div>

                        <Link to="/demo" className="px-4 py-2 bg-white text-black hover:bg-zinc-200 font-semibold rounded transition-all">
                            {t('nav.demo', 'Live Demo')}
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Hero */}
            <section className="relative pt-40 pb-32 px-6 max-w-7xl mx-auto text-center z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-medium mb-8 backdrop-blur-sm animate-fade-in-up">
                    <Terminal size={12} className="text-[#D90429]" /> {t('landing.beta', 'v0.1.0 Beta Now Available')}
                </div>

                <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent whitespace-pre-line">
                    {t('landing.hero.title', 'Conversational forms,\nreimagined.')}
                </h1>

                <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                    {t('landing.hero.subtitle', 'Create Typeform-like experiences with a simple JSON schema.')}
                </p>

                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <Link to="/docs" className="px-8 py-4 bg-[#D90429] hover:bg-[#b00320] text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(217,4,41,0.3)]">
                        {t('landing.hero.start', 'Get Started')} <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    <Link to="/demo" className="px-8 py-4 bg-zinc-900 border border-white/10 hover:border-white/20 text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2">
                        {t('landing.hero.demo', 'View Component')}
                    </Link>
                </div>

                {/* Code Preview */}
                <div className="mt-20 max-w-4xl mx-auto rounded-xl border border-white/10 bg-[#0A0A0A] shadow-2xl overflow-hidden text-left relative group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#D90429]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                        <span className="ml-2 text-xs text-zinc-500 font-mono">schema.json</span>
                    </div>
                    <div className="p-6 font-mono text-sm overflow-x-auto">
                        <code className="text-zinc-300">
                            <span className="text-purple-400">const</span> schema = {'{'} <br />
                            &nbsp;&nbsp;<span className="text-blue-400">id</span>: <span className="text-green-400">'onboarding'</span>,<br />
                            &nbsp;&nbsp;<span className="text-blue-400">theme</span>: {'{'}<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">primaryColor</span>: <span className="text-green-400">'#D90429'</span><br />
                            &nbsp;&nbsp;{'}'},<br />
                            &nbsp;&nbsp;<span className="text-blue-400">questions</span>: [<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{'{'} <span className="text-blue-400">id</span>: <span className="text-green-400">'q1'</span>, <span className="text-blue-400">type</span>: <span className="text-green-400">'text'</span>, <span className="text-blue-400">title</span>: <span className="text-green-400">'What is your name?'</span> {'}'}<br />
                            &nbsp;&nbsp;]<br />
                            {'}'};
                        </code>
                    </div>
                </div>
            </section>

            {/* Visual Divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            {/* Features Grid */}
            <section className="py-32 px-6 max-w-7xl mx-auto relative">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('landing.features.title', 'Why Sawabona Forms?')}</h2>
                    <p className="text-zinc-400">{t('landing.features.subtitle', 'Everything you need to build powerful forms.')}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: t('landing.features.schema.title', 'Schema Driven'), desc: t('landing.features.schema.desc', 'Define logic, validation, and layout in a single JSON object.'), icon: Code },
                        { title: t('landing.features.theme.title', 'Themable Engine'), desc: t('landing.features.theme.desc', 'Customize every pixel. Dark mode, fonts, spacings via theme config.'), icon: Zap },
                        { title: t('landing.features.headless.title', 'Headless Core'), desc: t('landing.features.headless.desc', 'Built on Radix UI & Framer Motion for accessible, fluid interactions.'), icon: Layers },
                    ].map((feature, i) => (
                        <div key={i} className="group p-8 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-[#D90429]/30 hover:bg-zinc-900/80 transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[#D90429]/10 transition-colors">
                                <feature.icon className="w-6 h-6 text-zinc-400 group-hover:text-[#D90429] transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-zinc-100">{feature.title}</h3>
                            <p className="text-zinc-400 leading-relaxed text-sm">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* How it Works */}
            <section className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">{t('landing.steps.title', 'Build in minutes, not hours.')}</h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">{t('landing.steps.subtitle', 'Skip the boilerplate.')}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    <div className="absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#D90429]/20 to-transparent hidden md:block"></div>
                    {[
                        { step: '01', title: t('landing.steps.step1.title', 'Define Schema'), desc: t('landing.steps.step1.desc', 'Write a simple JSON object describing your questions and logic.') },
                        { step: '02', title: t('landing.steps.step2.title', 'Style & Theme'), desc: t('landing.steps.step2.desc', 'Match your brand identity with a type-safe theme object.') },
                        { step: '03', title: t('landing.steps.step3.title', 'Deploy'), desc: t('landing.steps.step3.desc', 'Import the component and start collecting responses immediately.') },
                    ].map((item, i) => (
                        <div key={i} className="relative z-10 flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-2xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center text-2xl font-bold text-[#D90429] shadow-[0_0_30px_rgba(0,0,0,0.5)] mb-8">
                                {item.step}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                            <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Comparison Section */}
            <section className="py-32 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">{t('landing.comparison.title', 'Stop reinventing the wheel.')}</h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">{t('landing.comparison.subtitle', 'Building a robust form engine takes months.')}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Manual Way */}
                    <div className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/5 opacity-50 hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <h3 className="font-bold text-xl">{t('landing.comparison.manual.title', 'Building from Scratch')}</h3>
                        </div>
                        <ul className="space-y-4">
                            {(t('landing.comparison.manual.items', { returnObjects: true }) as string[]).map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-zinc-500">
                                    <X size={16} /> {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Sawabona Way */}
                    <div className="p-8 rounded-2xl bg-gradient-to-br from-[#D90429]/10 to-transparent border border-[#D90429]/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-20">
                            <Zap size={100} />
                        </div>
                        <div className="flex items-center gap-3 mb-6 relative z-10">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <h3 className="font-bold text-xl text-white">{t('landing.comparison.sawabona.title', 'Sawabona Forms')}</h3>
                        </div>
                        <ul className="space-y-4 relative z-10">
                            {(t('landing.comparison.sawabona.items', { returnObjects: true }) as string[]).map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-zinc-200 font-medium">
                                    <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                    </div>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* Open Source Section */}
            <section className="py-24 px-6 border-y border-white/5 bg-white/5">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="text-left max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/50 rounded-full border border-white/10 text-[#D90429] text-xs font-mono mb-6">
                            <Globe size={12} /> OPEN SOURCE
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('landing.opensource.title', 'Proudly Open Source')}</h2>
                        <h3 className="text-xl text-zinc-200 mb-4">{t('landing.opensource.subtitle', 'Transparency you can trust.')}</h3>
                        <p className="text-zinc-400 leading-relaxed mb-8">
                            {t('landing.opensource.desc', 'Join our growing community.')}
                        </p>
                        <a href="https://github.com" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors">
                            {t('landing.opensource.action', 'View on GitHub')} <ArrowRight size={16} />
                        </a>
                    </div>

                    {/* Github Graph Visualization */}
                    <div className="w-full max-w-md h-64 bg-[#0A0A0A] rounded-xl border border-white/10 p-6 flex items-end gap-1 relative overflow-hidden">
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#D90429]/20 to-transparent"></div>
                        {Array.from({ length: 40 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-white/10 rounded-t-sm hover:bg-[#D90429] transition-colors duration-500"
                                style={{ height: `${Math.random() * 100}%` }}
                            ></div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bento Grid Features */}
            <section className="py-32 px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 md:grid-rows-2 gap-4 h-[800px] md:h-[600px]">
                    <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-zinc-900/40 border border-white/5 p-8 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#D90429]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <Layers className="w-10 h-10 text-[#D90429] mb-6" />
                        <h3 className="text-2xl font-bold mb-4">{t('landing.features.fullscreen.title', 'Full-Screen Engagement')}</h3>
                        <p className="text-zinc-400">{t('landing.features.fullscreen.desc', 'Distraction-free experience.')}</p>
                        <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-gradient-to-tl from-black/50 to-transparent rounded-tl-3xl border-t border-l border-white/5 p-4 transform translate-y-4 translate-x-4">
                            <div className="w-full h-full bg-[#111] rounded-xl border border-white/5 p-4 opacity-50"></div>
                        </div>
                    </div>
                    <div className="md:col-span-1 md:row-span-1 rounded-3xl bg-zinc-900/40 border border-white/5 p-8 flex flex-col justify-between group hover:border-white/10 transition-colors">
                        <Zap className="w-8 h-8 text-yellow-500" />
                        <div>
                            <h3 className="text-lg font-bold mb-2">{t('landing.features.fast.title', 'Lightning Fast')}</h3>
                            <p className="text-sm text-zinc-400">{t('landing.features.fast.desc', 'Optimized bundle size (<50kb).')}</p>
                        </div>
                    </div>
                    <div className="md:col-span-1 md:row-span-1 rounded-3xl bg-zinc-900/40 border border-white/5 p-8 flex flex-col justify-between group hover:border-white/10 transition-colors">
                        <Terminal className="w-8 h-8 text-green-500" />
                        <div>
                            <h3 className="text-lg font-bold mb-2">{t('landing.features.types.title', 'Type Safe')}</h3>
                            <p className="text-sm text-zinc-400">{t('landing.features.types.desc', 'Full TypeScript support.')}</p>
                        </div>
                    </div>
                    <div className="md:col-span-2 md:row-span-1 rounded-3xl bg-zinc-900/40 border border-white/5 p-8 flex items-center justify-between group hover:border-white/10 transition-colors relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-2">{t('landing.features.keyboard.title', 'Keyboard Navigation')}</h3>
                            <p className="text-zinc-400">{t('landing.features.keyboard.desc', 'Shortcuts for everything.')}</p>
                        </div>
                        <div className="flex gap-2 relative z-10">
                            <span className="p-2 rounded bg-white/10 border border-white/5 font-mono text-xs">Enter</span>
                            <span className="p-2 rounded bg-white/10 border border-white/5 font-mono text-xs">Tab</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[#D90429] opacity-5 blur-[100px]"></div>
                <div className="max-w-3xl mx-auto px-6 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">{t('landing.cta.title', 'Ready to build better forms?')}</h2>
                    <p className="text-xl text-zinc-400 mb-10">{t('landing.cta.subtitle', 'Join developers building the next generation of web apps.')}</p>
                    <div className="flex justify-center gap-4">
                        <Link to="/docs" className="px-8 py-4 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-all">
                            {t('landing.cta.docs', 'Read the Docs')}
                        </Link>
                        <Link to="/demo" className="px-8 py-4 bg-black border border-white/20 text-white font-bold rounded-lg hover:bg-white/5 transition-all">
                            {t('landing.cta.demo', 'Try the Demo')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/5 py-12 bg-[#020202]">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 font-bold text-lg">
                        <div className="w-6 h-6 rounded bg-[#D90429] flex items-center justify-center text-[10px] font-mono">SF</div>
                        <span>SAWABONA<span className="text-zinc-600 font-mono ml-1">TECH</span></span>
                    </div>
                    <p className="text-zinc-600 text-sm">{t('landing.footer.rights', { year: 2026 })}</p>
                    <div className="flex gap-6 text-sm text-zinc-500">
                        <Link to="/docs" className="hover:text-white transition-colors">{t('nav.docs', 'Documentation')}</Link>
                        <a href="#" className="hover:text-white transition-colors">{t('nav.github', 'GitHub')}</a>
                        {/* <a href="#" className="hover:text-white transition-colors">Twitter</a> */}
                    </div>
                </div>
            </footer>
        </div>
    );
}
