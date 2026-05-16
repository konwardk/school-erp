import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { FormEventHandler } from 'react';

interface Role {
    id: number;
    role_name: string;
    is_active: boolean;
}

interface Props {
    roles: Role[];
}

export default function Index({ roles }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        role_name: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('superadmin.roles.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Roles Management
                </h2>
            }
        >
            <Head title="Roles" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-medium mb-4">Create New Role</h3>
                            <form onSubmit={submit}>
                                <div>
                                    <InputLabel htmlFor="role_name" value="Role Name" />
                                    <TextInput
                                        id="role_name"
                                        type="text"
                                        value={data.role_name}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('role_name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.role_name} className="mt-2" />
                                </div>
                                <div className="mt-4">
                                    <PrimaryButton disabled={processing}>
                                        Create Role
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>

                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                            <h3 className="text-lg font-medium mb-4">Existing Roles</h3>
                            <ul className="divide-y divide-gray-200">
                                {roles.map((role) => (
                                    <li key={role.id} className="py-2">
                                        {role.role_name} {role.is_active ? '(Active)' : '(Inactive)'}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
