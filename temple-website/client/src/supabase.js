import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;

if (supabaseUrl && supabaseKey && supabaseUrl !== 'YOUR_SUPABASE_URL' && supabaseKey !== 'YOUR_SUPABASE_ANON_KEY') {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('Client connected to Supabase');
  } catch (error) {
    console.error('Supabase initialization failed:', error);
  }
} else {
  console.log('VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY missing. Falling back to Express Backend Server / localStorage.');
}

const BACKEND_URL = 'http://localhost:5000/api';

// Fallback helper to interact with browser local storage if all servers are down
const getLocalStorageData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('LocalStorage read error:', e);
    return [];
  }
};

const saveLocalStorageData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('LocalStorage write error:', e);
  }
};

export const dbService = {
  // 1. Fetch Bookings
  async getBookings() {
    // A. Try Supabase
    if (supabase) {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error) return data;
      console.warn('Supabase fetch error, trying backend server:', error.message);
    }

    // B. Try Express Server
    try {
      const response = await fetch(`${BACKEND_URL}/bookings`);
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      console.warn('Express server unreachable, trying localStorage:', err.message);
    }

    // C. Try LocalStorage
    return getLocalStorageData('temple_bookings').reverse();
  },

  // 2. Add Booking
  async createBooking(booking) {
    // A. Try Supabase
    if (supabase) {
      const { data, error } = await supabase
        .from('bookings')
        .insert([booking])
        .select();
      if (!error) return data[0];
      console.warn('Supabase insert error, trying backend server:', error.message);
    }

    // B. Try Express Server
    try {
      const response = await fetch(`${BACKEND_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      console.warn('Express server write failed, saving to localStorage:', err.message);
    }

    // C. Try LocalStorage
    const bookings = getLocalStorageData('temple_bookings');
    const newBooking = {
      id: Math.random().toString(36).substring(2, 11),
      ...booking,
      created_at: new Date().toISOString()
    };
    bookings.push(newBooking);
    saveLocalStorageData('temple_bookings', bookings);
    return newBooking;
  },

  // 3. Fetch Donations
  async getDonations() {
    // A. Try Supabase
    if (supabase) {
      const { data, error } = await supabase
        .from('donations')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error) return data;
      console.warn('Supabase fetch error, trying backend server:', error.message);
    }

    // B. Try Express Server
    try {
      const response = await fetch(`${BACKEND_URL}/donations`);
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      console.warn('Express server unreachable, trying localStorage:', err.message);
    }

    // C. Try LocalStorage
    return getLocalStorageData('temple_donations').reverse();
  },

  // 4. Add Donation
  async createDonation(donation) {
    // A. Try Supabase
    if (supabase) {
      const { data, error } = await supabase
        .from('donations')
        .insert([donation])
        .select();
      if (!error) return data[0];
      console.warn('Supabase insert error, trying backend server:', error.message);
    }

    // B. Try Express Server
    try {
      const response = await fetch(`${BACKEND_URL}/donations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(donation),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      console.warn('Express server write failed, saving to localStorage:', err.message);
    }

    // C. Try LocalStorage
    const donations = getLocalStorageData('temple_donations');
    const newDonation = {
      id: Math.random().toString(36).substring(2, 11),
      ...donation,
      created_at: new Date().toISOString()
    };
    donations.push(newDonation);
    saveLocalStorageData('temple_donations', donations);
    return newDonation;
  },

  // 5. Fetch Daily Darshan
  async getDailyDarshans() {
    // B. Try Express Server
    try {
      const response = await fetch(`${BACKEND_URL}/darshan/daily`);
      if (response.ok) {
        return await response.json();
      }
    } catch (err) {
      console.warn('Express server unreachable, returning static placeholder darshans:', err.message);
    }

    // C. Static Fallback
    return [
      {
        id: '1',
        title: 'Mangala Arati Darshan',
        description: 'Morning decorations of the sanctum sanctorum in warm marigold garlands.',
        image_url: '/assets/darshan_deity.jpg',
        date: new Date().toISOString().split('T')[0]
      },
      {
        id: '2',
        title: 'Sandhya Shringar Darshan',
        description: 'Evening deity decorations with traditional brass lamps and fresh lotus flowers.',
        image_url: '/assets/festival_celebration.jpg',
        date: new Date().toISOString().split('T')[0]
      }
    ];
  }
};
export { supabase };
