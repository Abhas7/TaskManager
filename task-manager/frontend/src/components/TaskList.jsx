
import TaskCard from './TaskCard';

const TaskList = ({ tasks, onToggleComplete, onEditTask, onDeleteTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-[#111827]/20 border border-white/5 rounded-2xl p-12 text-center shadow-xl backdrop-blur-md">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-800/50 text-slate-500 rounded-full mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-200">No objectives found</h3>
        <p className="text-slate-500 text-sm mt-2 max-w-sm mx-auto">
          Create a new task or adjust your status/priority filters to see your work checklist.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
