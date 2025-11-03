import Liner from "../Animation/project/Liner";
import Text from "../Animation/Text/Text";

export default function Project() {
  return (
    <>
      {/* Hide on mobile (<768px), show on tablet/iPad+ */}
      <div className="hidden md:block bg-gray-100 min-h-screen fixed top-0 left-0 w-1/2">
        <div className="bg-gray-100 fixed top-0 left-0 w-1/2 2xl:mt-36 xl:mt-30 lg:mt-34 md:mt-32 flex items-start justify-center p-4">
          <Text />
        </div>

        <div className="text-black relative 2xl:mt-66 xl:bottom-10">
          <Liner />
        </div>
      </div>


    </>
  );
}
