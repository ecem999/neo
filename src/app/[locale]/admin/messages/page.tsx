"use client";

import React, { useEffect, useState } from "react";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/contact");
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error("Failed to fetch messages", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Bu mesajı silmek istediğinize emin misiniz?")) return;

    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (selectedMessage?.id === id) setSelectedMessage(null);
      } else {
        alert("Mesaj silinirken bir hata oluştu.");
      }
    } catch (error) {
      console.error("Delete error", error);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await fetch(`/api/contact/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: true }),
      });
      setMessages((prev) =>
        prev.map((m: any) => (m.id === id ? { ...m, isRead: true } : m))
      );
    } catch (error) {
      console.error("Mark as read error", error);
    }
  };

  const openModal = (message: ContactMessage) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      handleMarkAsRead(message.id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gelen Mesajlar</h1>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Yükleniyor...</div>
        ) : messages.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Henüz hiç mesajınız yok.</div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gönderen</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Özet</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Aksiyonlar</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {messages.map((message: any) => (
                <tr key={message.id} className={`hover:bg-gray-50 ${!message.isRead ? "bg-blue-50/30" : ""}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {!message.isRead ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Yeni
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        Okundu
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(message.createdAt).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{message.name}</div>
                    <div className="text-sm text-gray-500">{message.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 line-clamp-1 max-w-md">{message.message}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <button
                      onClick={() => openModal(message)}
                      className="text-[#0e5b9f] hover:text-[#0b4880]"
                    >
                      Oku
                    </button>
                    <button
                      onClick={() => handleDelete(message.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Message Read Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 z-0" onClick={() => setSelectedMessage(null)} aria-hidden="true"></div>

            <div className="relative z-10 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                      Mesaj Detayı
                    </h3>
                    <div className="bg-gray-50 rounded-md p-4 mb-4">
                      <p className="text-sm text-gray-500 mb-1"><strong>Gönderen:</strong> {selectedMessage?.name} ({selectedMessage?.email})</p>
                      <p className="text-sm text-gray-500"><strong>Tarih:</strong> {selectedMessage?.createdAt ? new Date(selectedMessage.createdAt).toLocaleString('tr-TR') : ''}</p>
                    </div>
                    <div className="text-sm text-gray-800 whitespace-pre-wrap bg-gray-50 rounded-md p-4 border border-gray-100 min-h-[100px]">
                      {selectedMessage?.message || 'Mesaj içeriği yok.'}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#0e5b9f] text-base font-medium text-white hover:bg-[#0b4880] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0e5b9f] sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setSelectedMessage(null)}
                >
                  Kapat
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-red-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => handleDelete(selectedMessage.id)}
                >
                  Mesajı Sil
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
