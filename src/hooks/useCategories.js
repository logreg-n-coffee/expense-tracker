// customized query for server state management - https://tanstack.com/query/v4/docs/overview
import { useQuery } from '@tanstack/react-query';

// react notifications
import toast from 'react-hot-toast';

export const useCategories = () => {
  return (
    useQuery(['categories'],
    () => fetch('/api/google-sheets/categories').then((res) => res.json()),
    {
      refetchOnWindowFocus: false,
      onError: () => {
        toast.error('Something went wrong 😢');
      },
    })
  );
};
