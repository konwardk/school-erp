import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-50 pt-6 sm:justify-center sm:pt-0 overflow-hidden relative">
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
                    className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-50 rounded-full blur-[100px]"
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
                    className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-50 rounded-full blur-[100px]"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Link href="/">
                    <ApplicationLogo className="w-auto h-12" />
                </Link>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-8 w-full overflow-hidden bg-white/80 backdrop-blur-md px-8 py-10 shadow-2xl shadow-blue-100 sm:max-w-md sm:rounded-[2.5rem] border border-white"
            >
                {children}
            </motion.div>
            
            <footer className="mt-8 text-slate-400 text-sm">
                &copy; {new Date().getFullYear()} SchoolERP. All rights reserved.
            </footer>
        </div>
    );
}
