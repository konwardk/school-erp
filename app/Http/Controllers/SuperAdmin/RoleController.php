<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index()
    {
        return Inertia::render('SuperAdmin/Roles/Index', [
            'roles' => Role::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'role_name' => 'required|string|unique:roles',
        ]);

        Role::create($request->all());

        return redirect()->back()->with('success', 'Role created successfully.');
    }
}
