<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Gọi seeder cho bảng user
        $this->call([
            UserSeeder::class,
            CategorySeeder::class,
            BrandSeeder::class,
            ProductSeeder::class,
            PostSeeder::class,
            TopicSeeder::class,
            MenuSeeder::class,
            ContactSeeder::class,
            OrderSeeder::class,
            OrderdetailSeeder::class,
            BannerSeeder::class,
        ]);
    }
}




