'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { uploadImage } from '@/lib/upload';

export default function EditReferencePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    companyName: '',
    logoPath: '',
    websiteUrl: '',
    isFeaturedHome: false,
  });

  useEffect(() => {
    const fetchReference = async () => {
      try {
        const res = await fetch(`/api/references/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            companyName: data.companyName || '',
            logoPath: data.logoPath || '',
            websiteUrl: data.websiteUrl || '',
            isFeaturedHome: data.isFeaturedHome || false,
          });
        } else {
          console.error(`API Hatası: ${res.status} ${res.statusText}`);
          alert('Referans verileri yüklenemedi.');
        }
      } catch (error) {
        console.error("Fetch Hatası:", error);
        alert('Bir hata oluştu.');
      } finally {
        setInitialLoading(false);
      }
    };
    if (id) fetchReference();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let uploadedUrl = formData.logoPath;
      if (logoFile) {
        const newUrl = await uploadImage(logoFile);
        if (newUrl) {
          uploadedUrl = newUrl;
        } else {
          alert("Resim yüklenirken bir hata oluştu.");
          setLoading(false);
          return;
        }
      }

      const res = await fetch(`/api/references/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          logoPath: uploadedUrl,
          websiteUrl: formData.websiteUrl || null,
        }),
      });

      if (res.ok) {
        router.push('/admin/references');
        router.refresh();
      } else {
        console.error(`API Güncelleme Hatası: ${res.status}`);
        alert('Güncelleme başarısız oldu.');
      }
    } catch (error) {
      console.error("Güncelleme Fetch Hatası:", error);
      alert('Bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="text-center p-8">Yükleniyor...</div>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow max-w-2xl mx-auto mb-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Referans Düzenle</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 text-gray-900">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Firma Adı</label>
          <input required type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Firma Logosu (Yeni bir logo seçerek mevcudu değiştirebilirsiniz)</label>
          {formData.logoPath && !logoFile && (
            <div className="mb-3 relative w-32 h-32 border rounded p-2 bg-gray-50 flex items-center justify-center">
              <Image src={formData.logoPath} alt="Mevcut Logo" fill className="object-contain" />
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" />
          {logoFile && (
            <p className="mt-2 text-sm text-green-600">Yeni seçilen dosya: {logoFile.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Web Sitesi URL (Opsiyonel)</label>
          <input type="url" name="websiteUrl" value={formData.websiteUrl} onChange={handleChange} className="w-full border-gray-300 rounded-md shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 bg-white" placeholder="https://" />
        </div>

        <div className="flex items-center mt-6">
          <input type="checkbox" name="isFeaturedHome" checked={formData.isFeaturedHome} onChange={handleChange} className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
          <label className="ml-2 block text-sm font-medium text-gray-900">Ana Sayfada Öne Çıkar (isFeaturedHome)</label>
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
