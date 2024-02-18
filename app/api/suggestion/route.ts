export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_GET_CHAT_GPT_SUGGESTION_API_URL!,
    {
      cache: "no-store",
    }
  );

  const textData = await response.text();

  return new Response(JSON.stringify(textData.trim()), {
    status: 200,
  });
}
