# Library Comparison: Date Handling in JavaScript (date-fns vs. Day.js)

## Executive Summary
Choosing the right utility library for date manipulation is a critical decision in modern frontend and backend JavaScript development. This technical evaluation compares two popular open-source solutions—**`date-fns`** (v3.6.0) and **`day.js`** (v1.11.11)—for handling date parsing, formatting, and arithmetic.

---

## 1. Size & Dependencies
Bundle size directly impacts application load times and execution overhead.

* **`date-fns`**:
  * **Architecture**: Modular, functional design (`import { format } from 'date-fns'`).
  * **Tree-Shaking**: Excellent. Importing a single utility function adds **~1.2 kB to 2.5 kB** minified + gzipped to the bundle.
  * **Dependencies**: Zero external dependencies (`0 dependencies`).
* **`day.js`**:
  * **Architecture**: Object-oriented chainable wrapper around Native JS `Date` objects, mimicking the legacy Moment.js API.
  * **Base Bundle Size**: **~2 kB** minified + gzipped for the core library.
  * **Plugin Architecture**: Advanced features (e.g., relative time, timezone support) require explicitly loading separate plugins.
  * **Dependencies**: Zero external dependencies (`0 dependencies`).

---

## 2. Maintenance & Repository Activity
Sustained maintenance ensures security patches, runtime compatibility, and active issue resolution.

| Metric | `date-fns` | `day.js` |
| :--- | :--- | :--- |
| **GitHub Stars** | ~35.2k | ~46.8k |
| **Weekly Downloads (npm)** | ~28M | ~52M |
| **Active Maintainers** | High (regular releases, TypeScript-first refactor in v3) | Moderate (stable core, maintenance focused on plugins) |
| **TypeScript Support** | Native (written in TypeScript) | Built-in type definitions (`index.d.ts`) |
| **Open Issues / PRs** | Actively triaged, quick resolution cycle | Higher open issue count due to wide adoption surface |

---

## 3. Documentation Quality
Clear documentation reduces developer onboarding time and syntax friction.

* **`date-fns` Documentation**:
  * Clean, searchable, single-page and multi-page API browser (`date-fns.org`).
  * Every function includes explicit parameter signatures, TypeScript types, return values, and runnable code examples.
  * Clear deprecation notes across major version jumps (v2 to v3).
* **`day.js` Documentation**:
  * Organized by functional categories (Display, Parse, Manipulate, Plugin) at `day.js.org`.
  * Concise syntax examples for core methods and plugins.
  * Slightly less detailed edge-case specifications for custom locale parsing compared to `date-fns`.

---

## 4. Developer Experience: Building the Example

To compare DX, both libraries were implemented to accomplish the same workflow: parse an ISO timestamp, add 7 business/calendar days, format into `YYYY-MM-DD`, and calculate relative time from now.

### Implementation Example (`example.js`):

```javascript
// --- Option A: date-fns ---
import { addDays, format, formatDistanceToNow, parseISO } from 'date-fns';

const dateStr = '2026-10-29T10:00:00Z';
const parsedDateFns = parseISO(dateStr);
const futureDateFns = addDays(parsedDateFns, 7);

console.log('date-fns Formatted:', format(futureDateFns, 'yyyy-MM-dd'));
console.log('date-fns Relative:', formatDistanceToNow(futureDateFns, { addSuffix: true }));

// --- Option B: day.js ---
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js';

dayjs.extend(relativeTime);

const parsedDayjs = dayjs('2026-10-29T10:00:00Z');
const futureDayjs = parsedDayjs.add(7, 'day');

console.log('Day.js Formatted:', futureDayjs.format('YYYY-MM-DD'));
console.log('Day.js Relative:', futureDayjs.fromNow());
```

### DX Impressions:
* **Writing `date-fns`**: Feels like standard JavaScript utility functions. Pure functions mean state immutability is guaranteed by default. Tokens are strict (e.g., `yyyy` vs `YYYY`), preventing common formatting bugs.
* **Writing `day.js`**: Chainable syntax (`dayjs().add(7, 'day').format(...)`) is intuitive and readable for developers transitioning from Moment.js. However, remembering to import and extend plugins (e.g., `dayjs.extend(relativeTime)`) adds mild boilerplate.

---

## 5. Final Recommendation & Conditions

### Primary Recommendation: **`date-fns`**
For modern JavaScript/TypeScript applications (React, Next.js, Node.js), **`date-fns`** is the superior default choice. Its functional, tree-shakeable architecture guarantees that applications only pay the bundle-size cost for the specific functions they use. Native TypeScript implementation ensures excellent IDE autocomplete and type safety.

### When to Choose **`day.js`**:
Choose **`day.js`** under the following conditions:
1. **Refactoring Legacy Code bases**: If migrating an existing application from `Moment.js`, `day.js` provides a near 1:1 drop-in syntax replacement with zero learning curve.
2. **Micro-frontends or Monolithic Apps with Heavy Date Display**: When an application requires dozens of different date utilities across many pages, loading `day.js` as a single ~2 kB core core library can be simpler than managing multiple function imports.
