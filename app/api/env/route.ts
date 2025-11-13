import { NextRequest, NextResponse } from 'next/server';

interface EnvironmentCheckResponse {
  environment: string;
  [key: string]: any;
}

export async function GET(request: NextRequest) {
  try {
    const envData: EnvironmentCheckResponse = {
      environment: process.env.NODE_ENV || 'not set',
      mandong_test_env: process.env.MANDONG_TEST_ENV || 'not set',
      mandong_hello: process.env.MANDONG_HELLO || 'not set',
    };
    
    return NextResponse.json(envData);
  } catch (error) {
    return NextResponse.json(
      {
          environment: process.env.NODE_ENV || 'not set',
          mandong_test_env: process.env.MANDONG_TEST_ENV || 'not set',
          mandong_hello: process.env.MANDONG_HELLO || 'not set',
      } as EnvironmentCheckResponse,
      { status: 500 }
    );
  }
}