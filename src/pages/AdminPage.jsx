import React, { useState, useEffect } from 'react';
import { 
  Database, Plus, Trash2, Edit3, Check, X, 
  Calendar, BookOpen, Users, Heart, MessageSquare, 
  DollarSign, RefreshCw, AlertCircle, Sparkles, CheckCircle2,
  Lock, LogOut
} from 'lucide-react';
import { apiService, authService } from '../services/api.js';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('sermons');
  const [sermons, setSermons] = useState([]);
  const [events, setEvents] = useState([]);
  const [prayers, setPrayers] = useState([]);
  const [visits, setVisits] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  // New Sermon Form state
  const [showAddSermon, setShowAddSermon] = useState(false);
  const [sermonForm, setSermonForm] = useState({
    title: '',
    speaker: 'Pasteur Jean-Paul',
    date: new Date().toISOString().split('T')[0],
    series: 'La Foi Vivante',
    scripture: 'Jean 3:16',
    videoUrl: '',
    audioUrl: '',
    description: '',
    featured: false
  });

  // New Event Form state
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: '',
    date: 'Dimanche 10h30',
    day: '25',
    month: 'MAI',
    category: 'Culte',
    location: '1234 Rue de la Foi, Montréal',
    description: '',
    speaker: ''
  });

  const loadAll = async () => {
    setLoading(true);
    try {
      const [sermonsData, eventsData, prayersData, visitsData, contactsData, donationsData] = await Promise.all([
        apiService.getSermons(),
        apiService.getEvents(),
        apiService.getAllPrayersAdmin(),
        apiService.getVisitsAdmin(),
        apiService.getContactsAdmin(),
        apiService.getDonations()
      ]);
      setSermons(sermonsData);
      setEvents(eventsData);
      setPrayers(prayersData);
      setVisits(visitsData);
      setContacts(contactsData);
      setDonations(donationsData?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    authService.verifySession().then((valid) => {
      setIsAuthenticated(valid);
    });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      loadAll();
    }
  }, [isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);
    try {
      const result = await authService.login(loginPassword);
      if (result.ok && result.success) {
        setIsAuthenticated(true);
        setLoginPassword('');
      } else {
        setLoginError(result.message || 'Connexion impossible.');
      }
    } catch {
      setLoginError('Erreur de connexion au serveur.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setSermons([]);
    setEvents([]);
    setPrayers([]);
    setVisits([]);
    setContacts([]);
    setDonations([]);
  };

  const handleCreateSermon = async (e) => {
    e.preventDefault();
    try {
      const res = await apiService.createSermon(sermonForm);
      setSermons([res.data, ...sermons]);
      setShowAddSermon(false);
      setStatusMsg("Prédication ajoutée avec succès dans la base de données !");
      setTimeout(() => setStatusMsg(null), 4000);
      setSermonForm({
        title: '',
        speaker: 'Pasteur Jean-Paul',
        date: new Date().toISOString().split('T')[0],
        series: 'La Foi Vivante',
        scripture: 'Jean 3:16',
        videoUrl: '',
        audioUrl: '',
        description: '',
        featured: false
      });
    } catch (err) {
      alert("Erreur lors de l'ajout.");
    }
  };

  const handleDeleteSermon = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette prédication ?")) return;
    try {
      await apiService.deleteSermon(id);
      setSermons(sermons.filter(s => s.id !== id));
      setStatusMsg("Prédication supprimée.");
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (err) {
      alert("Erreur lors de la suppression.");
    }
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await apiService.createEvent(eventForm);
      setEvents([res.data, ...events]);
      setShowAddEvent(false);
      setStatusMsg("Événement ajouté avec succès au calendrier !");
      setTimeout(() => setStatusMsg(null), 4000);
    } catch (err) {
      alert("Erreur lors de l'ajout.");
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm("Supprimer cet événement ?")) return;
    try {
      await apiService.deleteEvent(id);
      setEvents(events.filter(e => e.id !== id));
      setStatusMsg("Événement supprimé.");
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (err) {
      alert("Erreur.");
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center py-10">
        <p className="text-sm text-gray-500">Vérification de la session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center py-10 px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-[#C9862C] uppercase tracking-wider mb-2">
            <Lock className="w-4 h-4" />
            <span>Accès administrateur</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#121820] mb-2">
            Connexion Béthanie
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Entrez le mot de passe admin pour gérer le contenu du site.
          </p>

          <label className="block text-xs font-bold text-gray-700 mb-2" htmlFor="admin-password">
            Mot de passe
          </label>
          <input
            id="admin-password"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C9862C] mb-4"
            placeholder="Mot de passe admin"
            required
            autoFocus
          />

          {loginError && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl border border-red-200 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loginLoading}
            className="w-full py-3 bg-[#121820] hover:bg-[#1f2937] text-white rounded-xl text-sm font-bold transition-all cursor-pointer disabled:opacity-60"
          >
            {loginLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="bg-[#121820] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 border-b-4 border-[#C9862C]">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#F2B852] uppercase tracking-wider mb-1">
              <Database className="w-4 h-4" />
              <span>Panneau d'Administration Béthanie</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Gestion de Contenu Dynamique (MongoDB / Express)
            </h1>
            <p className="text-xs text-gray-300 mt-1">
              Gérez les prédications, le calendrier d'événements, les intentions de prière et les visiteurs inscrits.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-white rounded-xl text-xs font-bold flex items-center gap-2 border border-red-400/30 transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Déconnexion</span>
            </button>
            <button
              onClick={loadAll}
              disabled={loading}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold flex items-center gap-2 border border-white/20 transition-all cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Actualiser les données</span>
            </button>
          </div>
        </div>

        {/* Status Message */}
        {statusMsg && (
          <div className="mb-6 p-4 bg-green-50 text-green-800 rounded-xl border border-green-200 flex items-center gap-2 text-xs font-bold animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-green-600" />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Tabs Bar */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-2xl border border-gray-200 shadow-sm">
          <button
            onClick={() => setActiveTab('sermons')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'sermons' ? 'bg-[#C9862C] text-white shadow' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Prédications ({sermons.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'events' ? 'bg-[#C9862C] text-white shadow' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Événements ({events.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('visits')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'visits' ? 'bg-[#C9862C] text-white shadow' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Visites Planifiées ({visits.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('prayers')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'prayers' ? 'bg-[#C9862C] text-white shadow' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Prières ({prayers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'contacts' ? 'bg-[#C9862C] text-white shadow' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Messages reçus ({contacts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('donations')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'donations' ? 'bg-[#C9862C] text-white shadow' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Dons reçus ({donations.length})</span>
          </button>
        </div>

        {/* =========================================================================
            TAB 1: SERMONS MANAGEMENT
            ========================================================================= */}
        {activeTab === 'sermons' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Catalogue des Prédications</h2>
              <button
                onClick={() => setShowAddSermon(!showAddSermon)}
                className="px-4 py-2 bg-[#C9862C] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-[#B37220] transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter une prédication</span>
              </button>
            </div>

            {/* Add Sermon Form */}
            {showAddSermon && (
              <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-md animate-in fade-in space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <h3 className="text-sm font-bold text-[#8F4D12] uppercase tracking-wider">Nouvelle Prédication</h3>
                  <button onClick={() => setShowAddSermon(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <form onSubmit={handleCreateSermon} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Titre de la prédication *</label>
                      <input
                        type="text"
                        required
                        value={sermonForm.title}
                        onChange={(e) => setSermonForm({ ...sermonForm, title: e.target.value })}
                        placeholder="Ex: Marcher par la foi et non par la vue"
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9862C]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Prédicateur *</label>
                      <input
                        type="text"
                        required
                        value={sermonForm.speaker}
                        onChange={(e) => setSermonForm({ ...sermonForm, speaker: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#C9862C]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Passage biblique</label>
                      <input
                        type="text"
                        value={sermonForm.scripture}
                        onChange={(e) => setSermonForm({ ...sermonForm, scripture: e.target.value })}
                        placeholder="Ex: 2 Corinthiens 5:7"
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Série</label>
                      <input
                        type="text"
                        value={sermonForm.series}
                        onChange={(e) => setSermonForm({ ...sermonForm, series: e.target.value })}
                        placeholder="Ex: Les promesses de Dieu"
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Date</label>
                      <input
                        type="text"
                        value={sermonForm.date}
                        onChange={(e) => setSermonForm({ ...sermonForm, date: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Résumé / Description</label>
                    <textarea
                      rows={2}
                      value={sermonForm.description}
                      onChange={(e) => setSermonForm({ ...sermonForm, description: e.target.value })}
                      placeholder="Court résumé du message..."
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sermonForm.featured}
                        onChange={(e) => setSermonForm({ ...sermonForm, featured: e.target.checked })}
                        className="rounded text-[#C9862C]"
                      />
                      <span>Mettre en avant sur la page d'accueil (Dernier Message)</span>
                    </label>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddSermon(false)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#C9862C] text-white text-xs font-bold rounded-lg hover:bg-[#B37220]"
                    >
                      Enregistrer dans MongoDB
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Sermons Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-x-auto shadow-sm">
              <table className="w-full text-left text-xs min-w-[580px]">
                <thead className="bg-[#FAF4EA] text-[#8F4D12] uppercase font-bold text-[10px] tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="p-4">Titre & Prédicateur</th>
                    <th className="p-4">Passage</th>
                    <th className="p-4">Série</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sermons.map((s) => (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="p-4 font-bold text-gray-900">
                        <div>{s.title}</div>
                        <span className="text-gray-500 font-normal">{s.speaker}</span>
                      </td>
                      <td className="p-4 text-gray-700">{s.scripture || '—'}</td>
                      <td className="p-4 text-gray-700">{s.series || '—'}</td>
                      <td className="p-4 text-gray-500">{s.date}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleDeleteSermon(s.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 2: EVENTS MANAGEMENT
            ========================================================================= */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Agenda & Événements</h2>
              <button
                onClick={() => setShowAddEvent(!showAddEvent)}
                className="px-4 py-2 bg-[#C9862C] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-[#B37220] transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un événement</span>
              </button>
            </div>

            {/* Add Event Form */}
            {showAddEvent && (
              <div className="bg-white p-6 rounded-2xl border border-amber-200 shadow-md animate-in fade-in space-y-4">
                <h3 className="text-sm font-bold text-[#8F4D12] uppercase tracking-wider">Nouvel Événement</h3>
                <form onSubmit={handleCreateEvent} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Titre de l'événement *</label>
                      <input
                        type="text"
                        required
                        value={eventForm.title}
                        onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Jour (ex: 28)</label>
                      <input
                        type="text"
                        required
                        value={eventForm.day}
                        onChange={(e) => setEventForm({ ...eventForm, day: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Mois (ex: MAI)</label>
                      <input
                        type="text"
                        required
                        value={eventForm.month}
                        onChange={(e) => setEventForm({ ...eventForm, month: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Horaire (ex: Dimanche 10h30)</label>
                      <input
                        type="text"
                        value={eventForm.date}
                        onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Catégorie</label>
                      <select
                        value={eventForm.category}
                        onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                        className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                      >
                        <option value="Culte">Culte</option>
                        <option value="Enseignement">Enseignement</option>
                        <option value="Prière">Prière</option>
                        <option value="Jeunesse">Jeunesse</option>
                        <option value="Communautaire">Communautaire</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={eventForm.description}
                      onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddEvent(false)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 bg-[#C9862C] text-white text-xs font-bold rounded-lg hover:bg-[#B37220]"
                    >
                      Ajouter au calendrier
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Events List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map((ev) => (
                <div key={ev.id} className="bg-white p-5 rounded-2xl border border-gray-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#FAF4EA] text-[#8F4D12] rounded-xl flex flex-col items-center justify-center font-bold border border-[#E9D6BA]">
                      <span className="text-sm">{ev.day}</span>
                      <span className="text-[9px] uppercase">{ev.month}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-gray-900">{ev.title}</h4>
                      <p className="text-[11px] text-gray-500">{ev.date} — {ev.category}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteEvent(ev.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 3: VISITS PLANNED
            ========================================================================= */}
        {activeTab === 'visits' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Demandes de Première Visite ({visits.length})</h2>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-x-auto shadow-sm">
              <table className="w-full text-left text-xs min-w-[620px]">
                <thead className="bg-[#FAF4EA] text-[#8F4D12] uppercase font-bold text-[10px] tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="p-4">Visiteur</th>
                    <th className="p-4">Date Visite</th>
                    <th className="p-4">Personnes & Enfants</th>
                    <th className="p-4">Accueil Café</th>
                    <th className="p-4">Contact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {visits.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-gray-400">Aucune visite enregistrée pour le moment.</td>
                    </tr>
                  ) : (
                    visits.map((v) => (
                      <tr key={v.id} className="hover:bg-gray-50">
                        <td className="p-4 font-bold text-gray-900">
                          {v.firstName} {v.lastName}
                        </td>
                        <td className="p-4 text-gray-700">{v.serviceDate}</td>
                        <td className="p-4 text-gray-700">
                          {v.attendeeCount} adulte(s) • {v.hasChildren ? `Oui (${v.childrenAges || 'Âges non précisés'})` : 'Sans enfants'}
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${v.wantsHost ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                            {v.wantsHost ? 'Souhaite un guide' : 'Autonome'}
                          </span>
                        </td>
                        <td className="p-4 text-gray-600">
                          <div>{v.email}</div>
                          <div className="text-[11px] text-gray-400">{v.phone}</div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 4: PRAYERS REQUESTS
            ========================================================================= */}
        {activeTab === 'prayers' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Sujets de Prière Reçus ({prayers.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prayers.map((p) => (
                <div key={p.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#8F4D12]">{p.category}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${p.isPublic ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'}`}>
                      {p.isPublic ? 'Mur Public' : 'Confidentiel (Pasteurs)'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 italic">« {p.requestText} »</p>
                  <div className="text-[11px] text-gray-500 flex items-center justify-between pt-2 border-t border-gray-100">
                    <span>Par : <strong>{p.authorName}</strong></span>
                    <span>{p.prayerCount || 0} prière(s) formulée(s)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 5: CONTACT MESSAGES
            ========================================================================= */}
        {activeTab === 'contacts' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Messages du formulaire de contact ({contacts.length})</h2>
            <div className="space-y-3">
              {contacts.length === 0 ? (
                <p className="text-xs text-gray-400">Aucun message pour l'instant.</p>
              ) : (
                contacts.map((c) => (
                  <div key={c.id} className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-gray-900">{c.name} — <span className="text-xs text-[#8F4D12] font-normal">{c.subject}</span></h4>
                      <span className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString('fr-CA')}</span>
                    </div>
                    <p className="text-xs text-gray-700">{c.message}</p>
                    <div className="text-xs text-gray-500 flex gap-4 pt-1">
                      <span>Courriel : <a href={`mailto:${c.email}`} className="text-[#C9862C] font-semibold">{c.email}</a></span>
                      {c.phone && <span>Tél : {c.phone}</span>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB 6: DONATIONS
            ========================================================================= */}
        {activeTab === 'donations' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Dons & Offrandes en ligne</h2>
            <div className="bg-white rounded-2xl border border-gray-200 overflow-x-auto shadow-sm">
              <table className="w-full text-left text-xs min-w-[580px]">
                <thead className="bg-[#FAF4EA] text-[#8F4D12] uppercase font-bold text-[10px] tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="p-4">Donateur</th>
                    <th className="p-4">Montant</th>
                    <th className="p-4">Fonds / Affectation</th>
                    <th className="p-4">Reçu Fiscal</th>
                    <th className="p-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {donations.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-gray-400">Aucun don en ligne enregistré.</td>
                    </tr>
                  ) : (
                    donations.map((d) => (
                      <tr key={d.id} className="hover:bg-gray-50">
                        <td className="p-4 font-bold text-gray-900">
                          {d.anonymous ? 'Anonyme' : `${d.firstName} ${d.lastName}`}
                          <div className="text-[10px] text-gray-400 font-normal">{d.email}</div>
                        </td>
                        <td className="p-4 font-bold text-[#8F4D12] text-sm">
                          {d.amount} $ CAD
                        </td>
                        <td className="p-4 text-gray-700">{d.fund}</td>
                        <td className="p-4">
                          {d.needTaxReceipt ? (
                            <span className="px-2 py-0.5 rounded text-[10px] bg-green-100 text-green-800 font-bold">Requis ({d.address?.city || 'Canada'})</span>
                          ) : (
                            <span className="text-gray-400">Non requis</span>
                          )}
                        </td>
                        <td className="p-4 text-gray-500">{new Date(d.createdAt).toLocaleDateString('fr-CA')}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
