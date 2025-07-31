import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About - DraKorid',
  description: 'Learn more about DraKorid, your premier destination for discovering Korean dramas.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          About DraKorid
        </h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Welcome to DraKorid, your premier destination for discovering and exploring the captivating world of Korean dramas.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            At DraKorid, we're passionate about bringing you the best Korean drama content. Our platform is designed to help you discover new shows, explore detailed information about your favorite dramas, and find your next binge-worthy series.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            What We Offer
          </h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
            <li>Comprehensive database of Korean dramas</li>
            <li>Detailed information including cast, crew, and episode details</li>
            <li>Advanced filtering and search capabilities</li>
            <li>Ratings and recommendations</li>
            <li>Regular updates with the latest releases</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Our Team
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            DraKorid is built by a team of Korean drama enthusiasts who understand the passion and dedication of the K-drama community. We're committed to providing you with the most accurate and up-to-date information about your favorite shows.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Whether you're a longtime fan of Korean dramas or just starting your journey into K-drama world, DraKorid is here to enhance your viewing experience. Explore, discover, and enjoy the rich storytelling that Korean dramas have to offer.
          </p>
        </div>
      </div>
    </div>
  );
}