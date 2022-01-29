import useUncategorizedBudget from '../hooks/useUncategorizedBudget';
import BudgetCard from './BudgetCard';

export default function UncategorizedBudgetCard(props) {
    const { UNCATEGORIZED_BUDGET, amount } = useUncategorizedBudget();
    return <BudgetCard name={UNCATEGORIZED_BUDGET} amount={amount} gray {...props} />;
}
