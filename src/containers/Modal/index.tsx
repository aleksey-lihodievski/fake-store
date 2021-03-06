import { useMountTransition } from 'hooks/mount';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import ModalFooter from './components/ModalFooter';

import ModalHeader from './components/ModalHeader';
import { ModalContent } from './components/ModalContent';
import { ModalBody } from './components/ModalBody';
import { ModalOverlay } from './components/ModalOverlay';
import { modalsRoot } from 'constants/modals';

interface IModalProps {
  children?: React.ReactNode;
  visible?: boolean;
  className?: string;
  title?: string;
  minWidth?: string | number;
  maxWidth?: string | number;
  footer?: React.ReactNode;
  transitionTime?: number;
  onSubmit: () => void;
  onCancel: () => void;
  submitText?: string;
  cancelText?: string;
  submitDisabled?: boolean;
  cancelDisabled?: boolean;
}

const Modal: React.FC<IModalProps> = ({
  visible,
  className,
  title,
  minWidth,
  maxWidth,
  transitionTime,
  footer,
  onSubmit,
  onCancel,
  submitText,
  cancelText,
  submitDisabled,
  cancelDisabled,
  children,
}) => {
  const isAnimated = useMountTransition(!!visible, transitionTime as number);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [visible]);

  if (visible || isAnimated)
    return ReactDOM.createPortal(
      <ModalOverlay
        onClick={onCancel}
        className={className}
        transitionTime={transitionTime as number}
        transitionedIn={isAnimated}
        visible={visible}
      >
        <ModalBody
          onClick={(e) => e.stopPropagation()}
          transitionTime={transitionTime as number}
          transitionedIn={isAnimated}
          visible={visible}
          minWidth={minWidth}
          maxWidth={maxWidth}
        >
          <ModalHeader onCancel={onCancel} title={title} />
          {children && <ModalContent>{children}</ModalContent>}
          {footer || (
            <ModalFooter
              onSubmit={onSubmit}
              onCancel={onCancel}
              submitText={submitText}
              cancelText={cancelText}
              submitDisabled={submitDisabled}
              cancelDisabled={cancelDisabled}
            />
          )}
        </ModalBody>
      </ModalOverlay>,
      modalsRoot as HTMLElement,
    );

  return null;
};

Modal.defaultProps = {
  visible: false,
  title: '',
  transitionTime: 300,
  submitText: 'OK',
  cancelText: 'Cancel',
  submitDisabled: false,
  cancelDisabled: false,
};

export default React.memo(Modal);
