<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\School;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SchoolController extends Controller
{
    public function index()
    {
        return Inertia::render('SuperAdmin/Schools/Index', [
            'schools' => School::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('SuperAdmin/Schools/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string',
            'contact_no' => 'nullable|string',
        ]);

        $data = $request->all();
        $data['school_id'] = School::generateSchoolId();

        School::create($data);

        return redirect()->route('superadmin.schools.index')->with('success', 'School created successfully.');
    }
}
