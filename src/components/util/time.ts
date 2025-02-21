import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export function ago(date: string) {
    return dayjs(date).subtract(2, 'hour').fromNow();
}