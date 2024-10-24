import { AreaChart, PackagePlus, AlignLeft } from "lucide-react";

type NavLink = {
   href: string;
   label: string;
   icon: React.ReactNode;
};

const links: NavLink[] = [
   {
      href: "/add-job",
      label: "add job",
      icon: <PackagePlus />,
   },
   {
      href: "/jobs",
      label: "all jobs",
      icon: <AlignLeft />,
   },
   {
      href: "/stats",
      label: "stats",
      icon: <AreaChart />,
   },
];

export default links;
