import { InternalLinkCluster } from "@/components/InternalLinkCluster";
import type { ClusterContext } from "@/lib/content-map";

interface SeoClusterLinksProps {
  context?: ClusterContext;
}

export function SeoClusterLinks({ context }: SeoClusterLinksProps) {
  return <InternalLinkCluster context={context} />;
}
