import { useState, useEffect } from 'react';
import { Link, Route, Routes, useParams, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import { Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import 'highlight.js/styles/github-dark.css'; // Keep dark syntax highlighting or switch to a lighter one if preferred
import { PageTransition } from '../components/PageTransition';
import { Playground } from '../components/Playground';
import llmTxt from '../docs/llm.txt?raw';
import llmMd from '../docs/llm.md?raw';

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
        <article className="prose prose-zinc max-w-none 
            prose-headings:text-[#171717] prose-headings:font-bold prose-headings:tracking-tight
            prose-p:text-[#171717]/80
            prose-a:text-[#716C4A] prose-a:no-underline hover:prose-a:text-[#5a563b]
            prose-strong:text-[#171717]
            prose-code:text-[#716C4A] prose-code:bg-[#716C4A]/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-[#171717] prose-pre:border prose-pre:border-[#716C4A]/10
            prose-li:text-[#171717]/80
            
            /* Table Styles */
            prose-table:w-full prose-table:text-left prose-table:border-collapse prose-table:my-8
            prose-thead:bg-[#716C4A]/10 prose-thead:text-[#171717]
            prose-th:p-4 prose-th:font-bold prose-th:text-sm prose-th:uppercase prose-th:tracking-wider prose-th:border-b prose-th:border-[#716C4A]/20
            prose-td:p-4 prose-td:text-sm prose-td:border-b prose-td:border-[#716C4A]/10 prose-td:align-top
            prose-tr:hover:bg-[#716C4A]/5 transition-colors
        ">
            {content.includes('<!-- DOWNLOAD_BUTTONS -->') ? (
                <>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                    >
                        {content.split('<!-- DOWNLOAD_BUTTONS -->')[0]}
                    </ReactMarkdown>
                    <div className="flex flex-col sm:flex-row gap-4 my-8 not-prose">
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('download-llm', { detail: 'md' }))}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#716C4A] text-[#EFE9DB] rounded-lg font-medium hover:bg-[#5a563b] transition-colors shadow-sm"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            sawabona-forms.md
                        </button>
                        <button
                            onClick={() => window.dispatchEvent(new CustomEvent('download-llm', { detail: 'txt' }))}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#EFE9DB] text-[#716C4A] border-2 border-[#716C4A] rounded-lg font-medium hover:bg-[#716C4A]/10 transition-colors shadow-sm"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            sawabona-forms.txt
                        </button>
                    </div>
                </>
            ) : (
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                >
                    {content}
                </ReactMarkdown>
            )}
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

    useEffect(() => {
        const handleDownload = (e: Event) => {
            const type = (e as CustomEvent).detail;
            if (type === 'md') {
                downloadFile(llmMd, 'sawabona-forms.md');
            } else if (type === 'txt') {
                downloadFile(llmTxt, 'sawabona-forms.txt');
            }
        };

        window.addEventListener('download-llm', handleDownload);
        return () => window.removeEventListener('download-llm', handleDownload);
    }, []);

    const downloadFile = (content: string, filename: string) => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <PageTransition>
            <div className="min-h-screen bg-[#EFE9DB] text-[#171717] font-sans flex relative">
                <div className="bg-noise"></div>

                {/* Mobile Header */}
                <div className="md:hidden fixed top-0 w-full h-16 bg-[#EFE9DB]/80 backdrop-blur-md border-b border-[#716C4A]/10 flex items-center justify-between px-6 z-50">
                    <Link to="/" className="flex items-center gap-2 font-bold text-lg text-[#171717]">
                        <img src="/sawabona-logo.svg" alt="Sawabona Tech" className="w-6 h-6 text-[#716C4A]" />
                        <span>SAWABONA</span>
                    </Link>
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-[#171717]">
                        {isSidebarOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Sidebar */}
                <aside className={`
                    fixed inset-y-0 left-0 z-40 w-64 bg-[#EFE9DB] border-r border-[#716C4A]/10 transform transition-transform duration-300 ease-in-out
                    md:translate-x-0 md:static md:h-screen md:sticky md:top-0
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    <div className="p-6 h-full flex flex-col relative z-20">
                        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-[#171717] mb-8 hidden md:flex">
                            <img src="/sawabona-logo.svg" alt="Sawabona Tech" className="w-8 h-8 text-[#716C4A]" />
                        </Link>

                        <nav className="space-y-1 flex-1 overflow-y-auto">
                            <p className="text-xs font-bold text-[#716C4A] uppercase tracking-wider mb-2 px-2">Getting Started</p>
                            <Link to="/docs" className={`block px-2 py-1.5 rounded-md text-sm hover:text-[#171717] hover:bg-[#716C4A]/5 transition-colors ${location.pathname === '/docs' || location.pathname === '/docs/introduction' ? 'text-[#716C4A] bg-[#716C4A]/10 font-medium' : 'text-[#716C4A]/80'}`}>
                                {t('sidebar.intro', 'Introduction')}
                            </Link>
                            <Link to="/docs/getting-started" className={`block px-2 py-1.5 rounded-md text-sm hover:text-[#171717] hover:bg-[#716C4A]/5 transition-colors ${location.pathname === '/docs/getting-started' ? 'text-[#716C4A] bg-[#716C4A]/10 font-medium' : 'text-[#716C4A]/80'}`}>
                                {t('sidebar.getting_started', 'Getting Started')}
                            </Link>

                            <p className="text-xs font-bold text-[#716C4A] uppercase tracking-wider mt-6 mb-2 px-2">Developers</p>
                            <Link to="/docs/api-reference" className={`block px-2 py-1.5 rounded-md text-sm hover:text-[#171717] hover:bg-[#716C4A]/5 transition-colors ${location.pathname === '/docs/api-reference' ? 'text-[#716C4A] bg-[#716C4A]/10 font-medium' : 'text-[#716C4A]/80'}`}>
                                {t('sidebar.api_reference', 'API Reference')}
                            </Link>
                            <Link to="/docs/playground" className={`block px-2 py-1.5 rounded-md text-sm hover:text-[#171717] hover:bg-[#716C4A]/5 transition-colors ${location.pathname === '/docs/playground' ? 'text-[#716C4A] bg-[#716C4A]/10 font-medium' : 'text-[#716C4A]/80'}`}>
                                {t('sidebar.playground', 'Playground')}
                            </Link>

                            <p className="text-xs font-bold text-[#716C4A] uppercase tracking-wider mt-6 mb-2 px-2">AIs / LLMs</p>
                            <Link to="/docs/llms" className={`block px-2 py-1.5 rounded-md text-sm hover:text-[#171717] hover:bg-[#716C4A]/5 transition-colors ${location.pathname === '/docs/llms' ? 'text-[#716C4A] bg-[#716C4A]/10 font-medium' : 'text-[#716C4A]/80'}`}>
                                {t('sidebar.llms_guide', 'LLMs Guide')}
                            </Link>
                        </nav>

                        {/* Footer / User / Env */}
                        <div className="mt-auto pt-6 border-t border-[#716C4A]/10">
                            <div className="flex items-center justify-between gap-4 text-xs font-mono text-[#716C4A]/80 mb-4">
                                <span>v1.0.8</span>
                                <div className="flex gap-2 items-center">
                                    <Globe size={12} className="text-[#716C4A]" />
                                    <button onClick={() => changeLanguage('en')} className={`hover:text-[#171717] transition-colors ${i18n.language === 'en' ? 'text-[#716C4A] font-bold' : ''}`}>EN</button>
                                    <span className="text-[#716C4A]/40">|</span>
                                    <button onClick={() => changeLanguage('pt')} className={`hover:text-[#171717] transition-colors ${i18n.language === 'pt' ? 'text-[#716C4A] font-bold' : ''}`}>PT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className={`flex-1 w-full mx-auto p-6 pt-24 md:pt-12 md:px-12 relative z-10 h-full overflow-y-auto ${location.pathname.includes('/playground') ? 'max-w-[1600px]' : 'max-w-4xl'}`}>
                    <Routes>
                        <Route path="/" element={<DocViewer />} />
                        <Route path="playground" element={<Playground />} />
                        <Route path=":slug" element={<DocViewer />} />
                    </Routes>
                </main>
            </div>
        </PageTransition>
    );
}
