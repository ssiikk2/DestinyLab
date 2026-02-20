import Link from "next/link";

export interface ReadingTabItem {
  key: string;
  label: string;
}

interface ReadingTabsProps {
  basePath: string;
  tabs: ReadingTabItem[];
  active: string;
}

export function ReadingTabs({ basePath, tabs, active }: ReadingTabsProps) {
  return (
    <nav className="flex gap-2 overflow-x-auto pb-2">
      {tabs.map((tab) => {
        const href = tab.key === "default" ? basePath : `${basePath}/${tab.key}`;
        const isActive = active === tab.key;

        return (
          <Link
            key={tab.key}
            href={href}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "bg-slate-900 text-white"
                : "bg-white/70 text-slate-700 hover:bg-white"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}