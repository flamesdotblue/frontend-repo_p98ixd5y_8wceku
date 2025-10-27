import React from 'react';
import { Home, Settings, Users, Truck } from 'lucide-react';

const TABS = [
  { key: 'dashboard', label: 'Dashboard', icon: Home },
  { key: 'plans', label: 'Plans', icon: Settings },
  { key: 'customers', label: 'Customers', icon: Users },
  { key: 'pickups', label: 'Pickups', icon: Truck },
];

export default function Navbar({ currentTab, onTabChange }) {
  return (
    <header className="sticky top-0 z-20 w-full border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
            WH
          </div>
          <div className="leading-tight">
            <h1 className="text-base font-semibold text-gray-900">Abu Dhabi Warehouse CRM</h1>
            <p className="text-xs text-gray-500">Subscriptions • Payments • Pickups</p>
          </div>
        </div>
        <nav className="flex items-center gap-1">
          {TABS.map(({ key, label, icon: Icon }) => {
            const active = currentTab === key;
            return (
              <button
                key={key}
                onClick={() => onTabChange(key)}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
