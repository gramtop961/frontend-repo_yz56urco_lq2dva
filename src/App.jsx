import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import ClientOnboardingForm from './components/ClientOnboardingForm';
import StoryGenerator from './components/StoryGenerator';
import ScrumBoard from './components/ScrumBoard';

function App() {
  const [projects, setProjects] = useState([]);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [stories, setStories] = useState([]);

  const currentProject = useMemo(
    () => projects.find((p) => p.id === currentProjectId) || null,
    [projects, currentProjectId],
  );

  const handleCreateProject = (project) => {
    setProjects((prev) => [project, ...prev]);
    setCurrentProjectId(project.id);
  };

  const handleAddStories = (newStories) => {
    setStories((prev) => [...prev, ...newStories]);
  };

  const handleMove = (id, direction) => {
    const statuses = ['Backlog', 'In Progress', 'Review', 'Done'];
    setStories((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        const idx = statuses.indexOf(s.status);
        const nextIdx = Math.min(Math.max(idx + direction, 0), statuses.length - 1);
        return { ...s, status: statuses[nextIdx] };
      }),
    );
  };

  const handleDropTo = (id, status) => {
    setStories((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ClientOnboardingForm onCreateProject={handleCreateProject} />
            <StoryGenerator currentProject={currentProject} onAddStories={handleAddStories} />
          </div>
          <aside className="space-y-3">
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Projects</h2>
              <p className="text-sm text-slate-500 mb-3">Switch context between active projects.</p>
              <div className="space-y-2 max-h-72 overflow-auto pr-1">
                {projects.length === 0 && (
                  <p className="text-xs text-slate-500">No projects yet. Add one using the form.</p>
                )}
                {projects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setCurrentProjectId(p.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg border transition ${
                      currentProjectId === p.id
                        ? 'border-indigo-600 bg-indigo-50'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{p.projectName}</span>
                      <span className="text-xs text-slate-500">{new Date(p.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-slate-600">{p.clientName}</p>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <ScrumBoard stories={stories} onMove={handleMove} onDropTo={handleDropTo} />

        <footer className="py-6 text-center text-xs text-slate-500">
          Built for rapid client onboarding and sprint planning.
        </footer>
      </main>
    </div>
  );
}

export default App;
