import React, { useState } from 'react';
import { Search, Settings, Bell, Menu, X, ChevronDown, Check } from 'lucide-react';
import { NavigationTab } from '../../types/dashboard';

interface DashboardHeaderProps {
  activeTab: string;
  onSelectTab: (tab: NavigationTab) => void;
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  onOpenSetup?: () => void;
}

const NAV_TABS: NavigationTab[] = [
  'Dashboard',
  'Appointment',
  'Patient',
  'Reports',
  'Chats',
  'Billing',
];

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  activeTab,
  onSelectTab,
  userName = 'David Brock',
  userRole = 'General Physician',
  userAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  onOpenSetup,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="w-full max-w-[1440px] mx-auto pt-4 pb-2 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        {/* Left Side: Navigation Pill Container */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition shadow-sm"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Desktop Capsule Nav Strip matching Figma Rectangle 39911 & Frame 1597881228 */}
          <nav className="hidden lg:flex items-center bg-white border border-[#4338CA]/5 shadow-[0px_2px_12px_rgba(0,0,0,0.03)] rounded-[43px] p-1.5 gap-2 xl:gap-6 min-h-[62px]">
            {NAV_TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => onSelectTab(tab)}
                  className={`relative px-5 py-2.5 rounded-[38px] text-[14.8px] font-manrope transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#F475C1] to-[#FF24AF] text-white font-extrabold shadow-[0_4px_14px_rgba(244,117,193,0.35)]'
                      : 'text-[#1F2937] hover:text-[#EF4486] font-bold hover:bg-pink-50/50'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Side: Action Icons & User Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Action Icons matching Figma Ellipses */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Search Button */}
            <button
              title="Search"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#EAEFF5] hover:bg-[#DDE2E8] text-[#4B5563] flex items-center justify-center transition shadow-sm hover:scale-105 active:scale-95"
            >
              <Search size={18} strokeWidth={2.2} />
            </button>

            {/* Settings Button */}
            <button
              title="Setup & Settings"
              onClick={onOpenSetup}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-pink-50 text-[#4B5563] hover:text-[#EF4486] border border-gray-100 flex items-center justify-center transition shadow-sm hover:scale-105 active:scale-95"
            >
              <Settings size={18} strokeWidth={2.2} />
            </button>

            {/* Notifications Button */}
            <div className="relative">
              <button
                title="Notifications"
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-pink-50 text-[#4B5563] hover:text-[#EF4486] border border-gray-100 flex items-center justify-center transition shadow-sm hover:scale-105 active:scale-95 relative"
              >
                <Bell size={18} strokeWidth={2.2} />
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-[#EF4486] border-2 border-white rounded-full"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100 px-2">
                    <span className="font-semibold text-sm text-gray-900">Notifications</span>
                    <span className="text-[11px] text-pink-600 bg-pink-50 px-2 py-0.5 rounded-full font-medium">2 new</span>
                  </div>
                  <div className="space-y-2 mt-2">
                    <div className="p-2.5 rounded-xl bg-pink-50/60 border border-pink-100/50 text-xs">
                      <p className="font-medium text-gray-800">🌡️ Temperature Logged</p>
                      <p className="text-gray-500 text-[11px] mt-0.5">BBT measured at 07:30 AM (98.42°F)</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-purple-50/60 border border-purple-100/50 text-xs">
                      <p className="font-medium text-gray-800">✨ Ovulation Window Predicted</p>
                      <p className="text-gray-500 text-[11px] mt-0.5">Peak fertility estimated within 24–48 hours</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* User Profile Chip matching Figma Frame 1597881233 */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 p-1 sm:pr-3 rounded-full hover:bg-white/80 transition group"
            >
              <div className="relative w-10 h-10 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-gray-200/80 shadow-sm group-hover:border-pink-300 transition">
                <img
                  src={userAvatar}
                  alt={userName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-[12px] font-manrope font-semibold text-[#232C2B] leading-tight">
                  {userName}
                </span>
                <span className="text-[10.5px] font-manrope font-medium text-[#232C2B]/50 leading-tight">
                  {userRole}
                </span>
              </div>
              <ChevronDown size={14} className="hidden sm:block text-gray-400 group-hover:text-gray-600 transition" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-xs font-semibold text-gray-900">{userName}</p>
                  <p className="text-[11px] text-gray-500">{userRole}</p>
                </div>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onOpenSetup?.();
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition flex items-center justify-between"
                >
                  <span>Cycle Setup Wizard</span>
                  <Settings size={14} />
                </button>
                <div className="px-4 py-1.5 text-[11px] text-emerald-600 flex items-center gap-1">
                  <Check size={13} />
                  <span>Devices Connected (3)</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 p-3 bg-white rounded-2xl shadow-lg border border-gray-100 animate-in fade-in slide-in-from-top-2 z-40">
          <div className="grid grid-cols-2 gap-2">
            {NAV_TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => {
                    onSelectTab(tab);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-manrope font-bold text-center transition ${
                    isActive
                      ? 'bg-gradient-to-r from-[#F475C1] to-[#FF24AF] text-white shadow-sm'
                      : 'bg-gray-50 text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
