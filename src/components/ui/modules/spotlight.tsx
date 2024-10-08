// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// import React from "react";
import { Bell, Inbox, Search } from "lucide-react";
import { useClickAway } from "@uidotdev/usehooks";
import {
  Command,
  // CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

// type Props = {}

const SpotLight = () => {
  const listOfCommands = [
    {
      name: "Search",
      icon: <Search size={18} />,
      action: () => void 0,
    },
    {
      name: "Notification",
      icon: <Bell size={18} />,
      action: () => void 0,
    },
    {
      name: "Inbox",
      icon: <Inbox size={18} />,
      action: () => void 0,
    },
  ];
  const ref = useClickAway<HTMLDivElement>(() => {
    window.dialog.closeDialog();
  });

  return (
    <div ref={ref}>
      <Command className="w-[600px] m-auto">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="tabs">
            {listOfCommands.map((element, i) => (
              <CommandItem
                key={i}
                onSelect={element.action}
                className="w-full flex justify-between gap-2"
              >
                {element.name}
                <CommandShortcut>{element.icon}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Bookmarks">
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
          <CommandGroup heading="History">
            <CommandItem>Profile</CommandItem>
            <CommandItem>Billing</CommandItem>
            <CommandItem>Settings</CommandItem>
          </CommandGroup>
          <CommandGroup heading="Project Web">
            <CommandItem>Search google</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default SpotLight;
