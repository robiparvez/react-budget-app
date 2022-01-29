import { useBudgets } from '../contexts/BudgetsContext';

export default function useTotalBudgets() {
    const { expenses, budgets } = useBudgets();

    let amount = expenses.reduce((total, expense) => {
        return total + expense.amount;
    }, 0);

    let max = budgets.reduce((total, budget) => {
        return total + budget.max;
    }, 0);

    if (max === 0) return null;

    return {
        amount,
        max
    };
}
