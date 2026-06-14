import { useState } from 'react';

const TaskForm = ({ task, onClose, onSubmit }) => {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [priority, setPriority] = useState(task?.priority || 'Medium');
  const [dueDate, setDueDate] = useState(() => {
    if (task?.dueDate) {
      try {
        const date = new Date(task.dueDate);
        return date.toISOString().split('T')[0];
      } catch {
        return '';
      }
    }
    return '';
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required.');
      return;
    }

    setError('');
    setSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || null,
        priority,
        dueDate: dueDate ? new Date(dueDate).toISOString() : null,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save task.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020617]/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-lg bg-[#111827] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 transition-all transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h3 className="text-xl font-bold text-slate-100">
            {task ? 'Edit Objective' : 'New Objective'}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-950/40 border border-red-500/20 rounded-xl text-red-200 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2" htmlFor="task-title">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full glass-input"
              placeholder="e.g. Implement user dashboard integrations"
              required
              maxLength={200}
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-semibold mb-2" htmlFor="task-desc">
              Description
            </label>
            <textarea
              id="task-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full glass-input min-h-[100px] resize-y"
              placeholder="Provide a detailed brief of the task..."
              maxLength={1000}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2" htmlFor="task-priority">
                Priority
              </label>
              <select
                id="task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full glass-input bg-[#0f172a]"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 text-sm font-semibold mb-2" htmlFor="task-date">
                Due Date
              </label>
              <input
                id="task-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full glass-input"
              />
            </div>
          </div>

          {/* Modal Footer / Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-5 bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="py-2.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/10 transition-all disabled:opacity-50"
            >
              {submitting ? 'Saving...' : task ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
