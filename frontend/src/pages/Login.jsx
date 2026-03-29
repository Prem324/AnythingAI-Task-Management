import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Sparkles, FolderKanban, ShieldCheck } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Access Denied. Invalid security credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm">
                <div className="flex justify-center mb-8">
                    <Link to="/" className="flex flex-col items-center gap-4 text-center group">
                        <div className="p-4 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform">
                            <FolderKanban className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Task Management</h1>
                    </Link>
                </div>

                <div className="card p-8 bg-white rounded-3xl border-none shadow-xl">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {error && (
                            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-bold text-center">
                                {error}
                            </motion.div>
                        )}

                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-500 pl-1 flex items-center gap-2">
                                    <Mail className="w-3.5 h-3.5" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full py-3 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 text-sm font-medium transition-all outline-none"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-slate-500 pl-1 flex items-center gap-2">
                                    <Lock className="w-3.5 h-3.5" />
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full py-3 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 text-sm font-medium transition-all outline-none"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full btn btn-primary py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <LogIn className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-500 text-sm font-medium">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-indigo-600 hover:underline">Register</Link>
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center opacity-40">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Task Management App</span>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
