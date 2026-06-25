'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { uploadImage } from '@/lib/upload';

export default function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  
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
    iconPath: '',
    isFeaturedHome: false,
    detailMainTitle: '',
    detailMainTitleEn: '',
    detailSmallDescription: '',
    detailSmallDescriptionEn: '',
    image1: '',
    subTitle1: '',
    subTitle1En: '',
    text1: '',
    text1En: '',
    image2: '',
    subTitle2: '',
    subTitle2En: '',
    text2: '',
    text2En: '',
    image3: '',
    subTitle3: '',
    subTitle3En: '',
    text3: '',
    text3En: '',
    order: 0,
  });

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`/api/services/${id}`);
        if (res.ok) {
          const data = await res.json();
          // Map null values to empty strings to avoid uncontrolled input warnings
          const sanitizedData = Object.fromEntries(
            Object.entries(data).map(([key, value]) => [key, value === null ? '' : value])
          );
          setFormData(prev => ({ ...prev, ...sanitizedData }));
        } else {
          console.error(`API Hatası: ${res.status} ${res.statusText}`);
          alert('Hizmet verileri yüklenemedi.');
        }
      } catch (error) {
        console.error("Fetch Hatası:", error);
        alert('Bir hata oluştu.');
      } finally {
        setInitialLoading(false);
      }
    };
    if (id) fetchService();
  }, [id]);

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
    setLoading(true);
    try {
      let finalIconPath = formData.iconPath;
      let finalImage1 = formData.image1;
      let finalImage2 = formData.image2;
      let finalImage3 = formData.image3;

      const [newIcon, newImg1, newImg2, newImg3] = await Promise.all([
        iconFile ? uploadImage(iconFile) : Promise.resolve(null),
        image1File ? uploadImage(image1File) : Promise.resolve(null),
        image2File ? uploadImage(image2File) : Promise.resolve(null),
        image3File ? uploadImage(image3File) : Promise.resolve(null),
      ]);

      if (iconFile && !newIcon) throw new Error("İkon yüklenemedi");

      if (newIcon) finalIconPath = newIcon;
      if (newImg1) finalImage1 = newImg1;
      if (newImg2) finalImage2 = newImg2;
      if (newImg3) finalImage3 = newImg3;

      const res = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          iconPath: finalIconPath,
          image1: finalImage1,
          image2: finalImage2,
          image3: finalImage3
        }),
      });

      if (res.ok) {
        router.push('/admin/services');
        router.refresh();
      } else {
        console.error(`API Güncelleme Hatası: ${res.status}`);
        alert('Güncelleme başarısız oldu.');
      }
    } catch (error) {
      console.error("Güncelleme Fetch Hatası:", error);
      alert('Resim yüklenirken veya kaydedilirken hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="text-center p-8">Yükleniyor...</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow max-w-6xl mx-auto mb-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Hizmet Düzenle</h1>
      
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
            <label className="block text-sm font-medium text-gray-700 mb-1">İkon</label>
            {formData.iconPath && !iconFile && (
              <div className="mb-3 relative w-16 h-16 border rounded p-2 bg-gray-50 flex items-center justify-center">
                <Image src={formData.iconPath} alt="Mevcut İkon" fill className="object-contain" />
              </div>
            )}
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setIconFile)} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
            {iconFile && <p className="mt-1 text-xs text-green-600">Yeni seçilen dosya: {iconFile.name}</p>}
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
            {formData.image1 && !image1File && (
              <div className="mb-3 relative w-32 h-20 border rounded overflow-hidden">
                <Image src={formData.image1} alt="Resim 1" fill className="object-cover" />
              </div>
            )}
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setImage1File)} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
            {image1File && <p className="mt-1 text-xs text-green-600">Yeni seçilen dosya: {image1File.name}</p>}
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
            {formData.image2 && !image2File && (
              <div className="mb-3 relative w-32 h-20 border rounded overflow-hidden">
                <Image src={formData.image2} alt="Resim 2" fill className="object-cover" />
              </div>
            )}
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setImage2File)} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
            {image2File && <p className="mt-1 text-xs text-green-600">Yeni seçilen dosya: {image2File.name}</p>}
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
            {formData.image3 && !image3File && (
              <div className="mb-3 relative w-32 h-20 border rounded overflow-hidden">
                <Image src={formData.image3} alt="Resim 3" fill className="object-cover" />
              </div>
            )}
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setImage3File)} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
            {image3File && <p className="mt-1 text-xs text-green-600">Yeni seçilen dosya: {image3File.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alt Başlık 3 (TR)</label>
            <input type="text" name="subTitle3" value={formData.subTitle3} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Alt Başlık 3 (EN)</label>
            <input type="text" name="subTitle3En" value={formData.subTitle3En} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Metin 3 (TR)</label>
            <textarea name="text3" value={formData.text3} onChange={handleChange} rows={3} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white"></textarea>
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
          <button type="submit" disabled={loading} className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors font-medium">
            {loading ? 'Yükleniyor...' : 'Güncelle'}
          </button>
        </div>
      </form>
    </div>
  );
}
