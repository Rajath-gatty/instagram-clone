"use client"
import ReactDOM from "react-dom";
import {useState, useEffect} from "react";

interface ModalProps {
    children: React.ReactNode,
    showModal:boolean,
    width?: string,
    height?: string,
    closeModal: () => void
}

const Modal = ({children,showModal,closeModal,width=`max-w-3xl`,height=""}:ModalProps) => {
    const [isBrowser, setIsBrowser] = useState(false);
  
    useEffect(() => {
      setIsBrowser(true);
    }, []); 

    const modalContent = showModal?<><div className="bg-gray-950/60 w-full h-full fixed top-0 bottom-0 left-0 right-0 z-[40] overflow-hidden" onClick={closeModal}></div>
      <div className={`max-h-[400px] md:max-h-none absolute top-[40%] md:top-1/2 left-[50%] md:left-1/2  -translate-x-1/2 -translate-y-1/2 bg-gray-800 ${width}  w-full z-50 `}>
    {children}
    </div></>:null

  if(isBrowser) {
    return ReactDOM.createPortal(modalContent,document.getElementById('modal-root') as HTMLDivElement)
  } else {
    return null
  }
}

export default Modal;