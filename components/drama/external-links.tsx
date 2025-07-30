import { ExternalIds } from '@/lib/firebase/schema';
import { ExternalLinkIcon, FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * External Links Component
 * Displays links to external platforms like IMDb, Facebook, Instagram, Twitter
 * 
 * Props:
 * - externalIds: ExternalIds object containing platform IDs
 * - homepage: Optional homepage URL
 */

interface ExternalLinksProps {
  externalIds: ExternalIds;
  homepage?: string;
}

export function ExternalLinks({ externalIds, homepage }: ExternalLinksProps) {
  const links = [];

  // IMDb link
  if (externalIds.imdb_id) {
    links.push({
      name: 'IMDb',
      url: `https://www.imdb.com/title/${externalIds.imdb_id}`,
      icon: ExternalLinkIcon,
      color: 'bg-yellow-500 hover:bg-yellow-600'
    });
  }

  // Facebook link
  if (externalIds.facebook_id) {
    links.push({
      name: 'Facebook',
      url: `https://www.facebook.com/${externalIds.facebook_id}`,
      icon: FacebookIcon,
      color: 'bg-blue-600 hover:bg-blue-700'
    });
  }

  // Instagram link
  if (externalIds.instagram_id) {
    links.push({
      name: 'Instagram',
      url: `https://www.instagram.com/${externalIds.instagram_id}`,
      icon: InstagramIcon,
      color: 'bg-pink-500 hover:bg-pink-600'
    });
  }

  // Twitter link
  if (externalIds.twitter_id) {
    links.push({
      name: 'Twitter',
      url: `https://twitter.com/${externalIds.twitter_id}`,
      icon: TwitterIcon,
      color: 'bg-blue-400 hover:bg-blue-500'
    });
  }

  // Homepage link
  if (homepage) {
    links.push({
      name: 'Official Website',
      url: homepage,
      icon: ExternalLinkIcon,
      color: 'bg-gray-600 hover:bg-gray-700'
    });
  }

  if (links.length === 0) {
    return (
      <div className="text-center py-8">
        <ExternalLinkIcon className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
        <p className="text-muted-foreground">External links not available</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">External Links</h2>
      <div className="flex flex-wrap gap-3">
        {links.map((link) => {
          const IconComponent = link.icon;
          return (
            <Button
              key={link.name}
              asChild
              className={`${link.color} text-white border-0`}
            >
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <IconComponent className="w-4 h-4" />
                <span>{link.name}</span>
              </a>
            </Button>
          );
        })}
      </div>
    </div>
  );
}