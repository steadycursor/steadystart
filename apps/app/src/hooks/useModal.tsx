import { Dismiss20Regular } from '@fluentui/react-icons';
import { createContext, ReactElement, ReactNode, useContext, useState, cloneElement } from 'react';

export const ModalContext = createContext<() => void>(() => {});

export type UseModalArgs = {
  trigger: ReactElement<{ onClick?: () => void }> | undefined;
  content: (args: { closeModal: () => void }) => ReactNode;
  title?: ReactNode;
};

export type UseModalPayload = [
  ReactElement,
  {
    open: () => void;
    close: () => void;
    toggle: () => void;
    isOpen: boolean;
  },
];

export function useModal({ title, trigger, content }: UseModalArgs): UseModalPayload {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const toggleModal = () => setIsOpen((prev) => !prev);

  const triggerWithProps = trigger && cloneElement(trigger, { onClick: openModal });

  const modal = isOpen ? (
    <ModalContext.Provider value={closeModal}>
      <div
        className="fixed z-[9999] inset-0 bg-black w-full h-screen bg-opacity-50 flex justify-center items-start !m-0 p-4"
        onClick={() => closeModal()}
      >
        <div
          className="rounded-lg p-6 w-full sm:w-[400px] max-w-full bg-white max-h-screen overflow-auto mt-5 sm:mt-10 shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between mb-4 items-center">
            {title && <h2 className="text-2xl font-semibold">{title}</h2>}
            <div onClick={() => closeModal()} className="cursor-pointer">
              <Dismiss20Regular className="size-7" />
            </div>
          </div>
          <div className="w-full overflow-hidden">{content({ closeModal })}</div>
        </div>
      </div>
    </ModalContext.Provider>
  ) : null;

  return [
    <>
      {triggerWithProps}
      {modal}
    </>,
    { open: openModal, close: closeModal, toggle: toggleModal, isOpen },
  ];
}

export function useModalClose(): () => void {
  return useContext(ModalContext);
}
