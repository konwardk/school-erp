<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            ['role_name' => 'superadmin'],
            ['role_name' => 'admin'],
            ['role_name' => 'student'],
            ['role_name' => 'student_manager'],
            ['role_name' => 'admission_manager'],
            ['role_name' => 'academics_manager'],
        ];

        foreach ($roles as $role) {
            Role::firstOrCreate(['role_name' => $role['role_name']], $role);
        }

        // Create Super Admin
        $superAdminRole = Role::where('role_name', 'superadmin')->first();

        User::firstOrCreate(
            ['email' => 'super@admin.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'),
                'role_id' => $superAdminRole->id,
                'is_active' => true,
            ]
        );
    }
}
