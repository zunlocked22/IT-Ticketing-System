// pages/index.js
import { useState } from 'react';

export default function TicketForm() {
  const [form, setForm] = useState({fullName: "", email: "", department: "", issueType: "", description: "", priority: ""});
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setForm({fullName: "", email: "", department: "", issueType: "", description: "", priority: ""});
        setMessage("success");
      } else {
        setMessage("error");
      }
    } catch(err) {
      setMessage("error");
    }
  }

  const handleChange = e => setForm({...form, [e.target.id]: e.target.value});

  return (
    <main className="max-w-xl mx-auto bg-white mt-20 p-8 rounded-md shadow">
      <h1 className="text-2xl font-bold text-blue-600 mb-8">Submit a Ticket</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {["fullName", "email", "department", "issueType", "description", "priority"].map(field => (
          <div key={field}>
            <label htmlFor={field} className="block text-sm font-medium">{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            {field === "issueType" || field === "priority" ? (
              <select id={field} required value={form[field]} onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-1">
                <option value="">Select {field}</option>
                {field === "issueType" ? (
                  <>
                    <option>Hardware</option><option>Software</option>
                    <option>Network</option><option>Account Access</option><option>Other</option>
                  </>
                ) : (
                  <>
                    <option>Low</option><option>Medium</option>
                    <option>High</option><option>Critical</option>
                  </>
                )}
              </select>
            ) : field === "description" ? (
              <textarea id={field} required rows={3} value={form[field]} onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-1"/>
            ) : (
              <input id={field} type={field==="email" ? "email" : "text"} required value={form[field]} onChange={handleChange}
                className="w-full border px-3 py-2 rounded mt-1"/>
            )}
          </div>
        ))}
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded w-full hover:bg-blue-700 font-semibold">Submit Ticket</button>
      </form>
      {message==="success" && <p className="text-green-600 font-bold mt-4">Ticket submitted!</p>}
      {message==="error" && <p className="text-red-600 font-bold mt-4">Something went wrong. Please try again.</p>}
    </main>
  )
}
