// Date Handling Comparison: date-fns vs Day.js
import { addDays, format, formatDistanceToNow, parseISO } from 'date-fns';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';

dayjs.extend(relativeTime);

const isoInput = '2026-10-29T10:00:00Z';

// 1. date-fns implementation
const dateFnsParsed = parseISO(isoInput);
const dateFnsFuture = addDays(dateFnsParsed, 7);
console.log('--- date-fns Output ---');
console.log('Formatted:', format(dateFnsFuture, 'yyyy-MM-dd'));
console.log('Relative:', formatDistanceToNow(dateFnsFuture, { addSuffix: true }));

// 2. day.js implementation
const dayjsParsed = dayjs(isoInput);
const dayjsFuture = dayjsParsed.add(7, 'day');
console.log('\n--- Day.js Output ---');
console.log('Formatted:', dayjsFuture.format('YYYY-MM-DD'));
console.log('Relative:', dayjsFuture.fromNow());
