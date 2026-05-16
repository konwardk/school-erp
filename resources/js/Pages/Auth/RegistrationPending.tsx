import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, Mail, ArrowLeft } from 'lucide-react';

export default function RegistrationPending() {
    return (
        <GuestLayout>
            <Head title="Registration Pending" />

            <div className="text-center">
                <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    <Clock size={40} />
                </motion.div>

                <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Registration Successful!</h1>
                
                <div className="space-y-4 mb-8">
                    <p className="text-slate-600 leading-relaxed">
                        Thank you for registering as a <span className="font-bold text-slate-900">School Admin</span>. 
                        Your account has been created and is currently awaiting verification.
                    </p>

                    <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-left space-y-4">
                        <div className="flex items-start">
                            <div className="mt-1 bg-emerald-100 text-emerald-600 p-1 rounded-full mr-3">
                                <CheckCircle2 size={16} />
                            </div>
                            <p className="text-sm text-slate-600">
                                <span className="font-bold text-slate-900">Verification in progress:</span> Our SuperAdmin team will review your credentials shortly.
                            </p>
                        </div>
                        <div className="flex items-start">
                            <div className="mt-1 bg-blue-100 text-blue-600 p-1 rounded-full mr-3">
                                <Mail size={16} />
                            </div>
                            <p className="text-sm text-slate-600">
                                <span className="font-bold text-slate-900">Email Notification:</span> You will receive an email once your school account is activated.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <Link
                        href="/"
                        className="w-full inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                    >
                        Back to Homepage
                    </Link>
                    
                    <div>
                        <Link
                            href={route('login')}
                            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
                        >
                            <ArrowLeft size={16} className="mr-1.5" /> Back to Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
