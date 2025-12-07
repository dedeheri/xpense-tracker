// /components/ClientDropdown.jsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// A simple component that uses the full dropdown structure
const DropdownDynamic = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button>Open Menu</button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {/* ... other items */}
    </DropdownMenuContent>
  </DropdownMenu>
);

export default DropdownDynamic;
