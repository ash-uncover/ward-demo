import React, { ReactNode } from "react";
// Hooks
import {
  WardElement,
  useWardProviders,
  useWardProvider,
  useWardService,
} from "@sol.ac/ward-react";
// Components
import { Link } from "react-router-dom";
// Style
import "./App.css";

export interface AppProperties {
  children: ReactNode;
}

declare global {
  interface Window {
    documentPictureInPicture?: any
  }
}

async function openPip() {
  // Open a Picture-in-Picture window.
  const pipWindow = await window.documentPictureInPicture.requestWindow({
    width: 1000,
    height: 600,
  });

  const iframe = document.createElement("iframe");
  iframe.src = "http://localhost:27001";
  iframe.height = "100%";
  iframe.width = "100%";

  // Move the player to the Picture-in-Picture window.
  pipWindow.document.body.append(iframe);
}

export const App = ({ children }: AppProperties) => {
  
  // Hooks //

  useWardService("Service-Main", (message) => {
    switch (message.type) {
      case "togglePip": {
        if (window.documentPictureInPicture.window) {
          return;
        }
        openPip();
        break;
      }
      default: {
        break;
      }
    }
  });

  // Events //

  // Rendering //

  const viewers = useWardProviders("ward-demo/viewers") || [];

  return (
    <div className="app">
      <div className="app__header">
        <Link to={`/`}>WARD</Link>
        {viewers.map((viewer) => {
          return (
            <Link
              key={String(viewer.attributes.id)}
              to={`/${String(viewer.attributes.id)}`}
            >
              {viewer.attributes.name}
            </Link>
          );
        })}
      </div>

      <div className="app__content">{children}</div>
    </div>
  );
};
