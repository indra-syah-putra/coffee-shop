<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Settings', [
            'settings' => Setting::orderBy('group')->orderBy('key')->get(),
        ]);
    }

    public function update(Request $request)
    {
        $settings = $request->validate([
            'settings' => 'required|array',
            'settings.*.id' => 'required|exists:settings,id',
            'settings.*.value' => 'nullable|string',
        ]);

        foreach ($settings['settings'] as $data) {
            $setting = Setting::findOrFail($data['id']);
            if (in_array($setting->type, ['image', 'images'])) {
                continue;
            }
            $setting->update(['value' => $data['value']]);
        }

        return redirect()->back()->with('success', 'Pengaturan berhasil disimpan.');
    }

    public function uploadImage(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:settings,id',
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:2048',
        ]);

        $setting = Setting::findOrFail($validated['id']);

        if ($setting->type === 'image') {
            if ($setting->value) {
                Storage::disk('public')->delete($setting->value);
            }
            $path = $request->file('image')->store('settings', 'public');
            $setting->update(['value' => $path]);
        } elseif ($setting->type === 'images') {
            $images = json_decode($setting->value ?? '[]', true);
            $path = $request->file('image')->store('settings', 'public');
            $images[] = $path;
            $setting->update(['value' => json_encode($images)]);
        }

        return redirect()->back()->with('success', 'Gambar berhasil diupload.');
    }

    public function deleteImage(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:settings,id',
            'index' => 'required|integer|min:0',
        ]);

        $setting = Setting::findOrFail($validated['id']);
        $images = json_decode($setting->value ?? '[]', true);

        if (isset($images[$validated['index']])) {
            Storage::disk('public')->delete($images[$validated['index']]);
            array_splice($images, $validated['index'], 1);
            $setting->update(['value' => json_encode($images)]);
        }

        return redirect()->back()->with('success', 'Gambar berhasil dihapus.');
    }

    public function reorderImages(Request $request)
    {
        $validated = $request->validate([
            'id' => 'required|exists:settings,id',
            'images' => 'required|array',
            'images.*' => 'required|string',
        ]);

        $setting = Setting::findOrFail($validated['id']);
        $setting->update(['value' => json_encode($validated['images'])]);

        return redirect()->back()->with('success', 'Urutan gambar berhasil disimpan.');
    }
}
