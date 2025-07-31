import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - DraKorid',
  description: 'Get in touch with the DraKorid team. We\'d love to hear from you!',
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Contact Us
        </h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            We'd love to hear from you! Whether you have questions, suggestions, or feedback about DraKorid, don't hesitate to reach out.
          </p>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Get in Touch
            </h2>
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                <a 
                  href="mailto:info@drakorid.live" 
                  className="text-lg font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                >
                  info@drakorid.live
                </a>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            What You Can Contact Us About
          </h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-2">
            <li>Technical issues or bug reports</li>
            <li>Feature requests and suggestions</li>
            <li>Content corrections or updates</li>
            <li>Partnership opportunities</li>
            <li>General feedback about DraKorid</li>
            <li>Questions about our services</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Response Time
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We typically respond to emails within 24-48 hours during business days. For urgent matters, please indicate the urgency in your subject line.
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              <strong>Note:</strong> We're a small team passionate about Korean dramas. While we strive to respond to all inquiries promptly, please be patient with us during busy periods.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}