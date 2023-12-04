import React, { ReactNode, useRef } from "react";
import { useClickOutside } from "../../../hooks/useClickOutside";

type ModalLayoutProps = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalLayout = (props: ModalLayoutProps) => {
  const { children, isOpen, setIsOpen } = props;

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(wrapperRef, () => setIsOpen(false));

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen items-center justify-center bg-black/20 z-[50] ${
        !isOpen ? "hidden" : "flex"
      } `}
    >
      <div ref={wrapperRef} className="bg-white rounded-md z-50">
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
