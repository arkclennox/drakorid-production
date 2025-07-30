# Drakorid Project

This is a drama discovery app built with Next.js and Supabase. The app allows users to search and explore Korean dramas with detailed information.

## Supabase Setup

This project uses Supabase as the primary database. Make sure you have:

1. A Supabase project created at [Supabase Console](https://supabase.com/dashboard)
2. Database tables set up in your Supabase project
3. Environment variables configured for both local development and production
4. For production deployment: Set environment variables (see Deployment section)
4. A table named `korean_dramas` with your drama data

## Getting Started

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Add your Supabase project URL and API keys
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
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous/public key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (for server-side operations)

3. The application will automatically use environment variables in production and the local service account file in development.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Features

- Search Korean dramas by title
- Browse drama details including cast, crew, and episodes
- Responsive design with modern UI
- Real-time data from Supabase PostgreSQL database

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
│   ├── supabase/          # Supabase configuration
│   └── utils.ts           # Utility functions

└── .env.example          # Environment variables template
```

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Supabase Documentation](https://supabase.com/docs) - learn about Supabase PostgreSQL database
- [Tailwind CSS](https://tailwindcss.com/docs) - utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - low-level UI primitives

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/drakorid-project)
