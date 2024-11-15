import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
// import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";

export default function MainLayout() {
  // const [isMobile, setIsMobile] = useState(false);
  const isMobile = false;
  // useEffect(() => {
  //     const checkMobile = () => {
  //         setIsMobile(window.innerWidth < 768);
  //     }
  //     checkMobile();
  //     window.addEventListener("resize", checkMobile);
  //     return () => {
  //         window.removeEventListener("resize", checkMobile);
  //     }
  // }, [])
  return (
    //Left sidebar, main content, right sidebar
    <div className="h-screen bg-black text-white flex flex-col">
      <ResizablePanelGroup
        direction="horizontal"
        className="flex-1 flex h-full overflow-hidden p-2"
      >
        {/* left sidebar */}
        <ResizablePanel
          defaultSize={20}
          minSize={isMobile ? 0 : 10}
          maxSize={30}
        >
          <LeftSidebar />
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        {/* Main content */}
        <ResizablePanel defaultSize={isMobile ? 80 : 60}>
          <Outlet />
        </ResizablePanel>

        <ResizableHandle className="w-2 bg-black rounded-lg transition-colors" />

        {/* right sidebar */}
        <ResizablePanel
          defaultSize={20}
          minSize={0}
          maxSize={25}
          collapsedSize={0}
        >
          Right sidebar
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
