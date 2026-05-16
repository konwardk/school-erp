<?php

namespace Tests\Feature;

use App\Models\School;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SchoolIdGenerationTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_generates_school_id_in_correct_format()
    {
        $schoolId = School::generateSchoolId();
        $year = date('Y');
        
        // Format: SC/YEAR/001
        $this->assertEquals("SC/{$year}/001", $schoolId);
    }

    public function test_it_increments_school_id_count()
    {
        School::create([
            'school_id' => 'SC/2026/001',
            'name' => 'First School',
        ]);

        $nextId = School::generateSchoolId();
        $year = date('Y');

        $this->assertEquals("SC/{$year}/002", $nextId);
    }

    public function test_it_handles_existing_ids_when_generating()
    {
         School::create([
            'school_id' => 'SC/2026/001',
            'name' => 'First School',
        ]);
        
        // Manually create 002
        School::create([
            'school_id' => 'SC/2026/002',
            'name' => 'Second School',
        ]);

        $nextId = School::generateSchoolId();
        $year = date('Y');

        $this->assertEquals("SC/{$year}/003", $nextId);
    }
}
