import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { EpDocument } from "./screens/EpDocument";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <EpDocument />
  </StrictMode>,
);
