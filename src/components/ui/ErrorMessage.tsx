import React from 'react';
import { Error } from '../icons/Error';

import './ErrorMesssage.css';

type ErrorProps = {
  message?: string;
};

export const ErrorMessage: React.FC<ErrorProps> = ({ message }) => (
  <div aria-label="Error message" className="error">
    <Error />
    <p>{message}</p>
  </div>
);
