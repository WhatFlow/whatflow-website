import {article} from './shared.mjs';
const articles = [
article('post-purchase-customer-journey-shopify','Build a post-purchase journey customers can actually follow','Map order updates, product help, review requests and repeat-purchase messages into one coherent customer experience.','retention',['Post-purchase','Customer journey','Messaging'],`
The customer experiences one store after checkout, even when five apps send the messages. An order confirmation, tracking update, review invitation and promotional offer can each be reasonable alone while forming a confusing sequence together. A post-purchase journey makes the relationship between those contacts deliberate.

Begin with the buyer’s practical questions: was the order recorded, what happens next, when should the parcel arrive and where can they get help? Marketing opportunities come after those needs are understood. A coherent sequence is easier to maintain than several disconnected campaigns.

## Map the events before writing the messages
List the events your systems can reliably identify, such as order creation, fulfillment and a supported delivery signal. Note which tool supplies each event and which data it provides. Do not write delivery-specific copy around an event that only establishes that the warehouse marked an order fulfilled.

Add the exceptions beside the main path. Preorders, split shipments, cancellations and replacements can change what the customer needs to hear. A workflow should not continue congratulating a buyer on their purchase while another colleague is investigating a missing parcel.

## Give each contact one useful job
An order confirmation should make the recorded purchase understandable. A shipping message should explain the relevant shipment. A product-help message should help the buyer use the item. A review request should invite honest feedback after a reasonable opportunity to experience it.

Avoid making every contact do all four jobs. A transactional update crowded with unrelated promotions can make the essential information harder to find. Decide the role of the message first, then choose the channel and format that support that role.

## Assign one owner to each stage
Write down which app owns each notification and which team member owns its exceptions. If both the review app and a WhatsApp workflow send reminders, define the combined schedule and stopping rules. Separate dashboards do not prevent the customer receiving duplicate requests.

The ownership note should include what happens when an expected event is missing. A simple staff review process can be better than a complicated automation that silently waits forever. Keep the process understandable enough that a colleague can explain why a particular message was sent.

## Make replies part of the design
A buyer can answer a tracking update with a support question. That reply should reach a monitored route with enough context for someone to help. Do not promise immediate personal support if the team only checks the channel at defined times.

WhatFlow Business API can support WhatsApp messages and the shared team inbox within the Shopify workflow. Its Flow tasks can combine with compatible installed app actions when the required data exists. That composition still needs review; it is not a guarantee that every app capability is available automatically.

## Respect the transition from service to marketing
A purchase does not make every future campaign relevant or permitted. Treat required messaging permissions, opt-outs and channel rules as part of the journey. WhatsApp’s free-form customer-service window and approved-template requirements still apply to the chosen message format.

A replenishment suggestion or another offer should reflect a plausible customer need and an appropriate permission basis. Keep it distinct from essential order information. The fact that a template can be selected in a tool does not establish that every recipient should receive it.

## Review actual journeys each month
Choose a small sample of completed orders and reconstruct what the customer received across channels. Compare the sequence with support replies, product questions and any avoidable duplication. Fix a concrete mismatch before adding another touchpoint.

Track costs as well as attributed outcomes. WhatFlow’s feature access across Business API plans and lack of inbox seat fees can help a small team participate, but messaging allowances, delivery charges and other app subscriptions remain part of the full process. A useful journey earns its complexity one stage at a time.
`,['flow','policy','pricing','app'],[{question:'Should every order receive every post-purchase message?',answer:'No. Use event data, relevance, permissions and exception handling to decide which stages apply to a particular customer.'},{question:'Can several apps share the same journey?',answer:'Yes, when their supported capabilities and data fit. Define ownership and combined stopping rules to avoid duplicate or contradictory messages.'}]),
article('repeat-purchase-campaign-without-constant-discounts','Plan a repeat-purchase campaign without relying on constant discounts','Use product relevance, useful timing and clear customer preferences to create a repeat-purchase message worth receiving.','retention',['Repeat purchases','Campaign planning','Customer relevance'],`
A customer buying once gives you useful context, not a permanent reason to send offers. A good repeat-purchase campaign starts with a plausible next need. That might be replenishment, an accessory that fits the original item or advice that helps the customer get more value from what they already own.

A discount can support a campaign, but it should not be the only reason the message exists. If the recommendation is irrelevant, a lower price may simply make the store’s next interruption cheaper rather than more useful.

## Choose a customer need you can explain
Write one sentence describing why this group might want the next product. A buyer of a refillable dispenser may eventually need refills. A buyer of a durable dining table probably does not need another table next week. The original purchase should inform the hypothesis without becoming a claim about the customer’s private circumstances.

Check product compatibility and availability before creating the audience. A generic accessory recommendation is frustrating if it does not fit the version the customer bought. When the data cannot establish compatibility, use broader guidance or ask a question rather than implying certainty.

## Use timing as a testable assumption
Estimate the likely use cycle from product knowledge and observed store behavior. Do not present the estimate as a fact about every buyer. A household buying in bulk may replenish differently from someone trying the product for the first time.

Start with a manageable group and one timing rule. Record the hypothesis, dates and relevant product conditions. If the response is mostly “I still have plenty,” the campaign may be early. A result like that is useful feedback even if the immediate purchase count is low.

## Exclude customers for clear operational reasons
Check whether the item has already been reordered, whether there is an unresolved issue and whether the customer has opted out of the channel. Use supported data and a clear policy. Do not claim a perfect exclusion process if the relevant status is not connected to the campaign tool.

Suppression is especially important when several apps can send a similar offer. Decide which system owns the audience and how a new purchase updates eligibility. A buyer should not receive a reminder to reorder moments after paying for the same product.

## Write a message that acknowledges the relationship
Recognize the product context without becoming overly familiar. A useful draft might explain that refills are available and offer help choosing the correct option. Avoid invented urgency or language implying that the business knows the customer has run out.

For WhatsApp, use the appropriate approved format and recipient permissions. A previous service conversation does not automatically make a later promotional campaign unrestricted. WhatFlow can support the messaging and replies, while the merchant remains responsible for the audience and the underlying commercial claim.

## Give the team a useful reply path
Customers may ask whether the formula changed, whether an accessory fits or whether a subscription is available. Prepare accurate answers and decide who handles exceptions. A campaign that invites replies but leaves them unanswered creates work for the customer without a dependable outcome.

WhatFlow’s team inbox has no seat fees on Business API plans, which can help a small store involve the right colleague. The inbox still needs ownership and sensible response expectations. A shared tool does not decide which person has the product knowledge to answer a specific question.

## Measure value after the discount and message cost
Evaluate attributed purchases alongside product margin, promotional cost, delivery charges and subsequent returns. Keep the attribution window visible and avoid claiming that every connected order was caused by the message. A suitable holdout can help evaluate incremental effect when the store has the tools and volume.

The best next iteration may be a narrower audience or clearer product explanation rather than a larger discount. A repeat-purchase program should become more relevant as the store learns. The aim is a customer who sees a timely reason to return, not someone trained to wait for the next coupon.
`,['policy','pricing','app'],[{question:'Does a previous purchase make a customer eligible for every campaign?',answer:'No. Check relevance, current purchase history, channel preferences and applicable messaging requirements.'},{question:'Should repeat-purchase revenue be measured before discounts?',answer:'Review the commercial result after relevant discounts, messaging costs, margin and returns, and keep attribution limits clear.'}]),
article('replenishment-reminders-shopify-consumables','Design replenishment reminders for consumable products','Choose a sensible reorder hypothesis, check recent purchases and help customers find the right refill without pretending to know their usage.','retention',['Replenishment','Consumables','Lifecycle messaging'],`
A replenishment reminder is useful when it arrives near a genuine need. It becomes irritating when it confidently announces that the customer is running out despite knowing nothing about their usage. Treat consumption timing as a store hypothesis, not personal knowledge.

Start with a product that has a reasonably understandable repeat cycle. Define the eligible purchase, likely next item and conditions that should stop the reminder. A small, well-understood program is easier to improve than one covering the entire catalog with a single delay.

## Match the next item to the original purchase
Check pack size, format and compatibility. A refill for one dispenser version may not suit another. A customer who bought a sample pack may want guidance on a full-size choice rather than an automatic repeat of the same order.

Use the product data your store actually maintains. If the mapping between an original item and its refill lives only in one employee’s memory, document it before automating the recommendation. An incorrect link can undermine an otherwise carefully timed message.

## Set a starting interval and label it as an assumption
Use product knowledge and observed repeat orders to choose an initial delay. Account for quantity where your tools can do so reliably. Two packs may justify a different schedule from one, but only if the underlying data and rule are understandable.

The customer may use the product occasionally, share it with others or have bought it as a gift. Write the reminder so those possibilities remain plausible. “If you are ready for a refill” is more accurate than “Your supply runs out today.”

## Check whether the need has already been met
Before sending, use supported conditions to identify recent repeat purchases or another active replenishment arrangement. If the relevant system cannot supply that information, reduce the strength of the claim and the frequency of the sequence. Do not pretend the message reflects a complete view of the customer’s purchases.

Define how cancelled orders, replacements and returns affect eligibility. A replacement sent after a defect is not necessarily the same as a normal second purchase. Keep the operational distinction visible so the automation does not infer the wrong stage of the relationship.

## Offer a helpful choice rather than a command
The message can link to the correct refill and invite a question about size or usage. It can also make clear that the customer can ignore the reminder if it is not relevant yet. Avoid presenting a subscription as already selected when the buyer has not agreed to one.

WhatsApp can make the question-and-answer part convenient when the customer has the appropriate messaging relationship with the store. Use the required approved template and respect opt-outs. The reminder’s commercial purpose does not disappear because the copy uses a friendly tone.

## Give delayed and nonmatching replies a process
Someone may answer weeks later or ask about a different product. The team should see enough context to understand the original reminder without assuming it still reflects current stock or price. Confirm the present details before making a specific offer.

WhatFlow’s inbox and Shopify integration can help the team handle those conversations. Compatible Flow steps can support a configured sequence, but they do not make every consumption estimate correct. Keep a human path for the cases where the customer’s actual need differs from the model.

## Improve from the completed cycle
Look at repeat purchases, questions, opt-outs and complaints together. A reasonable order count with many “too soon” replies suggests a timing issue. Clicks without purchases may point to an incorrect product, stock problem or confusing destination.

Review the cost of the program after message charges and any discount. WhatFlow Business API plans include features across tiers and no inbox seat fees, while allowances and rates differ. That can keep the tooling approachable, but relevance still determines whether the reminder deserves to be sent.
`,['policy','pricing','app'],[{question:'Can I tell a buyer exactly when their product will run out?',answer:'Only if you actually have reliable information establishing that. Most stores should describe replenishment timing as a helpful possibility, not a personal certainty.'},{question:'Should a recent reorder stop a reminder?',answer:'Where supported purchase data is available, define a clear suppression rule so the customer is not reminded to buy something they just ordered.'}]),
article('customer-winback-campaign-shopify','Build a customer win-back campaign with a clear reason to return','Choose an inactivity definition, check customer context and create a relevant offer instead of sending the same discount to everyone.','retention',['Win-back','Customer segments','Campaigns'],`
“Customer has not ordered recently” is a starting filter, not a complete win-back strategy. Someone who bought furniture six months ago may be behaving normally. Someone who used to buy a refill every month presents a different question. Define inactivity in relation to the product and relationship.

A useful win-back campaign gives the customer a credible reason to return. That can be a relevant new product, an improvement they previously asked about or a carefully chosen offer. The message should not manufacture personal familiarity or imply that the store knows why the customer stopped buying.

## Define the audience before choosing the offer
Use an inactivity period that makes sense for the category, and distinguish first-time buyers from previously frequent customers where the data supports it. Keep the criteria simple enough that another colleague can explain why someone entered the group.

Exclude customers who should not receive the channel and review recent operational context. A person waiting for an unresolved refund may not welcome a cheerful “we miss you” campaign. Do not claim that every support status is synchronized unless your actual tools provide and use that data.

## Find a real reason for the message
A broad discount is easy to write but may be unrelated to the customer’s interests. Start with the previous purchase category and the current catalog. A compatible accessory, a genuinely improved product or useful new information can make the message more relevant.

Check stock and destination eligibility before sending. A customer who returns to an unavailable item has encountered another obstacle rather than a reason to reconnect. If the offer applies only to a subset of products or regions, make that limitation clear near the call to action.

## Acknowledge the gap without guilt
Avoid wording that makes the customer responsible for the store’s growth. A simple introduction to the relevant update is enough. Do not invent a personal note from the founder if the message is an automated campaign sent to a broad audience.

For WhatsApp, the copy still needs the appropriate template and recipient permissions. A customer who once used the channel for order support has not necessarily agreed to every later marketing message. Make opting out straightforward and ensure the team knows how that preference is handled.

## Plan the response before scheduling the send
A win-back campaign can surface old problems. Someone may explain that the previous product disappointed them or that they moved to a different option. Give those replies a support route rather than treating every response as a sales objection to overcome.

WhatFlow’s shared inbox can help colleagues handle the conversation without per-seat inbox charges on Business API plans. Decide who owns unresolved cases and how to involve the appropriate product or operations person. A friendly campaign needs a dependable follow-through process.

## Limit the sequence and define the exit
A win-back effort should not become an endless loop of increasingly urgent discounts. Set a limited sequence and a clear end. A new purchase, opt-out or other defined condition should update eligibility where the connected data supports it.

Coordinate with email and SMS. The customer experiences the combined contact volume, so different apps should not each run a full independent “last chance” sequence. Keep the actual offer deadline honest and do not reset it merely because another reminder is scheduled.

## Judge the result beyond attributed orders
Review margin, message cost, discount use and subsequent customer behavior. A campaign can generate purchases while giving away too much value or increasing opt-outs. Attribution also does not establish that every order was incremental.

Use the response themes to improve the next attempt. If buyers return because a compatibility problem was solved, that is a clearer learning than “discounts work.” A useful win-back program becomes more specific about the reason to return and more respectful about when to stop asking.
`,['policy','pricing','app'],[{question:'How long should a customer be inactive before a win-back message?',answer:'Choose a period that fits the product’s normal purchase cycle and your observed customer behavior. One threshold does not fit every catalog.'},{question:'Should a win-back sequence continue until someone buys?',answer:'Use a limited sequence with clear exits and channel preferences. Repeated nonresponse is not a reason for unlimited reminders.'}]),
article('customer-feedback-loop-product-improvements','Turn customer feedback into product and service improvements','Create a manageable loop from reviews and support conversations to a specific change, an owner and a check that the change helped.','retention',['Customer feedback','Product improvement','Operations'],`
Customer feedback is easy to collect and surprisingly easy to leave unused. A store can have hundreds of reviews and a busy inbox while the same sizing question or packaging complaint appears every week. The missing piece is often a clear route from a repeated observation to an owned improvement.

Build a feedback loop that the team can maintain during an ordinary week. It should identify themes, distinguish frequency from urgency and connect a proposed change to the person who can make it. A large dashboard is optional; a dependable decision process is not.

## Capture the issue without spreading private details
Summarize the practical theme: unclear dimensions, a missing instruction, damaged packaging or a confusing tracking message. Keep a reference to the original case in the appropriate system rather than copying names, phone numbers and full conversations into several reports.

Reviews and support messages provide different context. A public review may describe the final experience; an inbox conversation can show where confusion began. Preserve that distinction when combining the evidence so an unresolved support exchange is not presented as a complete verdict on the product.

## Group by the decision the customer was trying to make
A theme such as “size” can be too broad. Separate choosing a size before purchase from receiving an unexpected fit afterward. One may need a clearer chart; the other may require checking measurements, manufacturing consistency or how the item is described.

Use categories that lead toward action rather than labels that simply sound analytical. “Customer did not know which charger was compatible” points toward a concrete information fix. “Low satisfaction” is harder for a colleague to turn into a useful change.

## Consider severity as well as count
A frequently repeated minor question may deserve a page improvement. A single serious defect may deserve immediate investigation. Do not use the number of complaints as the only signal, and do not infer that silence proves the absence of a problem.

Keep the underlying sample visible. Five comments from a small launch batch mean something different from five across a large established product range. Avoid turning anecdotal feedback into an unsupported claim about every customer or the entire market.

## Give the improvement an owner and a date
Choose a specific action: revise the compatibility note, change the packing checklist or rewrite a misleading notification. Assign the person who can complete it and a reasonable review date. A task called “improve customer experience” is too broad to close meaningfully.

Record the reason for the change and where it will appear. If support uses saved answers, update them alongside the public page. Otherwise the store may publish better information while the team continues sending an old explanation in private conversations.

## Close individual cases and the systemic issue separately
Resolving one buyer’s replacement does not prove the packaging problem is fixed. Likewise, improving the packing process does not automatically close every open customer case. Track both outcomes so the operational improvement does not erase the person who first raised the issue.

WhatFlow’s team inbox can help colleagues continue the relevant WhatsApp conversation. Its lack of inbox seat fees can make involving another team member simpler, but the store still needs an owner and a record of the next step. Tool access alone does not complete the feedback loop.

## Check whether the change addressed the cause
Review a comparable period after the improvement and read new messages about the same issue. A lower count can be encouraging, but account for sales volume and traffic changes. Ask whether the new wording or process actually answers the question customers were facing.

Share the learning with the team in plain language. A useful conclusion explains what changed, why and what remains uncertain. Over time, this routine turns reviews and support conversations into better product information and service rather than a growing archive of problems the store has learned to answer politely.
`,['collection','moderation','app'],[{question:'Should I copy full customer conversations into a feedback spreadsheet?',answer:'Keep only the information needed for the improvement and link to the controlled source where appropriate. Avoid duplicating private contact details and attachments unnecessarily.'},{question:'Does resolving one complaint prove the root cause is fixed?',answer:'No. Track the individual resolution separately from the broader product or process change, then review later evidence.'}]),
article('coordinate-email-sms-whatsapp-customer-messages','Coordinate email, SMS and WhatsApp without overwhelming customers','Give each channel a purpose, align campaign ownership and check the total sequence the customer actually receives.','retention',['Email','SMS','WhatsApp','Channel strategy'],`
A store can send a modest number of messages from each app and still overwhelm the customer. An email reminder in the morning, an SMS at lunch and a WhatsApp offer that evening may all come from the same underlying event. The buyer experiences one brand, not three separate campaign calendars.

Channel coordination starts with the complete sequence. List what is sent, why it is sent and which system owns the decision. Then make the journey coherent before debating which channel has the most attractive headline engagement figure.

## Give each channel a job
Email can carry longer explanations and a browsable product selection. SMS can support concise notices where appropriate. WhatsApp can make a permitted conversation convenient when the buyer needs to reply, ask a question or choose a next step. None of those roles makes one channel universally better for every customer.

Choose the channel around the task and the customer’s preferences. A detailed setup guide may be easier to revisit on a page or in email, while a short support exchange can fit a conversation. The content and available permissions should guide the choice.

## Map messages by customer event
Create one view of the messages triggered by checkout, fulfillment, review collection and repeat-purchase campaigns. Include built-in store notifications as well as app automations. Note delays and conditions so the team can see where contacts overlap.

Test the combined journey with controlled data. An app dashboard showing a sensible sequence does not reveal the messages sent by another app. Pay attention to split shipments, late replies and a purchase completed between two scheduled follow-ups.

## Keep preference handling clear
A preference on one channel is not automatically a preference on every channel unless your connected systems and policy establish that relationship. Know how each tool records opt-outs and how the team should respond when a customer makes a broader request.

Do not move a person to another channel simply to continue the same unwanted campaign. Check the applicable requirements and the customer’s actual choice. WhatsApp’s messaging rules, templates and customer-service window remain relevant even if email is the primary campaign channel.

## Assign ownership of suppression and exits
Decide which system checks whether a purchase or other goal has already happened. Define how later reminders stop where supported data is available. A customer should not receive “finish your order” messages from one tool while another is already sending the order confirmation.

When the tools cannot share a needed status, simplify the sequence rather than pretending the coordination is complete. A clear manual review or a narrower campaign can be safer for the experience than several loosely connected automations competing to claim the same outcome.

## Keep replies connected to the right team
A marketing message can generate a support reply. Prepare the receiving team with the campaign context and the actual offer conditions. Do not ask the buyer to explain a promotion that the store itself sent them.

WhatFlow Business API provides WhatsApp messaging and a team inbox without seat fees. That can help the team handle the conversational part of the journey. Other apps still own their channels, and the integration between them depends on supported tasks and available data.

## Compare value using consistent definitions
Measure costs, useful responses and commercial outcomes under clearly described attribution rules. A channel reporting a higher open or click rate is not automatically producing more incremental profit. Delivery, audience, creative and the purpose of the message can all differ.

Review opt-outs and customer complaints alongside attributed orders. The most effective next change may be removing a duplicate reminder rather than adding a new channel. A coordinated program should feel like a useful relationship from the customer’s side, even though several systems support it behind the scenes.
`,['policy','pricing','app'],[{question:'Is WhatsApp always better than email or SMS?',answer:'No channel is best for every task. Consider conversation needs, content length, audience preferences, permissions and total cost.'},{question:'Should a purchase stop checkout reminders across channels?',answer:'Define that exit wherever the connected data supports it, and test the combined sequence so completed buyers are not repeatedly asked to finish the same order.'}]),
];
export default articles;
