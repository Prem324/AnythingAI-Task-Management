import { Trash2, Edit2, Calendar, MoreVertical, User as UserIcon, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const TaskCard = ({ task, onDelete, onEdit, onStatusChange }) => {
    const { user } = useAuth();

    const getPriorityStyles = (priority) => {
        switch (priority) {
            case 'urgent': return 'bg-red-50 text-red-600 border-red-100/50';
            case 'high': return 'bg-orange-50 text-orange-600 border-orange-100/50';
            case 'medium': return 'bg-yellow-50 text-yellow-600 border-yellow-100/50';
            case 'low': return 'bg-emerald-50 text-emerald-600 border-emerald-100/50';
            default: return 'bg-slate-50 text-slate-600 border-slate-100/50';
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100/50';
            case 'in-progress': return 'bg-indigo-50 text-indigo-600 border-indigo-100/50';
            default: return 'bg-slate-100/50 text-slate-500 border-slate-200/50';
        }
    };

    const formatDate = (date) => {
        if (!date) return 'TBD';
        return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="card h-full flex flex-col p-6 bg-white hover:border-indigo-200 transition-all duration-300 rounded-[2rem] border border-slate-100 shadow-sm relative group">
            <div className="flex justify-between items-start gap-4 mb-4">
                <div className="flex flex-col gap-2.5 flex-1 overflow-hidden">
                    <div className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.15em] border w-fit shadow-sm ${getPriorityStyles(task.priority)}`}>
                        {task.priority}
                    </div>
                    <h3 className="text-base font-black text-slate-900 line-clamp-2 leading-[1.3] group-hover:text-indigo-600 transition-colors">
                        {task.title}
                    </h3>
                </div>
                <div className="flex gap-2 shrink-0">
                    <button 
                        onClick={() => onEdit(task)} 
                        className="p-2.5 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-indigo-600 transition-all border border-transparent hover:border-slate-100 active:scale-90"
                        title="Edit"
                    >
                        <Edit2 className="w-4 h-4" />
                    </button>
                    {user?.role === 'admin' && (
                        <button 
                            onClick={() => onDelete(task._id)} 
                            className="p-2.5 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all border border-transparent hover:border-red-100 active:scale-90"
                            title="Delete"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            <p className="text-sm text-slate-500 font-medium line-clamp-3 leading-relaxed mb-6 flex-1">
                {task.description || "No description provided."}
            </p>

            <div className="mt-auto flex flex-col gap-4 pt-5 border-t border-slate-50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                        <Clock className="w-3.5 h-3.5 text-slate-300" />
                        <span>Due Date: {formatDate(task.dueDate)}</span>
                    </div>
                    <div className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.1em] border shadow-xs ${getStatusStyles(task.status)}`}>
                        {task.status}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative flex-1 group/select">
                        <select 
                            value={task.status} 
                            onChange={(e) => onStatusChange(task._id, e.target.value)}
                            className="w-full text-xs font-black uppercase tracking-wider text-slate-600 bg-slate-50 border border-slate-100 pl-4 pr-10 py-3 rounded-2xl appearance-none cursor-pointer focus:border-indigo-400 focus:bg-white outline-none transition-all shadow-xs"
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                        <MoreVertical className="absolute right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-300 pointer-events-none group-focus-within/select:text-indigo-400 transition-colors" />
                    </div>
                </div>

                {user?.role === 'admin' && task.user?.name && (
                    <div className="flex items-center gap-2.5 pt-1 px-1">
                        <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
                             <UserIcon className="w-3 h-3 text-slate-400" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                            Assigned to <span className="text-indigo-600 font-black">{task.user.name}</span>
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
