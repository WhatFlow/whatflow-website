import {article} from './shared.mjs';
const articles = [
article('shared-team-inbox-small-shopify-business','Set up a shared team inbox without losing conversation ownership','Define who reads new messages, how handoffs work and what a useful resolution looks like before adding more support tools.','operations',['Team inbox','Customer support','Small teams'],`
A shared inbox solves an access problem: more than one person can see the customer conversation. It does not automatically solve the ownership problem. If everyone assumes someone else is answering, the buyer still waits, only now several colleagues can see the delay.

Start with a small set of operational rules. Decide who checks new messages, what requires escalation and how the next person can understand an open case. A modest process that the team follows is more useful than elaborate routing no one maintains.

## Give new conversations an owner
Define a person or rotation responsible for checking new messages during the store’s working hours. Make the handover between shifts explicit. The customer should not need to repeat the question simply because one colleague finished for the day.

Describe response expectations honestly. If the store does not provide continuous support, avoid a greeting that promises an immediate human answer at all times. An automated acknowledgment can set context, but it should not create the impression that the issue has already been investigated.

## Record the question and next step
A useful handoff explains what the buyer needs, what has been checked and what remains open. Keep it concise and tied to the conversation. Another colleague should not have to reconstruct the case from scattered screenshots in a private chat.

Use the note or handoff capabilities your actual tools provide. Do not promise automatic assignment or a particular ticket state unless the configured integration supports it. A shared view of the messages is not proof that a workflow created a separate operational task.

## Keep product answers accurate
Create a small reference set for common questions about fit, compatibility, delivery and returns. Give each answer a source and a review owner. Saved replies should make accurate help easier, not preserve an outdated promise indefinitely.

Encourage colleagues to adapt the answer to the question. A long generic policy pasted into every conversation can leave the buyer’s specific concern unanswered. If the product is unsuitable or the team does not yet know the answer, say that clearly and explain the appropriate next step.

## Define escalation around the decision needed
A refund question, a product defect and a technical compatibility issue may need different people. State which colleague can make the relevant decision and what information they need. Do not ask the buyer for unnecessary documents simply because the escalation checklist is vague.

Keep private information in controlled systems and avoid copying full conversations into broad-access reports. The escalation summary should help someone act while preserving the context and the customer’s expectations about how their information is handled.

## Use WhatFlow’s commercial model appropriately
WhatFlow Business API includes a team inbox without seat fees and provides features across plans. That can make it easier for a founder to involve another colleague without purchasing an additional inbox seat. Message allowances and rates still differ by plan.

The lack of a seat charge is a budgeting advantage, not an instruction to give unrestricted access to everyone. Use the access controls available in your actual setup and give colleagues the responsibility and context needed for their role.

## Review unresolved cases, not only message volume
A busy inbox can look productive while the same cases remain open. Set aside time to review conversations awaiting a customer reply, an internal decision or an external update. Distinguish those states so a colleague knows what kind of follow-up is appropriate.

Track recurring causes and improve the underlying page or process. The strongest inbox operation does more than answer quickly: it keeps ownership clear, resolves the actual question and gradually reduces avoidable confusion for future customers.
`,['app','policy'],[{question:'Does a shared inbox automatically assign every conversation?',answer:'Not necessarily. Use the supported features and configured workflow in your actual setup, and define ownership explicitly.'},{question:'Does WhatFlow Business API charge per inbox seat?',answer:'WhatFlow Business API has no inbox seat fees. Plans differ by messaging allowances and rates, with features included across plans.'}]),
article('customer-service-saved-replies-without-robotic-tone','Write saved replies that still answer the customer’s question','Build a small library of accurate support answers with editable context, clear limitations and a review routine.','operations',['Saved replies','Support writing','Customer experience'],`
Saved replies can help a small team answer consistently, but they can also make the customer feel unheard. The difference is whether the reply supports a real answer or replaces the effort of understanding the question. A polished paragraph is not useful if it responds to a different problem.

Build the library around recurring tasks, not broad sentiments such as “customer reassurance.” Each reply should have a clear use case, a trustworthy information source and a short section the colleague must adapt before sending.

## Start with the questions that repeat
Review recent conversations and identify practical themes: choosing a size, finding tracking, understanding a return condition or checking compatibility. Separate cases that sound similar but require different decisions. “Where is my order?” can mean the tracking link is missing or that a carrier status has stopped changing.

Write the direct answer first. A short acknowledgment can help, but avoid several sentences of generic appreciation before the customer learns what to do. The reply should make the next step clearer than it was before the message arrived.

## Mark the parts that require a real check
Use obvious placeholders for values a colleague must confirm, such as the relevant product version or the current delivery status. Do not make an example order number look ready to send. Test how the workflow handles missing data before using automated field insertion.

Some statements should never be sent without investigation: a refund has been issued, a replacement has shipped or an order has been cancelled. Keep those claims tied to the actual system state. A saved reply cannot turn an intended action into a completed one.

## Keep policy summaries aligned with the source
Link the reply to the current policy or product information. If the store changes its return conditions, update the saved explanation at the same time. Otherwise a colleague may continue offering an old promise even after the public page has been corrected.

Summaries should preserve the practical limitation the buyer needs to know. Avoid saying “free returns” when charges or eligibility depend on circumstances. A slightly longer accurate answer is preferable to a reassuring phrase that the next step contradicts.

## Leave room for ordinary human wording
A colleague should be able to replace an irrelevant opening, answer the buyer’s exact question and remove unnecessary detail. The goal is consistency of information, not identical sentences in every conversation. Avoid forcing a cheerful tone when someone is reporting a genuine problem.

Use the customer’s words where that helps recognition, without repeating private information unnecessarily. A clear explanation of what will happen next usually sounds more human than a long apology filled with brand slogans.

## Distinguish manual replies from WhatsApp templates
A saved staff response is not automatically an approved business-initiated WhatsApp template. The applicable customer-service window and message rules still determine which formats can be sent. Keep the operational writing library and the approved-template setup distinct.

WhatFlow Business API supports both conversational work in the team inbox and configured message actions. Select the format appropriate to the actual interaction. Do not assume that storing text in a convenient place makes it eligible for every audience or sending situation.

## Give the library a maintenance routine
Assign an owner and review date to the important replies. Remove duplicates that differ only in tone, and revise answers that repeatedly cause follow-up confusion. Keep examples of when each reply should not be used; those boundaries often prevent the most awkward customer experiences.

Measure usefulness through resolved questions and fewer avoidable follow-ups rather than the number of saved responses created. A compact library that helps colleagues think clearly is better than hundreds of canned paragraphs no one can confidently choose between.
`,['policy','app'],[{question:'Is a saved reply the same as an approved WhatsApp template?',answer:'No. Approved templates and free-form customer-service messages have different requirements. Choose the format supported by the actual sending situation.'},{question:'Should every colleague send identical wording?',answer:'Keep facts consistent while allowing the reply to answer the customer’s specific question and match the situation appropriately.'}]),
article('audit-shopify-app-costs-feature-gates-seat-fees','Audit Shopify app costs beyond the headline monthly price','Compare required features, usage allowances, inbox seats and integration costs against the actual workflow your store needs.','operations',['App costs','Software selection','Pricing'],`
A store can accumulate several affordable apps and end up with a costly process. The total may include usage charges, extra seats, a higher tier for one required feature and another subscription to connect the tools. The useful comparison is the cost of completing the task, not the lowest price printed on each landing page.

Choose a real workflow to audit, such as handling WhatsApp support or sending review invitations. List the capabilities it requires and the people who need access. That gives the pricing exercise a practical scope.

## Define the minimum working setup
Write down the events, actions, data and team access needed for the workflow. A plan is not sufficient merely because it includes a feature with a similar name. Check whether the required trigger, message type or integration is available in that specific tier.

Separate current needs from optional future ideas. Paying for an unused advanced tier can be wasteful, but selecting a cheaper plan that cannot perform the core task is not a saving. Keep the distinction visible in the comparison.

## Count usage on the same basis
Providers can charge by contacts, messages, events, active users or another unit. Translate the store’s workload into each model before comparing totals. A “message” allowance may not be directly comparable to a contact allowance, especially when follow-ups create several sends per customer.

Use a normal, quiet and peak scenario. Include reminders, split shipments and other conditions that affect volume. Make the assumptions explicit so the team can update the model when the business changes instead of treating one month’s estimate as a permanent forecast.

## Check seat fees and feature gates
List the colleagues who need the inbox and which tasks they perform. Confirm the available access model and any additional user charges. Then identify features reserved for a more expensive plan, including automation, reporting or integration capabilities required by the workflow.

WhatFlow Business API has no inbox seat fees and includes its features across plans, including Free. Plans differ by messaging allowances and rates. That can make a small team’s setup easier to budget, while still requiring a realistic estimate of messages and applicable delivery charges.

## Include the connecting tools
A workflow may require Shopify Flow and compatible installed app tasks, or another supported integration. Check any plan requirements and subscriptions associated with that connection. Do not assume that an app’s entire feature set becomes available simply because it appears in the Shopify ecosystem.

Also account for staff time needed to maintain the process. A fragile integration that requires frequent manual repair can cost more operationally than its subscription suggests. Record which parts are supported directly and which depend on custom work or a separate service.

## Review billing behavior before changing plans
Understand when upgrades or downgrades take effect, what happens to feature configuration and how usage is billed. Consult the provider’s current terms rather than generalizing from another app. A trial ending and a plan changing can affect the store at different times.

Keep the decision reversible where possible. Record the configuration and export the data the provider allows before making a significant migration. Do not delete the old setup until the replacement has been checked against the actual workflow and a practical recovery path exists.

## Choose value around the completed task
Compare the total cost with the useful outcome and the team’s ability to maintain the process. A cheaper subscription is not automatically better, and a higher price is not evidence of a stronger fit. Use the same requirements and workload for every option.

Review the audit after a meaningful change in volume or staffing. The aim is a manageable system with clear costs and dependable behavior. A pricing table becomes useful when it explains what the store can actually accomplish at the quoted total.
`,['pricing','flow','app'],[{question:'Can I compare app prices without specifying usage?',answer:'A useful comparison should state the workload and required capabilities. Different billing units and allowances can produce very different totals.'},{question:'Does an integration listing guarantee all app features work together?',answer:'No. Check the specific supported tasks, data requirements, installed configuration and any plan restrictions.'}]),
article('choose-first-automation-shopify-small-team','Choose the first Shopify automation your team can maintain','Find a repeatable task with reliable data, a clear outcome and a manageable exception path before building a complex workflow.','operations',['Automation planning','Small teams','Shopify Flow'],`
The first automation should make the team’s work easier to understand, not harder to explain. A visually impressive workflow with many branches can still be a poor starting point if no one knows what should happen when a field is missing or a customer replies unexpectedly.

Look for a task that repeats, has a clear business rule and creates an outcome you can verify. A simple order tag or a well-defined message can teach the team more than an ambitious sequence that combines several unresolved decisions.

## Find the repeated handoff
Ask which task regularly requires someone to copy information between tools or tell another colleague that something happened. A customer confirming an order, a review-request event or a specific support keyword can each represent a potential starting point.

Choose one handoff with enough repetition to be worth improving. Avoid automating an unusual exception before the normal process is understood. The team should be able to describe the current manual decision and the evidence it uses.

## Check that the trigger provides the right data
A trigger determines what the workflow knows at the start. An incoming phone number is not automatically a Shopify order reference. If the next action needs an order, choose a supported event that supplies that context and verify which record it identifies.

WhatFlow’s order-reply trigger is distinct from its generic button-click event for this reason. Select the event that fits the task rather than the label that sounds most familiar. Missing context is a design problem, not a detail to hide with a guessed value.

## Keep the first outcome modest
A workflow that records a clearly understood tag is easier to inspect than one that also cancels, refunds or fulfills an order. Start with the smallest action that removes a useful manual step. Treat higher-impact operations as separate business decisions with explicit rules.

Write down what the workflow should not infer. A customer clicking a confirmation button does not necessarily authorize every later operation the store might associate with that order. Keep the message wording and resulting action consistent.

## Design the exception path early
List missing data, duplicate events, late replies and nonmatching responses. Decide whether those cases should stop, remain for a person or take another supported action. The false branch is part of the process, not empty space to fill after the main path looks complete.

Assign ownership of the exceptions. WhatFlow’s team inbox can support the human conversation, while compatible Flow tasks can connect to other installed apps where supported. Do not promise automatic ticket creation or assignment unless the actual configured action performs it.

## Test the rule without claiming a live outcome
Use the platform’s available testing tools to inspect logic and variable mapping. Keep example workflows inactive during review. A configuration preview does not prove that a message was delivered or that an external operation occurred.

For any later end-to-end check, use controlled data and an appropriate authorization process. Include a nonmatching case and a repeated event, not only the ideal positive path. The result should be observable in the target system rather than inferred from a plausible diagram.

## Leave a note the next colleague can use
Name the workflow around its outcome and document the trigger, required data, owner and exception behavior. Include the reason for important conditions. A colleague should not need the original builder’s memory to understand why the flow exists.

WhatFlow Business API includes features across plans with no inbox seat fees, which can help a small team explore a focused workflow. The value comes from a maintained process with clear inputs and outcomes. Add complexity only when the next branch solves a defined problem.
`,['flow','app','policy'],[{question:'What makes a good first automation?',answer:'A repeatable task with reliable trigger data, one clear outcome, an observable result and an understandable exception path.'},{question:'Should the first workflow include refunds or fulfillment?',answer:'Start with a modest outcome where possible. Higher-impact operations need their own explicit business rules, authorization and testing.'}]),
article('prepare-customer-support-black-friday-shopify','Prepare Shopify support for a busy sale without losing the customer context','Plan campaign ownership, accurate answers and escalation routes before a peak sales period increases conversation volume.','operations',['Peak season','Customer support','Sale preparation'],`
A busy sale changes support before the first order arrives. More visitors ask about eligibility, delivery and stock; returning customers ask whether an offer applies to something they bought earlier. If the team learns the campaign details from customer screenshots, the support process is already behind.

Prepare the information and ownership before increasing message volume. The objective is not to answer every question with an automated promotion. It is to give customers accurate help while keeping exceptional cases visible during a period when several colleagues may share the workload.

## Give the team one current offer reference
Document the sale dates, eligible products, exclusions and how discounts interact. Include the actual destination links and the person who can resolve an unclear edge case. Update the reference when the campaign changes rather than circulating several competing versions.

Avoid vague statements such as “everything is discounted” when the checkout contains exceptions. Support should be able to explain the offer from the same source used by marketing. A concise, accurate summary can prevent many avoidable back-and-forth conversations.

## Check stock and delivery expectations
Make sure product availability and expected processing information are current where the team answers questions. A peak-period promise should reflect the store’s actual capacity rather than a normal-week estimate copied into campaign creative.

Distinguish the store’s processing time from the carrier journey. If a date is an estimate, describe it that way. Do not claim that every order will arrive before an occasion unless the store can genuinely support the promise under the stated conditions.

## Decide how new conversations are handled
Set a clear rotation or owner for incoming messages during the sale. Identify when another colleague takes over and how unresolved cases are handed off. A shared inbox is useful, but it does not automatically establish responsibility.

WhatFlow Business API has no inbox seat fees, which can make involving extra colleagues easier to budget. Use the supported access model appropriately and give each person the information they need. Do not treat broader access as a substitute for training or a clear escalation route.

## Prepare a small set of adaptable answers
Write concise responses for common offer, sizing, delivery and return questions. Mark which values require a current check. Avoid saved replies claiming that an order shipped or a refund was issued unless the relevant action actually happened.

Keep the tone suitable for the situation. A customer reporting a failed checkout needs practical help, not another enthusiastic paragraph about the sale. Colleagues should be able to adapt the wording while preserving accurate information.

## Coordinate promotional and operational messages
Review the email, SMS and WhatsApp campaigns together with order notifications. A customer completing a purchase should not continue receiving contradictory recovery messages where the connected systems can suppress them. Check combined contact volume, not only each app’s calendar.

For WhatsApp, apply the appropriate permissions and message formats. Approved templates and the customer-service window remain relevant during a busy promotion. Higher volume does not remove those requirements or make every stored phone number an appropriate campaign recipient.

## Review the first busy period and adjust
Look at unresolved cases, recurring questions and workload by time of day. A sudden volume increase may come from an unclear offer rather than genuine demand for one-to-one advice. Improve the public information when several customers need the same explanation.

After the sale, capture the operational lessons while they are fresh. Keep the useful replies, correct the misleading pages and retire expired offers. The next peak period should begin with a better process, not a larger collection of old campaign screenshots.
`,['policy','pricing','app'],[{question:'Does adding more inbox users solve peak-period support?',answer:'It helps only with a clear owner, accurate offer information, training and an escalation process. Shared access alone does not assign the work.'},{question:'Should old sale replies stay in the saved-answer library?',answer:'Retire or update expired offers and check any reused wording against the current campaign rules before sending.'}]),
];
export default articles;
