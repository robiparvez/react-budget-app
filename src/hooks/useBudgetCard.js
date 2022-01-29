import { currencyFormatter } from '../utils';

export default function useBudgetCard(amount, max, gray) {
    const classNames = [];
    if (amount > max) {
        classNames.push('bg-danger', 'bg-opacity-10');
    } else if (gray) {
        classNames.push('bg-light');
    }

    const getProgressBarVariant = (amount, max) => {
        const ratio = amount / max;
        if (ratio < 0.5) return 'primary';
        if (ratio < 0.75) return 'warning';
        return 'danger';
    };

    return {
        classNames,
        getProgressBarVariant,
        currencyFormatter
    };
}
