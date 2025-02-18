import * as React from 'react';

export const Clock = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={24} height={24} {...props} ref={ref}>
      <path
        fillRule="evenodd"
        d="M12 .002c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12c-.008-6.624-5.376-11.992-12-12Zm0 22c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10c-.006 5.52-4.48 9.994-10 10Zm5.134-6.19L12.5 11.563V6.502a1 1 0 1 0-2 0v5.5a1 1 0 0 0 .324.738l4.959 4.545a1.01 1.01 0 0 0 1.413-.061 1 1 0 0 0-.062-1.412Z"
        clipRule="evenodd"
      />
    </svg>
  ),
);
