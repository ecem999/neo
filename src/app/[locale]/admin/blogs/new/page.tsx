'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { uploadImage } from '@/lib/upload';

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    titleEn: '',
    slug: '',
    slugEn: '',
    summary: '',
    summaryEn: '',
    content: '',
    contentEn: '',
    author: 'Neo Brand',
    tags: '',
    isPublished: true,
    isFeaturedHome: false,
  });

  const generateSlug = (text: string) => {
    if (!text) return '';
    return text
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => {
        const newData = { ...prev, [name]: value };
        // Auto-generate slug when title changes
        if (name === 'title' && !prev.slug) {
          newData.slug = generateSlug(value);
        }
        if (name === 'titleEn' && !prev.slugEn) {
          newData.slugEn = generateSlug(value);
        }
        return newData;
      });
    }
  };

  const handleSlugBlur = () => {
    if (!formData.slug && formData.title) {
      setFormData(prev => ({ ...prev, slug: generateSlug(prev.title) }));
    } else if (formData.slug) {
      setFormData(prev => ({ ...prev, slug: generateSlug(prev.slug) }));
    }
    
    if (!formData.slugEn && formData.titleEn) {
      setFormData(prev => ({ ...prev, slugEn: generateSlug(prev.titleEn) }));
    } else if (formData.slugEn) {
      setFormData(prev => ({ ...prev, slugEn: generateSlug(prev.slugEn) }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      alert("Lütfen blog için bir ana görsel seçin!");
      return;
    }

    setLoading(true);
    try {
      const imagePath = await uploadImage(imageFile);
      if (!imagePath) {
        alert("Resim yüklenirken bir hata oluştu.");
        setLoading(false);
        return;
      }

      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          imagePath,
        }),
      });

      if (res.ok) {
        router.push('/admin/blogs');
        router.refresh();
      } else {
        const errorData = await res.json();
        alert(`Kayıt başarısız oldu: ${errorData.error || 'Bilinmeyen hata'}`);
      }
    } catch (error) {
      console.error("POST Hatası:", error);
      alert('Beklenmeyen bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow max-w-6xl mx-auto mb-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Yeni Blog Yazısı Ekle</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 text-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Başlık (TR)</label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" placeholder="Yazınızın başlığını girin..." />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Başlık (EN)</label>
            <input type="text" name="titleEn" value={formData.titleEn} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" placeholder="Enter post title..." />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL - TR)</label>
            <input required type="text" name="slug" value={formData.slug} onChange={handleChange} onBlur={handleSlugBlur} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white font-mono text-sm" placeholder="yazinizin-basligi" />
            <p className="text-xs text-gray-500 mt-1">Sitenizde /tr/blog/<strong>slug-adiniz</strong> şeklinde görünecektir.</p>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL - EN)</label>
            <input type="text" name="slugEn" value={formData.slugEn} onChange={handleChange} onBlur={handleSlugBlur} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white font-mono text-sm" placeholder="post-title" />
            <p className="text-xs text-gray-500 mt-1">Sitenizde /en/blog/<strong>slug-name</strong> şeklinde görünecektir.</p>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Yazar İsmi</label>
            <input required type="text" name="author" value={formData.author} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" placeholder="Yazar adını girin..." />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Etiketler (Virgülle ayırın)</label>
            <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" placeholder="#nextjs, #tasarim, #dijital" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ana Görsel (Zorunlu)</label>
            <input required type="file" accept="image/*" onChange={handleFileChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
            {imageFile && <p className="mt-2 text-sm text-green-600">Seçilen dosya: {imageFile.name}</p>}
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Özet (TR)</label>
            <textarea required name="summary" value={formData.summary} onChange={handleChange} rows={3} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" placeholder="Blog yazınızın kısa bir özetini girin..."></textarea>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Özet (EN)</label>
            <textarea name="summaryEn" value={formData.summaryEn} onChange={handleChange} rows={3} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" placeholder="Enter a short summary..."></textarea>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">İçerik (TR)</label>
            <textarea required name="content" value={formData.content} onChange={handleChange} rows={12} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white font-mono text-sm" placeholder="Blog yazınızın tamamını buraya HTML etiketleri ile girebilirsiniz..."></textarea>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">İçerik (EN)</label>
            <textarea name="contentEn" value={formData.contentEn} onChange={handleChange} rows={12} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white font-mono text-sm" placeholder="Enter full HTML content..."></textarea>
          </div>

          <div className="flex items-center mt-2 md:col-span-1">
            <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            <label className="ml-2 block text-sm font-medium text-gray-900">Yayında (Kaydettiğiniz an sitede görünür)</label>
          </div>
          <div className="flex items-center mt-2 md:col-span-1">
            <input type="checkbox" name="isFeaturedHome" checked={formData.isFeaturedHome} onChange={handleChange} className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            <label className="ml-2 block text-sm font-medium text-gray-900">Ana Sayfada Öne Çıkar</label>
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
