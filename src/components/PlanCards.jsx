import React from 'react';

const aed = new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED' });

export default function PlanCards({ plans, onSelect }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={`relative rounded-xl border p-5 shadow-sm transition hover:shadow ${
            plan.type === 'flexi' ? 'border-blue-300 bg-blue-50/40' : 'border-gray-200 bg-white'
          }`}
        >
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600 uppercase tracking-wide">
              {plan.type}
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {plan.type === 'flexi' ? (
              <>
                {aed.format(plan.perItemPrice)}
                <span className="ml-1 text-sm font-medium text-gray-500">/item</span>
              </>
            ) : (
              <>
                {aed.format(plan.price)}
                <span className="ml-1 text-sm font-medium text-gray-500">/mo</span>
              </>
            )}
          </p>
          <ul className="mt-4 space-y-1 text-sm text-gray-700">
            {plan.type === 'fixed' && (
              <li>Up to {plan.itemLimit} items included</li>
            )}
            {plan.features?.map((f, idx) => (
              <li key={idx}>• {f}</li>
            ))}
          </ul>
          <button
            onClick={() => onSelect?.(plan)}
            className="mt-5 w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Choose {plan.name}
          </button>
        </div>
      ))}
    </div>
  );
}
