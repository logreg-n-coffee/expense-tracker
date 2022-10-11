import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export const useCategories = () => {
  return useQuery(
    ['load-spreadsheets'],
    () =>
      fetch('/api/google-sheets/spreadsheets')
        .then((res) => res.json())
        .catch((err) => console.error(err)),
    {
      refetchOnWindowFocus: false,
      onError: () => {
        toast.error('Something went wrong 😢');
      },
    }
  );
};
