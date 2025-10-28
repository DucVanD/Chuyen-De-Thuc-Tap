<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        // Cho phép request này được chạy
        return true;
    }

    public function rules(): array
    {
        return [
            'fullName' => 'required|string|max:255',
            'email' => 'required|email:rfc,dns|unique:user,email',
            'password' => 'required|string|min:6|confirmed',
            'phone' => 'required|string|regex:/^0\d{9}$/|unique:user,phone',
            'username' => 'nullable|string|max:255|unique:user,username',
            'address' => 'nullable|string|max:1000',
            'avatar' => 'nullable|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'fullName.required' => 'Họ và tên không được để trống.',
            'fullName.max' => 'Họ và tên không được vượt quá 255 ký tự.',

            'email.required' => 'Email là bắt buộc.',
            'email.email' => 'Email không hợp lệ hoặc không tồn tại.',
            'email.unique' => 'Email này đã được sử dụng.',

            'password.required' => 'Mật khẩu là bắt buộc.',
            'password.min' => 'Mật khẩu phải có ít nhất 6 ký tự.',
            'password.confirmed' => 'Mật khẩu xác nhận không khớp.',

            'phone.required' => 'Số điện thoại là bắt buộc.',
            'phone.regex' => 'Số điện thoại phải gồm 10 chữ số và bắt đầu bằng số 0.',
            'phone.unique' => 'Số điện thoại này đã được đăng ký.',

            'username.unique' => 'Tên đăng nhập đã tồn tại.',
            'username.max' => 'Tên đăng nhập không được vượt quá 255 ký tự.',

            'address.max' => 'Địa chỉ không được vượt quá 1000 ký tự.',
            'avatar.max' => 'Tên ảnh đại diện không được vượt quá 255 ký tự.',
        ];
    }
}
