import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({ success: true }, { status: 200 });
    
    // Auth cookie'sini temizle
    response.cookies.delete('auth_token');

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Çıkış yapılırken bir hata oluştu.' },
      { status: 500 }
    );
  }
}
