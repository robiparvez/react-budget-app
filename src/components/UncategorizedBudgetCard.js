import useUncategorizedBudget from '../hooks/useUncategorizedBudget';
import BudgetCard from './BudgetCard';

export default function UncategorizedBudgetCard(props) {
    if (!useUncategorizedBudget()) {
        return null;
    }

    const { UNCATEGORIZED_BUDGET, amount } = useUncategorizedBudget();
    if (amount === 0) return null;
    return <BudgetCard name={UNCATEGORIZED_BUDGET} amount={amount} gray {...props} />;
}
