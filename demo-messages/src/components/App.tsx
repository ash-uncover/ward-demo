import React, { useEffect, useState } from "react";
// Libs
import Ward from "@uncover/ward";
import { useWardService, useWardServices } from "@uncover/ward-react";
// Components
import Frame from "./Frame";
import Service from "./Service";
import { ArrayUtils } from "@uncover/js-utils";

let SERVICE = 1;
let FRAME = 1;

interface AppProperties {}

const App = ({}: AppProperties) => {
  // Hooks //

  let id = "TOP";
  let horizontal = false;
  const params = new URLSearchParams(window.location.search);
  if (params.has("id")) {
    id = params.get("id")!;
  }
  if (params.has("horizontal")) {
    horizontal = true;
  }

  const services = useWardServices();

  const serviceMessage = useWardService('Service-Message', () => {});

  const [frames, setFrames] = useState<string[]>([]);

  useEffect(() => {
    Ward.addService(`Service-${SERVICE++}`);
  }, []);

  // Events //

  const handleAddService = () => {
    Ward.addService(`Service-${SERVICE++}`);
  };

  const handleAddFrame = () => {
    setFrames([...frames, `Frame-${FRAME++}`]);
  };

  const handleAddPictureInPicture = () => {
    serviceMessage.dispatchEvent({
      type: 'togglePip',
      payload: null
    })
  };

  const handleCloseFrame = (frameId: string) => {
    setFrames(ArrayUtils.removeElement(frames, frameId));
  };

  // Rendering //

  const isTop = window === window.top;

  return (
    <div
      className="app"
      style={{
        width: "100%",
        height: "100%",
        border: "4px solid #222",
        background: "#DDD",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        className="app-toolbar"
        style={{
          flexShrink: 0,
          display: "flex",
          padding: "10px",
          paddingTop: "5px",
          gap: "5px",
          background: "#222",
          color: "#EEE",
          alignItems: "center",
        }}
      >
        <span style={{ marginRight: "auto" }}>{id}</span>
        <button onClick={handleAddService}>Add Service</button>
        <button onClick={handleAddFrame}>Add Frame</button>
        <button onClick={handleAddPictureInPicture}>Add Picture in Picture</button>
        {!isTop ? (
          <button
            onClick={() => handleCloseFrame(id)}
            style={{
              marginRight: "20px",
            }}
          >
            X
          </button>
        ) : null}
      </div>

      <div
        className="app-content"
        style={{
          flexGrow: 1,
          display: "flex",
          flexDirection: horizontal ? "column" : "row",
          gap: "4px",
          padding: "4px",
          overflow: "hidden",
        }}
      >
        <div
          className="app-services"
          style={{
            border: "1px solid #888",
            overflow: "auto",
          }}
        >
          <div>#Services</div>
          <div
            style={{
              display: "flex",
              flexDirection: horizontal ? "row" : "column",
            }}
          >
            {Object.keys(services)
              .filter((serviceId) => {
                return services[serviceId].type !== "event";
              })
              .map((serviceId) => {
                return (
                  <div key={serviceId}>
                    {services[serviceId].type} - {serviceId}
                  </div>
                );
              })}
            {Object.keys(services)
              .filter((serviceId) => {
                return services[serviceId].type === "event";
              })
              .map((serviceId) => {
                return <Service key={serviceId} id={serviceId} />;
              })}
          </div>
        </div>
        <div
          className="app-frames"
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            border: "1px solid #888",
            padding: "4px",
            overflow: "auto",
            minHeight: "300px",
          }}
        >
          <div>#Frames</div>
          <div
            style={{
              display: "flex",
              flexGrow: 1,
              flexDirection: horizontal ? "row" : "column",
              gap: "4px",
            }}
          >
            {frames.map((frame) => {
              return (
                <Frame
                  key={frame}
                  id={frame}
                  onClose={() => handleCloseFrame(frame)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
