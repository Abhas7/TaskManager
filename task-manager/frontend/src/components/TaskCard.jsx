

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }) => {
  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'Low':
        return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10';
      case 'High':
        return 'bg-rose-500/10 text-rose-400 border border-rose-500/10';
      case 'Medium':
      default:
        return 'bg-amber-500/10 text-amber-400 border border-amber-500/10';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isOverdue = task.dueDate && !task.isCompleted && new Date(task.dueDate) < new Date().setHours(0,0,0,0);

  return (
    <div
      className={`group relative bg-[#111827]/40 border rounded-2xl p-6 backdrop-blur-md shadow-lg transition-all duration-300 ${
        task.isCompleted
          ? 'border-emerald-500/10 opacity-70 hover:opacity-90'
          : 'border-white/5 hover:border-white/10 hover:shadow-xl hover:-translate-y-0.5'
      }`}
    >
      <div className="flex items-start space-x-4">
        {/* Toggle Complete Checkbox */}
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-200 mt-1 ${
            task.isCompleted
              ? 'bg-emerald-500 border-emerald-500 text-slate-900 shadow-md shadow-emerald-500/10'
              : 'border-slate-500 hover:border-blue-400 hover:bg-blue-500/5'
          }`}
        >
          {task.isCompleted && (
            <svg className="w-4 h-4 text-[#0b0f19]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        {/* Task Info */}
        <div className="flex-grow min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h4
              className={`text-lg font-bold truncate transition-all ${
                task.isCompleted ? 'text-slate-500 line-through' : 'text-slate-100'
              }`}
            >
              {task.title}
            </h4>
            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md ${getPriorityStyles(task.priority)}`}>
              {task.priority}
            </span>
          </div>

          <p
            className={`text-sm mb-4 break-words line-clamp-3 leading-relaxed ${
              task.isCompleted ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            {task.description || <span className="italic text-slate-600">No description provided</span>}
          </p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
            {/* Due Date */}
            <div className="flex items-center space-x-1.5 text-xs">
              {task.dueDate ? (
                <>
                  <svg
                    className={`w-4 h-4 ${isOverdue ? 'text-rose-400' : 'text-slate-500'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className={`font-medium ${isOverdue ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
                    {formatDate(task.dueDate)} {isOverdue && '(Overdue)'}
                  </span>
                </>
              ) : (
                <span className="text-slate-600 italic">No due date</span>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => onEdit(task)}
                className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-lg border border-transparent hover:border-blue-500/10 transition-all"
                title="Edit Task"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg border border-transparent hover:border-rose-500/10 transition-all"
                title="Delete Task"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
