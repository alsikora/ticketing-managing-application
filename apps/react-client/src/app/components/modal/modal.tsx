import { Ticket } from '@acme/shared-models';
import { createPortal } from "react-dom";

export interface ModalProps {
  title: string;
  children: JSX.Element;
  handleSave: () => void;
  handleCancel: () => void;
}

export function Modal(props: ModalProps) {
  const modal = document.getElementById('modal-root') as HTMLElement;

  return createPortal(
      <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div
                className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">{props.title}</h3>
                  <div className="mt-2">
                    {props.children}
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                <button type="submit"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-sky-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:col-start-2 sm:text-sm"
                        onClick={props.handleSave}>
                  Save
                </button>
                <button type="button"
                        onClick={props.handleCancel}
                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0 sm:text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>,
      modal
  );
}

export default Modal;
