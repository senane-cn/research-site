import { whc48LogoBase64 } from "../stage-1/assets/whc48-logo.generated.js";

document.querySelector("#brief-conference-logo").src =
  `data:image/svg+xml;base64,${whc48LogoBase64}`;
