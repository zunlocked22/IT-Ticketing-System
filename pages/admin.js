// pages/admin.js
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    fetch('/api/tickets').then(r => r.json()).then(data => setTickets(data.tickets || []));
  }, []);
  return (
    <main className="max-w-6xl mx-auto mt-20 bg-white p-8 rounded shadow">
      <h1 className="text-2xl mb-6 font-bold text-blue-600">Admin Dashboard</h1>
      <table className="w-full text-left border">
        <thead><tr>
          <th className="px-2 py-1">#</th><th>Name</th><th>Email</th><th>Department</th>
          <th>Type</th><th>Priority</th><th>Description</th>
        </tr></thead>
        <tbody>
          {tickets.length === 0 ? <tr><td colSpan={7} className="text-center text-gray-400 py-4">No tickets yet.</td></tr>
          : tickets.map((t, i) => (
            <tr key={t._id||i} className="odd:bg-blue-50">
              <td className="px-2 py-1">{i+1}</td>
              <td>{t.fullName}</td>
              <td>{t.email}</td>
              <td>{t.department}</td>
              <td>{t.issueType}</td>
              <td>{t.priority}</td>
              <td>{t.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
