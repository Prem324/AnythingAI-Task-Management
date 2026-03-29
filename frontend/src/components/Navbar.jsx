import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Menu, X, FolderKanban, Sparkles } from 'lucide-react';
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
        <nav className="glass sticky top-0 z-50 py-3 mb-8 border-b border-slate-100">
            <div className="container mx-auto px-4 flex justify-between items-center relative">
                <Link to="/" className="flex items-center gap-3 group transition-all">
                    <div className="p-2 bg-indigo-600 rounded-xl shadow-md group-hover:scale-105 transition-transform">
                        <FolderKanban className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">Task Management</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6">
                    {user ? (
                        <>
                            <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl">
                                <User className="w-4 h-4 text-slate-400" />
                                <span className="text-xs font-bold text-slate-700">{user.name}</span>
                            </div>
                            <button 
                                onClick={handleLogout} 
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 text-slate-600 border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all text-xs font-bold shadow-sm"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Sign Out</span>
                            </button>
                        </>
                    ) : (
                        <div className="flex gap-4 items-center">
                            <Link to="/login" className="text-xs font-bold text-slate-500 hover:text-indigo-600 transition-colors">Sign In</Link>
                            <Link to="/register" className="btn btn-primary px-6 py-2.5 text-xs">Get Started</Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    className="md:hidden p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600"
                >
                    {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div 
                            initial={{ opacity: 0, y: -10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                            className="absolute top-16 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl rounded-2xl md:hidden flex flex-col gap-4 shadow-xl border border-slate-100 z-50 mx-4"
                        >
                            {user ? (
                                <>
                                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                                        <User className="w-5 h-5 text-indigo-500" />
                                        <span className="text-sm font-bold text-slate-800">{user.name}</span>
                                    </div>
                                    <button 
                                        onClick={handleLogout} 
                                        className="w-full py-3 rounded-xl bg-red-50 text-red-600 font-bold text-sm flex items-center justify-center gap-2"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="w-full text-center py-3 text-sm font-bold text-slate-600">Sign In</Link>
                                    <Link to="/register" className="btn btn-primary w-full py-3 rounded-xl text-sm">Register</Link>
                                </>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
};

export default Navbar;
