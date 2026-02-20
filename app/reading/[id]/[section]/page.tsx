import { ReadingView } from "@/components/ReadingView";

interface ReadingSectionPageProps {
  params: Promise<{ id: string; section: string }>;
}

export default async function ReadingSectionPage({ params }: ReadingSectionPageProps) {
  const { id, section } = await params;

  return <ReadingView id={id} section={section} />;
}