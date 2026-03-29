import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../services/api';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { Plus, Search, Filter, ChevronLeft, ChevronRight, LayoutList, CheckCircle2, Clock, Inbox, Sparkles, FilterX, ChevronDown } from 'lucide-react';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [filter, setFilter] = useState({ status: '', priority: '', search: '' });
    const [pagination, setPagination] = useState({ page: 1, limit: 8, total: 0 });

    const fetchTasks = async () => {
        setLoading(true);
        try {
            let url = `/tasks?page=${pagination.page}&limit=${pagination.limit}`;
            if (filter.status) url += `&status=${filter.status}`;
            if (filter.priority) url += `&priority=${filter.priority}`;
            if (filter.search) url += `&title[regex]=${filter.search}&title[options]=i`;

            const res = await api.get(url);
            setTasks(res.data.data);
            setPagination(prev => ({ ...prev, total: res.data.count }));
        } catch (err) {
            console.error('Error fetching tasks', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [pagination.page, filter.status, filter.priority]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchTasks();
    };

    const handleCreateUpdate = async (taskData) => {
        try {
            if (editingTask) {
                await api.put(`/tasks/${editingTask._id}`, taskData);
            } else {
                await api.post('/tasks', taskData);
            }
            fetchTasks();
            setShowForm(false);
            setEditingTask(null);
        } catch (err) {
            console.error('Error saving task', err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await api.delete(`/tasks/${id}`);
                fetchTasks();
            } catch (err) {
                alert(err.response?.data?.error || 'Failed to delete task');
            }
        }
    };

    const handleStatusChange = async (id, status) => {
        try {
            await api.put(`/tasks/${id}`, { status });
            fetchTasks();
        } catch (err) {
            console.error('Error updating status', err);
        }
    };

    const openEditForm = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: 'spring', damping: 25, stiffness: 400 } }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="container mx-auto px-4 pb-20 sm:pb-8">
                {/* Header Section */}
                <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8 pt-4">
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
                            Task <span className="text-indigo-600">Manager</span>
                        </h1>
                        <p className="text-slate-500 text-sm font-medium mt-1">Manage and track your tasks efficiently.</p>
                    </motion.div>
                    
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => { setEditingTask(null); setShowForm(true); }}
                        className="btn btn-primary px-8 py-4 text-sm sm:py-3 shadow-xl"
                    >
                        <Plus className="w-5 h-5" />
                        <span className="font-black uppercase tracking-wider">Add Task</span>
                    </motion.button>
                </header>

                {/* Toolbar Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-4 mb-8"
                >
                    <div className="flex flex-col md:flex-row gap-4">
                        <form onSubmit={handleSearch} className="relative flex-1 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={filter.search}
                                onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                                className="w-full pl-11 pr-4 py-3.5 bg-white border-slate-200 rounded-2xl text-sm font-semibold focus:border-indigo-400 transition-all outline-none border shadow-sm"
                            />
                        </form>

                        <div className="grid grid-cols-2 md:flex gap-3">
                            <div className="relative flex-1 md:min-w-[160px]">
                                <select 
                                    value={filter.status} 
                                    onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                                    className="w-full pl-4 pr-10 py-3.5 bg-white border-slate-200 rounded-2xl text-[11px] font-black uppercase tracking-wider appearance-none cursor-pointer focus:border-indigo-400 outline-none border shadow-sm"
                                >
                                    <option value="">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>

                            <div className="relative flex-1 md:min-w-[160px]">
                                <select 
                                    value={filter.priority} 
                                    onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
                                    className="w-full pl-4 pr-10 py-3.5 bg-white border-slate-200 rounded-2xl text-[11px] font-black uppercase tracking-wider appearance-none cursor-pointer focus:border-indigo-400 outline-none border shadow-sm"
                                >
                                    <option value="">All Priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                            </div>
                            
                            {(filter.status || filter.priority || filter.search) && (
                                <button 
                                    onClick={() => setFilter({ status: '', priority: '', search: '' })}
                                    className="p-3.5 bg-white hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-2xl transition-all border border-slate-200 shadow-sm"
                                    title="Clear Filters"
                                >
                                    <FilterX className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </motion.div>

                {/* Dashboard Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-40">
                        <div className="w-14 h-14 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                        <p className="mt-8 text-slate-400 font-bold uppercase tracking-[0.2em] text-xs">Synchronizing Workspace...</p>
                    </div>
                ) : tasks.length > 0 ? (
                    <>
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            <AnimatePresence mode="popLayout">
                                {tasks.map(task => (
                                    <motion.div key={task._id} layout variants={itemVariants} exit={{ opacity: 0, scale: 0.9 }}>
                                        <TaskCard
                                            task={task}
                                            onDelete={handleDelete}
                                            onEdit={openEditForm}
                                            onStatusChange={handleStatusChange}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {/* Responsive Pagination */}
                        <div className="mt-16 flex justify-center items-center gap-6">
                            <button
                                disabled={pagination.page === 1}
                                onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
                                className="p-4 rounded-2xl bg-white border border-slate-100 disabled:opacity-20 hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <span className="text-sm font-extrabold text-slate-900 bg-white px-8 py-3.5 rounded-2xl border border-slate-100 shadow-sm">
                                Page {pagination.page}
                            </span>
                            <button
                                disabled={tasks.length < pagination.limit}
                                onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
                                className="p-4 rounded-2xl bg-white border border-slate-100 disabled:opacity-20 hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-sm"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-32 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-slate-200 mx-auto max-w-2xl px-12 text-center"
                    >
                        <div className="p-8 bg-indigo-50 rounded-3xl mb-8 text-indigo-600 shadow-xl shadow-indigo-100">
                            <Inbox className="w-16 h-16" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-slate-900 mb-3">Quiet Workspace</h2>
                        <p className="text-slate-500 mb-10 text-lg font-medium leading-relaxed">Your mission board is currently clear. Deploy some tasks to begin.</p>
                        <button 
                            onClick={() => setShowForm(true)}
                            className="btn btn-primary px-12 py-5"
                        >
                            <Plus className="w-6 h-6" />
                            <span className="text-lg">Initiate Task</span>
                        </button>
                    </motion.div>
                )}
            </main>

            <AnimatePresence>
                {showForm && (
                    <TaskForm
                        onSubmit={handleCreateUpdate}
                        onCancel={() => { setShowForm(false); setEditingTask(null); }}
                        editingTask={editingTask}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
