import React from 'react';

type EmptyStateProps = {
  message?: string;
};

export const EmptyState: React.FC<EmptyStateProps> = ({ message }) => <p>{message}</p>;
