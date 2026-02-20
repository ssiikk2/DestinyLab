import { ReadingView } from "@/components/ReadingView";

interface ReadingPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReadingPage({ params }: ReadingPageProps) {
  const { id } = await params;

  return <ReadingView id={id} />;
}