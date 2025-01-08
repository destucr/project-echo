
// src/app/api/test/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    return NextResponse.json({ 
      message: 'Ome5 Lmao',
      status: 200 
    });
  } catch (error) {
    return NextResponse.json({ 
      message: 'API Error', 
      status: 500 
    }, { 
      status: 500 
    });
  }
}