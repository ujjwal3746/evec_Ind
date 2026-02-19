
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import Layout from './components/Layout';
import AdUnit from './components/AdUnit';
import { Article } from './types';
import { generateArticle, getSuggestedTopics } from './services/geminiService';

// --- Home Component ---
const HomePage: React.FC = () => {
  const [topics, setTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await getSuggestedTopics();
        setTopics(data);
      } catch (err) {
        console.error("Failed to load topics", err);
        setTopics(["EV Battery Breakthroughs", "Autonomous Driving 2024", "Green Hydrogen Pros & Cons"]);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12">
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 h-[400px] flex items-center">
          <img 
            src="https://picsum.photos/seed/evmain/1200/600" 
            className="absolute inset-0 w-full h-full object-cover opacity-50"
            alt="Hero"
          />
          <div className="relative z-10 p-8 md:p-16 max-w-2xl">
            <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block uppercase tracking-wider">
              Featured Insight
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              The Evolution of Electronic Mobility is Here.
            </h1>
            <p className="text-slate-200 text-lg mb-8">
              Discover the latest breakthroughs in sustainable transport technology and infrastructure.
            </p>
            <button className="bg-white text-slate-900 px-6 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors">
              Read Latest Stories
            </button>
          </div>
        </div>
      </section>

      {/* Main Grid with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Trending Now</h2>
            <Link to="/latest" className="text-emerald-600 font-semibold text-sm hover:underline">View All</Link>
          </div>

          <div className="space-y-8">
            {loading ? (
              <div className="animate-pulse space-y-8">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex gap-6 h-48 bg-slate-200 rounded-2xl" />
                ))}
              </div>
            ) : (
              topics.map((topic, idx) => (
                <div key={idx}>
                   <ArticlePreview topic={topic} />
                   {/* Inject Ad after every 2 articles */}
                   {idx % 2 === 1 && <AdUnit slot="article-mid-list" format="fluid" />}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-slate-500 text-sm mb-4">Join 50,000+ readers getting daily EV insights.</p>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="w-full bg-slate-100 border-none rounded-lg px-4 py-3 text-sm mb-3 focus:ring-2 focus:ring-emerald-500"
            />
            <button className="w-full bg-emerald-600 text-white py-3 rounded-lg text-sm font-bold hover:bg-emerald-700 transition-colors">
              Join the Community
            </button>
          </div>

          <AdUnit slot="sidebar-top" className="h-[250px]" />

          <div className="bg-white p-6 rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['Tesla', 'Solid State', 'Infrastructure', 'Solar', 'Battery', 'Efficiency', 'Range'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600 cursor-pointer hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          
          <AdUnit slot="sidebar-sticky" className="sticky top-20 h-[600px]" />
        </aside>
      </div>
    </div>
  );
};

// --- Article Detail Component ---
const ArticlePage: React.FC = () => {
  const { topic } = useParams<{ topic: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!topic) return;
      try {
        const data = await generateArticle(decodeURIComponent(topic));
        setArticle(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [topic]);

  if (loading) return (
    <div className="max-w-3xl mx-auto px-4 py-20 text-center">
      <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-600 border-t-transparent mb-4"></div>
      <p className="text-slate-500 font-medium">Generating intelligent mobility insights...</p>
    </div>
  );

  if (!article) return <div className="p-20 text-center">Error loading article.</div>;

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-8">
        <Link to="/" className="text-emerald-600 text-sm font-bold mb-4 inline-block hover:underline">← Back to home</Link>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">{article.title}</h1>
        <div className="flex items-center space-x-4 text-sm text-slate-500">
          <span>{article.author}</span>
          <span>•</span>
          <span>{article.date}</span>
          <span>•</span>
          <span className="text-emerald-600 font-bold uppercase">{article.category}</span>
        </div>
      </header>

      <AdUnit slot="article-top" format="fluid" />

      <img 
        src={article.imageUrl} 
        alt={article.title}
        className="w-full h-[450px] object-cover rounded-3xl mb-12 shadow-xl"
      />

      <div className="prose prose-lg prose-slate max-w-none">
        {article.content.split('\n').map((para, i) => (
          para.trim() ? <p key={i} className="mb-6 leading-relaxed text-slate-700 text-lg">{para.trim()}</p> : null
        ))}
      </div>

      <AdUnit slot="article-bottom" format="rectangle" className="mt-12" />
      
      <div className="mt-12 pt-12 border-t border-slate-200">
        <h3 className="text-2xl font-bold mb-8">Continue Reading</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <ArticlePreview topic="The Impact of EV Adoption on Power Grids" mini />
           <ArticlePreview topic="Best EV Chargers for Home Use 2025" mini />
        </div>
      </div>
    </article>
  );
};

// --- Helper Components ---

const ArticlePreview: React.FC<{ topic: string; mini?: boolean }> = ({ topic, mini }) => {
  const [data, setData] = useState<Partial<Article>>({ title: topic });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For previews, we just use the topic as title and a placeholder image
    const timer = setTimeout(() => {
      setData({
        title: topic,
        summary: `Essential guide and latest updates regarding ${topic} in the current automotive landscape.`,
        date: 'Today',
        imageUrl: `https://picsum.photos/seed/${topic}/400/300`
      });
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [topic]);

  if (mini) {
    return (
      <Link to={`/article/${encodeURIComponent(topic)}`} className="group flex flex-col space-y-3">
        <div className="aspect-video overflow-hidden rounded-xl bg-slate-100">
          <img src={data.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={topic} />
        </div>
        <h4 className="font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">{topic}</h4>
      </Link>
    );
  }

  return (
    <Link to={`/article/${encodeURIComponent(topic)}`} className="group flex flex-col md:flex-row gap-6 p-4 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300">
      <div className="w-full md:w-64 h-48 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
        <img 
          src={data.imageUrl} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          alt={topic}
        />
      </div>
      <div className="flex flex-col justify-center">
        <span className="text-emerald-600 text-xs font-bold uppercase mb-2">Automotive</span>
        <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-600 transition-colors">{topic}</h3>
        <p className="text-slate-500 text-sm line-clamp-2 mb-4">
          {data.summary}
        </p>
        <div className="mt-auto flex items-center text-xs text-slate-400 font-medium">
          <span>Read More</span>
          <span className="mx-2">•</span>
          <span>5 min read</span>
        </div>
      </div>
    </Link>
  );
};

// --- Main App ---

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:topic" element={<ArticlePage />} />
          <Route path="*" element={<div className="p-20 text-center">Page not found</div>} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
