import { NextRequest, NextResponse } from 'next/server';

interface HealthResponse {
  status: string;
  timestamp: string;
  uptime: number;
}

export async function GET(request: NextRequest) {
  try {
    const healthData: HealthResponse = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
    
    return NextResponse.json(healthData);
  } catch (error) {
    return NextResponse.json(
      {
        status: 'ERROR',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      } as HealthResponse,
      { status: 500 }
    );
  }
}