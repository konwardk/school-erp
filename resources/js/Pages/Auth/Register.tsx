import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { User, Mail, Lock, UserPlus, ArrowLeft, Building2, Sparkles } from 'lucide-react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="School Admin Registration" />

            <div className="mb-8 text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-4 border border-blue-100">
                    <Building2 size={14} className="mr-1.5" /> SCHOOL ADMIN REGISTRATION
                </div>
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Join the Network</h1>
                <p className="text-slate-500 text-sm">Apply to manage your school on our modern ERP platform</p>
            </div>

            <form onSubmit={submit} className="space-y-5">
                <div>
                    <InputLabel htmlFor="name" value="Administrator Name" className="text-slate-700 font-semibold mb-1.5" />
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                            <User size={20} />
                        </div>
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="block w-full pl-11 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-2xl"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            placeholder="Your full name"
                        />
                    </div>
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Official Email Address" className="text-slate-700 font-semibold mb-1.5" />
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                            <Mail size={20} />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full pl-11 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-2xl"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            placeholder="admin@school.com"
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabel htmlFor="password" value="Password" className="text-slate-700 font-semibold mb-1.5" />
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                            <Lock size={20} />
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full pl-11 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-2xl"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirm Password"
                        className="text-slate-700 font-semibold mb-1.5"
                    />
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-600 transition-colors">
                            <Lock size={20} />
                        </div>
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="block w-full pl-11 bg-slate-50 border-slate-200 focus:bg-white transition-all rounded-2xl"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            required
                            placeholder="••••••••"
                        />
                    </div>
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                <div className="pt-4 space-y-4">
                    <PrimaryButton 
                        className="w-full justify-center py-4 text-base font-bold bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-lg shadow-blue-200 transition-all hover:scale-[1.02] active:scale-[0.98]" 
                        disabled={processing}
                    >
                        Submit Application <Sparkles size={20} className="ml-2" />
                    </PrimaryButton>

                    <div className="text-center">
                        <Link
                            href={route('login')}
                            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
                        >
                            <ArrowLeft size={16} className="mr-1.5" /> Back to Sign In
                        </Link>
                    </div>
                </div>
                
                <p className="text-[10px] text-center text-slate-400 mt-6 leading-relaxed">
                    By submitting this application, you agree to our Terms of Service and Privacy Policy. 
                    All applications are subject to a manual verification process.
                </p>
            </form>
        </GuestLayout>
    );
}
