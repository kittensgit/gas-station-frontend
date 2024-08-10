import { format } from 'date-fns';

export const formatHistoryDate = (date: Date) => {
    return format(date, 'dd.MM.yy');
};

export const formatOrderDate = (date: Date) => {
    return format(date, 'MMMM dd, kk:mm');
};
