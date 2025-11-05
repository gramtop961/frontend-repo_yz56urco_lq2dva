import React, { useState } from 'react';

const initialForm = {
  clientName: '',
  projectName: '',
  projectDescription: '',
  dueDate: '',
};

const ClientOnboardingForm = ({ onCreateProject }) => {
  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.clientName || !form.projectName) return;
    const project = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      ...form,
      createdAt: new Date().toISOString(),
    };
    onCreateProject(project);
    setForm(initialForm);
  };

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Client Onboarding</h2>
        <p className="text-sm text-slate-500">Capture client and project details to kick off planning.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-600">Client Name</label>
          <input
            type="text"
            name="clientName"
            value={form.clientName}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Acme Corp"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-600">Project Name</label>
          <input
            type="text"
            name="projectName"
            value={form.projectName}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Employee Portal"
            required
          />
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-sm text-slate-600">Project Description</label>
          <textarea
            name="projectDescription"
            value={form.projectDescription}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Briefly describe the scope, key modules, and success criteria"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-slate-600">Target Go-live</label>
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 text-white px-4 py-2 font-medium hover:bg-indigo-700 transition"
          >
            Create Project
          </button>
        </div>
      </form>
    </section>
  );
};

export default ClientOnboardingForm;
