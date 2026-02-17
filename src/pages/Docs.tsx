import { useState, useEffect } from 'react';
import { Link, Route, Routes, useParams, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import { Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import 'highlight.js/styles/github-dark.css';

// Glob all markdown files from all subdirectories
const DOCS_modules = import.meta.glob('../docs/**/*.md', { query: '?raw', import: 'default' });

function DocViewer() {
    const { slug } = useParams();
    const [content, setContent] = useState('');
    const { i18n } = useTranslation();

    useEffect(() => {
        const loadDoc = async () => {
            // Get current language (handle 'pt-BR' -> 'pt')
            const lang = (i18n.language || 'en').split('-')[0];

            // Default to introduction if no slug
            const fileName = slug || 'introduction';

            // Construct path: ../docs/{lang}/{fileName}.md
            // Note: Glob keys are relative to this file
            const path = `../docs/${lang}/${fileName}.md`;

            // Fallback to English if not found
            const fallbackPath = `../docs/en/${fileName}.md`;

            if (DOCS_modules[path]) {
                const markdown = await DOCS_modules[path]() as string;
                setContent(markdown);
            } else if (DOCS_modules[fallbackPath]) {
                const markdown = await DOCS_modules[fallbackPath]() as string;
                setContent(markdown);
            } else {
                setContent('# 404 - Document not found\n\nThe requested documentation page could not be found.');
            }
        };
        loadDoc();
    }, [slug, i18n.language]);

    return (
        <article className="prose prose-invert prose-zinc max-w-none 
            prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight
            prose-a:text-[#D90429] prose-a:no-underline hover:prose-a:text-[#ef233c]
            prose-strong:text-white
            prose-code:text-[#D90429] prose-code:bg-white/5 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-[#0f0f10] prose-pre:border prose-pre:border-white/10
        ">
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{content}</ReactMarkdown>
        </article>
    );
}

export default function Docs() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const { t, i18n } = useTranslation();

    // Close sidebar on route change (mobile)
    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location]);

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans flex">

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full h-16 bg-[#050505]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 z-50">
                <Link to="/" className="flex items-center gap-2 font-bold text-lg text-white">
                    <div className="w-6 h-6 rounded bg-[#D90429] flex items-center justify-center text-[10px] font-mono">SF</div>
                    <span>SAWABONA</span>
                </Link>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-white">
                    {isSidebarOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-[#050505] border-r border-white/5 transform transition-transform duration-300 ease-in-out
                md:translate-x-0 md:static md:h-screen md:sticky md:top-0
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 h-full flex flex-col">
                    <Link to="/" className="flex items-center gap-2 font-bold text-xl text-white mb-8 hidden md:flex">
                        <div className="w-8 h-8 rounded bg-gradient-to-br from-[#D90429] to-[#8d021f] flex items-center justify-center text-xs font-mono">SF</div>
                    </Link>

                    <nav className="space-y-1 flex-1">
                        <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2 px-2">Getting Started</p>
                        <Link to="/docs" className={`block px-2 py-1.5 rounded-md text-sm hover:text-white hover:bg-white/5 transition-colors ${location.pathname === '/docs' || location.pathname === '/docs/introduction' ? 'text-[#D90429] bg-[#D90429]/10' : ''}`}>
                            {t('sidebar.intro', 'Introduction')}
                        </Link>
                        <Link to="/docs/getting-started" className={`block px-2 py-1.5 rounded-md text-sm hover:text-white hover:bg-white/5 transition-colors ${location.pathname === '/docs/getting-started' ? 'text-[#D90429] bg-[#D90429]/10' : ''}`}>
                            {t('sidebar.getting_started', 'Getting Started')}
                        </Link>
                    </nav>

                    {/* Footer / User / Env */}
                    <div className="mt-auto pt-6 border-t border-white/5">
                        <div className="flex items-center justify-between gap-4 text-xs font-mono text-zinc-600 mb-4">
                            <span>v0.1.0</span>
                            <div className="flex gap-2 items-center">
                                <Globe size={12} className="text-zinc-600" />
                                <button onClick={() => changeLanguage('en')} className={`hover:text-white transition-colors ${i18n.language === 'en' ? 'text-[#D90429] font-bold' : ''}`}>EN</button>
                                <span className="text-zinc-700">|</span>
                                <button onClick={() => changeLanguage('pt')} className={`hover:text-white transition-colors ${i18n.language === 'pt' ? 'text-[#D90429] font-bold' : ''}`}>PT</button>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-4xl mx-auto p-6 pt-24 md:pt-12 md:px-12">
                <Routes>
                    <Route path="/" element={<DocViewer />} />
                    <Route path=":slug" element={<DocViewer />} />
                </Routes>
            </main>
        </div>
    );
}
