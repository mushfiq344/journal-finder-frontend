import {
  Home,
  Box,
  DollarSign,
  UserPlus,
  Users,
  Chrome,
  Settings,
  Airplay,
  Slack,
  FolderPlus,
  File,
  Command,
  Cloud,
  Book,
  FileText,
  Server,
  Image,
  Sliders,
  Map,
  GitPullRequest,
  Calendar,
  Edit,
  Mail,
  MessageSquare,
  UserCheck,
  Layers,
  HelpCircle,
  Database,
  Headphones,
  Mic,
  ShoppingBag,
  Search,
  AlertOctagon,
  Lock,
  Briefcase,
  BarChart,
} from "react-feather";

export const MENUITEMS = [
  {
    title: "Journals",
    icon: Home,
    type: "sub",
    badgeType: "primary",
    active: false,
    children: [
      { path: "/journals", title: "Journals List", type: "link" },
      { path: "/journals/create", title: "Create Journal", type: "link" }

    ],
  }
];
