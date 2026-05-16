import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { FormEventHandler } from 'react';

interface School {
    id: number;
    name: string;
}

interface User {
    id: number;
    name: string;
    email: string;
}

interface Admin {
    id: number;
    user: User;
    school: School;
}

interface Props {
    admins: Admin[];
    schools: School[];
}

export default function Index({ admins, schools }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        school_id: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('superadmin.admins.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    School Admins Management
                </h2>
            }
        >
            <Head title="School Admins" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1 overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-medium mb-4">Create School Admin</h3>
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="school_id" value="Select School" />
                                    <select
                                        id="school_id"
                                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                                        value={data.school_id}
                                        onChange={(e) => setData('school_id', e.target.value)}
                                        required
                                    >
                                        <option value="">Select a school</option>
                                        {schools.map((school) => (
                                            <option key={school.id} value={school.id}>{school.name}</option>
                                        ))}
                                    </select>
                                    <InputError message={errors.school_id} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="name" value="Admin Name" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="email" value="Email" />
                                    <TextInput
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('email', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <InputLabel htmlFor="password" value="Password" />
                                    <TextInput
                                        id="password"
                                        type="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('password', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className="mt-6">
                                    <PrimaryButton disabled={processing}>
                                        Create Admin
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>

                        <div className="lg:col-span-2 overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-medium mb-4">Existing School Admins</h3>
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">School</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {admins.map((admin) => (
                                        <tr key={admin.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">{admin.user.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{admin.user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{admin.school.name}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
