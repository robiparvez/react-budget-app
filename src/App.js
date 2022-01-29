import { useState } from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import AddBudgetModal from './components/AddBudgetModal';
import AddExpenseModal from './components/AddExpenseModal';
import BudgetCard from './components/BudgetCard';
import TotalBudgetsCard from './components/TotalBudgetsCard';
import UncategorizedBudgetCard from './components/UncategorizedBudgetCard';
import ViewExpensesModal from './components/ViewExpensesModal';
import { UNCATEGORIZED_BUDGET, useBudgets } from './contexts/BudgetsContext';

function App() {
    const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
    const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
    const [showAddExpenseModalByBudgetId, setShowAddExpenseModalByBudgetId] = useState();
    const [viewExpensesModalByBudgetId, setViewExpensesModalByBudgetId] = useState();

    const { budgets, getBudgetExpenses } = useBudgets();

    const openAddExpenseModalByBudgetId = budgetId => {
        setShowAddExpenseModal(true);
        setShowAddExpenseModalByBudgetId(budgetId);
    };

    const getBudgetExpensesAmount = budgetId => {
        return getBudgetExpenses(budgetId).reduce((total, expense) => {
            return total + expense.amount;
        }, 0);
    };

    return (
        <>
            <Container className='my-4'>
                <Stack direction='horizontal' gap='2' className='mb-4'>
                    <h1 className='me-auto'>Budgets</h1>
                    <Button variant='primary' onClick={() => setShowAddBudgetModal(true)}>
                        Add Budget
                    </Button>
                    <Button variant='outline-primary' onClick={openAddExpenseModalByBudgetId}>
                        Add Expense
                    </Button>
                </Stack>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '1rem',
                        alignItems: 'flex-start'
                    }}>
                    {/* Budget */}
                    {budgets.map(budget => {
                        return <BudgetCard key={budget.id} name={budget.name} amount={getBudgetExpensesAmount(budget.id)} max={budget.max} openAddExpenseClick={() => openAddExpenseModalByBudgetId(budget.id)} openViewExpensesClick={() => setViewExpensesModalByBudgetId(budget.id)} />;
                    })}
                    <UncategorizedBudgetCard openAddExpenseClick={openAddExpenseModalByBudgetId} openViewExpensesClick={() => setViewExpensesModalByBudgetId(UNCATEGORIZED_BUDGET)} />
                    <TotalBudgetsCard />
                </div>
            </Container>

            {/* Add budget  */}
            <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />

            {/* Add Expense  */}
            <AddExpenseModal show={showAddExpenseModal} defaultBudgetId={showAddExpenseModalByBudgetId} handleClose={() => setShowAddExpenseModal(false)} />

            <ViewExpensesModal budgetId={viewExpensesModalByBudgetId} handleClose={() => setViewExpensesModalByBudgetId()} />
        </>
    );
}

export default App;
