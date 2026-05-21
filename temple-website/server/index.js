const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// Load / Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
let supabase = null;

if (supabaseUrl && supabaseKey && supabaseUrl !== 'YOUR_SUPABASE_URL' && supabaseKey !== 'YOUR_SUPABASE_ANON_KEY') {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
    console.log('Successfully connected to Supabase database.');
  } catch (error) {
    console.error('Failed to initialize Supabase client:', error.message);
  }
} else {
  console.log('Supabase credentials not found or set to default placeholders. Running server in fallback Local JSON DB mode.');
}

// Helper paths for fallback database files
const bookingsFile = path.join(__dirname, 'bookings.json');
const donationsFile = path.join(__dirname, 'donations.json');

const readJSONFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data || '[]');
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err);
    return [];
  }
};

const writeJSONFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err);
  }
};

// --- API ENDPOINTS ---

// 1. Bookings Endpoints
app.get('/api/bookings', async (req, res) => {
  if (supabase) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) return res.json(data);
    console.error('Supabase fetch bookings error:', error);
  }
  // Fallback
  const bookings = readJSONFile(bookingsFile);
  res.json(bookings.reverse());
});

app.post('/api/bookings', async (req, res) => {
  const { devotee_name, gotra, pooja_type, booking_date, time_slot, email } = req.body;

  if (!devotee_name || !pooja_type || !booking_date || !time_slot || !email) {
    return res.status(400).json({ error: 'All fields except Gotra are required' });
  }

  const newBooking = {
    id: Math.random().toString(36).substr(2, 9),
    devotee_name,
    gotra: gotra || '',
    pooja_type,
    booking_date,
    time_slot,
    email,
    created_at: new Date().toISOString()
  };

  if (supabase) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([{
        devotee_name,
        gotra: gotra || '',
        pooja_type,
        booking_date,
        time_slot,
        email
      }])
      .select();
    if (!error) return res.status(201).json(data[0]);
    console.error('Supabase insert booking error, falling back:', error);
  }

  // Fallback
  const bookings = readJSONFile(bookingsFile);
  bookings.push(newBooking);
  writeJSONFile(bookingsFile, bookings);
  res.status(201).json(newBooking);
});

// 2. Donations Endpoints
app.get('/api/donations', async (req, res) => {
  if (supabase) {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) return res.json(data);
    console.error('Supabase fetch donations error:', error);
  }
  // Fallback
  const donations = readJSONFile(donationsFile);
  res.json(donations.reverse());
});

app.post('/api/donations', async (req, res) => {
  const { devotee_name, amount, seva_type, message } = req.body;

  if (!devotee_name || !amount || !seva_type) {
    return res.status(400).json({ error: 'Name, amount, and seva type are required' });
  }

  const newDonation = {
    id: Math.random().toString(36).substr(2, 9),
    devotee_name,
    amount: parseFloat(amount),
    seva_type,
    message: message || '',
    created_at: new Date().toISOString()
  };

  if (supabase) {
    const { data, error } = await supabase
      .from('donations')
      .insert([{
        devotee_name,
        amount: parseFloat(amount),
        seva_type,
        message: message || ''
      }])
      .select();
    if (!error) return res.status(201).json(data[0]);
    console.error('Supabase insert donation error, falling back:', error);
  }

  // Fallback
  const donations = readJSONFile(donationsFile);
  donations.push(newDonation);
  writeJSONFile(donationsFile, donations);
  res.status(201).json(newDonation);
});

// 3. Daily Darshan Mock Endpoints
app.get('/api/darshan/daily', (req, res) => {
  // We'll serve standard information about daily darshan.
  // The client can query this to load image urls and metadata.
  res.json([
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
  ]);
});

// Serve assets directory statically
app.use('/assets', express.static(path.join(__dirname, '..', 'assets')));

// Start the server
app.listen(PORT, () => {
  console.log(`DevaVriksha Temple Server is running on http://localhost:${PORT}`);
});
