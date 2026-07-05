# Katalog proizvoda

**Live demo:** [https://solution-toni-grbic.vercel.app/](https://solution-toni-grbic.vercel.app/)

React aplikacija za pregled, pretragu i filtriranje proizvoda, s podrškom za favorite i prijavu korisnika. Podaci se dohvaćaju s vanjskog API-ja (DummyJSON).

## Preduvjeti

Prije instalacije provjerite da imate instalirano:

- **Node.js** — verzija 18 ili novija (preporučeno LTS)
- **Yarn** — upravitelj paketa (projekt koristi `yarn.lock`)
- **Docker Desktop** (opcionalno) — za pokretanje aplikacije u kontejnerima

Provjeru verzije možete napraviti naredbama:

```bash
node -v
yarn -v
```

Ako nemate Yarn, instalirajte ga globalno:

```bash
npm install -g yarn
```

## Postavljanje okruženja i instalacija

1. Klonirajte repozitorij i uđite u direktorij projekta:

```bash
git clone <url-repozitorija>
cd Abysalto
```

2. Instalirajte ovisnosti:

```bash
yarn install
```

## Konfiguracija varijabli okruženja

Aplikacija koristi Vite varijable okruženja. Sve varijable koje trebaju biti dostupne u browseru moraju imati prefiks `VITE_`.

1. Kopirajte primjer datoteke okruženja:

```bash
cp .env.example .env
```

Na Windowsu (PowerShell):

```powershell
Copy-Item .env.example .env
```

2. Uredite `.env` prema potrebi. Dostupne varijable:

| Varijabla | Opis | Zadana vrijednost |
|-----------|------|-------------------|
| `VITE_API_BASE_URL` | Bazni URL vanjskog API-ja za proizvode i autentifikaciju | `https://dummyjson.com` |

Primjer sadržaja `.env` datoteke:

```env
VITE_API_BASE_URL=https://dummyjson.com
```

**Napomene:**

- Datoteka `.env` ne ulazi u Git (navedena je u `.gitignore`). Za referencu koristite `.env.example`.
- Nakon promjene varijabli u `.env` ponovno pokrenite dev server (`yarn dev`).
- Varijable se koriste u `src/api/base.ts` kao `import.meta.env.VITE_API_BASE_URL`.

## Pokretanje aplikacije

### Razvoj (dev server)

```bash
yarn dev
```

Aplikacija je dostupna na adresi prikazanoj u terminalu (obično [http://localhost:5173](http://localhost:5173)).

### Produkcijska build verzija

```bash
yarn build
```

Generirani statički sadržaj nalazi se u mapi `dist/`.

### Pregled produkcijske build verzije lokalno

```bash
yarn preview
```

### Lint

```bash
yarn lint
```

### Docker

Aplikaciju možete pokrenuti i putem Docker Composea, bez lokalne instalacije Node.js ovisnosti. Naredbe pokrećite iz korijenskog direktorija projekta (gdje se nalazi `docker-compose.yml`).

#### Razvoj (hot reload)

```bash
docker compose up --build
```

Aplikacija je dostupna na [http://localhost:5173](http://localhost:5173). Vite dev server podržava hot reload — promjene u izvornom kodu automatski se reflektiraju u pregledniku.

Zaustavljanje kontejnera:

```bash
docker compose down
```

#### Produkcija (nginx)

```bash
docker compose --profile prod up --build
```

Aplikacija je dostupna na [http://localhost:8080](http://localhost:8080). Kontejner gradi statičke datoteke (`yarn build`) i servira ih putem nginx-a.

**Napomene za Docker:**

- Datoteka `.env` nije obavezna — ako je nema, koristi se zadana vrijednost `VITE_API_BASE_URL=https://dummyjson.com`.
- U razvojnom okruženju varijable se učitavaju pri pokretanju kontejnera.
- U produkcijskom okruženju `VITE_API_BASE_URL` ugrađuje se u build pri izgradnji slike — nakon promjene varijable ponovno pokrenite build (`docker compose --profile prod up --build`).
- Za promjenu API URL-a pri buildu možete koristiti i inline varijablu:

```bash
VITE_API_BASE_URL=https://dummyjson.com docker compose --profile prod up --build
```

## Tehnologije

- React 19, TypeScript, Vite
- React Router, TanStack Query, Axios
- SCSS moduli

## Struktura projekta

```
solution-toni_grbic/
├── .github/workflows/     # GitHub Actions (lint, test, build)
├── public/                # Statičke datoteke (favicon, OG slika)
├── src/
│   ├── api/               # HTTP klijent i API pozivi (auth, proizvodi)
│   ├── assets/            # Fontovi i ostali resursi
│   ├── components/
│   │   ├── common/        # Ponovno upotrebljive UI komponente (Button, Input, Pagination, …)
│   │   ├── layout/        # Layout, Header, Sidebar, UserMenu, ThemeToggle
│   │   ├── router/        # React Router konfiguracija i Router komponenta
│   │   ├── ErrorBoundary/ # Globalni hvatač grešaka
│   │   └── ProtectedRoute/# Zaštita ruta za autentificirane korisnike
│   ├── constants/         # Konstante (storage ključevi, query ključevi, PAGE_SIZE)
│   ├── context/
│   │   ├── auth/          # AuthProvider, authContext, useAuth
│   │   └── theme/         # ThemeProvider, themeContext, useTheme
│   ├── hooks/
│   │   ├── api/           # TanStack Query hookovi (useProducts, useProduct, …)
│   │   └── …              # Custom hookovi (useFavorites, useDismissiblePanel, …)
│   ├── pages/
│   │   ├── Products/      # Lista proizvoda (filtri, tablica)
│   │   ├── ProductDetail/ # Detalji proizvoda
│   │   ├── Favorites/     # Spremljeni proizvodi
│   │   ├── Login/         # Prijava korisnika
│   │   └── NotFound/      # 404 stranica
│   ├── styles/            # Globalni SCSS, varijable, mixini
│   ├── test/              # Vitest setup
│   ├── types/             # TypeScript tipovi i enumi
│   ├── utils/             # Pomoćne funkcije (storage, theme, helpers)
│   └── main.tsx           # Ulazna točka aplikacije
├── docker-compose.yml     # Docker okruženja (dev i prod)
├── Dockerfile             # Produkcijska slika (build + nginx)
├── Dockerfile.dev         # Razvojna slika (Vite dev server)
├── nginx.conf             # Nginx konfiguracija za produkciju
├── vite.config.ts         # Vite konfiguracija
├── vitest.config.ts       # Vitest konfiguracija
└── eslint.config.js       # ESLint pravila
```

Svaka komponenta sadrži vlastitu mapu s `.tsx` datotekom, `.module.scss` stilovima, `index.ts` barrel exportom i po potrebi test datotekom (`*.test.tsx`).
