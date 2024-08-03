import "./App.css";
import SpotLight from "./components/modules/spotlight";
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
          isProcessing ? ["#FFBE7B", "#A07CFE", "#FE8FB5"] : isListerning ? ["#A07CFE", "#FE8FB5", "#FFBE7B"] : ["#FE8FB5", "#FFBE7B", "#A07CFE"]
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
