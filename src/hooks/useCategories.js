// customized query for server state management - https://tanstack.com/query/v4/docs/overview

// hooks can only be used within react functional components - 
// useCategories retrieves category data from google sheets with useQuery 

import { useQuery } from '@tanstack/react-query';

// react notifications
import toast from 'react-hot-toast';

export const useCategories = () => {
  return (
    useQuery(
      ['categories'],
      () => 
        fetch('/api/google-sheets/categories')
        .then((res) => res.json())
        .catch((err) => err.json()),
    {
      refetchOnWindowFocus: false,
      onError: () => {
        toast.error('Something went wrong 😢');
      },
    })
  );
};
