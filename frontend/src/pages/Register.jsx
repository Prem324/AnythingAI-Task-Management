import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LucideUser, LucideMail, LucideLock, LucideLogIn, LucideSparkles, LucideFolderKanban, LucideShieldCheck } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await register({ name, email, password });
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Initialization Failed. Please try another identity.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
            <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm">
                <div className="flex justify-center mb-6">
                    <Link to="/" className="flex flex-col items-center gap-3 text-center group">
                        <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform">
                            <LucideFolderKanban className="w-7 h-7 text-white" />
                        </div>
                        <h1 className="text-xl font-bold text-slate-900 tracking-tight">Task Management</h1>
                    </Link>
                </div>

                <div className="card p-7 bg-white rounded-3xl border-none shadow-xl">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {error && (
                            <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-[10px] font-bold text-center">
                                {error}
                            </motion.div>
                        )}

                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-500 pl-1 flex items-center gap-2">
                                    <LucideUser className="w-3 h-3" />
                                    Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 text-sm font-medium transition-all outline-none"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-500 pl-1 flex items-center gap-2">
                                    <LucideMail className="w-3 h-3" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 text-sm font-medium transition-all outline-none"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-bold text-slate-500 pl-1 flex items-center gap-2">
                                    <LucideLock className="w-3 h-3" />
                                    Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Min 6 characters"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-indigo-500 text-sm font-medium transition-all outline-none"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full btn btn-primary py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mt-2"
                        >
                            {loading ? (
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <LucideShieldCheck className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-slate-500 text-xs font-medium">
                            Already have an account?{' '}
                            <Link to="/login" className="text-indigo-600 hover:underline">Sign In</Link>
                        </p>
                    </div>
                </div>

                <div className="mt-6 text-center opacity-30">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-slate-800">Task Management App</span>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
