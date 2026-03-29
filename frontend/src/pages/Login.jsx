import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, FolderKanban, ShieldCheck, AlertCircle } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login attempt started for:', email);
        setLoading(true);
        setError('');
        
        try {
            await login(email, password);
            console.log('Login successful');
            navigate('/');
        } catch (err) {
            console.error('Login error detail:', err);
            const message = err.response?.data?.error || err.message || 'Access Denied. Invalid security credentials.';
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 sm:p-8">
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="w-full max-w-sm"
            >
                <div className="flex justify-center mb-10">
                    <Link to="/" className="flex flex-col items-center gap-4 text-center group">
                        <div className="p-4 bg-indigo-600 rounded-3xl shadow-xl shadow-indigo-200 group-hover:scale-105 transition-transform duration-500">
                            <FolderKanban className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">TaskMaster <span className="text-indigo-600">Pro</span></h1>
                    </Link>
                </div>

                <div className="card p-8 bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-2xl">
                    <div className="mb-8">
                        <h2 className="text-xl font-bold text-slate-900">Welcome Back</h2>
                        <p className="text-slate-500 text-sm">Sign in to manage your workstation</p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6" id="login-form">
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }} 
                                animate={{ opacity: 1, scale: 1 }} 
                                className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-xs font-bold flex items-center gap-3"
                            >
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-5">
                            <div className="group">
                                <label htmlFor="email" className="text-[11px] font-black uppercase tracking-wider text-slate-400 pl-1 mb-2 block group-focus-within:text-indigo-600 transition-colors">
                                    Identity / Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                                    <input
                                        id="email"
                                        type="email"
                                        autoComplete="email"
                                        placeholder="name@company.com"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full py-3.5 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 text-sm font-semibold transition-all outline-none"
                                    />
                                </div>
                            </div>

                            <div className="group">
                                <label htmlFor="password" className="text-[11px] font-black uppercase tracking-wider text-slate-400 pl-1 mb-2 block group-focus-within:text-indigo-600 transition-colors">
                                    Security Credentials
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                                    <input
                                        id="password"
                                        type="password"
                                        autoComplete="current-password"
                                        placeholder="••••••••"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full py-3.5 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 text-sm font-semibold transition-all outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading || !email || !password}
                            className="w-full btn btn-primary py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 mt-2 shadow-indigo-200 disabled:opacity-50 disabled:translate-y-0"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Access Panel</span>
                                    <LogIn className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 text-center border-t border-slate-50 pt-8">
                        <p className="text-slate-500 text-sm font-medium">
                            New operative?{' '}
                            <Link to="/register" className="text-indigo-600 font-bold hover:underline">Request Access</Link>
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center opacity-30">
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Secure Protocol v1.0</span>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
