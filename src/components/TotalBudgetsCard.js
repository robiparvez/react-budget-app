import useTotalBudgets from '../hooks/useTotalBudgets';
import BudgetCard from './BudgetCard';

export default function TotalBudgetsCard() {
    const { amount, max } = useTotalBudgets();
    return <BudgetCard name='Total' amount={amount} max={max} gray hideButtons />;
}
