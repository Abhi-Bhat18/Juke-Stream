import {
  MdLogout,
  MdSpaceDashboard,
  MdOutlineHomeWork,
  MdOutlineAddToHomeScreen,
} from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { TbBrandBooking } from "react-icons/tb";
import { AiOutlineCloseSquare } from "react-icons/ai";

export const DrawerElements1 = [
  {
    label: "Dashboard",
    Icon: MdSpaceDashboard,
  },
  {
    label: "Users",
    Icon: FiUsers,
  },
  {
    label: "Bookings",
    Icon: TbBrandBooking,
  },
  {
    label: "Rooms",
    Icon: MdOutlineHomeWork,
  },
  {
    label: "Home",
    Icon: MdOutlineAddToHomeScreen,
  },
];

export const DrawerElements2 = [
  {
    label: "Logout",
    Icon: MdLogout,
  },
  {
    label: "Close",
    Icon: AiOutlineCloseSquare,
  },
];
