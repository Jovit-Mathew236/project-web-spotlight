import "./App.css";
import SpotLight from "./components/ui/modules/spotlight";
// import Ripple from "@/components/magicui/ripple";
import ShineBorder from "@/components/magicui/shine-border";
import { useAIControl } from "./lib/state";

function App() {
  const { isListerning, isProcessing, isSpeaking } = useAIControl()
  return (
    <div className="scale-125">
      <ShineBorder
        className=""
        borderWidth={10}
        visible={isListerning || isProcessing || isSpeaking}
        color={
          isListerning ? ["#A07CFE", "#FE8FB5", "#FFBE7B"] : isProcessing ? ["#FFBE7B", "#A07CFE", "#FE8FB5"] : ["#FE8FB5", "#FFBE7B", "#A07CFE"]
        }
      >
        <div className="p-[6px] relative">
          <SpotLight />
        </div>
      </ShineBorder>
    </div>

  )
}

export default App;
