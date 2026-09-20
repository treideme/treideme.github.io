import{$ as e,E as t,M as n,P as r,pt as i,tt as a}from"./C5Qr1tWr.js";import"./xihTtKlq.js";import"./DSJ1rPnI.js";import"./DPw4rzvf.js";import"./BrJmRK04.js";import"./WppY4ym1.js";import"./BIw1C4rS.js";import{t as o}from"./DPsrAEoc.js";var s={title:`Floatcard for Small Businesses`,date:`2025-10-02`,updated:`2025-10-05`,categories:[`finance`],coverImage:`/images/float.png`,coverWidth:800,coverHeight:600,excerpt:`Upgrading your expense management to the next level.`},{title:c,date:l,updated:u,categories:d,coverImage:f,coverWidth:p,coverHeight:m,excerpt:h}=s,g=r(`<p>Expense management is a critical part of running a small business. Traditional methods often involve several
administrative headaches, such as tracking receipts, managing reimbursements, and ensuring compliance with company
policies. In addition, spending accounts can be difficult to monitor, leading to overspending or misallocation of funds.
Especially in smaller businesses—startups or small teams—you enter a gray zone: you don’t want to commit to the overhead
of a heavy-handed expense process, yet you’re too big to handle it informally. This often leads to inefficiencies and
lost time.</p> <p>Moreover, employees often use personal credit cards for business expenses. That can complicate reimbursement processes,
and foreign currency purchases may not be properly recorded or have HST/GST reclaimed correctly. Often, subscription
purchases for the business go unreimbursed because that line item was missed during an employee’s or co-founder’s
self-serve expense tracking. The <a href="https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/payroll/loyalty-points-programs.html" rel="nofollow">CRA</a> can also come after you — but hey, you’re collecting points on your personal card; isn’t that a taxable employment
benefit?</p> <p>Someone recently introduced us to <a href="https://floatcard.com/" rel="nofollow">Float</a>, and this was a good opportunity to overhaul our entire
expense management system. Let me illustrate a common expense practice. Often, SMEs only have a single corporate debit
card for the business, which is used for all petty expenses. For anything else, employees use their personal cards
and submit expense reports for reimbursement in Excel, with copies of receipts for each line item. Foreign currency purchases
also need extra information to justify the transaction’s exchange rate to CAD, which involves things like screenshots
from the bank statement for that transaction to justify the loss on foreign exchange. For each line item, the employee
is expected to manually break out the HST/GST portion to ensure the business can reclaim it properly. That submission
then needs to be reviewed for compliance and then further handed off to accounting for reconciliation. Then the accounting
person would book the bulk of the expense report as an <strong>invoice</strong> from the employee to the business and use the Excel basis
to break out the HST/GST portion. This entire process is tedious, error-prone, and time-consuming for both employees
and the accounting team. If you have an external accountant, this also adds to their billable hours. This seems to be
standard practice for many small businesses, but it is a mess. Let me visualize this; this is the happy path when
your employee gets everything right the first time:</p> <!> <p>Float seems to hit the sweet spot for small businesses looking to streamline their expense management processes.
The way they approach it is by providing prepaid corporate cards that can be issued to employees with specific spending
limits. Each card can be configured with different policies and already linked to spending accounts, making it easier
to track and manage expenses.</p> <p>You can configure policies to automatically capture receipts, categorize expenses, and enforce spending limits. If
transactions are non-compliant, the employee and eventually the company get angry emails from Float. This reduces the need
for manual reviews and helps ensure that expenses are properly documented and categorized from the start.
Rather than having to review each expense submission for compliance, you set up the rules in advance.</p> <p>Our goal was to cut out the <strong>Company</strong> portion in the above figure as much as possible, and it can be done.</p> <p>Users can create physical or virtual prepaid corporate cards in minutes, each with its own spending limits for
different expense categories like advertising or travel. Basically for episodic or one-off purchases, you can create a
virtual card and treat it like a project budget. Once the purchase is done, you can cancel the card to prevent any
further spending.</p> <p>A standout feature is the receipt capture, where employees receive a text message after a purchase and can submit the
receipt simply by replying with a photo. This eliminates the need to manually collect receipts.</p> <p>Float integrates with accounting software such as Xero and QuickBooks Online, which streamlines the reconciliation process.
You can see how this removes the need to manually reconcile expenses in the ledger, as Float automatically syncs the
transactions and their associated details (<strong>if you set this properly up in advance</strong>).</p> <p>While most of these cards are virtual, you can link them to wallet apps like <strong>Google Wallet</strong> or <strong>Apple Pay</strong> for
easy tap-to-pay options, enabling this also as a <strong>project card</strong> for a conference or meal expenses with a budget.</p> <p>The other neat thing is that they offer a decent interest rate on deposits and low forex rates. Your main Canadian
bank usually bleeds you dry on forex fees and offers no significant interest on idle cash. I have not tested it
with the significant balances they require, but we are planning to keep more working capital in Float.</p> <p>What I am still missing from Float is better OCR capabilities to automatically extract key details from receipts,
such as vendor names, dates, and amounts. While the current receipt capture is convenient, having more advanced OCR
would further reduce manual data entry and improve accuracy. Perhaps this is on their roadmap, or I have not fully explored
all the features yet.</p> <p>Before long Bookkeepers will become Simply Red fans, or not…</p> <!><br/>`,1);function _(r){var s=g(),c=a(e(s),6);t(c,()=>`<pre class="mermaid">sequenceDiagram
    Employee->>Employee: Make Business Purchase (Personal Card)
    Employee ->>+Company: Submit Expense Report (Excel + Receipts)
    Company -->>Employee: Request Clarifications/Corrections
    Employee -->>Company: Resubmit Corrected Report
    Company ->>Employee: Reimburse Employee with Company Funds
    Company ->>+Bookkeeping: Forward Approved Report
    Bookkeeping -->>Company: Request Additional Info/Corrections
    Company -->>Bookkeeping: Provide Info/Corrections
    Bookkeeping ->>-Company: Reconcile Expenses in Ledger
    deactivate Company</pre>`);var l=a(c,22);o(l,{id:`DrUB0g8Vjgg`,width:`500`}),i(),n(r,s)}export{_ as default,s as metadata};