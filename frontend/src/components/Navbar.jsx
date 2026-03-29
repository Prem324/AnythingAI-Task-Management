import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Menu, X, FolderKanban, ShieldCheck, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="glass sticky top-0 z-50 py-4 mb-10 border-b border-slate-100/50">
            <div className="container mx-auto px-4 flex justify-between items-center relative">
                <Link to="/" className="flex items-center gap-3.5 group transition-all">
                    <div className="p-2.5 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform duration-500">
                        <FolderKanban className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex flex-col -gap-1">
                        <span className="text-base font-black text-slate-900 tracking-tight leading-none">Task</span>
                        <span className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.2em] leading-none">Manager</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {user ? (
                        <>
                            <div className="flex items-center gap-4 pl-4 border-l border-slate-200">
                                <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm">
                                    <div className="w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">
                                        <User className="w-3 h-3 text-indigo-600" />
                                    </div>
                                    <span className="text-xs font-black text-slate-700 uppercase tracking-wider">{user.name}</span>
                                </div>
                                <button 
                                    onClick={handleLogout} 
                                    className="flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all text-xs font-black uppercase tracking-widest"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex gap-6 items-center">
                            <Link to="/login" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition-colors">Sign In</Link>
                            <Link to="/register" className="btn btn-primary px-8 py-3 text-xs shadow-md">Get Started</Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    className="md:hidden p-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-600 shadow-sm"
                >
                    {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="absolute top-20 left-4 right-4 p-6 bg-white rounded-[2.5rem] md:hidden flex flex-col gap-6 shadow-2xl border border-slate-100 z-50 overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                                <FolderKanban className="w-40 h-40" />
                            </div>

                            {user ? (
                                <>
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-2">Logged in as</span>
                                        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-3xl border border-slate-100">
                                            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-100">
                                                <User className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-base font-black text-slate-800 tracking-tight">{user.name}</span>
                                                <span className="text-xs font-bold text-slate-400">{user.email}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 gap-3">
                                        <button 
                                            onClick={handleLogout} 
                                            className="w-full py-4 rounded-3xl bg-red-50 text-red-600 font-bold text-sm flex items-center justify-center gap-3 transition-colors active:bg-red-100"
                                        >
                                            <LogOut className="w-5 h-5" />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-4 text-sm font-black uppercase tracking-widest text-slate-600 bg-slate-50 rounded-2xl">Sign In</Link>
                                    <Link to="/register" onClick={() => setIsMenuOpen(false)} className="btn btn-primary w-full py-4 rounded-2xl text-sm shadow-xl">Get Started</Link>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
