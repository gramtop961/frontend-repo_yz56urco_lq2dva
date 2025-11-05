import React from 'react';

const columns = ['Backlog', 'In Progress', 'Review', 'Done'];

const ScrumBoard = ({ stories, onMove, onDropTo }) => {
  const grouped = columns.reduce((acc, col) => {
    acc[col] = stories.filter((s) => s.status === col);
    return acc;
  }, {});

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDrop = (e, status) => {
    const id = e.dataTransfer.getData('text/plain');
    if (id) onDropTo(id, status);
  };

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">Scrum Board</h2>
        <p className="text-sm text-slate-500">Drag and drop stories across columns, or use quick actions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {columns.map((col) => (
          <div key={col} className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-slate-700">{col}</h3>
              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                {grouped[col].length}
              </span>
            </div>
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, col)}
              className="min-h-[220px] rounded-lg border border-dashed border-slate-300 p-2 bg-slate-50"
            >
              {grouped[col].map((s) => (
                <div
                  key={s.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, s.id)}
                  className="mb-2 rounded-lg bg-white border border-slate-200 shadow-sm p-3 cursor-grab active:cursor-grabbing"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-slate-900">{s.title}</h4>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700">{s.points}pt</span>
                  </div>
                  {s.description && (
                    <p className="text-xs text-slate-600 mt-1">{s.description}</p>
                  )}
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => onMove(s.id, -1)}
                      className="text-xs px-2 py-1 rounded bg-slate-100 hover:bg-slate-200"
                    >
                      ←
                    </button>
                    <button
                      onClick={() => onMove(s.id, 1)}
                      className="text-xs px-2 py-1 rounded bg-slate-900 text-white hover:bg-slate-800"
                    >
                      →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScrumBoard;
