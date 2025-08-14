import Liner from "../Animation/project/Liner";
import Text from "../Animation/Text/Text";

export default function Project() {
  return (
    <>
      {/* Hide on mobile (<768px), show on tablet/iPad+ */}
      <div className="hidden md:block bg-gray-100 min-h-screen fixed top-0 left-0 w-1/2">
        <div className="bg-gray-100 fixed top-0 left-0 w-1/2 mt-44 flex items-start justify-center p-4">
          <Text />
        </div>

        <div className="text-black relative mt-72">
          <Liner />
        </div>
      </div>
    </>
  );
}
