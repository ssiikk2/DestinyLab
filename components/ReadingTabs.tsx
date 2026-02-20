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
    <nav className="fade-up overflow-x-auto rounded-full border border-border-soft bg-white/80 p-1 shadow-soft">
      <div className="flex min-w-max items-center gap-1">
        {tabs.map((tab) => {
          const href = tab.key === "default" ? basePath : `${basePath}/${tab.key}`;
          const isActive = active === tab.key;

          return (
            <Link
              key={tab.key}
              href={href}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-base ease-smooth ${
                isActive
                  ? "bg-brand-primary text-white shadow-md"
                  : "text-text-muted hover:bg-white hover:text-text-main"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}