import { Search } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import CommandInputBar from "./bar";
import { CommandEmptyContainer } from "./empty";
import { useState } from "react";

const SpotLight = () => {
  const listOfCommands = [
    {
      name: "Search",
      icon: <Search size={18} />,
      action: () => console.log("Search"),
    },
    // {
    //   name: "Notification",
    //   icon: <Bell size={18} />,
    //   action: () => console.log("Notification"),
    // },
    // {
    //   name: "Inbox",
    //   icon: <Inbox size={18} />,
    //   action: () => console.log("Inbox"),
    // },
  ];

  const [response, setResponse] = useState("");

  return (
    <Command className="w-[600px] max-h-96">
      <CommandInputBar setResponse={setResponse}/>
      <CommandList>
        <CommandEmptyContainer response={response} setResponse={setResponse}/>
        <CommandGroup heading="Tabs">
          {listOfCommands.map((element, i) => (
            <CommandItem
              key={element.name + i}
              onSelect={element.action}
              className="w-full flex justify-between gap-2"
            >
              {element.name}
              <CommandShortcut>{element.icon}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        {/* <CommandGroup heading="Bookmarks">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup>
        <CommandGroup heading="History">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
          <CommandItem>Settings</CommandItem>
        </CommandGroup> */}
        <CommandGroup heading="Project Web">
          <CommandItem>Google</CommandItem>
          <CommandItem>AI</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default SpotLight;
