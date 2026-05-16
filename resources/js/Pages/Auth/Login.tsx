import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="mb-8 text-center">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome Back</h1>
                <p className="text-slate-500">Please enter your details to sign in</p>
            </div>

            {status && (
                <div className="mb-6 p-4 rounded-2xl bg-green-50 text-sm font-medium text-green-600 border border-green-100">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="email" value="Email Address" className="text-slate-700 font-semibold mb-1.5" />
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
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="name@example.com"
                        />
                    </div>
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <div className="flex justify-between items-center mb-1.5">
                        <InputLabel htmlFor="password" value="Password" className="text-slate-700 font-semibold" />
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>
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
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center group cursor-pointer">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            className="rounded border-slate-300 text-blue-600 shadow-sm focus:ring-blue-500 h-5 w-5"
                            onChange={(e) =>
                                setData(
                                    'remember',
                                    (e.target.checked || false) as false,
                                )
                            }
                        />
                        <span className="ms-2 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                            Keep me signed in
                        </span>
                    </label>
                </div>

                <div className="pt-2">
                    <PrimaryButton 
                        className="w-full justify-center py-4 text-base font-bold bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-lg shadow-blue-200 transition-all hover:scale-[1.02] active:scale-[0.98]" 
                        disabled={processing}
                    >
                        Sign In <LogIn size={20} className="ml-2" />
                    </PrimaryButton>
                </div>

                <div className="text-center mt-6">
                    <p className="text-slate-500 text-sm">
                        Don't have an account?{' '}
                        <Link
                            href={route('register')}
                            className="font-bold text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>
            </form>
        </GuestLayout>
    );
}
