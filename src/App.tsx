import "./App.css";
import SpotLight from "./components/modules/spotlight";
// import Ripple from "@/components/magicui/ripple";
import ShineBorder from "@/components/magicui/shine-border";
import { useAIControl } from "./lib/state";
import { useEffect, useRef } from "react";

function App() {
  const { isListerning, isProcessing, isSpeaking } = useAIControl()

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        window.dialog.closeDialog();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  return (
    <div ref={wrapperRef}>
      <ShineBorder
        className=""
        borderWidth={3}
        visible={isListerning || isProcessing || isSpeaking}
        color={
          isProcessing ? ["#FFBE7B", "#A07CFE", "#FE8FB5"] : isListerning ? ["#A07CFE", "#FE8FB5", "#FFBE7B"] : ["#FE8FB5", "#FFBE7B", "#A07CFE"]
        }
      >
        <div className="p-[3px] relative">
          <SpotLight />
        </div>
      </ShineBorder>
    </div>

  )
}

export default App;
