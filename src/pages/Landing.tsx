import { Link } from 'react-router-dom';
import { ArrowRight, Code, Zap, Layers, Terminal, ChevronRight, Globe, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PageTransition } from '../components/PageTransition';

export default function Landing() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <PageTransition>
            <div className="min-h-screen bg-[#EFE9DB] text-[#171717] font-sans selection:bg-[#716C4A] selection:text-[#EFE9DB] relative overflow-x-hidden">
                {/* Noise Texture */}
                <div className="bg-noise"></div>

                {/* Header */}
                <header className="fixed top-0 w-full z-50 border-b border-[#716C4A]/10 bg-[#EFE9DB]/80 backdrop-blur-md">
                    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-2 font-bold text-xl">
                            <img src="/sawabona-logo.svg" alt="Sawabona Tech" className="w-8 h-8 text-[#716C4A]" />
                            <span className="font-heading text-[#716C4A]">Sawabona<span className="text-[#716C4A] font-heading ml-1">Tech</span></span>
                        </div>
                        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#716C4A]/80">
                            <Link to="/docs" className="hover:text-[#716C4A] transition-colors">{t('nav.docs', 'Documentation')}</Link>
                            <a href="https://github.com" className="hover:text-[#716C4A] transition-colors">{t('nav.github', 'GitHub')}</a>

                            {/* Language Switcher */}
                            <div className="flex items-center gap-2 px-3 py-1 bg-[#716C4A]/5 rounded-full border border-[#716C4A]/10">
                                <Globe size={14} />
                                <button
                                    onClick={() => changeLanguage('en')}
                                    className={`hover:text-[#716C4A] transition-colors ${i18n.language === 'en' ? 'text-[#716C4A] font-bold' : ''}`}
                                >EN</button>
                                <span className="text-[#716C4A]/20">|</span>
                                <button
                                    onClick={() => changeLanguage('pt')}
                                    className={`hover:text-[#716C4A] transition-colors ${i18n.language === 'pt' ? 'text-[#716C4A] font-bold' : ''}`}
                                >PT</button>
                            </div>

                            <Link to="/demo" className="px-4 py-2 bg-[#716C4A] text-[#EFE9DB] hover:bg-[#5a563b] font-semibold rounded transition-all">
                                {t('nav.demo', 'Live Demo')}
                            </Link>
                        </nav>
                    </div>
                </header>

                {/* Hero */}
                <section className="relative pt-40 pb-32 px-6 max-w-7xl mx-auto text-center z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#716C4A]/5 border border-[#716C4A]/10 text-[#716C4A] text-xs font-medium mb-8 backdrop-blur-sm animate-fade-in-up">
                        <Terminal size={12} className="text-[#716C4A]" /> {t('landing.beta', 'v0.3.0 Beta Now Available')}
                    </div>

                    <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 text-[#171717] whitespace-pre-line">
                        {t('landing.hero.title', 'Conversational forms,\nreimagined.')}
                    </h1>

                    <p className="text-lg md:text-xl text-[#716C4A] max-w-2xl mx-auto mb-12 leading-relaxed">
                        {t('landing.hero.subtitle', 'Create Typeform-like experiences with a simple JSON schema.')}
                    </p>

                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <Link to="/docs" className="px-8 py-4 bg-[#716C4A] hover:bg-[#5a563b] text-[#EFE9DB] font-medium rounded-lg transition-all flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(113,108,74,0.2)]">
                            {t('landing.hero.start', 'Get Started')} <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link to="/demo" className="px-8 py-4 bg-white border border-[#716C4A]/10 hover:border-[#716C4A]/20 text-[#171717] font-medium rounded-lg transition-all flex items-center justify-center gap-2">
                            {t('landing.hero.demo', 'View Component')}
                        </Link>
                    </div>

                    {/* Code Preview */}
                    <div className="mt-20 max-w-4xl mx-auto rounded-xl border border-[#716C4A]/10 bg-[#171717] shadow-2xl overflow-hidden text-left relative group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#716C4A]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                            <span className="ml-2 text-xs text-zinc-500 font-mono">schema.json</span>
                        </div>
                        <div className="p-6 font-mono text-sm overflow-x-auto">
                            <code className="text-[#EFE9DB]">
                                <span className="text-[#716C4A]">const</span> schema = {'{'} <br />
                                &nbsp;&nbsp;<span className="text-blue-400">id</span>: <span className="text-green-400">'onboarding'</span>,<br />
                                &nbsp;&nbsp;<span className="text-blue-400">theme</span>: {'{'}<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">primaryColor</span>: <span className="text-green-400">'#716C4A'</span><br />
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
                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#716C4A]/10 to-transparent"></div>

                {/* Features Grid */}
                <section className="py-32 px-6 max-w-7xl mx-auto relative">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#171717]">{t('landing.features.title', 'Why Sawabona Forms?')}</h2>
                        <p className="text-[#716C4A]">{t('landing.features.subtitle', 'Everything you need to build powerful forms.')}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: t('landing.features.schema.title', 'Schema Driven'), desc: t('landing.features.schema.desc', 'Define logic, validation, and layout in a single JSON object.'), icon: Code },
                            { title: t('landing.features.theme.title', 'Themable Engine'), desc: t('landing.features.theme.desc', 'Customize every pixel. Dark mode, fonts, spacings via theme config.'), icon: Zap },
                            { title: t('landing.features.headless.title', 'Headless Core'), desc: t('landing.features.headless.desc', 'Built on Radix UI & Framer Motion for accessible, fluid interactions.'), icon: Layers },
                        ].map((feature, i) => (
                            <div key={i} className="group p-8 rounded-2xl bg-white/50 border border-[#716C4A]/5 hover:border-[#716C4A]/30 hover:bg-white/80 transition-all duration-300 hover:-translate-y-1 shadow-sm">
                                <div className="w-12 h-12 rounded-lg bg-[#716C4A]/5 flex items-center justify-center mb-6 group-hover:bg-[#716C4A]/10 transition-colors">
                                    <feature.icon className="w-6 h-6 text-[#716C4A] transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-[#171717]">{feature.title}</h3>
                                <p className="text-[#716C4A] leading-relaxed text-sm">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How it Works */}
                <section className="py-32 px-6 max-w-7xl mx-auto border-t border-[#716C4A]/10">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#171717]">{t('landing.steps.title', 'Build in minutes, not hours.')}</h2>
                        <p className="text-[#716C4A] max-w-2xl mx-auto">{t('landing.steps.subtitle', 'Skip the boilerplate.')}</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 relative">
                        <div className="absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[#716C4A]/20 to-transparent hidden md:block"></div>
                        {[
                            { step: '01', title: t('landing.steps.step1.title', 'Define Schema'), desc: t('landing.steps.step1.desc', 'Write a simple JSON object describing your questions and logic.') },
                            { step: '02', title: t('landing.steps.step2.title', 'Style & Theme'), desc: t('landing.steps.step2.desc', 'Match your brand identity with a type-safe theme object.') },
                            { step: '03', title: t('landing.steps.step3.title', 'Deploy'), desc: t('landing.steps.step3.desc', 'Import the component and start collecting responses immediately.') },
                        ].map((item, i) => (
                            <div key={i} className="relative z-10 flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-2xl bg-[#EFE9DB] border border-[#716C4A]/10 flex items-center justify-center text-2xl font-bold text-[#716C4A] shadow-[0_0_30px_rgba(113,108,74,0.1)] mb-8">
                                    {item.step}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-[#171717]">{item.title}</h3>
                                <p className="text-[#716C4A] leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Comparison Section */}
                <section className="py-32 px-6 max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#171717]">{t('landing.comparison.title', 'Stop reinventing the wheel.')}</h2>
                        <p className="text-[#716C4A] max-w-2xl mx-auto">{t('landing.comparison.subtitle', 'Building a robust form engine takes months.')}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Manual Way */}
                        <div className="p-8 rounded-2xl bg-[#171717] border border-[#716C4A]/5 opacity-80 hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                <h3 className="font-bold text-xl text-[#EFE9DB]">{t('landing.comparison.manual.title', 'Building from Scratch')}</h3>
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
                        <div className="p-8 rounded-2xl bg-gradient-to-br from-[#716C4A]/10 to-transparent border border-[#716C4A]/20 relative overflow-hidden bg-white/50">
                            <div className="absolute top-0 right-0 p-4 opacity-20 text-[#716C4A]">
                                <Zap size={100} />
                            </div>
                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <h3 className="font-bold text-xl text-[#171717]">{t('landing.comparison.sawabona.title', 'Sawabona Forms')}</h3>
                            </div>
                            <ul className="space-y-4 relative z-10">
                                {(t('landing.comparison.sawabona.items', { returnObjects: true }) as string[]).map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-[#716C4A] font-medium">
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
                <section className="py-24 px-6 border-y border-[#716C4A]/10 bg-[#716C4A]/5">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="text-left max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#716C4A]/10 rounded-full border border-[#716C4A]/10 text-[#716C4A] text-xs font-mono mb-6">
                                <Globe size={12} /> OPEN SOURCE
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#171717]">{t('landing.opensource.title', 'Proudly Open Source')}</h2>
                            <h3 className="text-xl text-[#716C4A] mb-4">{t('landing.opensource.subtitle', 'Transparency you can trust.')}</h3>
                            <p className="text-[#716C4A]/80 leading-relaxed mb-8">
                                {t('landing.opensource.desc', 'Join our growing community.')}
                            </p>
                            <a href="https://github.com" className="inline-flex items-center gap-2 px-6 py-3 bg-[#171717] text-[#EFE9DB] font-bold rounded-lg hover:bg-[#716C4A] transition-colors">
                                {t('landing.opensource.action', 'View on GitHub')} <ArrowRight size={16} />
                            </a>
                        </div>

                        {/* Github Graph Visualization */}
                        <div className="w-full max-w-md h-64 bg-[#EFE9DB] rounded-xl border border-[#716C4A]/10 p-6 flex items-end gap-1 relative overflow-hidden shadow-lg">
                            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#716C4A]/20 to-transparent"></div>
                            {Array.from({ length: 40 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="flex-1 bg-[#716C4A]/20 rounded-t-sm hover:bg-[#716C4A] transition-colors duration-500"
                                    style={{ height: `${Math.random() * 100}%` }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Bento Grid Features */}
                {/* Bento Grid Features */}
                <section className="py-32 px-6 max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">

                        {/* Immersive Full Screen - Large Card */}
                        <div className="md:col-span-2 md:row-span-2 rounded-3xl bg-[#EFE9DB] border border-[#716C4A]/10 p-8 relative overflow-hidden group shadow-[0_0_40px_rgba(113,108,74,0.1)] flex flex-col">
                            <div className="absolute inset-0 bg-noise opacity-30"></div>
                            <div className="relative z-10 flex-1">
                                <div className="w-12 h-12 rounded-xl bg-[#716C4A]/10 flex items-center justify-center mb-6">
                                    <Layers className="w-6 h-6 text-[#716C4A]" />
                                </div>
                                <h3 className="text-2xl font-heading mb-4 text-[#171717] leading-tight">{t('landing.features.fullscreen.title')}</h3>
                                <p className="text-[#716C4A] leading-relaxed">{t('landing.features.fullscreen.desc')}</p>
                            </div>

                            {/* Mock UI */}
                            <div className="relative z-10 mt-8 rounded-t-xl border-t border-l border-r border-[#716C4A]/20 bg-white/50 p-6 shadow-sm backdrop-blur-sm -mb-8 translate-y-4 group-hover:translate-y-2 transition-transform duration-500">
                                <div className="flex items-center justify-between mb-8 opacity-50">
                                    <div className="w-24 h-2 rounded-full bg-[#716C4A]/20"></div>
                                    <div className="text-xs font-mono text-[#716C4A]">1 / 5</div>
                                </div>
                                <div className="space-y-3">
                                    <div className="w-3/4 h-6 rounded bg-[#171717]/10"></div>
                                    <div className="w-1/2 h-4 rounded bg-[#716C4A]/20 opacity-60"></div>
                                </div>
                                <div className="mt-8 flex gap-3">
                                    <div className="w-8 h-8 rounded-full border border-[#716C4A]/30"></div>
                                    <div className="flex-1 h-10 rounded border border-[#716C4A]/20 bg-white/60"></div>
                                </div>
                            </div>
                        </div>

                        {/* Lightning Fast - Small Card */}
                        <div className="md:col-span-1 md:row-span-1 rounded-3xl bg-[#171717] border border-[#716C4A]/20 p-8 flex flex-col justify-between group overflow-hidden relative shadow-lg">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#716C4A]/20 to-transparent opacity-20"></div>
                            <Zap className="w-8 h-8 text-[#EFE9DB] relative z-10" />
                            <div className="relative z-10">
                                <h3 className="text-lg font-bold mb-2 text-[#EFE9DB]">{t('landing.features.fast.title')}</h3>
                                <p className="text-sm text-[#EFE9DB]/70 leading-relaxed">{t('landing.features.fast.desc')}</p>
                            </div>
                        </div>

                        {/* Type Safe - Code Card */}
                        <div className="md:col-span-1 md:row-span-1 rounded-3xl bg-white border border-[#716C4A]/10 p-6 flex flex-col justify-between group shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <Terminal size={80} />
                            </div>
                            <div className="relative z-10">
                                <div className="font-mono text-[10px] leading-relaxed text-[#716C4A]/80 bg-[#EFE9DB]/50 p-3 rounded-lg border border-[#716C4A]/10 mb-4">
                                    <span className="text-purple-600">interface</span> <span className="text-yellow-600">Form</span> {'{'} <br />
                                    &nbsp;&nbsp;id: <span className="text-blue-600">string</span>;<br />
                                    &nbsp;&nbsp;theme: <span className="text-yellow-600">Theme</span>;<br />
                                    {'}'}
                                </div>
                                <h3 className="text-lg font-bold mb-1 text-[#171717]">{t('landing.features.types.title')}</h3>
                                <p className="text-xs text-[#716C4A]">{t('landing.features.types.desc')}</p>
                            </div>
                        </div>

                        {/* Keyboard Navigation - Wide Card */}
                        <div className="md:col-span-2 md:row-span-1 rounded-3xl bg-white border border-[#716C4A]/10 p-8 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-[#716C4A]/30 transition-all shadow-sm">
                            <div className="max-w-xs">
                                <h3 className="text-xl font-bold mb-2 text-[#171717]">{t('landing.features.keyboard.title')}</h3>
                                <p className="text-[#716C4A] text-sm leading-relaxed">{t('landing.features.keyboard.desc')}</p>
                            </div>
                            <div className="flex gap-3">
                                {['Enter', 'Tab', 'Esc', '↑ / ↓'].map((key) => (
                                    <div key={key} className="h-10 px-3 min-w-[3rem] flex items-center justify-center rounded-lg bg-[#EFE9DB] border-b-4 border-[#716C4A]/20 text-xs font-bold text-[#716C4A] font-mono shadow-sm group-hover:translate-y-0.5 group-hover:border-b-2 transition-all duration-200">
                                        {key}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-32 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#716C4A] opacity-5 blur-[100px]"></div>
                    <div className="max-w-3xl mx-auto px-6 relative z-10">
                        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#171717]">{t('landing.comparison.cta.title')}</h2>
                        <p className="text-xl text-[#716C4A] mb-10">{t('landing.comparison.cta.subtitle')}</p>
                        <div className="flex justify-center gap-4">
                            <Link to="/docs" className="px-8 py-4 bg-[#716C4A] text-[#EFE9DB] font-bold rounded-lg hover:bg-[#5a563b] transition-all shadow-[0_0_20px_rgba(113,108,74,0.2)]">
                                {t('landing.comparison.cta.docs')}
                            </Link>
                            <Link to="/demo" className="px-8 py-4 bg-[#EFE9DB] border border-[#716C4A]/20 text-[#716C4A] font-bold rounded-lg hover:border-[#716C4A] hover:bg-[#716C4A]/5 transition-all">
                                {t('landing.comparison.cta.demo')}
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-[#716C4A]/10 py-12 bg-[#EFE9DB]">
                    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex flex-col items-start gap-4">
                            <div className="flex items-center gap-2 font-bold text-lg">
                                <img src="/sawabona-logo.svg" alt="Sawabona Tech" className="w-6 h-6 text-[#716C4A]" />
                                <span className="font-heading text-[#716C4A]">Sawabona<span className="text-[#716C4A] font-heading ml-1">Tech</span></span>
                            </div>

                            {/* Powered By Badge */}
                            <a
                                href="#"
                                className="group flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#716C4A]/10 bg-[#716C4A]/5 hover:border-[#716C4A]/30 hover:bg-[#716C4A]/10 transition-all duration-300 cursor-pointer no-underline backdrop-blur-sm"
                            >
                                <span className="text-[10px] font-mono font-medium tracking-[0.2em] uppercase text-[#716C4A]/80 group-hover:text-[#716C4A] transition-colors">
                                    Powered By
                                </span>
                                <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#716C4A] transition-colors">
                                    SAWABONA TECH
                                </span>
                            </a>
                        </div>

                        <div className="flex flex-col md:items-end gap-2">
                            <div className="flex gap-6 text-sm text-[#716C4A]/80">
                                <Link to="/docs" className="hover:text-[#716C4A] transition-colors">{t('nav.docs')}</Link>
                                <a href="https://github.com" className="hover:text-[#716C4A] transition-colors">{t('nav.github')}</a>
                            </div>
                            <p className="text-[#716C4A]/60 text-xs">{t('landing.footer.rights', { year: new Date().getFullYear() })}</p>
                        </div>
                    </div>
                </footer>
            </div>
        </PageTransition>
    );
}
