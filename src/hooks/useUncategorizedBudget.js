import { UNCATEGORIZED_BUDGET, useBudgets } from '../contexts/BudgetsContext';

export default function useUncategorizedBudget() {
    const { getBudgetExpenses } = useBudgets();

    let amount = getBudgetExpenses(UNCATEGORIZED_BUDGET).reduce((total, expense) => {
        return total + expense.amount;
    }, 0);

    return {
        UNCATEGORIZED_BUDGET,
        amount
    };
}
