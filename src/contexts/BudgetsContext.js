import { createContext, useContext } from 'react';
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';

const BudgetsContext = createContext();

export const useBudgets = () => useContext(BudgetsContext);

export const UNCATEGORIZED_BUDGET = 'Uncategorized';

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage('budgets', []);
    const [expenses, setExpenses] = useLocalStorage('expenses', []);

    // Get expenses by budgetId
    const getBudgetExpenses = budgetId => {
        return expenses.filter(expense => expense.budgetId === budgetId);
    };

    // Add budget
    const addBudget = ({ name, max }) => {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name)) {
                return prevBudgets;
            }
            return [...prevBudgets, { id: uuidV4(), name, max }];
        });
    };

    // Add expense
    const addExpense = ({ description, amount, budgetId }) => {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
        });
    };

    // Delete budget
    const deleteBudget = ({ id }) => {
        // Deal with uncategorized expenses

        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if (expense.budgetId !== id) return expense;
                return { ...expense, budgetId: UNCATEGORIZED_BUDGET };
            });
        });

        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id);
        });
    };

    // Delete expense
    const deleteExpense = ({ id }) => {
        setExpenses(prevExpenses => {
            return prevExpenses.filter(budget => budget.id !== id);
        });
    };

    return (
        <BudgetsContext.Provider
            value={{
                budgets,
                expenses,
                getBudgetExpenses,
                addBudget,
                addExpense,
                deleteBudget,
                deleteExpense
            }}>
            {children}
        </BudgetsContext.Provider>
    );
};
