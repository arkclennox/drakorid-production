# DraKorid - Korean Drama Discovery Platform

A modern, responsive web application built with Next.js 14 for discovering and exploring Korean dramas. Browse through an extensive collection of K-dramas with advanced filtering, search functionality, and detailed information about each drama.

## ✨ Features

### 🎭 Drama Discovery
- **Extensive Collection**: Browse through a comprehensive database of Korean dramas
- **Advanced Search**: Search dramas by title with real-time results
- **Smart Filtering**: Filter by genre, year, rating, and more
- **Detailed Information**: View comprehensive details including cast, crew, episodes, and more

### 🎨 User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Fast Performance**: Optimized loading with image lazy loading and caching
- **Dark/Light Mode**: Automatic theme detection based on system preferences

### 🔍 SEO Optimized
- **Dynamic Meta Tags**: Automatic SEO optimization for each drama page
- **Open Graph Support**: Rich social media previews
- **Sitemap Generation**: Automatic sitemap for search engines
- **Structured Data**: Enhanced search engine understanding

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [Supabase](https://supabase.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/arkclennox/drakorid-production.git
   cd drakorid-production
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

This project uses Supabase as the database. You'll need to:

1. Create a new Supabase project
2. Set up the `korean_dramas` table with the schema defined in `lib/supabase/schema.ts`
3. Populate the table with drama data
4. Configure Row Level Security (RLS) policies as needed

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on every push to main branch**

### Environment Variables for Production

Make sure to set these in your deployment platform:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (optional, for admin operations)

---

**Made with ❤️ for Korean Drama fans worldwide**