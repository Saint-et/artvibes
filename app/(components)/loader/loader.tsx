import { useAppContext } from "@/app/provider/useAppContext";
import { LuLoader2 } from "react-icons/lu";

interface LoaderAppProps {
  background: string;
  name: string;
  version: string;
  Waifu2xTfjs?:
    | { startProcess: boolean; bar: number }
    | { startProcess: false; bar: 0 };
}

const LoaderApp: React.FC<LoaderAppProps> = (props) => {
  const UseAppContext = useAppContext()
  if (props.Waifu2xTfjs?.startProcess)
    return (
      <>
        <div
          className="h-screen w-screen fixed top-0 object-cover z-[100000]"
          style={{
            background: "rgba(0, 0, 0, 0.8)",
          }}
        >
          <div className="flex flex-col items-center justify-center h-screen w-screen">
            <div className="p-10 rounded flex flex-col items-center justify-center w-full">
              <h2 className="text-8xl font-bold p-4 mb-6 text-foreground bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
                {props.name}
              </h2>
              {props.Waifu2xTfjs?.bar > 0 ? (
                <>
                  <div className="mb-4">{props.Waifu2xTfjs?.bar}%</div>
                  <div className="w-[90%] max-w-[800px] mb-4 rounded-full bg-neutral-500">
                    <div
                      className="progress-barAnimation"
                      style={{
                        width: `${props.Waifu2xTfjs?.bar}%`,
                      }}
                    />
                  </div>
                </>
              ) : (
                <h2 className="flex items-center text-2xl font-bold mb-4 text-foreground">
                  <LuLoader2 className="w-6 h-6 mr-2 animate-spin" />
                  Preparation...
                </h2>
              )}
              <div>{props.version}</div>
            </div>
          </div>
        </div>
      </>
    );

  return (
    <>
      <video
        className="w-screen h-screen fixed top-0 object-cover z-[-1]"
        autoPlay={true}
        muted
        loop
      >
        <source
          src="/assets/videos/artvibe-studio/691452_bg.mp4"
          type="video/mp4"
        />
      </video>
      <div
        className="h-screen w-screen"
        //style={{ main-bg-animated
        //  backgroundImage: `url(${props.background})`,
        //  backgroundSize: "cover",
        //  backgroundRepeat: "no-repeat",
        //}}
        //onDragOver={UseDrawing.handleDragOver}
      >
        <div className="flex flex-col items-center justify-center h-screen w-screen">
          <div className="p-10 rounded flex flex-col items-center">
            <h2 className="text-8xl font-bold p-4 mb-6 text-foreground bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
              {props.name}
            </h2>
            <h2 className="flex items-center text-2xl font-bold mb-4 text-foreground">
              <LuLoader2 className="w-6 h-6 mr-2 animate-spin" />
              Chargement en cours...
            </h2>
            <div>{UseAppContext.isDrawingLoad?.stateLoad}</div>
            <div>Version: {props.version}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoaderApp;
