import React from 'react';

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  "data-testid"?: string;
}
