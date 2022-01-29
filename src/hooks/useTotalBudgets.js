import { useBudgets } from '../contexts/BudgetsContext';

export default function useTotalBudgets() {
    const { expenses, budgets } = useBudgets();

    let amount = expenses.reduce((total, expense) => total + expense.amount, 0);
    let max = budgets.reduce((total, budget) => total + budget.max, 0);

    return {
        amount,
        max
    };
}
