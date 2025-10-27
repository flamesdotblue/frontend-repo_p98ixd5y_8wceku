import React from 'react';

const aed = new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED' });

export default function CustomersTable({ customers, plans, onUpdateCustomer }) {
  const getPlanById = (id) => plans.find((p) => p.id === id);

  const computeMonthlyCharge = (cust) => {
    const plan = getPlanById(cust.planId);
    if (!plan) return 0;
    if (plan.type === 'fixed') return plan.price;
    return (cust.items || 0) * (plan.perItemPrice || 0);
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Customer</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Plan</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Items</th>
            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Monthly</th>
            <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {customers.map((c) => {
            const plan = getPlanById(c.planId) || {};
            return (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="font-medium text-gray-900">{c.name}</div>
                  <div className="text-xs text-gray-500">{c.active ? 'Active' : 'Inactive'}</div>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <select
                    className="rounded-md border-gray-300 text-sm"
                    value={c.planId}
                    onChange={(e) => onUpdateCustomer(c.id, { planId: e.target.value })}
                  >
                    {plans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.type})
                      </option>
                    ))}
                  </select>
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateCustomer(c.id, { items: Math.max(0, (c.items || 0) - 1) })}
                      className="h-8 w-8 rounded-md border border-gray-300 text-gray-700"
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{c.items}</span>
                    <button
                      onClick={() => onUpdateCustomer(c.id, { items: (c.items || 0) + 1 })}
                      className="h-8 w-8 rounded-md border border-gray-300 text-gray-700"
                    >
                      +
                    </button>
                  </div>
                  {plan.type === 'fixed' && (
                    <div className="mt-1 text-xs text-gray-500">Limit: {plan.itemLimit}</div>
                  )}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-gray-900">
                  {aed.format(computeMonthlyCharge(c))}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-600">
                      <input
                        type="checkbox"
                        checked={!!c.pickupRequested}
                        onChange={(e) => onUpdateCustomer(c.id, { pickupRequested: e.target.checked })}
                      />
                      Pickup
                    </label>
                    <button
                      onClick={() => onUpdateCustomer(c.id, { active: !c.active })}
                      className={`rounded-md px-3 py-1.5 text-xs font-medium ${
                        c.active ? 'bg-gray-100 text-gray-700' : 'bg-green-600 text-white'
                      }`}
                    >
                      {c.active ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
