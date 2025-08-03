'use client';

import { SidebarBanner } from '@/components/smart-banner';

export function FilterFallback() {
  return (
    <div className="flex-shrink-0 flex flex-col h-full bg-white">
      <SidebarBanner />
    </div>
  );
}

export function Filter() {
  return (
    <div className="flex-shrink-0 flex flex-col h-full bg-white">
      <SidebarBanner />
    </div>
  );
}
