import React, { createContext, useContext } from 'react';
import { cn } from '@/lib/cn';
import { BaseComponentProps } from '@/types/component';

interface RadioGroupContextType {
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined);

export interface RadioGroupProps extends BaseComponentProps, Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, name, value, onChange, disabled = false, children, ...props }, ref) => {
    const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(e.target.value);
    };

    return (
      <RadioGroupContext.Provider value={{ name, value, onChange: handleRadioChange, disabled }}>
        <div
          ref={ref}
          role="radiogroup"
          className={cn('flex flex-col gap-2', className)}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);
RadioGroup.displayName = 'RadioGroup';

export interface RadioProps extends BaseComponentProps, Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  value: string;
}

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, value, disabled, id, ...props }, ref) => {
    const context = useContext(RadioGroupContext);
    const radioId = id || React.useId();

    const groupName = context?.name || props.name;
    const isChecked = context ? context.value === value : props.checked;
    const isRadioDisabled = context?.disabled || disabled;
    const handleRadioChange = context?.onChange || props.onChange;

    return (
      <label
        htmlFor={radioId}
        className={cn(
          'inline-flex items-start gap-3 select-none cursor-pointer',
          isRadioDisabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        <div className="relative flex items-center mt-0.5">
          <input
            type="radio"
            id={radioId}
            ref={ref}
            name={groupName}
            value={value}
            checked={isChecked}
            disabled={isRadioDisabled}
            onChange={handleRadioChange}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              'flex items-center justify-center h-5 w-5 rounded-full border border-border bg-background transition-all duration-150',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2',
              'peer-checked:border-primary peer-checked:[&>div]:scale-100 peer-checked:[&>div]:opacity-100'
            )}
          >
            <div className="h-2.5 w-2.5 rounded-full bg-primary scale-0 opacity-0 transition-all duration-100" />
          </div>
        </div>
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <span className="text-sm font-medium text-foreground leading-none mb-1">
                {label}
              </span>
            )}
            {description && (
              <span className="text-xs text-muted-foreground leading-normal">
                {description}
              </span>
            )}
          </div>
        )}
      </label>
    );
  }
);
Radio.displayName = 'Radio';
