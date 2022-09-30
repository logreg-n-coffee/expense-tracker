// useCategories updates expense data from google sheets with useMutation

// useMutation
import { useMutation } from '@tanstack/react-query';

// react notifications
import toast from 'react-hot-toast';

// local state
import { useState } from 'react';

export const useExpenses = () => {
    const [count, setCount] = useState(0);

    const { isLoading, mutate } = useMutation(
        ['expenses'], 
        (values) => 
            fetch('/api/google-sheets/expenses', {
                method: 'POST',
                body: JSON.stringify(values),
            })
            .then(res => res.json())
            .catch(err => err.json()),
        {
            onSuccess: () => {
                const nextCount = count + 1;
                setCount(nextCount);
                toast.success(nextCount === 5 ? 'Wow! 5 in a row' : 'Added one expense');
            },
            onError: (err) => {
                toast.error('Something went wrong');
            },
        }
    );
};
