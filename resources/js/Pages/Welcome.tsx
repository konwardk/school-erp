import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { 
    BookOpen, 
    Users, 
    ShieldCheck, 
    BarChart3, 
    CheckCircle2,
    ArrowRight,
    School as SchoolIcon,
    Layout,
    GraduationCap,
    Sparkles
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-700 overflow-x-hidden">
            <Head title="Welcome to SchoolERP" />

            {/* Background Animations */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <motion.div 
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-[100px]"
                />
                <motion.div 
                    animate={{
                        scale: [1, 1.1, 1],
                        x: [0, -40, 0],
                        y: [0, 60, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[100px]"
                />
                <motion.div 
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-[20%] left-[10%] w-[300px] h-[300px] bg-sky-50/30 rounded-full blur-[80px]"
                />
            </div>

            {/* Navigation */}
            <motion.nav 
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex items-center space-x-2">
                            <motion.div 
                                whileHover={{ rotate: 15 }}
                                className="bg-blue-600 p-2 rounded-lg text-white"
                            >
                                <SchoolIcon size={24} />
                            </motion.div>
                            <span className="text-2xl font-bold tracking-tight">
                                School<span className="text-blue-600">ERP</span>
                            </span>
                        </div>
                        <div className="flex items-center space-x-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-slate-600 font-medium hover:text-blue-600 transition-colors"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:scale-105 active:scale-95"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </motion.nav>

            <main>
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <motion.div 
                            initial="hidden"
                            animate="visible"
                            variants={containerVariants}
                        >
                            <motion.div 
                                variants={itemVariants}
                                className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-8 border border-blue-100 shadow-sm"
                            >
                                <Sparkles size={16} className="mr-2 text-blue-500" /> All-in-one School Management Solution
                            </motion.div>
                            
                            <motion.h1 
                                variants={itemVariants}
                                className="text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 mb-8 leading-[1.1]"
                            >
                                Manage Your School with <br />
                                <span className="text-blue-600">Modern Intelligence</span>
                            </motion.h1>

                            <motion.p 
                                variants={itemVariants}
                                className="max-w-2xl mx-auto text-xl text-slate-600 mb-12 leading-relaxed"
                            >
                                Streamline admissions, student tracking, attendance, and performance analytics 
                                with our comprehensive ERP platform designed for modern educational institutions.
                            </motion.p>

                            <motion.div 
                                variants={itemVariants}
                                className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
                            >
                                <Link
                                    href={route('register')}
                                    className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center shadow-xl shadow-slate-200 group"
                                >
                                    Get Started Free <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                                </Link>
                                <button className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all">
                                    Watch Demo
                                </button>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-24 bg-slate-50/50 backdrop-blur-sm relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Everything You Need</h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">
                                Powerful tools designed to help administrators, teachers, students, and parents collaborate seamlessly.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Users,
                                    title: "Student Information",
                                    desc: "Comprehensive database for tracking student records, attendance, and disciplinary actions in real-time.",
                                    color: "blue"
                                },
                                {
                                    icon: BarChart3,
                                    title: "Advanced Analytics",
                                    desc: "Visual dashboards and reports to monitor academic performance and institutional growth metrics.",
                                    color: "indigo"
                                },
                                {
                                    icon: ShieldCheck,
                                    title: "Secure & Reliable",
                                    desc: "Enterprise-grade security with role-based access control to keep your institution's data safe and private.",
                                    color: "emerald"
                                }
                            ].map((feature, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
                                >
                                    <div className={`w-14 h-14 bg-${feature.color}-50 text-${feature.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-${feature.color}-600 group-hover:text-white transition-colors`}>
                                        <feature.icon size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-24 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-blue-600 rounded-[3rem] p-12 lg:p-20 text-white flex flex-col lg:flex-row items-center justify-between shadow-2xl shadow-blue-200 relative overflow-hidden"
                        >
                            {/* Inner decoration */}
                            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-10">
                                <motion.div 
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                    className="absolute -top-1/2 -left-1/4 w-full h-full border-[60px] border-white rounded-full"
                                />
                            </div>

                            <div className="text-center lg:text-left mb-10 lg:mb-0 relative z-10">
                                <h2 className="text-4xl font-bold mb-4 leading-tight">Join Thousands of <br />Institutions Worldwide</h2>
                                <p className="text-blue-100 text-lg opacity-80">Empowering education through technology.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-8 lg:gap-16 relative z-10">
                                <div className="text-center">
                                    <motion.div 
                                        whileInView={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="text-4xl lg:text-5xl font-extrabold mb-2"
                                    >500+</motion.div>
                                    <div className="text-blue-100 font-medium">Schools</div>
                                </div>
                                <div className="text-center">
                                    <motion.div 
                                        whileInView={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                        className="text-4xl lg:text-5xl font-extrabold mb-2"
                                    >1M+</motion.div>
                                    <div className="text-blue-100 font-medium">Students</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-slate-900 py-20 text-white relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-2">
                            <div className="flex items-center space-x-2 mb-6">
                                <div className="bg-blue-600 p-2 rounded-lg text-white">
                                    <SchoolIcon size={24} />
                                </div>
                                <span className="text-2xl font-bold tracking-tight">
                                    School<span className="text-blue-600">ERP</span>
                                </span>
                            </div>
                            <p className="text-slate-400 max-w-sm leading-relaxed">
                                The ultimate tool for modern school management. Join the digital transformation of education today.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6">Product</h4>
                            <ul className="space-y-4 text-slate-400">
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6">Support</h4>
                            <ul className="space-y-4 text-slate-400">
                                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-slate-800 flex flex-col md:row items-center justify-between text-slate-500 text-sm">
                        <p>&copy; {new Date().getFullYear()} SchoolERP. Built with Laravel v{laravelVersion} (PHP v{phpVersion})</p>
                        <div className="flex items-center space-x-6 mt-4 md:mt-0">
                            <div className="flex items-center">
                                <CheckCircle2 size={16} className="text-emerald-500 mr-2" /> 
                                System Online
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
