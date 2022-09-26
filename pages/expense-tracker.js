// component
import { Expense } from '../src/components/Expense';

// Authenticated session provider
import { Authenticated } from '../src/layouts/Authenticated';

const Expenses = () => {
  return (
    <Authenticated>
      <Expense />
    </Authenticated>
  );
};

export default Expenses;
