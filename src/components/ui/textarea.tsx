import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';

export interface TextareaProps
  extends BaseComponentProps,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize?: boolean;
  validationState?: 'success' | 'warning' | 'error' | 'default';
  errorMessage?: string;
  helperText?: string;
  label?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      autoResize = false,
      validationState = 'default',
      errorMessage,
      helperText,
      disabled,
      id,
      onInput,
      rows = 3,
      label,
      ...props
    },
    ref
  ) => {
    const localRef = useRef<HTMLTextAreaElement | null>(null);
    const textareaId = id || React.useId();
    const helperId = `${textareaId}-helper`;
    const errorId = `${textareaId}-error`;

    const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
      if (autoResize && localRef.current) {
        localRef.current.style.height = 'auto';
        localRef.current.style.height = `${localRef.current.scrollHeight}px`;
      }
      if (onInput) onInput(e as any);
    };

    useEffect(() => {
      if (autoResize && localRef.current) {
        localRef.current.style.height = 'auto';
        localRef.current.style.height = `${localRef.current.scrollHeight}px`;
      }
    }, [autoResize]);

    const stateStyles = {
      default: 'border-border focus-visible:ring-ring',
      success: 'border-success focus-visible:ring-success',
      warning: 'border-warning focus-visible:ring-warning',
      error: 'border-destructive focus-visible:ring-destructive',
    };

    const setRef = (node: HTMLTextAreaElement | null) => {
      localRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
      }
    };

    return (
      <div className={cn('flex flex-col gap-1.5 w-full', className)}>
        {label && (
          <label htmlFor={textareaId} className="text-xs font-semibold text-foreground select-none">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={setRef}
          rows={rows}
          disabled={disabled}
          onInput={handleInput}
          aria-describedby={
            errorMessage ? errorId : helperText ? helperId : undefined
          }
          aria-invalid={validationState === 'error'}
          className={cn(
            'flex w-full rounded-lg border bg-background px-3 py-2 text-base transition-all placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-y',
            autoResize && 'resize-none overflow-hidden',
            stateStyles[validationState]
          )}
          {...props}
        />
        {validationState === 'error' && errorMessage && (
          <p id={errorId} role="alert" className="text-xs font-medium text-destructive">
            {errorMessage}
          </p>
        )}
        {validationState !== 'error' && helperText && (
          <p id={helperId} className="text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
