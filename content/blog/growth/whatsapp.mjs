import {article} from './shared.mjs';
const articles = [
article('whatsapp-marketing-plan-small-shopify-store','A practical WhatsApp marketing plan for a small Shopify store','Start with one useful customer journey, a clear audience and a realistic message budget before expanding your WhatsApp campaigns.','whatsapp',['Marketing plan','Small business','Shopify'],`
A small store does not need a large campaign calendar to begin using WhatsApp well. It needs one useful reason to contact the right customer and a team ready to handle the reply. Starting with several broadcasts can hide basic problems with recipient data, message purpose and ownership.

Choose a first journey that you can explain in plain language. That might be helping eligible buyers with an abandoned checkout, answering product questions or sending a relevant post-purchase invitation. The plan should describe the customer need before it describes the automation tool.

## Define one outcome and one audience
Write the intended outcome and the criteria for eligibility. “Help buyers who asked about a particular product” is more precise than “increase engagement.” Check whether the tools actually provide the data needed to identify that group and whether the messaging relationship permits the planned contact.

Avoid treating every phone number in Shopify as a marketing audience. A contact field establishes that the store has a number, not that every kind of message is appropriate. Keep channel preferences and required permissions connected to the campaign decision.

## Choose the appropriate WhatFlow app
WhatFlow Chat Automation uses a linked-device approach and is positioned for smaller startup workloads. WhatFlow Business API uses the official Meta Cloud API and is the relevant choice for the template and Flow-based messaging journeys discussed in this library. They should not be presented as the same connection method.

Choose based on the actual workload and requirements rather than a star-rating comparison alone. The Business API app’s supported features, message rules and commercial model should drive the plan for a growing store that needs the official platform integration.

## Write the customer’s next step first
Decide whether the customer should visit a page, answer a question or choose a useful option. Then write the shortest message that gives enough context for that next step. A campaign with three unrelated offers is difficult to evaluate because it asks the recipient to make several decisions at once.

Use the required approved template where applicable. Treat example copy as a draft until the actual account setup and format are checked. Free-form customer-service messages and business-initiated templates have different constraints; a friendly writing style does not change those constraints.

## Plan the receiving side of the campaign
List the likely replies and the person responsible for them. A customer might ask about sizing, shipping, a previous order or how to stop messages. Prepare accurate answers and an escalation route. An invitation to reply should lead to a monitored conversation.

WhatFlow Business API includes a team inbox without seat fees, so involving a colleague does not require another inbox seat subscription. The team still needs clear responsibility and reasonable response expectations. Access to the same inbox is useful only when people know who owns the next step.

## Set a budget that includes the whole journey
Estimate eligible recipients, likely sends and any planned follow-ups. Check WhatFlow allowances and rates alongside applicable WhatsApp message charges and other app costs. Do not compare subscription prices alone if one plan includes a different volume or billing basis.

Start with a small controlled test and inspect real outcomes before increasing volume. Keep a record of failed sends, customer questions and opt-outs as well as attributed purchases. A campaign that creates avoidable support work may cost more than its sending bill suggests.

## Expand from a working process
Review whether the first journey reached the intended people, gave them a relevant next step and produced a manageable conversation. Fix weak data or confusing copy before adding another audience. Keep the definitions and ownership visible so the process survives beyond the founder’s memory.

WhatFlow Business API includes features across plans, including Free, with plans differing by messaging allowances and rates. That supports starting small without paying for a higher feature tier merely to explore the tools. The next campaign should earn its place through relevance and observed results.
`,['policy','pricing','app'],[{question:'Can I market to every phone number stored in Shopify?',answer:'No. Check the intended message, applicable permissions and channel preferences. A stored number alone does not establish eligibility for every campaign.'},{question:'Which WhatFlow app do these official API workflows use?',answer:'The template and Flow journeys in this guide refer to WhatFlow Business API, which uses Meta Cloud API. Chat Automation uses a different linked-device connection method.'}]),
article('whatsapp-campaign-segmentation-shopify','Segment WhatsApp campaigns around customer needs','Build understandable campaign audiences from purchase context and relevant events, without inventing personal knowledge about the buyer.','whatsapp',['Segmentation','Campaign audiences','Relevance'],`
Segmentation is useful when it changes why a message matters. A list divided into arbitrary groups is still a broad campaign if every person receives the same offer for the same reason. Start with a customer need you can support from the data your store actually has.

A buyer of a particular product may need a compatible accessory. Someone who asked a pre-purchase question may need an answer. Those are different relationships and should produce different messages, even if both contacts happen to be recent visitors to the store.

## Use a criterion the team can explain
Write a plain-language audience rule before configuring filters. Include the relevant event, product context and time window. If another colleague cannot tell why someone qualifies, the rule may be too complicated or depend on information that is not consistently maintained.

Keep a distinction between observed behavior and inferred intent. A viewed product can indicate interest, but it does not prove that the person intends to buy it as a gift or needs it urgently. The message should not turn a reasonable hypothesis into an intrusive claim about the customer.

## Make data quality part of eligibility
Check missing phone numbers, inconsistent country formats and outdated product mappings. An audience filter can be technically valid while supplying incomplete data to a message. Define what happens when a required value is absent rather than letting a placeholder or wrong product link reach the customer.

Test the rule with representative examples, including people who should not qualify. A positive example alone does not establish that the boundaries work. Look for overlapping groups that could receive several versions of the same campaign on the same day.

## Keep commercial relevance separate from permission
A product recommendation may be relevant and still require the appropriate messaging permission. Build both conditions into the process. Do not assume that an order-related conversation gives the store unrestricted permission to send later promotional campaigns.

WhatsApp templates, the active customer-service window and opt-out handling remain part of the sending decision. WhatFlow can provide the message action and inbox, but selecting an audience does not remove the channel’s requirements or the merchant’s responsibility for the contact.

## Write different messages only when the reason differs
A useful segment changes the context or next step. A refill audience needs the correct replenishment destination; a compatibility audience needs the relevant specification. Simply inserting a first name into identical broad copy does not make a campaign meaningfully personalized.

Avoid overfilling the message with purchase history. The customer needs enough context to understand the recommendation, not a demonstration of every detail the store can retrieve. Use the smallest amount of accurate information that helps the current decision.

## Define exits and avoid audience collisions
A purchase, opt-out or another relevant event should update eligibility where supported data is available. Decide which campaign takes priority when someone matches several groups. Without that rule, carefully defined segments can still create an overwhelming combined contact schedule.

Keep a campaign log that records the audience definition and sending window. This helps support colleagues understand why a message arrived and makes later reporting more reproducible. It also exposes cases where two apps are independently acting on the same customer event.

## Evaluate the segment as a hypothesis
Compare relevant responses, purchases, costs and opt-outs under consistent attribution rules. A small group with a high percentage can still be too small for a confident conclusion. Keep counts visible and review whether the campaign reached the intended people in the first place.

WhatFlow’s features are included across Business API plans, with no inbox seat fees, so a small team can begin with a focused audience. Scale the program by improving the reason for each contact, not by multiplying filters that no one can maintain.
`,['policy','pricing','app'],[{question:'Is adding a first name enough to personalize a campaign?',answer:'It can help recognition, but meaningful personalization changes the relevance or next step based on accurate customer context.'},{question:'Should a segment rule include opt-outs?',answer:'The sending process should apply channel preferences and required permissions as well as commercial audience criteria.'}]),
article('whatsapp-message-budget-cost-per-outcome','Budget WhatsApp messaging by cost per useful outcome','Compare allowances, message rates, inbox seats and commercial results with a transparent model for your store’s actual workload.','whatsapp',['Pricing','Messaging budget','Cost measurement'],`
A low monthly subscription can still produce an expensive messaging program if the volume assumptions are wrong. A larger plan can also be poor value when most included capacity goes unused. Build the comparison around your store’s likely workload and the outcome you are trying to achieve.

Separate predictable platform charges from charges that vary by recipient, message type or usage. Then make the assumptions visible. A budget that a colleague can update is more useful than a single attractive figure copied from a pricing headline.

## Count the messages the journey actually sends
Start with eligible recipients and the number of planned contacts per person. Include reminders and relevant follow-ups rather than counting only the first campaign message. A flow triggered by multiple fulfillments can also send more than one update for a single order.

Record what stops the sequence. A completed purchase, reply or opt-out may change the number of later messages where the configured workflow supports it. Do not budget around perfect suppression unless the required data and rules are actually connected.

## Separate the pricing components
List the app subscription, included allowances, overage or message rates and applicable WhatsApp charges. Add charges from other tools needed for the same journey. The provider’s current billing model determines which items apply; do not assume every app combines them in the same way.

Meta pricing can depend on the message category and recipient market under its current rules. Check the official pricing information and the provider’s treatment of those charges. A quoted country-specific example should not be presented as a universal cost for every recipient.

## Include the team model in the comparison
Some messaging products charge for inbox users or reserve certain capabilities for higher plans. Check the actual terms rather than assuming that a cheap entry plan supports the whole team. A feature missing from the required tier can change the real monthly decision.

WhatFlow Business API includes features across its plans and does not charge inbox seat fees. Plans differ by messaging allowances and rates. That can make team participation easier to budget, while still leaving the message volume and applicable delivery charges to be evaluated honestly.

## Use scenarios rather than one perfect forecast
Model a normal month, a quiet month and a peak period. Keep the same definitions across providers so the comparison reflects the same workload. A plan that fits a promotional spike may be unnecessary for most of the year, depending on how the provider allows changes.

Use explicit assumptions about follow-up volume and recipient markets. Do not fill missing information with a claim that all messages are the cheapest category. If the budget depends heavily on one uncertain assumption, identify that uncertainty before committing to the larger campaign.

## Connect cost to a useful result
For support, a useful outcome might be a resolved conversation measured under a consistent definition. For a campaign, it might be an attributed purchase evaluated after relevant margin and discount costs. Avoid mixing these outcomes into one number that obscures the purpose of the messages.

Attribution is not the same as incrementality. A purchase connected to a message may have happened anyway. When the store can run a suitable comparison, use it to learn more. Otherwise describe the result as attributed and keep the limitation visible.

## Update the model from actual billing
Compare the first invoice with the forecast and investigate the largest differences. Check message counts, reminders, recipient mix and any additional tools used. A small controlled pilot can reveal a configuration mistake before it is repeated across a much larger audience.

The cheapest useful program is not necessarily the one with the lowest headline subscription. It is the one that performs a relevant task, reaches the right people and produces a result worth its total cost. Keep the model simple enough to revisit whenever the workload changes.
`,['pricing','policy','app'],[{question:'Can I compare WhatsApp apps using subscription price alone?',answer:'Include message allowances, rates, applicable Meta charges, required features, inbox seats and other tools used by the same workload.'},{question:'Does an attributed purchase make a campaign profitable?',answer:'Not by itself. Review margin, discounts, message costs and attribution limitations alongside the order value.'}]),
article('whatsapp-campaign-preflight-checklist','A WhatsApp campaign checklist before you press send','Check the audience, template, variables, links, reply ownership and stopping rules before expanding a Shopify WhatsApp campaign.','whatsapp',['Campaign checklist','Templates','Quality assurance'],`
Most campaign mistakes are ordinary: a demonstration phone number remains in an action, a link opens the wrong product or a placeholder is empty. A short preflight routine can catch those problems before the store sends the message to a larger audience.

Use the same routine for each campaign, even when the copy feels familiar. A new audience, template language or product destination changes the configuration. The checklist should verify the actual send setup rather than only proofreading a separate document.

## Confirm why each recipient qualifies
Review the audience rule and the required messaging relationship. Check a few matching and nonmatching examples using appropriately controlled data. A saved customer segment can change over time, so the campaign should not rely on a memory of who was in it last month.

Apply opt-outs and other defined exclusions through the supported process. Check for overlaps with campaigns in other apps. A customer can be eligible for one message while the combined contact schedule is still excessive or contradictory.

## Match the content to the approved message
Confirm the actual template name, language and status used by the action. Match every header, body and button input to that template’s structure. A draft paragraph in a planning document is not proof that the sending tool is configured with equivalent content.

Use the appropriate message format for the situation. Free-form text and other customer-service formats have different constraints from approved templates. Do not try to resolve a format problem by assuming a friendly tone makes a business-initiated message unrestricted.

## Inspect variable values at the edges
Test a long product name, a missing first name and an order with several items where those cases are relevant. Decide what the message should do when required data is absent. Avoid sending raw placeholders or unrelated fallback values merely to satisfy a required field.

Check the recipient mapping especially carefully. A number typed during a demo should not become the destination for every event. Confirm international formatting or the supported country-code input using your actual tool configuration, rather than inferring the country from the customer’s name.

## Follow every link on a phone
Open the final destination and confirm the product, offer, language and relevant conditions. Check stock and whether a customer outside the primary market can complete the intended next step. A valid URL can still lead to an irrelevant or unavailable experience.

Review any deadline, discount and shipping claim against the current store rules. Do not leave a test coupon or an outdated promotion in the approved copy. If the destination changes after scheduling, revisit the message before the send rather than assuming the link itself is enough.

## Prepare the reply path and stopping rules
Tell the receiving team what was sent, who received it and what the offer actually includes. Define the owner for questions, complaints and opt-outs. A campaign that invites replies should not land in an inbox no one expects to monitor.

WhatFlow’s team inbox and Shopify integration can support the conversation, with no inbox seat fees on Business API plans. The merchant still needs an operational plan. Review how a purchase or other goal stops later reminders where the available data supports that behavior.

## Start with a controlled send and inspect the result
Use authorized test recipients and a small appropriate pilot before increasing volume. Check the actual message, variable mapping and destination. A workflow preview or accepted send request is not the same as verified delivery to the intended customer.

Record the campaign version, date, audience definition and any issues found. That makes the next preflight faster and gives the team useful context if a customer asks about the message later. A dependable routine is more valuable than relying on one person to remember every possible mistake.
`,['policy','pricing','app'],[{question:'Does an approved template prove the whole campaign is ready?',answer:'No. Check recipient eligibility, variable mapping, links, current commercial claims, reply handling and stopping rules as well.'},{question:'Is a workflow preview proof that a WhatsApp message was delivered?',answer:'No. A preview can validate configuration and logic, while actual acceptance, delivery and reading are separate outcomes.'}]),
article('whatsapp-quick-reply-buttons-customer-choices','Design WhatsApp quick replies that make the next step clearer','Choose a small set of meaningful button labels, handle unexpected replies and preserve order context when the workflow needs it.','whatsapp',['Quick replies','Message design','Customer choices'],`
Quick-reply buttons are useful when they reduce the effort of answering a clear question. They are less useful when the customer has to guess what an ambiguous label means or when none of the choices describes their situation. Start with the decision, then choose the buttons.

A good button set makes the next step visible without pretending every customer problem fits a menu. Keep a route for typed questions and exceptions. The conversation should remain understandable even when the buyer ignores the buttons entirely.

## Ask one question at a time
A message asking about delivery, payment and product satisfaction cannot be answered reliably with three vague labels. Narrow the task. A support menu might offer Delivery, Returns and Ask a question, while an order confirmation flow needs choices tied to that specific decision.

Avoid labels such as Yes and No when the surrounding message contains several questions. The team should be able to interpret the reply later without reconstructing an ambiguous sentence. Keep the visible text clear enough to stand on its own within the conversation context.

## Choose labels that describe the consequence
If tapping a button requests a callback, say that. If it only opens another set of choices, do not label it as a completed resolution. A button saying “Cancel order” can create a serious expectation if the workflow merely adds an internal review tag.

Match the label to the actual configured action and explain any human review step. Do not make a button look more powerful than the process behind it. The customer should understand whether they have made a request, received information or completed an operation.

## Keep the number of options manageable
WhatFlow’s interactive-button action supports up to three quick-reply choices. Use that small set deliberately rather than treating it as a place to compress the entire support catalog. The first menu should help the next step, not become a miniature navigation system.

If the customer needs a longer explanation, send a useful link or continue the conversation. Buttons are one message format among several. Free-form interactive messages also require the relevant active customer-service window; a convenient format does not remove WhatsApp’s channel requirements.

## Match the actual event values
When building a Flow condition, inspect the configured Button Text or Button Payload rather than copying an imagined universal identifier. The visible label and internal value can serve different purposes. Test the actual setup so the selected branch reflects the answer the customer chose.

A generic WhatsApp Button Clicked event should not be assumed to identify a Shopify order. Use the order-aware reply trigger when the next action needs order context, and verify that it resolves to the intended order. A person with several orders is an important controlled test case.

## Handle repeats, late replies and typed questions
A customer may tap twice, reply to an older message or type a sentence instead. Define how those cases should behave. A repeated response should not create repeated business operations simply because the same event arrives again.

Keep the human conversation available when the response does not match. WhatFlow’s team inbox can help colleagues handle those exceptions without per-seat inbox charges on Business API plans. Avoid promising that every unrecognized answer is automatically assigned unless a supported configured action actually performs that assignment.

## Test the meaning as well as the mechanics
Read the message and labels with someone unfamiliar with the workflow. Ask what they believe each tap will do. Then test the actual trigger data and resulting action with controlled examples, keeping the workflow inactive while reviewing the configuration.

The best quick reply is not the one that produces the most taps. It is the one that captures a clear customer intention and leads to the outcome the message promised. Keep that relationship visible as the workflow becomes more sophisticated.
`,['flow','policy','app'],[{question:'How many quick replies does WhatFlow’s interactive-button action support?',answer:'The current action supports up to three quick-reply choices. Choose labels around one clear decision.'},{question:'Can any button event safely update an order?',answer:'Use a trigger that supplies the required order context, such as WhatsApp Order Reply, and test the association. A generic button event should not be treated as an identified order.'}]),
article('whatsapp-customer-optouts-store-process','Build a clear WhatsApp opt-out process for your store','Connect customer preferences, team handling and campaign eligibility so an opt-out becomes an actionable part of the messaging process.','whatsapp',['Opt-outs','Customer preferences','Team process'],`
A customer asking to stop promotional messages should not have to understand which app sent the campaign. From their perspective, the request is directed to the store. A clear opt-out process makes that preference understandable to both the sending system and the people handling replies.

Start by documenting what each connected tool records and what the team should do when the customer’s request is broader than a recognized keyword. The purpose is a dependable preference-handling process, not a clever way to move the same campaign to another channel.

## Explain the available choice clearly
Use wording appropriate to the actual channel and process. A customer should understand how to stop the relevant messages without needing to search a help center. Avoid burying the choice in an unrelated link or promising a global preference change that the system does not implement.

Keep the language in the campaign aligned with the backend behavior. If an instruction says to reply STOP, verify that the current configuration recognizes and applies it as intended. A sentence in the copy does not by itself prove the sending audience will be updated.

## Distinguish automated signals from broader requests
A recognized keyword can create a clear event. A customer saying “please do not contact me about offers again” may need a human to interpret and apply the request through the supported process. Train the team to recognize that preference even when the wording differs from the standard keyword.

Do not require the customer to repeat the request in a more convenient format if the team already understands it. Record the appropriate preference accurately and follow the store’s process for connected tools. Keep the original conversation in the controlled support system rather than spreading it across public logs.

## Use WhatFlow’s event for a real operational purpose
WhatFlow Business API includes a WhatsApp Customer Opted Out Flow trigger for recognized opt-out activity added to its blocklist. That can support compatible downstream processes when the necessary tasks and data exist. It is not a reason to send another promotional message acknowledging the new marketing opportunity.

Check the current behavior in your actual account before describing the automation as complete. A trigger occurring in one app does not automatically update every other marketing platform. Define the connections and ownership required for the preference to affect the intended future audiences.

## Coordinate preferences across channels carefully
An email unsubscribe, an SMS preference and a WhatsApp opt-out may be stored in different systems. Know what each represents and how the store handles a broader request. Do not assume that one field accurately expresses every possible customer choice without checking the connected process.

Avoid shifting the same unwanted promotion to a different channel simply because it remains technically sendable there. The customer’s stated preference and applicable requirements should guide the decision. When the request is unclear, use the established support process to clarify it without adding pressure.

## Test suppression, not just recognition
A useful controlled test checks that the opt-out signal is recorded and that the relevant later campaign excludes the recipient. Merely seeing the word in a conversation does not establish that a scheduled audience or an independent app will respect it.

Include duplicate events, delayed campaign jobs and a customer already present in several segments. Document what the tools handle automatically and what still needs staff action. A realistic process is stronger than a broad promise that the integration synchronizes every preference instantly.

## Give the team a short recovery procedure
If someone receives an unwanted message after opting out, investigate the audience source, timing and connected preference state. Explain the actual correction without inventing a technical excuse. Review whether another system still holds an active campaign for the same person.

WhatFlow’s inbox can keep the conversation accessible to colleagues without inbox seat fees on Business API plans. The store still owns the operational follow-through. A successful opt-out process is one the customer does not have to keep asking the business to apply.
`,['policy','flow','app'],[{question:'Does a Flow opt-out event update every marketing app automatically?',answer:'No. The downstream tools must expose compatible tasks and receive the required data through an explicitly configured process.'},{question:'Should the team recognize opt-outs beyond the exact STOP keyword?',answer:'Have a clear procedure for understandable customer preference requests, including those written in ordinary language, and apply the supported process appropriately.'}]),
];
export default articles;
