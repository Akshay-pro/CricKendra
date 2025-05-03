import Link from "next/link";
import { usePathname } from "next/navigation";  // Hook to get the current pathname

const SeriesTab = ({ seriesId }) => {
  const pathname = usePathname();  // This will give the current URL path

  // console.log(inningId)
  // Define the tabs
  const tabs = [
    { name: "Home", href: `/series/${seriesId}` },
    { name: "Fixtures and Result", href: `/series/${seriesId}/matches` },
    { name: "Teams", href: `/series/${seriesId}/teams` },
    { name: "Squads", href: `/series/${seriesId}/squads`}
  ];

  return (
    <div className="flex space-x-4 mb-4 p-4 border-b">
      {tabs.map((tab) => (
        <Link key={tab.href} href={tab.href}>
          <span
            className={`pb-2 ${
              pathname === tab.href
                ? "border-b-2 border-blue-500 text-blue-600 font-semibold"
                : "text-gray-600 hover:text-blue-500"
            }`}
          >
            {tab.name}
          </span>
        </Link>
      ))}
    </div>
  );
};

export default SeriesTab;
