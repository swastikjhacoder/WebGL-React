import React, { useEffect, useRef, useState } from "react";
import { TailSpin } from "react-loader-spinner";

const WebGLLoader = () => {
  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.id = "unity-canvas";

    const script = document.createElement("script");
    script.src = process.env.PUBLIC_URL + "/Build/WebGL.loader.js";
    script.onload = () => {
      window
        .createUnityInstance(canvas, {
          dataUrl:
            "https://media.githubusercontent.com/media/nirajdasceq24/SoftSkill_Web/main/Build/WebGL.data",
          frameworkUrl: process.env.PUBLIC_URL + "/Build/WebGL.framework.js",
          codeUrl: process.env.PUBLIC_URL + "/Build/WebGL.wasm",
          streamingAssetsUrl: "StreamingAssets",
          companyName: "DefaultCompany",
          productName: "MyProduct",
          productVersion: "1.0",
        })
        .then((unityInstance) => {
          console.log("Unity instance loaded successfully");
          setIsLoading(false);
        })
        .catch((message) => {
          console.error(
            "Failed to load the Unity WebGL build. Error: " + message
          );
          alert(
            "Failed to load the Unity WebGL build. Check console for details."
          );
        });
    };
    script.onerror = () => {
      console.error("Failed to load the Unity WebGL loader script.");
    };
    document.body.appendChild(script);

    return () => {
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {isLoading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <TailSpin height="80" width="80" color="grey" ariaLabel="loading" />
        </div>
      )}
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          display: isLoading ? "none" : "block",
        }}
      />
    </div>
  );
};

export default WebGLLoader;
