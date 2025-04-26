import Link from "next/link";
import { usePathname } from "next/navigation";  // Hook to get the current pathname

const MatchTabs = ({ matchId, inningId }) => {
  const pathname = usePathname();  // This will give the current URL path

  // console.log(inningId)
  // Define the tabs
  const tabs = [
    { name: "Summary", href: `/matches/${matchId}/summary` },
    { name: "Full Scorecard", href: `/matches/${matchId}/scorecard` },
    { name: "Squads", href: `/matches/${matchId}/squads` },
    { name: "Commentary", href: `/matches/${matchId}/innings/${inningId}/commentary`}
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

export default MatchTabs;
