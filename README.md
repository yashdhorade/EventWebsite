# EventWeb — React + Vite

This is a React app built with Vite. Below are simple steps to get the project running on your machine and to explain the basic project structure.

## Prerequisites

- Install Node.js (version 14 or later). Installing Node also gives you `npm`.
- (Optional) Install `git` if you want to clone the repo.

## Quick setup

1. Open a terminal in the project folder (where this `README.md` is).
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser at http://localhost:5173 (Vite will print the exact URL in the terminal).

## Environment variables (Supabase)

If the app uses Supabase you will need to add your keys. Create a file named `.env.local` in the project root and add lines like:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Prefixing with `VITE_` makes the variables available to the client code.

## Build for production

To create an optimized build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Where to make changes

- App source code is in the `src/` folder.
- Reusable UI pieces are in `src/components/`.
- Supabase-related code is in `lib/supabase.js`.

Edit files in `src/` and the dev server will reload automatically.

## Folder overview (simple)

- `index.html` — App entry HTML.
- `src/main.jsx` — App bootstrap code.
- `src/App.jsx` — Main app component.
- `src/components/` — React components used in the app.
- `lib/supabase.js` — Supabase client helper.

## Troubleshooting

- If the dev server doesn't start, check that Node is installed and run `npm install` again.
- If environment variables are not loaded, ensure they start with `VITE_` and restart the dev server.

If you want, I can also run the dev server for you or add a short section about testing or deployment.
