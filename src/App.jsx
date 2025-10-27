import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import PlanCards from './components/PlanCards.jsx';
import CustomersTable from './components/CustomersTable.jsx';
import PickupBoard from './components/PickupBoard.jsx';

const aed = new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED' });

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [plans, setPlans] = useState([
    {
      id: 'starter',
      name: 'Starter Stash',
      type: 'fixed',
      price: 199,
      itemLimit: 3,
      features: ['Insurance included', 'Pickup within city', 'Email support'],
    },
    {
      id: 'pro',
      name: 'Pro Stash',
      type: 'fixed',
      price: 499,
      itemLimit: 10,
      features: ['Priority pickup', 'Photo inventory', 'Phone support'],
    },
    {
      id: 'flexi',
      name: 'Flexi Stash',
      type: 'flexi',
      perItemPrice: 79,
      features: ['Pay per item', 'Scale up and down anytime'],
    },
  ]);

  const [customers, setCustomers] = useState([
    { id: 'c1', name: 'Alice Trading LLC', planId: 'starter', items: 2, active: true, pickupRequested: false },
    { id: 'c2', name: 'Blue Logistics', planId: 'pro', items: 8, active: true, pickupRequested: true },
    { id: 'c3', name: 'City Movers', planId: 'flexi', items: 5, active: true, pickupRequested: false },
  ]);

  const planById = useMemo(() => Object.fromEntries(plans.map((p) => [p.id, p])), [plans]);

  const metrics = useMemo(() => {
    const activeCustomers = customers.filter((c) => c.active);
    const totalItems = activeCustomers.reduce((sum, c) => sum + (c.items || 0), 0);
    const pickupQueue = customers.filter((c) => c.pickupRequested).length;
    const mrr = activeCustomers.reduce((sum, c) => {
      const plan = planById[c.planId];
      if (!plan) return sum;
      if (plan.type === 'fixed') return sum + (plan.price || 0);
      return sum + (c.items || 0) * (plan.perItemPrice || 0);
    }, 0);
    return { mrr, activeCount: activeCustomers.length, totalItems, pickupQueue };
  }, [customers, planById]);

  const updateCustomer = (id, patch) => {
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  const handleSchedulePickup = (id) => {
    updateCustomer(id, { pickupRequested: false });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar currentTab={currentTab} onTabChange={setCurrentTab} />

      <main className="mx-auto max-w-7xl px-4 py-6">
        {currentTab === 'dashboard' && (
          <div className="space-y-6">
            <section>
              <h2 className="mb-3 text-lg font-semibold text-gray-900">Overview</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard label="MRR" value={aed.format(metrics.mrr)} />
                <StatCard label="Active Customers" value={metrics.activeCount} />
                <StatCard label="Total Items" value={metrics.totalItems} />
                <StatCard label="Pickup Queue" value={metrics.pickupQueue} />
              </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="mb-4 text-base font-semibold text-gray-900">Plans at a glance</h3>
              <PlanCards
                plans={plans}
                onSelect={(plan) => alert(`Selected ${plan.name}`)}
              />
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-semibold text-gray-900">Customers</h3>
              </div>
              <CustomersTable
                customers={customers}
                plans={plans}
                onUpdateCustomer={updateCustomer}
              />
            </section>
          </div>
        )}

        {currentTab === 'plans' && (
          <div className="space-y-6">
            <section>
              <h2 className="mb-3 text-lg font-semibold text-gray-900">Plans</h2>
              <PlanCards
                plans={plans}
                onSelect={(plan) => alert(`Selected ${plan.name}`)}
              />
            </section>
          </div>
        )}

        {currentTab === 'customers' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Customers</h2>
            <CustomersTable
              customers={customers}
              plans={plans}
              onUpdateCustomer={updateCustomer}
            />
          </div>
        )}

        {currentTab === 'pickups' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-gray-900">Pickup Requests</h2>
            <PickupBoard customers={customers} onSchedule={handleSchedulePickup} />
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-1 text-2xl font-bold text-gray-900">{value}</div>
    </div>
  );
}
