import { useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { UNCATEGORIZED_BUDGET, useBudgets } from '../contexts/BudgetsContext';

export default function AddExpenseModal({ show, handleClose, defaultBudgetId }) {
    const descriptionRef = useRef();
    const amountRef = useRef();
    const budgetIdRef = useRef();

    const { addExpense, budgets } = useBudgets();

    const handleSubmit = e => {
        e.preventDefault();
        addExpense({
            description: descriptionRef.current.value,
            amount: parseFloat(amountRef.current.value),
            budgetId: budgetIdRef.current.value
        });
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>New Expense</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Description */}
                    <Form.Group className='mb-3' controlId='description'>
                        <Form.Label>Description</Form.Label>
                        <Form.Control ref={descriptionRef} type='text' required />
                    </Form.Group>

                    {/* Amount */}
                    <Form.Group className='mb-3' controlId='amount'>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control ref={amountRef} type='number' required min={0} step={0.01} />
                    </Form.Group>

                    {/* Budgets */}
                    <Form.Group className='mb-3' controlId='amount'>
                        <Form.Label>Budgets</Form.Label>
                        <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
                            {/* Default option */}
                            <option value={UNCATEGORIZED_BUDGET}>Uncategorized</option>
                            {budgets.map(budget => (
                                <option key={budget.id} value={budget.id}>
                                    {budget.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Button */}
                    <div className='d-flex justify-content-end'>
                        <Button variant='primary' type='submit'>
                            Add
                        </Button>
                    </div>
                </Modal.Body>
            </Form>
        </Modal>
    );
}
