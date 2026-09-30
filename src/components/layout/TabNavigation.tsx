import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const TABS = [
  { label: 'Overview', path: '/overview' },
  { label: 'Calendar', path: '/calendar' },
  { label: 'Daily Log', path: '/daily-log' },
  { label: 'Insights', path: '/insights' },
  { label: 'Settings', path: '/settings' },
];

export const TabNavigation: React.FC = () => {
  const navRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();

  // Keep the active tab inside the scrollable strip without scrolling the page itself.
  useEffect(() => {
    const nav = navRef.current;
    const active = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    if (!nav || !active) return;
    const left = active.offsetLeft - nav.offsetLeft;
    const right = left + active.offsetWidth;
    if (left < nav.scrollLeft) nav.scrollLeft = left - 8;
    else if (right > nav.scrollLeft + nav.clientWidth) nav.scrollLeft = right - nav.clientWidth + 8;
  }, [pathname]);

  return (
    <nav
      ref={navRef}
      aria-label="Cycle Tracker Sections"
      className="w-full bg-[#FDF0F5] rounded-full p-1.5 overflow-x-auto no-scrollbar"
    >
      <div className="flex items-center gap-0.5 sm:gap-1 min-w-max">
        {TABS.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              `touch-target h-9 sm:h-10 lg:h-[42px] inline-flex items-center px-[13px] sm:px-6 lg:px-6 rounded-full text-[13px] sm:text-base transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${
                isActive
                  ? 'bg-white text-[#EF4486] shadow-[0px_2px_10px_rgba(239,68,134,0.12)] font-semibold'
                  : 'text-gray-700 font-medium hover:text-gray-900 hover:bg-white/50'
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
