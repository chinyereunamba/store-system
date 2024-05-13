import React from "react";
import { FaX } from "react-icons/fa6";
import style from './utils.module.css'

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? "visible bg-text/20" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-[white] text-text rounded-xl shadow p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        } ${style.modal_content}`}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-[gray-400] hover:bg-[gray-50] hover:text-[gray-600]"
        >
          <FaX />
        </button>
        {children}
      </div>
    </div>
  );
}
