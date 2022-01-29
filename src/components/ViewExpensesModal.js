import { Modal, Button, Stack } from 'react-bootstrap';
import { UNCATEGORIZED_BUDGET, useBudgets } from '../contexts/BudgetsContext';
import { currencyFormatter } from '../utils';

export default function ViewExpensesModal({ budgetId, handleClose }) {
    const { budgets, getBudgetExpenses, deleteBudget, deleteExpense } = useBudgets();

    const expenses = getBudgetExpenses(budgetId);
    const budget = budgetId == UNCATEGORIZED_BUDGET ? { id: UNCATEGORIZED_BUDGET, name: 'Uncategorized' } : budgets.find(budget => budget.id === budgetId);

    return (
        <Modal show={budgetId != null} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction='horizontal' gap={2}>
                        <div>Expense - {budget?.name}</div>
                        {budgetId !== UNCATEGORIZED_BUDGET && (
                            <Button
                                variant='outline-danger'
                                onClick={() => {
                                    deleteBudget(budget);
                                    handleClose();
                                }}>
                                Delete
                            </Button>
                        )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Stack direction='veritcal' gap={3}>
                    {expenses.map(expense => (
                        <Stack direction='horizontal' gap={2} key={expense.id}>
                            <div className='me-auto fs-4'>{expense.description}</div>
                            <div className='fs-5'>{currencyFormatter.format(expense.amount)}</div>
                            <Button size='sm' variant='outline-danger' onClick={() => deleteExpense(expense)}>
                                &times;
                            </Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>
        </Modal>
    );
}
