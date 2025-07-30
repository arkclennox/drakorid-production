# Drakorid Project

This is a drama discovery app built with Next.js and Firebase Firestore. The app allows users to search and explore Korean dramas with detailed information.

## Firebase Setup

This project uses Firebase Firestore as the primary database. Make sure you have:

1. A Firebase project created at [Firebase Console](https://console.firebase.google.com/)
2. Firestore database enabled in your Firebase project
3. For local development: Place your Firebase service account key in `credentials/serviceAccountKey.json`
4. For production deployment: Set environment variables (see Deployment section)
4. A collection named `drama_korea` with your drama data

## Getting Started

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your Firebase project ID
   - Place your service account key in `credentials/serviceAccountKey.json`

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

### Vercel Deployment

1. Deploy to Vercel using the [Vercel Platform](https://vercel.com/new)

2. Set the following environment variables in your Vercel project settings:
   - `FIREBASE_PROJECT_ID`: Your Firebase project ID
   - `FIREBASE_SERVICE_ACCOUNT_KEY`: Your Firebase service account key (as a JSON string)

3. The application will automatically use environment variables in production and the local service account file in development.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Features

- Search Korean dramas by title
- Browse drama details including cast, crew, and episodes
- Responsive design with modern UI
- Real-time data from Firebase Firestore

## Project Structure

```
├── app/                    # Next.js 13+ app directory
│   ├── [id]/              # Dynamic drama detail pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── drama/             # Drama-specific components
│   └── ui/                # Generic UI components
├── lib/                   # Utility functions and configurations
│   ├── api/               # API query functions
│   ├── firebase/          # Firebase configuration
│   └── utils.ts           # Utility functions
├── credentials/           # Firebase service account (local only)
└── .env.example          # Environment variables template
```

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Firebase Documentation](https://firebase.google.com/docs) - learn about Firebase Firestore
- [Tailwind CSS](https://tailwindcss.com/docs) - utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - low-level UI primitives

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/drakorid-project)
