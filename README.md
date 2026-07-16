# Pädi Merson — Der Transfer

JGA Web App für das Transfer-Weekend.

## Setup in 5 Schritten

### 1. Supabase Projekt erstellen
- Gehe zu [supabase.com](https://supabase.com) und erstelle ein neues Projekt
- Im SQL Editor: kopiere den Inhalt von `supabase_schema.sql` und führe ihn aus
- Unter **Settings → API**: notiere dir die **Project URL** und den **anon public key**

### 2. GitHub Repository erstellen
- Gehe zu [github.com](https://github.com) → New Repository
- Name: `paedi-merson` (oder beliebig)
- Lade alle Dateien aus diesem Ordner hoch

### 3. Vercel Projekt erstellen
- Gehe zu [vercel.com](https://vercel.com) → Add New Project
- Wähle dein GitHub Repository aus
- **Framework Preset**: Other
- **Build Command**: `node build.js`
- **Output Directory**: `.` (Punkt)

### 4. Environment Variables in Vercel setzen
Unter **Settings → Environment Variables**:
```
SUPABASE_URL        = https://dein-projekt.supabase.co
SUPABASE_ANON_KEY   = dein-anon-key
```

### 5. Deploy
- Klicke auf **Deploy**
- Vercel gibt dir eine URL wie `paedi-merson.vercel.app`
- Diese URL mit allen teilen — fertig!

## Features
- Echtzeit-Sync auf allen Geräten (Supabase Realtime)
- Scoreboard mit Médaillen und Karten
- Regie-Drehbuch mit allen Stationen
- Checkliste editierbar
- Packliste mit Zuständigkeiten
- Vollständiger Bearbeitungsmodus (Passwort: 8704)
- Instagram Link @paedimerson

## Lokale Entwicklung
```bash
cp .env.example .env.local
# .env.local mit echten Werten füllen
npm run dev
```
