import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email dan password harus diisi' },
        { status: 400 }
      )
    }

    // Login sederhana untuk testing
    if (email === 'admin@f1.com' && password === 'admin123') {
      return NextResponse.json(
        { 
          success: true,
          message: 'Login berhasil'
        },
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Login API error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    )
  }
}