import { Keyword } from '@/lib/firebase/schema';
import { TagIcon } from 'lucide-react';

/**
 * Keywords Section Component
 * Displays drama keywords as clickable badges
 * 
 * Props:
 * - keywords: Array of Keyword objects containing keyword information
 * - maxDisplay: Maximum number of keywords to display initially (default: 20)
 */

interface KeywordsSectionProps {
  keywords: Keyword[];
  maxDisplay?: number;
}

export function KeywordsSection({ keywords, maxDisplay = 20 }: KeywordsSectionProps) {
  if (!keywords || keywords.length === 0) {
    return (
      <div className="text-center py-8">
        <TagIcon className="w-12 h-12 mx-auto text-muted-foreground mb-2" />
        <p className="text-muted-foreground">Keywords not available</p>
      </div>
    );
  }

  const displayKeywords = keywords.slice(0, maxDisplay);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Keywords</h2>
      <div className="flex flex-wrap gap-2">
        {displayKeywords.map((keyword) => (
          <span
            key={keyword.id}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors cursor-pointer"
          >
            <TagIcon className="w-3 h-3 mr-1" />
            {keyword.name}
          </span>
        ))}
      </div>
      
      {keywords.length > maxDisplay && (
        <p className="text-sm text-muted-foreground mt-4">
          And {keywords.length - maxDisplay} more keywords...
        </p>
      )}
    </div>
  );
}