'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { uploadImage } from '@/lib/upload';

export default function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
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
    imagePath: '',
    author: 'Neo Brand',
    tags: '',
    isPublished: true,
    isFeaturedHome: false,
  });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            title: data.title || '',
            titleEn: data.titleEn || '',
            slug: data.slug || '',
            slugEn: data.slugEn || '',
            summary: data.summary || '',
            summaryEn: data.summaryEn || '',
            content: data.content || '',
            contentEn: data.contentEn || '',
            imagePath: data.imagePath || '',
            author: data.author || 'Neo Brand',
            tags: data.tags || '',
            isPublished: data.isPublished ?? true,
            isFeaturedHome: data.isFeaturedHome ?? false,
          });
        } else {
          console.error(`API Hatası: ${res.status}`);
          alert('Blog verileri yüklenemedi.');
        }
      } catch (error) {
        console.error("Fetch Hatası:", error);
        alert('Bir hata oluştu.');
      } finally {
        setInitialLoading(false);
      }
    };
    if (id) fetchBlog();
  }, [id]);

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
    setLoading(true);
    try {
      let finalImagePath = formData.imagePath;

      if (imageFile) {
        const uploadedPath = await uploadImage(imageFile);
        if (!uploadedPath) {
          alert("Resim yüklenirken bir hata oluştu.");
          setLoading(false);
          return;
        }
        finalImagePath = uploadedPath;
      }

      const res = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          imagePath: finalImagePath,
        }),
      });

      if (res.ok) {
        router.push('/admin/blogs');
        router.refresh();
      } else {
        const errorData = await res.json();
        alert(`Güncelleme başarısız oldu: ${errorData.error || 'Bilinmeyen hata'}`);
      }
    } catch (error) {
      console.error("PUT Hatası:", error);
      alert('Beklenmeyen bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="text-center p-8">Yükleniyor...</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow max-w-6xl mx-auto mb-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Blog Yazısını Düzenle</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 text-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Başlık (TR)</label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Başlık (EN)</label>
            <input type="text" name="titleEn" value={formData.titleEn} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL - TR)</label>
            <input required type="text" name="slug" value={formData.slug} onChange={handleChange} onBlur={handleSlugBlur} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white font-mono text-sm" />
            <p className="text-xs text-gray-500 mt-1">Sitenizde /tr/blog/<strong>{formData.slug || 'slug-adiniz'}</strong> şeklinde görünecektir.</p>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Slug (URL - EN)</label>
            <input type="text" name="slugEn" value={formData.slugEn} onChange={handleChange} onBlur={handleSlugBlur} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white font-mono text-sm" />
            <p className="text-xs text-gray-500 mt-1">Sitenizde /en/blog/<strong>{formData.slugEn || 'slug-name'}</strong> şeklinde görünecektir.</p>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Yazar İsmi</label>
            <input required type="text" name="author" value={formData.author} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Etiketler (Virgülle ayırın)</label>
            <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Ana Görsel (Değiştirmek isterseniz yeni dosya seçin)</label>
            {formData.imagePath && !imageFile && (
              <div className="mb-3 relative w-48 h-32 border rounded overflow-hidden">
                <Image src={formData.imagePath} alt="Mevcut Görsel" fill className="object-cover" />
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
            {imageFile && <p className="mt-2 text-sm text-green-600">Yeni seçilen dosya: {imageFile.name}</p>}
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Özet (TR)</label>
            <textarea required name="summary" value={formData.summary} onChange={handleChange} rows={3} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white"></textarea>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Özet (EN)</label>
            <textarea name="summaryEn" value={formData.summaryEn} onChange={handleChange} rows={3} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white"></textarea>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">İçerik (TR)</label>
            <textarea required name="content" value={formData.content} onChange={handleChange} rows={12} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white font-mono text-sm"></textarea>
          </div>

          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">İçerik (EN)</label>
            <textarea name="contentEn" value={formData.contentEn} onChange={handleChange} rows={12} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white font-mono text-sm"></textarea>
          </div>

          <div className="flex items-center mt-2 md:col-span-1">
            <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            <label className="ml-2 block text-sm font-medium text-gray-900">Yayında</label>
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
          <button type="submit" disabled={loading} className="px-6 py-2 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors font-medium">
            {loading ? 'Güncelleniyor...' : 'Güncelle'}
          </button>
        </div>
      </form>
    </div>
  );
}
