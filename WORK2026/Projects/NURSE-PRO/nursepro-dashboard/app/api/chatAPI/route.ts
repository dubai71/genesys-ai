import { ChatBody } from '@/types/types';
import { OpenAIStream } from '@/utils/streams/chatStream';

export const runtime = 'edge';

export async function GET(req: Request): Promise<Response> {
  try {
    const { inputMessage, model } = (await req.json()) as ChatBody;

    const apiKeyFinal = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    const stream = await OpenAIStream(inputMessage, model, apiKeyFinal);

    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
}
export async function POST(req: Request): Promise<Response> {
  try {
    const { inputMessage, model } = (await req.json()) as ChatBody;

    const apiKeyFinal = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    const stream = await OpenAIStream(inputMessage, model, apiKeyFinal);

    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
}