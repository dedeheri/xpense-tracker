"use client";

import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

const SwitchDarkMode = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newCheckedState: boolean) => {
    const newTheme = newCheckedState ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        className="cursor-pointer"
        checked={theme === "dark"}
        onCheckedChange={handleThemeChange}
      />
    </div>
  );
};

export default SwitchDarkMode;
