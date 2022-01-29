import useTotalBudgets from '../hooks/useTotalBudgets';
// import { useBudgets } from '../contexts/BudgetsContext';
import BudgetCard from './BudgetCard';

export default function TotalBudgetsCard() {
    if (!useTotalBudgets()) {
        return null;
    }

    const { amount, max } = useTotalBudgets();
    if (max === 0) return null;
    return <BudgetCard name='Total' amount={amount} max={max} gray hideButtons />;
}
