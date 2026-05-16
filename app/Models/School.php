<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class School extends Model
{
    protected $fillable = [
        'school_id',
        'name',
        'address',
        'contact_no',
        'is_active',
    ];

    public static function generateSchoolId()
    {
        $year = date('Y');
        $count = self::count() + 1;
        $formattedCount = str_pad($count, 3, '0', STR_PAD_LEFT);
        
        $schoolId = "SC/{$year}/{$formattedCount}";

        // Ensure uniqueness just in case
        while (self::where('school_id', $schoolId)->exists()) {
            $count++;
            $formattedCount = str_pad($count, 3, '0', STR_PAD_LEFT);
            $schoolId = "SC/{$year}/{$formattedCount}";
        }

        return $schoolId;
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function admins(): HasMany
    {
        return $this->hasMany(Admin::class);
    }
}
