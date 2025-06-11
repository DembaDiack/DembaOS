import Scrubber from "./Scrubber/Scrubber";
import Scrubbed from "./Scrubber/Scrubbed";
import Landing from "./Landing";
import { useState } from "react";

function LandingContainer() {
  const [scrollRatio, setScrollRatio] = useState<number>(0);

  return (
    <Scrubber
      onScroll={(ratio) => {
        setScrollRatio(ratio);
      }}
    >
      <Scrubbed>
        <Landing scrollRatio={scrollRatio} />
      </Scrubbed>
    </Scrubber>
  );
}

export default LandingContainer;
