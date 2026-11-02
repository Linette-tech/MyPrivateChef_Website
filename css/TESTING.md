# Verification record and final test checklist

## Checks performed during implementation

- JavaScript syntax check: passed with node --check.
- All five HTML pages: titles/descriptions present; local href/src/srcset targets checked.
- Browser: 12 initial menu results; search for lasagne returns one matching card.
- Browser: image opens in dialog; Next and Close buttons respond.
- Browser: empty enquiry submission shows correction message.
- Browser: two Breakfast Taco portions produce R130 before delivery.
- Browser: Leaflet renders markers/controls; selecting Sandton opens its popup; map reports loaded tiles.
- Browser: valid contact details generate a readable draft with encoded mailto link. No email sent.

## Complete these checks on the final public deployment

| Test | Expected result | Your result |
| --- | --- | --- |
| All pages and navigation | No 404, missing assets or console errors | Pending |
| Widths 375, 768 and 1440 px | Readable controls; no horizontal page scroll | Pending |
| FAQ mouse/keyboard | Answers expand/collapse | Pending |
| Search 'chicken' + Dinner | Only matching dinner cards | Pending |
| Search nonsense, then clear | Empty message, then all cards restored | Pending |
| Lightbox keyboard | Enter opens; arrows navigate; Escape closes; focus returns | Pending |
| Map pan/zoom/select | Correct approximate area and popup | Pending |
| Empty enquiry/contact | Inline errors and focus on first invalid field | Pending |
| Bad email, phone, whitespace name | Submission blocked with helpful errors | Pending |
| Phone 0821234567 / +27821234567 | Both accepted | Pending |
| Quantity 0, 101, 1.5 | Rejected | Pending |
| Today or earlier date | Rejected | Pending |
| Weekday 06:00 / Sunday 19:00 | Rejected | Pending |
| Everyday/monthly with no meal | Meal selection error | Pending |
| Two R65 portions | R130 before delivery; no confirmed booking | Pending |
| Special occasion | Tailored-quote response | Pending |
| Edit after estimate/draft | Old result clears | Pending |
| Clear Form | Fields, errors and response reset | Pending |
| Contact punctuation / ampersands | Correct encoded email subject/body | Pending |
| Configured AJAX success | Service accepts data and verified mailbox receives email | Requires endpoint |
| AJAX offline/error/timeout | Error message; entries preserved; button enabled | Requires endpoint |
| Slow/offline map | Text area list and external link remain usable | Pending |
| Reduced motion | Entry animation disabled | Pending |

Do not mark pending tests as passed without running them. Actual email receipt, public deployment, mobile widths and lecturer feedback remain finalisation tasks.
