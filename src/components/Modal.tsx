import { createPortal } from "react-dom";
import { useModal } from "../contexts/ModalContext";

export const Modal = () => {
  const { showModal, modalMessage, closeModal } = useModal();

  if (!showModal) return null;

  return createPortal(
    <div
      className="modal-overlay fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="modal-content bg-white rounded-lg shadow-lg p-6 w-96 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">🔔</h2>
        <p className="text-gray-800 mb-2">{modalMessage}</p>
        <button
          className="text-white bg-pink-600 hover:bg-pink-700 rounded-full px-4 py-2 mx-2 my-4"
          onClick={closeModal}
        >
          확인
        </button>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};
