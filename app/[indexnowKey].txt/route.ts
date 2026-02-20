import { appEnv } from "@/lib/env";

export async function GET(request: Request) {
  const pathname = new URL(request.url).pathname;
  const lastSegment = pathname.split("/").pop() || "";
  const incomingKey = lastSegment.replace(/\.txt$/i, "");

  if (!appEnv.indexNowKey || incomingKey !== appEnv.indexNowKey) {
    return new Response("Not Found", { status: 404 });
  }

  return new Response(appEnv.indexNowKey, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
