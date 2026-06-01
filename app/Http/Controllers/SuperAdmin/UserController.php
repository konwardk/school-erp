<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\School;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::with(['role', 'schools'])->latest()->get();
        $roles = Role::where('is_active', true)->get();
        $schools = School::where('is_active', true)->get();

        return Inertia::render('SuperAdmin/Users/Index', [
            'users' => $users,
            'roles' => $roles,
            'schools' => $schools,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role_id' => 'required|exists:roles,id',
            'school_ids' => 'nullable|array',
            'school_ids.*' => 'exists:schools,id',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id,
            'is_active' => true,
        ]);

        if ($request->has('school_ids')) {
            $user->schools()->attach($request->school_ids);
        }

        return redirect()->back()->with('success', 'User created successfully.');
    }
}
