import Image from "next/image";

import illustraion from '../assets/Completed-pana.svg'
import {FaArrowDown} from "react-icons/fa6"

const WowSuchEmpty = () => {
  return (
    <div className="pt-[50px] flex w-full flex-wrap justify-center">
      <div className="w-full flex justify-center">
      <Image src={illustraion} alt="illustration" height={270} width={270}/>

      </div>
      <div className="w-[270px] flex flex-wrap">
        <p className="text-sm">You&apos;re all done for the week, antony!</p>
        {/* TODO replace name */}
        <p className="font-light text-xs text-divider-200 mt-2">
          Enjoy the rest of your day and don&apos;t forget to share your
          #TodoistZero awesomeness
        </p>
          </div>
          <FaArrowDown  className="mt-[10px] text-divider-200 w-full mb-3"/>
          <button className="text-xs text-secondary-300 px-sm-2 py-1 rounded hover:bg-divider-100">
          Share #TodoistZero
          </button>
    </div>
  );
};
export default WowSuchEmpty;