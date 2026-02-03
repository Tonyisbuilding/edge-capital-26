import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

interface contactInputType {
  placeholder: string;
  CTAButton: string;
  icon: string;
}

const ContactInput = ({ placeholder, CTAButton, icon }: contactInputType) => {

  const [isCopied, setIsCopied] = useState(false);

  // This is the function we wrote earlier
  async function copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = (copyText: string) => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(copyText)
      .then(() => {
        // If successful, update the isCopied state value
        toast('Contact has been copied.')
        console.log(isCopied)
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  const handleClick = (name: string) => {
    console.log(name)
    switch (name) {
      case 'Subscribe':
        console.log('hi')
        break;
      case 'Call Us':
        handleCopyClick('+31 252 781 777')
        break;
      case 'Get Direction':
      case 'Locatie':

        window.open(
          'https://maps.app.goo.gl/vNU3NqiVvpRw1cSB8',
          '_blank'
        ); break;
      default:
        break;
    }
  }

  return (
    <>
      <div className=" py-[.5rem]  relative  ">
        <ToastContainer />
        <div className=" absolute lg:top-[37%] md:top-[2.5rem] top-[1.7rem] left-[.8rem]">
          <img src={icon} alt="" />
        </div>
        <input
          type="text"
          placeholder={placeholder}
          readOnly={placeholder == 'Subscribe' ? false : true}
          // {placeholder !== 'Subscribe' ? readOnly : null} 
          className="outline-none border-none lg:w-[100%] md:w-[80vw] w-[90vw] lg:h-[10vh] rounded-xl bg-[#Ffff] text-[15.8px]
font-medium text-[#111111] pl-[3rem] h-[8vh] lg:max-h-[85px] focus:outline-none focus:border-none"
        />
        <div className=" flex  items-center mt-[.5rem] md:absolute md:top-[.3rem] lg:right-[1%] 
        md:left-[28.2rem]]">
          <button className=" bg-[#192227] text-white font-medium text-[16.88px] lg:w-[10vw] md:w-[25vw] w-[89vw] 
          lg:h-[8.5vh] md:h-[7vh] h-[8vh] rounded-xl hover:cursor-pointer lg:max-h-[75px] lg:max-w-[175px]"
            onClick={() => handleClick(CTAButton)}
          >
            {CTAButton}
          </button>
        </div>
      </div>
    </>
  );
};

export default ContactInput;
