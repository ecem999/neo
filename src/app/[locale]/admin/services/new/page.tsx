'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { uploadImage } from '@/lib/upload';

export default function NewServicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [image1File, setImage1File] = useState<File | null>(null);
  const [image2File, setImage2File] = useState<File | null>(null);
  const [image3File, setImage3File] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    slug: '',
    slugEn: '',
    miniDescription: '',
    miniDescriptionEn: '',
    isFeaturedHome: false,
    detailMainTitle: '',
    detailMainTitleEn: '',
    detailSmallDescription: '',
    detailSmallDescriptionEn: '',
    subTitle1: '',
    subTitle1En: '',
    text1: '',
    text1En: '',
    subTitle2: '',
    subTitle2En: '',
    text2: '',
    text2En: '',
    subTitle3: '',
    subTitle3En: '',
    text3: '',
    text3En: '',
    order: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!iconFile) {
      alert("Lütfen en azından bir İkon seçin!");
      return;
    }

    setLoading(true);
    try {
      // Paralel Yükleme
      const [iconPath, image1, image2, image3] = await Promise.all([
        iconFile ? uploadImage(iconFile) : Promise.resolve(''),
        image1File ? uploadImage(image1File) : Promise.resolve(''),
        image2File ? uploadImage(image2File) : Promise.resolve(''),
        image3File ? uploadImage(image3File) : Promise.resolve(''),
      ]);

      if (iconFile && !iconPath) throw new Error("İkon yüklenemedi");

      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          iconPath,
          image1,
          image2,
          image3
        }),
      });

      if (res.ok) {
        router.push('/admin/services');
        router.refresh();
      } else {
        alert('Kayıt başarısız oldu.');
      }
    } catch (error) {
      console.error("Yükleme Hatası:", error);
      alert('Resim yüklenirken veya kaydedilirken hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow max-w-6xl mx-auto mb-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Yeni Hizmet Ekle</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 text-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Başlık (TR)</label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Başlık (EN)</label>
            <input type="text" name="titleEn" value={formData.titleEn} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL - TR)</label>
            <input required type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL - EN)</label>
            <input type="text" name="slugEn" value={formData.slugEn} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Kısa Açıklama (TR)</label>
            <textarea required name="miniDescription" value={formData.miniDescription} onChange={handleChange} rows={2} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white"></textarea>
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Kısa Açıklama (EN)</label>
            <textarea name="miniDescriptionEn" value={formData.miniDescriptionEn} onChange={handleChange} rows={2} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">İkon (Zorunlu)</label>
            <input required type="file" accept="image/*" onChange={(e) => handleFileChange(e, setIconFile)} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
            {iconFile && <p className="mt-1 text-xs text-green-600">{iconFile.name}</p>}
          </div>
          
          <div className="flex items-center mt-6">
            <input type="checkbox" name="isFeaturedHome" checked={formData.isFeaturedHome} onChange={handleChange} className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            <label className="ml-2 block text-sm font-medium text-gray-900">Ana Sayfada Öne Çıkar (isFeaturedHome)</label>
          </div>

          <div className="md:col-span-2 border-t pt-4 mt-2">
            <h3 className="font-semibold text-lg text-gray-800 mb-4">Detay Sayfası Alanları</h3>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Detay Ana Başlık (TR)</label>
            <input required type="text" name="detailMainTitle" value={formData.detailMainTitle} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Detay Ana Başlık (EN)</label>
            <input type="text" name="detailMainTitleEn" value={formData.detailMainTitleEn} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Detay Kısa Açıklama (TR)</label>
            <input required type="text" name="detailSmallDescription" value={formData.detailSmallDescription} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Detay Kısa Açıklama (EN)</label>
            <input type="text" name="detailSmallDescriptionEn" value={formData.detailSmallDescriptionEn} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
          </div>

          {/* Bölüm 1 */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Resim 1 (Opsiyonel)</label>
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setImage1File)} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
            {image1File && <p className="mt-1 text-xs text-green-600">{image1File.name}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alt Başlık 1 (TR)</label>
            <input required type="text" name="subTitle1" value={formData.subTitle1} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alt Başlık 1 (EN)</label>
            <input type="text" name="subTitle1En" value={formData.subTitle1En} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Metin 1 (TR)</label>
            <textarea required name="text1" value={formData.text1} onChange={handleChange} rows={3} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white"></textarea>
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Metin 1 (EN)</label>
            <textarea name="text1En" value={formData.text1En} onChange={handleChange} rows={3} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white"></textarea>
          </div>

          {/* Bölüm 2 */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Resim 2 (Opsiyonel)</label>
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setImage2File)} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
            {image2File && <p className="mt-1 text-xs text-green-600">{image2File.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alt Başlık 2 (TR)</label>
            <input required type="text" name="subTitle2" value={formData.subTitle2} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alt Başlık 2 (EN)</label>
            <input type="text" name="subTitle2En" value={formData.subTitle2En} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Metin 2 (TR)</label>
            <textarea required name="text2" value={formData.text2} onChange={handleChange} rows={3} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white"></textarea>
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Metin 2 (EN)</label>
            <textarea name="text2En" value={formData.text2En} onChange={handleChange} rows={3} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white"></textarea>
          </div>

          {/* Bölüm 3 */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Resim 3 (Opsiyonel)</label>
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setImage3File)} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
            {image3File && <p className="mt-1 text-xs text-green-600">{image3File.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alt Başlık 3 (TR)</label>
            <input required type="text" name="subTitle3" value={formData.subTitle3} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alt Başlık 3 (EN)</label>
            <input type="text" name="subTitle3En" value={formData.subTitle3En} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Metin 3 (TR)</label>
            <textarea required name="text3" value={formData.text3} onChange={handleChange} rows={3} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white"></textarea>
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Metin 3 (EN)</label>
            <textarea name="text3En" value={formData.text3En} onChange={handleChange} rows={3} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sıralama (Order)</label>
            <input type="number" name="order" value={formData.order} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6 border-t mt-6">
          <button type="button" onClick={() => router.back()} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors font-medium">
            İptal
          </button>
          <button type="submit" disabled={loading} className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors font-medium">
            {loading ? 'Yükleniyor...' : 'Kaydet'}
          </button>
        </div>
      </form>
    </div>
  );
}
