<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use App\Notifications\NewAdminRegisteredNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class AdminRegistrationFlowTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Seed roles
        Role::create(['role_name' => 'superadmin']);
        Role::create(['role_name' => 'admin']);
        Role::create(['role_name' => 'student']);
        
        // Create a superadmin
        User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@example.com',
            'password' => 'password',
            'role_id' => Role::where('role_name', 'superadmin')->first()->id,
        ]);
    }

    public function test_admin_can_register_and_notifies_superadmin()
    {
        $this->withoutMiddleware();
        Notification::fake();

        $response = $this->post('/register', [
            'name' => 'School Admin',
            'email' => 'schooladmin@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'is_admin_registration' => true,
        ]);

        $response->assertRedirect('/login');
        $response->assertSessionHas('status', 'Your registration is complete. A SuperAdmin will verify your account shortly.');

        $this->assertDatabaseHas('users', [
            'email' => 'schooladmin@example.com',
            'is_active' => false,
        ]);

        $admin = User::where('email', 'schooladmin@example.com')->first();
        $this->assertEquals('admin', $admin->role->role_name);

        $superAdmin = User::where('email', 'superadmin@example.com')->first();
        Notification::assertSentTo($superAdmin, NewAdminRegisteredNotification::class);
    }

    public function test_student_registration_remains_standard()
    {
        $this->withoutMiddleware();
        $response = $this->post('/register', [
            'name' => 'Student User',
            'email' => 'student@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'is_admin_registration' => false,
        ]);

        $response->assertRedirect('/dashboard');
        
        $this->assertDatabaseHas('users', [
            'email' => 'student@example.com',
            'is_active' => true,
        ]);

        $student = User::where('email', 'student@example.com')->first();
        $this->assertEquals('student', $student->role->role_name);
        $this->assertAuthenticatedAs($student);
    }
}
