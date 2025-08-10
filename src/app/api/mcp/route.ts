import {NextRequest, NextResponse} from 'next/server';
import {validateBearerToken} from '@/ai/flows/mcp-validation';

export async function POST(req: NextRequest) {
  try {
    const {bearerToken} = await req.json();

    if (!bearerToken) {
      return NextResponse.json({error: 'Bearer token is missing.'}, {status: 400});
    }

    const validationResult = await validateBearerToken({bearerToken});

    if (validationResult.isValid && validationResult.phoneNumber) {
      return NextResponse.json({phoneNumber: validationResult.phoneNumber});
    } else {
      return NextResponse.json({error: 'Invalid bearer token.'}, {status: 401});
    }
  } catch (error) {
    console.error('MCP validation error:', error);
    return NextResponse.json({error: 'An unexpected connection error occurred.'}, {status: 500});
  }
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204 });
}
