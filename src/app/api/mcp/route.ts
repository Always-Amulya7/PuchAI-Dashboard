// src/app/api/mcp/route.ts
import {NextRequest, NextResponse} from 'next/server';
import {validateBearerToken} from '@/ai/flows/mcp-validation';
import Cors from 'cors';
import { promisify } from 'util';

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error on a middleware error
const runMiddleware = promisify(cors);

export async function POST(req: NextRequest) {
  try {
    // Run the CORS middleware
    // HACK: Pass in a mock res object to make cors() happy.
    await runMiddleware(req as any, {
      end: () => {},
      getHeader: () => undefined,
      setHeader: () => {},
      statusCode: 200,
    } as any);

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
  // HACK: Pass in a mock res object to make cors() happy.
  await runMiddleware(req as any, {
    end: () => {},
    getHeader: () => undefined,
    setHeader: () => {},
    statusCode: 200,
  } as any);
  return new NextResponse(null, { status: 204 });
}
