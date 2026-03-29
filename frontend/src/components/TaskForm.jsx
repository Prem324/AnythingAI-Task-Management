import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Type, AlignLeft, Flag, ListTodo, ChevronDown, CheckCircle2 } from 'lucide-react';

const TaskForm = ({ onSubmit, onCancel, editingTask }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [priority, setPriority] = useState('medium');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title);
            setDescription(editingTask.description || '');
            setStatus(editingTask.status);
            setPriority(editingTask.priority);
            if (editingTask.dueDate) {
                setDueDate(new Date(editingTask.dueDate).toISOString().split('T')[0]);
            }
        }
    }, [editingTask]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ title, description, status, priority, dueDate: dueDate || undefined });
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
            onClick={onCancel}
        >
            <motion.div 
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.98, opacity: 0 }}
                className="w-full max-w-[500px] bg-white rounded-3xl shadow-xl overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <header className="flex justify-between items-center px-8 py-5 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-600 rounded-lg text-white">
                             <ListTodo className="w-5 h-5" />
                        </div>
                        <h2 className="text-lg font-bold text-slate-900">
                            {editingTask ? 'Edit Task' : 'Add Task'}
                        </h2>
                    </div>
                    <button 
                        onClick={onCancel} 
                        className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition-all"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </header>

                <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-6">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                             <label className="text-xs font-bold text-slate-500 pl-1">Title</label>
                             <input
                                 type="text"
                                 placeholder="Enter task title"
                                 required
                                 value={title}
                                 onChange={(e) => setTitle(e.target.value)}
                                 className="w-full py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-indigo-500 transition-all outline-none"
                             />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-bold text-slate-500 pl-1">Description</label>
                            <textarea
                                placeholder="Enter task description"
                                rows="3"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-indigo-500 resize-none transition-all outline-none"
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-500 pl-1">Priority</label>
                                <div className="relative">
                                    <select 
                                        value={priority} 
                                        onChange={(e) => setPriority(e.target.value)}
                                        className="w-full py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold appearance-none cursor-pointer focus:bg-white focus:border-indigo-500 outline-none pr-10"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        <option value="urgent">Urgent</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-500 pl-1">Due Date</label>
                                <input
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className="w-full py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold cursor-pointer focus:bg-white focus:border-indigo-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-2">
                        <button 
                            type="button" 
                            onClick={onCancel}
                            className="flex-1 py-3 border border-slate-200 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="flex-1 btn btn-primary py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
                        >
                            <CheckCircle2 className="w-4 h-4" />
                            <span>{editingTask ? 'Save Changes' : 'Add Task'}</span>
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default TaskForm;
