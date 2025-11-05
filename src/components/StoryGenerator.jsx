import React, { useMemo, useState } from 'react';

const defaultTemplates = (projectName, description) => [
  {
    title: `Set up repository and CI for ${projectName}`,
    description:
      'Initialize monorepo, branch strategy, code formatting, and continuous integration pipelines.',
    points: 3,
  },
  {
    title: `Define requirements and user roles for ${projectName}`,
    description:
      'Capture personas, epics, and acceptance criteria based on discovery notes.' +
      (description ? ` Context: ${description.slice(0, 120)}...` : ''),
    points: 5,
  },
  {
    title: 'Design database schema and entities',
    description: 'Create ERD, define indexes, and model validation.',
    points: 5,
  },
  {
    title: 'Authentication & authorization',
    description: 'Implement secure login, role-based access, and session handling.',
    points: 8,
  },
];

const StoryGenerator = ({ currentProject, onAddStories }) => {
  const [customTitle, setCustomTitle] = useState('');
  const [customDesc, setCustomDesc] = useState('');
  const [customPoints, setCustomPoints] = useState(3);

  const suggestions = useMemo(() => {
    if (!currentProject) return [];
    return defaultTemplates(
      currentProject.projectName,
      currentProject.projectDescription,
    );
  }, [currentProject]);

  const handleGenerate = () => {
    if (!currentProject) return;
    const generated = suggestions.map((s) => ({
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      ...s,
      status: 'Backlog',
    }));
    onAddStories(generated);
  };

  const handleAddCustom = () => {
    if (!customTitle) return;
    const story = {
      id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      title: customTitle,
      description: customDesc,
      points: Number(customPoints) || 1,
      status: 'Backlog',
    };
    onAddStories([story]);
    setCustomTitle('');
    setCustomDesc('');
    setCustomPoints(3);
  };

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Story Generator</h2>
          <p className="text-sm text-slate-500">Create stories from the onboarding details or add custom tasks.</p>
        </div>
        <div>
          <button
            disabled={!currentProject}
            onClick={handleGenerate}
            className="rounded-lg bg-indigo-600 text-white px-4 py-2 font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            Generate From Project
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <input
          type="text"
          placeholder="Story title"
          value={customTitle}
          onChange={(e) => setCustomTitle(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          placeholder="Short description"
          value={customDesc}
          onChange={(e) => setCustomDesc(e.target.value)}
          className="rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={1}
            max={13}
            value={customPoints}
            onChange={(e) => setCustomPoints(e.target.value)}
            className="w-24 rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleAddCustom}
            className="rounded-lg bg-slate-900 text-white px-4 py-2 font-medium hover:bg-slate-800"
          >
            Add Story
          </button>
        </div>
      </div>

      {currentProject ? (
        <p className="text-xs text-slate-500 mt-3">
          Current project: <span className="font-medium">{currentProject.projectName}</span> for{' '}
          <span className="font-medium">{currentProject.clientName}</span>
        </p>
      ) : (
        <p className="text-xs text-slate-500 mt-3">Create a project to enable auto-generation.</p>
      )}
    </section>
  );
};

export default StoryGenerator;
