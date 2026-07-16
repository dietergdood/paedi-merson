// build.js — ersetzt Platzhalter mit echten Env Vars
// Wird von Vercel automatisch beim Deploy ausgeführt

const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const url = process.env.SUPABASE_URL || '';
const key = process.env.SUPABASE_ANON_KEY || '';

html = html.replace(
  "var SUPABASE_URL = typeof __SUPABASE_URL__ !== 'undefined' ? __SUPABASE_URL__ : '';",
  `var SUPABASE_URL = '${url}';`
);
html = html.replace(
  "var SUPABASE_KEY = typeof __SUPABASE_KEY__ !== 'undefined' ? __SUPABASE_KEY__ : '';",
  `var SUPABASE_KEY = '${key}';`
);

fs.writeFileSync('index.html', html);
console.log('Build done — Supabase URL:', url ? url.substring(0, 30) + '...' : 'NOT SET');
