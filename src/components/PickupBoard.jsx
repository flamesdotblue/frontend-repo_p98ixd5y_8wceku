import React from 'react';

export default function PickupBoard({ customers, onSchedule }) {
  const requests = customers.filter((c) => c.pickupRequested);

  if (requests.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-500">
        No pickup requests at the moment.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {requests.map((c) => (
        <div key={c.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <h4 className="text-sm font-semibold text-gray-900">{c.name}</h4>
            <span className="text-xs text-gray-500">{c.items} items</span>
          </div>
          <p className="text-xs text-gray-600">Pickup requested. Schedule and notify the driver.</p>
          <button
            onClick={() => onSchedule(c.id)}
            className="mt-4 w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Schedule Pickup
          </button>
        </div>
      ))}
    </div>
  );
}
