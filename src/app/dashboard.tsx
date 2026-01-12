import React, { useState } from 'react';
import { 
  Plus, Trophy, User, Flag, Edit2, Trash2, Save, X, Users, 
  LogOut, Newspaper, TrendingUp, Award, Calendar, ChevronRight,
  Zap, Target, Clock, Eye, Heart, BarChart3, Activity
} from 'lucide-react';
import { useDriver, useTeamChampionship, useDriverChampionship } from '@/hooks/useOpenF1';

// Types
interface Driver {
  id: number;
  name: string;
  team: string;
  nationality: string;
  points: number;
  wins: number;
  podiums: number;
  poles: number;
  fastestLaps: number;
}

interface Constructor {
  id: number;
  name: string;
  nationality: string;
  points: number;
  wins: number;
  podiums: number;
}

interface NewsItem {
  id: number;
  title: string;
  summary: string;
  category: 'race' | 'transfer' | 'technical' | 'interview';
  date: string;
  featured: boolean;
}

// Initial Data
const initialDrivers: Driver[] = [
  { id: 1, name: 'Max Verstappen', team: 'Red Bull Racing', nationality: 'NED', points: 575, wins: 19, podiums: 21, poles: 9, fastestLaps: 8 },
  { id: 2, name: 'Lando Norris', team: 'McLaren', nationality: 'GBR', points: 374, wins: 4, podiums: 14, poles: 5, fastestLaps: 6 },
  { id: 3, name: 'Charles Leclerc', team: 'Ferrari', nationality: 'MON', points: 356, wins: 3, podiums: 11, poles: 6, fastestLaps: 3 },
  { id: 4, name: 'Oscar Piastri', team: 'McLaren', nationality: 'AUS', points: 292, wins: 2, podiums: 9, poles: 1, fastestLaps: 2 },
  { id: 5, name: 'Carlos Sainz', team: 'Williams', nationality: 'ESP', points: 290, wins: 2, podiums: 9, poles: 3, fastestLaps: 4 },
  { id: 6, name: 'Lewis Hamilton', team: 'Ferrari', nationality: 'GBR', points: 245, wins: 2, podiums: 6, poles: 1, fastestLaps: 2 },
  { id: 7, name: 'George Russell', team: 'Mercedes', nationality: 'GBR', points: 231, wins: 1, podiums: 5, poles: 2, fastestLaps: 1 },
  { id: 8, name: 'Kimi Antonelli', team: 'Mercedes', nationality: 'ITA', points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0 },
];

const initialConstructors: Constructor[] = [
  { id: 1, name: 'McLaren', nationality: 'GBR', points: 666, wins: 6, podiums: 23 },
  { id: 2, name: 'Ferrari', nationality: 'ITA', points: 652, wins: 5, podiums: 20 },
  { id: 3, name: 'Red Bull Racing', nationality: 'AUT', points: 597, wins: 9, podiums: 17 },
  { id: 4, name: 'Mercedes', nationality: 'GER', points: 468, wins: 3, podiums: 11 },
  { id: 5, name: 'Aston Martin', nationality: 'GBR', points: 94, wins: 0, podiums: 1 },
];

const initialNews: NewsItem[] = [
  { id: 1, title: 'Verstappen Juara Dunia 4 Kali Berturut-turut!', summary: 'Max Verstappen mengunci gelar juara dunia keempatnya di GP Las Vegas 2024.', category: 'race', date: '2024-11-23', featured: true },
  { id: 2, title: 'Hamilton Resmi Pindah ke Ferrari', summary: 'Lewis Hamilton akan bergabung dengan Ferrari mulai musim 2025.', category: 'transfer', date: '2024-02-01', featured: true },
  { id: 3, title: 'McLaren Dominasi Konstruktor 2024', summary: 'McLaren berhasil mengamankan gelar konstruktor pertama sejak 1998.', category: 'race', date: '2024-12-08', featured: false },
  { id: 4, title: 'Regulasi Mesin Baru 2026', summary: 'FIA mengumumkan detail regulasi power unit baru untuk era 2026.', category: 'technical', date: '2024-06-15', featured: false },
];

const F1AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'drivers' | 'constructors' | 'news'>('overview');
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);
  const [constructors, setConstructors] = useState<Constructor[]>(initialConstructors);
  const [news, setNews] = useState<NewsItem[]>(initialNews);
  
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [newDriver, setNewDriver] = useState<Omit<Driver, 'id'>>({
    name: '', team: '', nationality: '', points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0
  });
  
  const [newConstructor, setNewConstructor] = useState<Omit<Constructor, 'id'>>({
    name: '', nationality: '', points: 0, wins: 0, podiums: 0
  });
  
  const [newNews, setNewNews] = useState<Omit<NewsItem, 'id'>>({
    title: '', summary: '', category: 'race', date: new Date().toISOString().split('T')[0], featured: false
  });

  // Sort data
  const sortedDrivers = [...drivers].sort((a, b) => b.points - a.points);
  const sortedConstructors = [...constructors].sort((a, b) => b.points - a.points);
  const sortedNews = [...news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Stats calculations
  const totalRaces = 24;
  const totalWins = drivers.reduce((sum, d) => sum + d.wins, 0);
  const totalPodiums = drivers.reduce((sum, d) => sum + d.podiums, 0);

  // CRUD Operations
  const startEdit = (item: any) => {
    setEditingId(item.id);
    setEditForm({ ...item });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = (type: 'driver' | 'constructor' | 'news') => {
    if (type === 'driver') {
      setDrivers(drivers.map(d => d.id === editingId ? editForm : d));
    } else if (type === 'constructor') {
      setConstructors(constructors.map(c => c.id === editingId ? editForm : c));
    } else {
      setNews(news.map(n => n.id === editingId ? editForm : n));
    }
    cancelEdit();
  };

  const deleteItem = (type: 'driver' | 'constructor' | 'news', id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
      if (type === 'driver') setDrivers(drivers.filter(d => d.id !== id));
      else if (type === 'constructor') setConstructors(constructors.filter(c => c.id !== id));
      else setNews(news.filter(n => n.id !== id));
    }
  };

  const addDriver = () => {
    if (!newDriver.name || !newDriver.team) {
      alert('Nama dan tim harus diisi!');
      return;
    }
    setDrivers([...drivers, { id: Math.max(...drivers.map(d => d.id), 0) + 1, ...newDriver }]);
    setNewDriver({ name: '', team: '', nationality: '', points: 0, wins: 0, podiums: 0, poles: 0, fastestLaps: 0 });
    setShowAddForm(false);
  };

  const addConstructor = () => {
    if (!newConstructor.name) {
      alert('Nama tim harus diisi!');
      return;
    }
    setConstructors([...constructors, { id: Math.max(...constructors.map(c => c.id), 0) + 1, ...newConstructor }]);
    setNewConstructor({ name: '', nationality: '', points: 0, wins: 0, podiums: 0 });
    setShowAddForm(false);
  };

  const addNews = () => {
    if (!newNews.title || !newNews.summary) {
      alert('Judul dan ringkasan harus diisi!');
      return;
    }
    setNews([...news, { id: Math.max(...news.map(n => n.id), 0) + 1, ...newNews }]);
    setNewNews({ title: '', summary: '', category: 'race', date: new Date().toISOString().split('T')[0], featured: false });
    setShowAddForm(false);
  };

  const getCategoryBadge = (category: string) => {
    const styles: Record<string, string> = {
      race: 'bg-red-500/20 text-red-400 border-red-500/30',
      transfer: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      technical: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      interview: 'bg-green-500/20 text-green-400 border-green-500/30',
    };
    return styles[category] || styles.race;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-600/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-40 right-1/3 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <header className="mb-8">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/30">
                      <Flag className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a0a0a] animate-pulse" />
                  </div>
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                      F1 Admin Dashboard
                    </h1>
                    <p className="text-gray-400 text-sm">Kelola Klasemen & Berita Formula 1</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="group flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 px-5 py-2.5 rounded-xl font-medium hover:shadow-lg hover:shadow-red-600/30 transition-all duration-300 hover:scale-105"
                  >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                    <span className="hidden sm:inline">Tambah Baru</span>
                  </button>
                  <button
                    onClick={() => window.location.href = '/admin/login'}
                    className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl hover:bg-white/10 transition-all duration-300"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Navigation Tabs */}
          <nav className="mb-6">
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-2 shadow-xl">
              <div className="flex gap-2 overflow-x-auto">
                {[
                  { id: 'overview', label: 'Overview', icon: TrendingUp },
                  { id: 'drivers', label: 'Pembalap', icon: User },
                  { id: 'constructors', label: 'Konstruktor', icon: Users },
                  { id: 'news', label: 'Latest News', icon: Newspaper },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id as any);
                      setShowAddForm(false);
                      cancelEdit();
                    }}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/20'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          <LiveAPIInsights />

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Balapan', value: totalRaces, icon: Calendar, color: 'from-blue-600 to-blue-700' },
                  { label: 'Total Kemenangan', value: totalWins, icon: Trophy, color: 'from-yellow-600 to-orange-600' },
                  { label: 'Total Podium', value: totalPodiums, icon: Award, color: 'from-purple-600 to-pink-600' },
                  { label: 'Berita Aktif', value: news.length, icon: Newspaper, color: 'from-green-600 to-emerald-600' },
                ].map((stat, i) => (
                  <div key={i} className="group backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-xl">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Drivers */}
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-red-500" />
                    Top 5 Pembalap
                  </h3>
                  <div className="space-y-3">
                    {sortedDrivers.slice(0, 5).map((driver, i) => (
                      <div key={driver.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          i === 0 ? 'bg-yellow-500 text-black' : i === 1 ? 'bg-gray-400 text-black' : i === 2 ? 'bg-orange-600' : 'bg-gray-700'
                        }`}>
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold group-hover:text-red-400 transition-colors">{driver.name}</p>
                          <p className="text-sm text-gray-500">{driver.team}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-red-500">{driver.points} pts</p>
                          <p className="text-xs text-gray-500">{driver.wins} wins</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Featured News */}
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Newspaper className="w-5 h-5 text-red-500" />
                    Berita Terbaru
                  </h3>
                  <div className="space-y-3">
                    {sortedNews.slice(0, 4).map((item) => (
                      <div key={item.id} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all group cursor-pointer">
                        <div className="flex items-start gap-3">
                          <div className={`px-2 py-1 rounded-lg text-xs font-medium border ${getCategoryBadge(item.category)}`}>
                            {item.category}
                          </div>
                          {item.featured && <Zap className="w-4 h-4 text-yellow-500" />}
                        </div>
                        <p className="font-medium mt-2 group-hover:text-red-400 transition-colors line-clamp-1">{item.title}</p>
                        <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Drivers Tab */}
          {activeTab === 'drivers' && (
            <div className="animate-fadeIn">
              {/* Add Form */}
              {showAddForm && (
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 animate-slideDown">
                  <h3 className="text-xl font-bold mb-4">Tambah Pembalap Baru</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <input type="text" placeholder="Nama Pembalap" value={newDriver.name} onChange={(e) => setNewDriver({ ...newDriver, name: e.target.value })} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none text-white placeholder-gray-400" />
                    <input type="text" placeholder="Tim" value={newDriver.team} onChange={(e) => setNewDriver({ ...newDriver, team: e.target.value })} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none text-white placeholder-gray-400" />
                    <input type="text" placeholder="Kebangsaan (3 huruf)" value={newDriver.nationality} onChange={(e) => setNewDriver({ ...newDriver, nationality: e.target.value.toUpperCase().slice(0, 3) })} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none text-white placeholder-gray-400" />
                    <input type="number" placeholder="Poin" value={newDriver.points} onChange={(e) => setNewDriver({ ...newDriver, points: Number(e.target.value) })} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none text-white placeholder-gray-400" />
                    <input type="number" placeholder="Kemenangan" value={newDriver.wins} onChange={(e) => setNewDriver({ ...newDriver, wins: Number(e.target.value) })} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none text-white placeholder-gray-400" />
                    <input type="number" placeholder="Podium" value={newDriver.podiums} onChange={(e) => setNewDriver({ ...newDriver, podiums: Number(e.target.value) })} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none text-white placeholder-gray-400" />
                    <input type="number" placeholder="Pole Position" value={newDriver.poles} onChange={(e) => setNewDriver({ ...newDriver, poles: Number(e.target.value) })} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none text-white placeholder-gray-400" />
                    <input type="number" placeholder="Fastest Lap" value={newDriver.fastestLaps} onChange={(e) => setNewDriver({ ...newDriver, fastestLaps: Number(e.target.value) })} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all outline-none text-white placeholder-gray-400" />
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={addDriver} className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-2.5 rounded-xl hover:shadow-lg transition-all">
                      <Save className="w-4 h-4" /> Simpan
                    </button>
                    <button onClick={() => setShowAddForm(false)} className="flex items-center gap-2 bg-white/10 px-6 py-2.5 rounded-xl hover:bg-white/20 transition-all">
                      <X className="w-4 h-4" /> Batal
                    </button>
                  </div>
                </div>
              )}

              {/* Drivers Table */}
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-red-600/20 to-red-700/20 border-b border-white/10">
                      <tr>
                        {['Pos', 'Pembalap', 'Tim', 'Poin', 'Wins', 'Podium', 'Pole', 'FL', 'Aksi'].map((h) => (
                          <th key={h} className="px-4 py-4 text-left text-sm font-semibold text-gray-300">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {sortedDrivers.map((driver, index) => (
                        <tr key={driver.id} className="hover:bg-white/5 transition-colors group">
                          <td className="px-4 py-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                              index === 0 ? 'bg-yellow-500 text-black' : index === 1 ? 'bg-gray-400 text-black' : index === 2 ? 'bg-orange-600' : 'bg-gray-700'
                            }`}>
                              {index + 1}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            {editingId === driver.id ? (
                              <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg w-full text-white" />
                            ) : (
                              <div>
                                <p className="font-semibold group-hover:text-red-400 transition-colors">{driver.name}</p>
                                <p className="text-xs text-gray-500">{driver.nationality}</p>
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            {editingId === driver.id ? (
                              <input type="text" value={editForm.team} onChange={(e) => setEditForm({ ...editForm, team: e.target.value })} className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg w-full text-white" />
                            ) : (
                              <span className="text-gray-400">{driver.team}</span>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            {editingId === driver.id ? (
                              <input type="number" value={editForm.points} onChange={(e) => setEditForm({ ...editForm, points: Number(e.target.value) })} className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg w-20 text-white" />
                            ) : (
                              <span className="font-bold text-red-500">{driver.points}</span>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            {editingId === driver.id ? (
                              <input type="number" value={editForm.wins} onChange={(e) => setEditForm({ ...editForm, wins: Number(e.target.value) })} className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg w-16 text-white" />
                            ) : (
                              <span className="flex items-center gap-1"><Trophy className="w-4 h-4 text-yellow-500" />{driver.wins}</span>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            {editingId === driver.id ? (
                              <input type="number" value={editForm.podiums} onChange={(e) => setEditForm({ ...editForm, podiums: Number(e.target.value) })} className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg w-16 text-white" />
                            ) : (
                              <span className="flex items-center gap-1"><Award className="w-4 h-4 text-orange-500" />{driver.podiums}</span>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            {editingId === driver.id ? (
                              <input type="number" value={editForm.poles} onChange={(e) => setEditForm({ ...editForm, poles: Number(e.target.value) })} className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg w-16 text-white" />
                            ) : (
                              <span className="flex items-center gap-1"><Target className="w-4 h-4 text-purple-500" />{driver.poles}</span>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            {editingId === driver.id ? (
                              <input type="number" value={editForm.fastestLaps} onChange={(e) => setEditForm({ ...editForm, fastestLaps: Number(e.target.value) })} className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg w-16 text-white" />
                            ) : (
                              <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-fuchsia-500" />{driver.fastestLaps}</span>
                            )}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-2">
                              {editingId === driver.id ? (
                                <>
                                  <button onClick={() => saveEdit('driver')} className="p-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-all"><Save className="w-4 h-4" /></button>
                                  <button onClick={cancelEdit} className="p-2 bg-gray-600/20 text-gray-400 rounded-lg hover:bg-gray-600/30 transition-all"><X className="w-4 h-4" /></button>
                                </>
                              ) : (
                                <>
                                  <button onClick={() => startEdit(driver)} className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-all"><Edit2 className="w-4 h-4" /></button>
                                  <button onClick={() => deleteItem('driver', driver.id)} className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-all"><Trash2 className="w-4 h-4" /></button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Constructors Tab */}
          {activeTab === 'constructors' && (
            <div className="animate-fadeIn">
              {showAddForm && (
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 animate-slideDown">
                  <h3 className="text-xl font-bold mb-4">Tambah Konstruktor Baru</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <input type="text" placeholder="Nama Tim" value={newConstructor.name} onChange={(e) => setNewConstructor({ ...newConstructor, name: e.target.value })} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:border-red-500 transition-all outline-none text-white placeholder-gray-400" />
                    <input type="text" placeholder="Kebangsaan" value={newConstructor.nationality} onChange={(e) => setNewConstructor({ ...newConstructor, nationality: e.target.value.toUpperCase().slice(0, 3) })} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:border-red-500 transition-all outline-none text-white placeholder-gray-400" />
                    <input type="number" placeholder="Poin" value={newConstructor.points} onChange={(e) => setNewConstructor({ ...newConstructor, points: Number(e.target.value) })} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:border-red-500 transition-all outline-none text-white placeholder-gray-400" />
                    <input type="number" placeholder="Kemenangan" value={newConstructor.wins} onChange={(e) => setNewConstructor({ ...newConstructor, wins: Number(e.target.value) })} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:border-red-500 transition-all outline-none text-white placeholder-gray-400" />
                    <input type="number" placeholder="Podium" value={newConstructor.podiums} onChange={(e) => setNewConstructor({ ...newConstructor, podiums: Number(e.target.value) })} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:border-red-500 transition-all outline-none text-white placeholder-gray-400" />
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={addConstructor} className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-2.5 rounded-xl hover:shadow-lg transition-all"><Save className="w-4 h-4" /> Simpan</button>
                    <button onClick={() => setShowAddForm(false)} className="flex items-center gap-2 bg-white/10 px-6 py-2.5 rounded-xl hover:bg-white/20 transition-all"><X className="w-4 h-4" /> Batal</button>
                  </div>
                </div>
              )}

              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-red-600/20 to-red-700/20 border-b border-white/10">
                      <tr>
                        {['Pos', 'Tim', 'Kebangsaan', 'Poin', 'Kemenangan', 'Podium', 'Aksi'].map((h) => (
                          <th key={h} className="px-6 py-4 text-left text-sm font-semibold text-gray-300">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {sortedConstructors.map((c, index) => (
                        <tr key={c.id} className="hover:bg-white/5 transition-colors group">
                          <td className="px-6 py-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                              index === 0 ? 'bg-yellow-500 text-black' : index === 1 ? 'bg-gray-400 text-black' : index === 2 ? 'bg-orange-600' : 'bg-gray-700'
                            }`}>{index + 1}</div>
                          </td>
                          <td className="px-6 py-4">
                            {editingId === c.id ? (
                              <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-white" />
                            ) : (
                              <span className="font-semibold group-hover:text-red-400 transition-colors">{c.name}</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-gray-400">{editingId === c.id ? <input type="text" value={editForm.nationality} onChange={(e) => setEditForm({ ...editForm, nationality: e.target.value })} className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg w-20 text-white" /> : c.nationality}</td>
                          <td className="px-6 py-4">{editingId === c.id ? <input type="number" value={editForm.points} onChange={(e) => setEditForm({ ...editForm, points: Number(e.target.value) })} className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg w-20 text-white" /> : <span className="font-bold text-red-500">{c.points}</span>}</td>
                          <td className="px-6 py-4">{editingId === c.id ? <input type="number" value={editForm.wins} onChange={(e) => setEditForm({ ...editForm, wins: Number(e.target.value) })} className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg w-16 text-white" /> : <span className="flex items-center gap-1"><Trophy className="w-4 h-4 text-yellow-500" />{c.wins}</span>}</td>
                          <td className="px-6 py-4">{editingId === c.id ? <input type="number" value={editForm.podiums} onChange={(e) => setEditForm({ ...editForm, podiums: Number(e.target.value) })} className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg w-16 text-white" /> : <span className="flex items-center gap-1"><Award className="w-4 h-4 text-orange-500" />{c.podiums}</span>}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {editingId === c.id ? (
                                <>
                                  <button onClick={() => saveEdit('constructor')} className="p-2 bg-green-600/20 text-green-400 rounded-lg hover:bg-green-600/30 transition-all"><Save className="w-4 h-4" /></button>
                                  <button onClick={cancelEdit} className="p-2 bg-gray-600/20 text-gray-400 rounded-lg hover:bg-gray-600/30 transition-all"><X className="w-4 h-4" /></button>
                                </>
                              ) : (
                                <>
                                  <button onClick={() => startEdit(c)} className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-all"><Edit2 className="w-4 h-4" /></button>
                                  <button onClick={() => deleteItem('constructor', c.id)} className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-all"><Trash2 className="w-4 h-4" /></button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* News Tab */}
          {activeTab === 'news' && (
            <div className="animate-fadeIn">
              {showAddForm && (
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 mb-6 animate-slideDown">
                  <h3 className="text-xl font-bold mb-4">Tambah Berita Baru</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Judul Berita" value={newNews.title} onChange={(e) => setNewNews({ ...newNews, title: e.target.value })} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:border-red-500 transition-all outline-none text-white placeholder-gray-400" />
                    <select value={newNews.category} onChange={(e) => setNewNews({ ...newNews, category: e.target.value as any })} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:border-red-500 transition-all outline-none text-white">
                      <option value="race" className="bg-gray-900">Race</option>
                      <option value="transfer" className="bg-gray-900">Transfer</option>
                      <option value="technical" className="bg-gray-900">Technical</option>
                      <option value="interview" className="bg-gray-900">Interview</option>
                    </select>
                    <textarea placeholder="Ringkasan Berita" value={newNews.summary} onChange={(e) => setNewNews({ ...newNews, summary: e.target.value })} rows={3} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:border-red-500 transition-all outline-none md:col-span-2 text-white placeholder-gray-400" />
                    <input type="date" value={newNews.date} onChange={(e) => setNewNews({ ...newNews, date: e.target.value })} className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:border-red-500 transition-all outline-none text-white" />
                    <label className="flex items-center gap-3 px-4 py-3">
                      <input type="checkbox" checked={newNews.featured} onChange={(e) => setNewNews({ ...newNews, featured: e.target.checked })} className="w-5 h-5 rounded accent-red-500" />
                      <span>Featured News</span>
                    </label>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button onClick={addNews} className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-2.5 rounded-xl hover:shadow-lg transition-all"><Save className="w-4 h-4" /> Simpan</button>
                    <button onClick={() => setShowAddForm(false)} className="flex items-center gap-2 bg-white/10 px-6 py-2.5 rounded-xl hover:bg-white/20 transition-all"><X className="w-4 h-4" /> Batal</button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedNews.map((item) => (
                  <div key={item.id} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all group">
                    {editingId === item.id ? (
                      <div className="space-y-3">
                        <input type="text" value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white" />
                        <textarea value={editForm.summary} onChange={(e) => setEditForm({ ...editForm, summary: e.target.value })} className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white" rows={2} />
                        <select value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })} className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white">
                          <option value="race" className="bg-gray-900">Race</option>
                          <option value="transfer" className="bg-gray-900">Transfer</option>
                          <option value="technical" className="bg-gray-900">Technical</option>
                          <option value="interview" className="bg-gray-900">Interview</option>
                        </select>
                        <div className="flex gap-2">
                          <button onClick={() => saveEdit('news')} className="flex-1 flex items-center justify-center gap-2 bg-green-600/20 text-green-400 py-2 rounded-lg hover:bg-green-600/30"><Save className="w-4 h-4" /></button>
                          <button onClick={cancelEdit} className="flex-1 flex items-center justify-center gap-2 bg-gray-600/20 text-gray-400 py-2 rounded-lg hover:bg-gray-600/30"><X className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getCategoryBadge(item.category)}`}>{item.category}</span>
                          {item.featured && <Zap className="w-4 h-4 text-yellow-500" />}
                        </div>
                        <h4 className="font-bold text-lg mb-2 group-hover:text-red-400 transition-colors">{item.title}</h4>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{item.summary}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{item.date}</span>
                          <div className="flex gap-2">
                            <button onClick={() => startEdit(item)} className="p-2 bg-blue-600/20 text-blue-400 rounded-lg hover:bg-blue-600/30 transition-all"><Edit2 className="w-4 h-4" /></button>
                            <button onClick={() => deleteItem('news', item.id)} className="p-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-all"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
        .line-clamp-1 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; }
        .line-clamp-2 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
      `}</style>
    </div>
  );
};

// --- Live API Insight Sub-components ---

const LiveAPIInsights = () => {
    // 1. Info Pembalap Spesifik
    const { data: driver1 } = useDriver(1, 9158);
    // 2. Klasemen Tim Spesifik
    const { data: mclarenTeam } = useTeamChampionship(9839, 'McLaren');
    // 3. Klasemen Beberapa Pembalap Sekaligus
    const { data: mclarenDrivers } = useDriverChampionship(9839, [4, 81]);
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-4 animate-fadeIn">
        {/* Insight 1: Driver Detail */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-5 shadow-xl group hover:border-red-500/30 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-red-500" />
            </div>
            <h4 className="text-sm font-bold text-gray-300 uppercase tracking-widest">Pembalap Elite</h4>
          </div>
          {driver1?.[0] ? (
            <div className="flex items-center gap-4">
              <img src={driver1[0].headshot_url} alt={driver1[0].full_name} className="w-12 h-12 rounded-full border-2 border-red-500/30 shadow-lg shadow-red-500/20" />
              <div>
                <p className="font-bold text-white text-lg">{driver1[0].full_name}</p>
                <p className="text-xs text-red-400 font-medium tracking-wider">{driver1[0].team_name}</p>
              </div>
            </div>
          ) : <div className="animate-pulse flex space-x-4"><div className="rounded-full bg-white/10 h-12 w-12"></div><div className="flex-1 space-y-4 py-1"><div className="h-4 bg-white/10 rounded w-3/4"></div><div className="h-4 bg-white/10 rounded w-1/2"></div></div></div>}
        </div>
  
        {/* Insight 2: Team Performance */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-5 shadow-xl group hover:border-orange-500/30 transition-all">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-orange-500" />
            </div>
            <h4 className="text-sm font-bold text-gray-300 uppercase tracking-widest">Performa Konstruktor</h4>
          </div>
          {mclarenTeam?.[0] ? (
            <div>
              <div className="flex justify-between items-end mb-1">
                <p className="text-2xl font-black text-white">{mclarenTeam[0].team_name}</p>
                <p className="text-orange-500 font-bold mb-1">P{mclarenTeam[0].position_current}</p>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                  {mclarenTeam[0].points_current}
                </span>
                <span className="text-xs text-gray-500 font-medium italic">Poin di Sesi #9839</span>
              </div>
            </div>
          ) : <div className="animate-pulse space-y-3"><div className="h-6 bg-white/10 rounded w-1/2"></div><div className="h-10 bg-white/10 rounded w-3/4"></div></div>}
        </div>
  
        {/* Insight 3: Duo Driver Standings */}
        <div className="backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-5 shadow-xl group hover:border-emerald-500/30 transition-all">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-emerald-500" />
            </div>
            <h4 className="text-sm font-bold text-gray-300 uppercase tracking-widest">Live Duo Standings</h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {mclarenDrivers ? mclarenDrivers.map(d => (
              <div key={d.driver_number} className="bg-white/5 rounded-xl p-3 border border-white/5 hover:bg-white/10 transition-colors">
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">Driver #{d.driver_number}</p>
                <p className="text-xl font-black text-white">{d.points_current}</p>
                <div className="h-1 w-full bg-white/10 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full" 
                    style={{ width: `${(d.points_current / 500) * 100}%` }}
                  />
                </div>
              </div>
            )) : <div className="col-span-2 animate-pulse h-16 bg-white/10 rounded-xl"></div>}
          </div>
        </div>
      </div>
    );
  };

export default F1AdminDashboard;