import Mobile from "../Component/Component/Mobile/Mobile";
import Project from "./Project";

export default function Projects() {
  return (
    <div className="relative">
      {/* Background home page */}
      <div className="blur-sm">
        <Mobile />
      </div>

      {/* Projects overlay - only shows on mobile */}
      <Project />
    </div>
  );
}
