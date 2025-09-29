<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
        return [
            'name' => 'required|unique:product',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg,webp',
            'detail' => 'required',
            'category_id' => 'required',
            'brand_id' => 'required',
            'price_root' => 'required',
            // 'price_sale' => 'required',

        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Tên sản phẩm là bắt buộc.',
            'name.unique' => 'Tên sản phẩm đã tồn tại.',
            'detail.required' => 'Chi tiết sản phẩm là bắt buộc.',
            'thumbnail.image' => 'Hình ảnh không hợp lệ.',
            'thumbnail.mimes' => 'Hình ảnh phải có định dạng jpeg, png, jpg, hoặc gif.',

            'category_id.required' => 'Danh mục là bắt buộc.',
            'category_id.exists' => 'Danh mục không tồn tại.',
            'brand_id.required' => 'Thương hiệu là bắt buộc.',
            'price_root.required' => 'Giá gốc là bắt buộc.',
            // 'price_sale.required' => 'Giá khuyến mãi là bắt buộc.',
        ];
    }
}
