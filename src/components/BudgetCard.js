import { Button, Card, ProgressBar, Stack } from 'react-bootstrap';
import useBudgetCard from '../hooks/useBudgetCard';

export default function BudgetCard({ name, amount, max, gray, openAddExpenseClick, hideButtons, openViewExpensesClick }) {
    const { classNames, getProgressBarVariant, currencyFormatter } = useBudgetCard(amount, max, gray);

    return (
        <Card>
            <Card.Body className={classNames.join(' ')}>
                {/* Card - name, amount, max */}
                <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                    <div className='me-2'>{name}</div>
                    <div className='d-flex align-items-baseline'>
                        {currencyFormatter.format(amount)}
                        {max && <span className='text-muted fs-6 ms-1'>/ {currencyFormatter.format(max)}</span>}
                    </div>
                </Card.Title>

                {/* ProgressBar */}
                {max && <ProgressBar className='rounded-pill' variant={getProgressBarVariant(amount, max)} min={0} max={max} now={amount} />}

                {/* Expenses Buttons */}
                {!hideButtons && (
                    <Stack direction='horizontal' gap={2} className='mt-4'>
                        <Button variant='outline-primary' className='ms-auto' onClick={openAddExpenseClick}>
                            Add Expense
                        </Button>
                        <Button variant='outline-secondary' onClick={openViewExpensesClick}>
                            View Expenses
                        </Button>
                    </Stack>
                )}
            </Card.Body>
        </Card>
    );
}
