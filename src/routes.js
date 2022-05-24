import Accueil from "views/Accueil.js";
import UserProfile from "views/UserProfile.js";
import Icons from "views/Icons.js";


const dashboardRoutes = [
  {
    path: "/accueil",
    name: "Accueil",
    icon: "nc-icon nc-chart-pie-35",
    component: Accueil,
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
  },
  
];

export default dashboardRoutes;
