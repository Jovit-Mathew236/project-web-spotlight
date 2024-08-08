import { useAIControl } from "@/lib/state";
import { useEffect, useState } from "react";
// import { CornerDownLeft } from "lucide-react";
import { CommandEmpty } from "../ui/command";
import { useCommandState } from "cmdk";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CustomUI, CustomUIIcons } from "./custom";

const CommandEmptyState = ({response, setResponse}: {response: string, setResponse: (response: string) => void}) => {
  const { setEmpty, searchResults } = useAIControl();
  const search = useCommandState((state) => state.search);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  useEffect(() => {
    setEmpty(true);
    return () => setEmpty(false);
  }, []);

  useEffect(() => {
    if (search && search.substring(0, 3) !== "/ai") {

      fetchSuggestions(search);
    } else {
      setSuggestions([]);
    }
  }, [search]);

  const fetchSuggestions = async (query: string) => {
    try {
      const suggestions = await window.suggestions.getDuckDuckGoSuggestions(query);
      setSuggestions(suggestions.map((suggestion) => suggestion.phrase));
      setResponse("");
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  return (
    <>
      {suggestions.length > 0 ? (
        <div className="flex flex-col">
          {/* <div className="mx-auto">Suggestions for "{search}":</div> */}
          <ul className="w-full mt-2 text-base flex flex-col gap-1">
            {suggestions.map((suggestion, index) => (
              <li key={index}>
                <div onClick={() => {
                  window.tabs.load(window.currentGroup, window.currentTab, `https://www.google.com/search?q=${encodeURIComponent(
                    suggestion
                  )}&sourceid=chrome&ie=UTF-8`)
                  window.dialog.closeDialog()
                }} className="p-1 text-neutral-400 hover:bg-neutral-900 rounded-sm">{suggestion}</div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-neutral-400">{response}</p>
      )}
      <div className="flex flex-col gap-1 w-full">
        {searchResults.map((s) => {
          const UI =
            s.toolName in CustomUI
              ? CustomUI[s.toolName as keyof typeof CustomUI]
              : null;
          const Icon =
            s.toolName in CustomUIIcons
              ? CustomUIIcons[s.toolName as keyof typeof CustomUI]
              : null;
          return (
            <Alert className="p-2 w-full" key={s.toolCallId}>
              <AlertTitle className="flex gap-2">
                {Icon && <Icon className="h-4 w-4" />}
                {s.toolName}
              </AlertTitle>
              <AlertDescription>
                {UI ? (
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  <UI data={s.result} />
                ) : (
                  <pre className="mt-2 w-full rounded-md bg-card-foreground p-4">
                    <code className="text-card text-wrap">
                      {typeof s.result === "string"
                        ? s.result
                        : JSON.stringify(s.result, null, 2)}
                    </code>
                  </pre>
                )}
              </AlertDescription>
            </Alert>
          );
        })}
      </div>
    </>
  );
};

export const CommandEmptyContainer = ({response, setResponse}: {response: string, setResponse: (response: string) => void}) => (
  <CommandEmpty className="flex flex-col p-6 text-sm gap-6">
    <CommandEmptyState response={response} setResponse={setResponse}/>
  </CommandEmpty>
);
