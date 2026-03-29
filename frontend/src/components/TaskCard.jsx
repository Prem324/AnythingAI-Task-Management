import { Trash2, Edit2, Calendar, Clock, CheckCircle, Info, MoreVertical, Flag, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const TaskCard = ({ task, onDelete, onEdit, onStatusChange }) => {
    const { user } = useAuth();

    const getPriorityStyles = (priority) => {
        switch (priority) {
            case 'urgent': return 'bg-red-50 text-red-600 border-red-100';
            case 'high': return 'bg-orange-50 text-orange-600 border-orange-100';
            case 'medium': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
            case 'low': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-100';
        }
    };

    const getStatusStyles = (status) => {
        switch (status) {
            case 'completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'in-progress': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
            default: return 'bg-slate-50 text-slate-500 border-slate-100';
        }
    };

    const formatDate = (date) => {
        if (!date) return 'No Horizon';
        return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    return (
        <div className="card h-full flex flex-col p-5 bg-white hover:border-indigo-100 transition-all duration-200">
            <div className="flex justify-between items-start gap-4 mb-3">
                <div className="flex flex-col gap-1.5 flex-1 overflow-hidden">
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider border w-fit ${getPriorityStyles(task.priority)}`}>
                        {task.priority}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
                        {task.title}
                    </h3>
                </div>
                <div className="flex gap-1 shrink-0">
                    <button 
                        onClick={() => onEdit(task)} 
                        className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-50 hover:text-indigo-600 transition-all"
                        title="Edit"
                    >
                        <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {user?.role === 'admin' && (
                        <button 
                            onClick={() => onDelete(task._id)} 
                            className="p-1.5 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all"
                            title="Delete"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                        </button>
                    )}
                </div>
            </div>

            <p className="text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed mb-4 min-h-[32px]">
                {task.description || "No description provided."}
            </p>

            <div className="mt-auto flex flex-col gap-3">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 border-t border-slate-50 pt-3">
                    <Calendar className="w-3 h-3" />
                    <span>Due: {formatDate(task.dueDate)}</span>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                        <select 
                            value={task.status} 
                            onChange={(e) => onStatusChange(task._id, e.target.value)}
                            className="w-full text-[10px] font-bold text-slate-600 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-lg appearance-none cursor-pointer focus:border-indigo-400 outline-none"
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                        <MoreVertical className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-300 pointer-events-none" />
                    </div>
                    
                    <div className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider border ${getStatusStyles(task.status)}`}>
                        {task.status}
                    </div>
                </div>

                {user?.role === 'admin' && task.user?.name && (
                    <div className="flex items-center gap-2 pt-2">
                        <UserIcon className="w-3 h-3 text-slate-300" />
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">
                            By <span className="text-indigo-500">{task.user.name}</span>
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
