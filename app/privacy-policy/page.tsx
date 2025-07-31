import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - DraKorid',
  description: 'Learn about how DraKorid collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Privacy Policy
        </h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            At DraKorid, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our website.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Information We Collect
          </h2>
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
            Information You Provide
          </h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-4 space-y-1">
            <li>Contact information when you reach out to us</li>
            <li>Feedback and suggestions you submit</li>
            <li>Any other information you voluntarily provide</li>
          </ul>
          
          <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-3">
            Information Automatically Collected
          </h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-1">
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>IP address</li>
            <li>Pages visited and time spent on our site</li>
            <li>Referring website</li>
            <li>Device information</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            How We Use Your Information
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We use the collected information for the following purposes:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-1">
            <li>To provide and maintain our service</li>
            <li>To improve user experience</li>
            <li>To respond to your inquiries and support requests</li>
            <li>To analyze website usage and performance</li>
            <li>To detect and prevent fraud or abuse</li>
            <li>To comply with legal obligations</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Cookies and Tracking Technologies
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We use cookies and similar tracking technologies to enhance your browsing experience. These technologies help us:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-1">
            <li>Remember your preferences</li>
            <li>Analyze site traffic and usage patterns</li>
            <li>Provide personalized content</li>
            <li>Improve site functionality</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Third-Party Services
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We may use third-party services for analytics, advertising, and other purposes. These services may collect information about your use of our website. Some of the third-party services we use include:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-1">
            <li>Google Analytics for website analytics</li>
            <li>Google AdSense for advertising</li>
            <li>Content delivery networks for performance</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Data Security
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Your Rights
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You have the right to:
          </p>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mb-6 space-y-1">
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Object to processing of your information</li>
            <li>Withdraw consent where applicable</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Children's Privacy
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Changes to This Privacy Policy
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <p className="text-gray-900 dark:text-white font-medium">
              Email: <a href="mailto:info@drakorid.live" className="text-blue-600 dark:text-blue-400 hover:underline">info@drakorid.live</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}