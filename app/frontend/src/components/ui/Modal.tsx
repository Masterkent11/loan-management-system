import type { PropsWithChildren } from "react";
import { Button } from "./Button";

type ModalProps = PropsWithChildren<{
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}>;

export function Modal({
  children,
  description,
  isOpen,
  onClose,
  title,
}: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section
        aria-describedby={description ? "modal-description" : undefined}
        aria-modal="true"
        className="modal"
        role="dialog"
      >
        <header className="modal-header">
          <div>
            <h2>{title}</h2>
            {description ? <p id="modal-description">{description}</p> : null}
          </div>
          <Button
            aria-label="Close modal"
            className="icon-button"
            type="button"
            variant="ghost"
            onClick={onClose}
          >
            x
          </Button>
        </header>
        {children}
      </section>
    </div>
  );
}
