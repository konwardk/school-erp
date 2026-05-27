<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\School;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class SchoolAdminController extends Controller
{
    public function index()
    {
        $admins = User::whereHas('role', function($query) {
            $query->where('role_name', 'admin');
        })->with('schools')->get();

        return Inertia::render('SuperAdmin/Admins/Index', [
            'admins' => $admins,
            'schools' => School::where('is_active', true)->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'school_id' => 'required|exists:schools,id',
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $adminRole = Role::where('role_name', 'admin')->first();

        if (!$adminRole) {
            return redirect()->back()->with('error', 'Admin role not found. Please create it first.');
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $adminRole->id,
        ]);

        $user->schools()->attach($request->school_id);

        return redirect()->back()->with('success', 'School Admin created successfully.');
    }
}
