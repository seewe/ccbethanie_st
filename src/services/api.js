/**
 * API Service for Communauté Chrétienne Béthanie
 * Interacts with Node.js/Express + MongoDB backend endpoints
 */

const API_BASE = '/api';

export const apiService = {
  // Church Info
  async getChurchInfo() {
    try {
      const res = await fetch(`${API_BASE}/church-info`);
      const data = await res.json();
      return data.data;
    } catch (e) {
      console.warn("Using fallback church info", e);
      return null;
    }
  },

  async updateChurchInfo(info) {
    const res = await fetch(`${API_BASE}/church-info`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info)
    });
    return res.json();
  },

  // Sermons
  async getSermons() {
    const res = await fetch(`${API_BASE}/sermons`);
    const data = await res.json();
    return data.data || [];
  },

  async getSermonById(id) {
    const res = await fetch(`${API_BASE}/sermons/${id}`);
    const data = await res.json();
    return data.data;
  },

  async createSermon(sermonData) {
    const res = await fetch(`${API_BASE}/sermons`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sermonData)
    });
    return res.json();
  },

  async updateSermon(id, sermonData) {
    const res = await fetch(`${API_BASE}/sermons/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sermonData)
    });
    return res.json();
  },

  async deleteSermon(id) {
    const res = await fetch(`${API_BASE}/sermons/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  // Events
  async getEvents() {
    const res = await fetch(`${API_BASE}/events`);
    const data = await res.json();
    return data.data || [];
  },

  async createEvent(eventData) {
    const res = await fetch(`${API_BASE}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    });
    return res.json();
  },

  async updateEvent(id, eventData) {
    const res = await fetch(`${API_BASE}/events/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    });
    return res.json();
  },

  async deleteEvent(id) {
    const res = await fetch(`${API_BASE}/events/${id}`, {
      method: 'DELETE'
    });
    return res.json();
  },

  // Ministries
  async getMinistries() {
    const res = await fetch(`${API_BASE}/ministries`);
    const data = await res.json();
    return data.data || [];
  },

  // Team
  async getTeam() {
    const res = await fetch(`${API_BASE}/team`);
    const data = await res.json();
    return data.data || [];
  },

  // Testimonials
  async getTestimonials() {
    const res = await fetch(`${API_BASE}/testimonials`);
    const data = await res.json();
    return data.data || [];
  },

  async createTestimonial(testimonialData) {
    const res = await fetch(`${API_BASE}/testimonials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testimonialData)
    });
    return res.json();
  },

  // Prayers
  async getPrayers() {
    const res = await fetch(`${API_BASE}/prayers`);
    const data = await res.json();
    return data.data || [];
  },

  async getAllPrayersAdmin() {
    const res = await fetch(`${API_BASE}/admin/prayers`);
    const data = await res.json();
    return data.data || [];
  },

  async submitPrayer(prayerData) {
    const res = await fetch(`${API_BASE}/prayers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prayerData)
    });
    return res.json();
  },

  async prayForRequest(id) {
    const res = await fetch(`${API_BASE}/prayers/${id}/pray`, {
      method: 'POST'
    });
    return res.json();
  },

  // Visit Planner
  async planVisit(visitData) {
    const res = await fetch(`${API_BASE}/visits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(visitData)
    });
    return res.json();
  },

  async getVisitsAdmin() {
    const res = await fetch(`${API_BASE}/admin/visits`);
    const data = await res.json();
    return data.data || [];
  },

  // Donations
  async getDonations() {
    const res = await fetch(`${API_BASE}/donations`);
    const data = await res.json();
    return data;
  },

  async submitDonation(donationData) {
    const res = await fetch(`${API_BASE}/donations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(donationData)
    });
    return res.json();
  },

  // Contact
  async submitContact(contactData) {
    const res = await fetch(`${API_BASE}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData)
    });
    return res.json();
  },

  async getContactsAdmin() {
    const res = await fetch(`${API_BASE}/admin/contacts`);
    const data = await res.json();
    return data.data || [];
  },

  // Admin Stats
  async getAdminStats() {
    const res = await fetch(`${API_BASE}/admin/stats`);
    const data = await res.json();
    return data.data;
  }
};
