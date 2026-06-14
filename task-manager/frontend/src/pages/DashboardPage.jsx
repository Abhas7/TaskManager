import { useState, useEffect } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filters
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Pending' | 'Completed'
  const [priorityFilter, setPriorityFilter] = useState('All'); // 'All' | 'Low' | 'Medium' | 'High'

  // Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async (showLoading = false) => {
    try {
      if (showLoading) {
        setLoading(true);
      }
      const response = await api.get('/tasks');
      setTasks(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to fetch tasks. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks(false);
  }, []);

  const handleToggleComplete = async (taskId) => {
    try {
      const response = await api.patch(`/tasks/${taskId}/complete`);
      // Update local state instead of doing full reload for fluid animations
      setTasks(tasks.map(t => t.id === taskId ? response.data : t));
    } catch (err) {
      console.error('Error toggling task:', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setIsFormOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (taskData) => {
    try {
      if (editingTask) {
        // Edit flow
        const response = await api.put(`/tasks/${editingTask.id}`, {
          title: taskData.title,
          description: taskData.description,
          priority: taskData.priority,
          dueDate: taskData.dueDate,
          isCompleted: editingTask.isCompleted // Keep current status on standard edit
        });
        setTasks(tasks.map(t => t.id === editingTask.id ? response.data : t));
      } else {
        // Create flow
        const response = await api.post('/tasks', taskData);
        setTasks([response.data, ...tasks]);
      }
      setIsFormOpen(false);
      setEditingTask(null);
    } catch (err) {
      console.error('Error saving task:', err);
      throw err; // Let form handle display of error
    }
  };

  // Metrics calculations
  const totalCount = tasks.length;
  const completedCount = tasks.filter(t => t.isCompleted).length;
  const pendingCount = totalCount - completedCount;

  // Filter logic
  const filteredTasks = tasks.filter(task => {
    const matchesStatus = 
      statusFilter === 'All' || 
      (statusFilter === 'Completed' && task.isCompleted) || 
      (statusFilter === 'Pending' && !task.isCompleted);
      
    const matchesPriority = 
      priorityFilter === 'All' || 
      task.priority === priorityFilter;

    return matchesStatus && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col pb-12">
      <Navbar />

      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex-grow">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400">
              Workspace Dashboard
            </h1>
            <p className="text-slate-400 mt-1">Keep track of your projects and daily objectives</p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="flex items-center justify-center space-x-2 py-3 px-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all duration-150 self-start md:self-auto"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add Task</span>
          </button>
        </div>

        {/* Task Metrics Summary Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#111827]/40 border border-white/5 rounded-2xl p-6 backdrop-blur-md flex items-center justify-between shadow-xl">
            <div>
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Total Tasks</p>
              <h3 className="text-3xl font-bold mt-2">{totalCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>

          <div className="bg-[#111827]/40 border border-white/5 rounded-2xl p-6 backdrop-blur-md flex items-center justify-between shadow-xl">
            <div>
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Completed</p>
              <h3 className="text-3xl font-bold mt-2 text-emerald-400">{completedCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>

          <div className="bg-[#111827]/40 border border-white/5 rounded-2xl p-6 backdrop-blur-md flex items-center justify-between shadow-xl">
            <div>
              <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider">Pending</p>
              <h3 className="text-3xl font-bold mt-2 text-amber-400">{pendingCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-[#111827]/30 border border-white/5 rounded-2xl p-4 mb-6 backdrop-blur-md flex flex-wrap gap-4 items-center justify-between shadow-lg">
          <div className="flex flex-wrap gap-6 items-center">
            {/* Status Filters */}
            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2">Status</span>
              <div className="flex bg-[#0f172a] p-1 rounded-xl border border-white/5">
                {['All', 'Pending', 'Completed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`py-1.5 px-4 text-xs font-bold rounded-lg transition-all duration-150 ${
                      statusFilter === status
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Priority Filters */}
            <div>
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2">Priority</span>
              <div className="flex bg-[#0f172a] p-1 rounded-xl border border-white/5">
                {['All', 'Low', 'Medium', 'High'].map((priority) => (
                  <button
                    key={priority}
                    onClick={() => setPriorityFilter(priority)}
                    className={`py-1.5 px-4 text-xs font-bold rounded-lg transition-all duration-150 ${
                      priorityFilter === priority
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-slate-400 text-sm font-medium">
            Showing <span className="text-slate-200 font-bold">{filteredTasks.length}</span> of <span className="text-slate-200 font-bold">{totalCount}</span> tasks
          </div>
        </div>

        {/* Task List Section */}
        {error ? (
          <div className="p-6 bg-red-950/20 border border-red-500/20 rounded-2xl text-center text-red-200 shadow-xl">
            <p>{error}</p>
            <button 
              onClick={fetchTasks} 
              className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-100 font-bold rounded-lg border border-red-500/30 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="relative w-12 h-12">
              <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500/20 rounded-full"></div>
              <div className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
            <p className="text-slate-400 text-sm">Loading workspace tasks...</p>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={handleToggleComplete}
            onEditTask={handleOpenEditModal}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </main>

      {/* Task Creation/Editing Modal Overlay */}
      {isFormOpen && (
        <TaskForm
          key={editingTask ? editingTask.id : 'new'}
          task={editingTask}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default DashboardPage;
