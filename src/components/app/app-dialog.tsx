
import React, { ReactNode } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Cross1Icon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

interface DialogContentProps {
  children: ReactNode
  className: string
}

export const DialogContent = React.forwardRef(
  ({ children, ...props }: DialogContentProps, forwardedRef) => (
    <DialogPrimitive.Portal>
      {/* <DialogPrimitive.Overlay /> */}
      <DialogPrimitive.Content {...props} ref={forwardedRef}>
        {children}
        <DialogPrimitive.Close aria-label="Close">
          <Cross1Icon />
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
);

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;