import { EssayBody } from '@/types/types';
import { OpenAIStream } from '@/utils/streams/essayStream';

export const runtime = 'edge';

export async function GET(req: Request): Promise<Response> {
  try {
    const {
      topic,
      words,
      essayType,
      model,
    } = (await req.json()) as EssayBody;

    const apiKeyFinal = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    const stream = await OpenAIStream(
      topic,
      essayType,
      words,
      model,
      apiKeyFinal
    );

    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
}
export async function POST(req: Request): Promise<Response> {
  try {
    const {
      topic,
      words,
      essayType,
      model,
    } = (await req.json()) as EssayBody;

    const apiKeyFinal = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

    const stream = await OpenAIStream(
      topic,
      essayType,
      words,
      model,
      apiKeyFinal
    );

    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
}