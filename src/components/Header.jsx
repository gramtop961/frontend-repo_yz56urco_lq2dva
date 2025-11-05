import React from 'react';
import { Briefcase, Users, KanbanSquare, Rocket } from 'lucide-react';

const Header = () => {
  return (
    <header className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-600 text-white">
            <Briefcase size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-900">Employee Management</h1>
            <p className="text-xs text-slate-500">Client onboarding • Projects • Stories • Scrum</p>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-slate-600">
          <span className="inline-flex items-center gap-2"><Users size={16}/> Clients</span>
          <span className="inline-flex items-center gap-2"><Rocket size={16}/> Projects</span>
          <span className="inline-flex items-center gap-2"><KanbanSquare size={16}/> Scrum</span>
        </nav>
      </div>
    </header>
  );
};

export default Header;
