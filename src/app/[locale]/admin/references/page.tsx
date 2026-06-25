import Link from 'next/link';
import prisma from '@/lib/prisma';
import DeleteButton from './DeleteButton';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function ReferencesPage() {
  const references = await prisma.reference.findMany({
    select: {
      id: true,
      companyName: true,
      logoPath: true,
      websiteUrl: true,
      isFeaturedHome: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Referanslar</h1>
        <div className="flex gap-4">
          <Link 
            href="/admin/references/new" 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Yeni Referans Ekle
          </Link>
        </div>
      </div>

      {references.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">Henüz hiç referans eklenmemiş.</p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Logo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Firma Adı
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Öne Çıkan
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Website
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {references.map((reference) => (
                <tr key={reference.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative w-12 h-12">
                      {reference.logoPath ? (
                        <Image src={reference.logoPath} alt={reference.companyName} fill className="object-contain" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 flex items-center justify-center text-xs text-gray-500 rounded">Yok</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {reference.companyName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {reference.isFeaturedHome ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        ⭐ Evet
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Hayır
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-w-[200px] truncate">
                    {reference.websiteUrl ? (
                      <a href={reference.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {reference.websiteUrl}
                      </a>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-4">
                    <Link 
                      href={`/admin/references/${reference.id}/edit`} 
                      className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-3 py-1.5 rounded font-medium transition-colors inline-block"
                    >
                      Düzenle
                    </Link>
                    <div className="inline-block">
                      <DeleteButton id={reference.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
