import {article} from './shared.mjs';
const articles = [
article('collect-first-product-reviews-shopify','How to collect your first product reviews on Shopify','Build an honest review collection process from the first orders, with useful timing, a clear request and a simple way to measure results.','reviews',['Review collection','New stores','Social proof'],`
A new product page has an awkward problem: shoppers want reassurance, but the customers who could provide it have only just started buying. The answer is not to fill the gap with invented testimonials. It is to build a repeatable way for real buyers to describe what happened after the order arrived.

For a small store, a good review process can fit on one page. Decide who should receive a request, when they will have something useful to say, where they should leave it and who will handle replies. Start there before adding coupons, several reminders or another automation app.

## Give the customer time to experience the product
An order confirmation is usually too early to ask how the product performed. Delivery may be a better starting point, followed by a delay that reflects actual use. A mug can be assessed quickly; a product requiring installation or several uses needs a different schedule. These are decisions for your store, not universal timing rules.

If you cannot reliably identify delivery, describe the request carefully and avoid claiming that you know the parcel arrived. Let the buyer tell you if it has not. That response is an operational issue worth resolving before you continue a routine reminder sequence.

## Ask one clear question and provide one destination
A practical request explains which product you mean and gives the buyer a direct route to the appropriate review form. Ask for an honest account, including what worked and what could be improved. A customer should not have to navigate several product pages to find the correct place to write.

For example: “How did the ceramic travel mug work for you? Share your experience here when you have a moment.” Treat this as draft wording, not an approved WhatsApp template. The actual message must use the right channel permissions and any required template approval.

## Keep reviews and support connected
Some customers answer the request with a question about a missing part, a return or a delayed shipment. Give those messages an owner. A review invitation should not become a dead end because the merchant expected a form submission rather than a conversation.

WhatFlow Business API can help a Shopify team handle WhatsApp conversations in its shared inbox. Review collection and verification still belong to your review provider. Sending a customer a form link through WhatsApp does not automatically make the eventual review a verified purchase review.

## Measure the process from eligible order to published review
Track a small set of counts: eligible orders, requests actually sent, submissions received and published reviews. Use consistent definitions and a fixed reporting period. If ten requests produce two submissions, that is a small sample to learn from, not a benchmark for every future product.

Look for the first point where the process breaks. Missing phone numbers suggest a contact-data issue. Requests sent before arrival suggest a timing problem. Form visits without submissions may point to a long or confusing form. A bigger reminder schedule will not fix all three.

## Build a routine before increasing volume
Review a handful of completed customer journeys each week. Open the message, follow its link on a phone and check the resulting review’s product association. Make sure the public page displays the feedback correctly and that private contact details have not been exposed.

As volume grows, automate the stable parts and keep exceptions visible. WhatFlow includes features across Business API plans and does not charge inbox seat fees, which can make it easier to involve another colleague. Message allowances, rates and the review app’s own terms still determine the total cost.

## A useful first-month outcome
Success in the first month is a working process you can explain and repeat: real customers receive a relevant invitation, their answers reach the right place and someone responds when help is needed. A smaller set of credible reviews is a stronger foundation than a page crowded with unsupported claims.
`,['collection','verification','app'],[{question:'Should a new store import reviews it did not collect?',answer:'Only use reviews you have a legitimate right to use and that accurately represent the product and their source. Do not invent purchases, testimonials or verification labels.'},{question:'Does a WhatsApp review link guarantee a verified review?',answer:'No. The review provider applies its own verification requirements. Check its rules for the specific collection method.'}]),
article('best-time-review-request-after-delivery','When should you ask for a product review after delivery?','Choose review-request timing around delivery confidence and product use, then test one change without overwhelming your customers.','reviews',['Review timing','Post-purchase','Customer experience'],`
“Send the request three days later” sounds like a complete strategy until you sell two very different products. A buyer can comment on a tote bag almost immediately. A garden kit may need assembly, weather and a weekend before the customer knows whether it was useful. Timing should reflect that experience.

The right question is when a buyer has enough information to give a helpful answer. Your first schedule is a hypothesis. Build it from the delivery experience and expected product use, then revise it using customer responses rather than a borrowed universal conversion figure.

## Separate order date, fulfillment and delivery
An order date tells you when the purchase was recorded. Fulfillment tells you about the store’s shipping process. Delivery, when available and reliable, is closer to the buyer actually having the product. Those timestamps serve different purposes and should not be treated as interchangeable.

Write down which event your current reminder uses. If a workflow starts from fulfillment but the message says “now that your order has arrived,” the wording may get ahead of reality. Fix that mismatch before testing a new delay or a more enthusiastic subject line.

## Group products by how they are experienced
Create a few practical groups rather than a custom schedule for every SKU. An immediately usable accessory, a product requiring setup and a consumable that needs repeated use can each have a different starting delay. Keep the grouping simple enough that the team can maintain it.

Gift purchases deserve additional thought. The purchaser may not be the person using the item, and an early request can arrive before the occasion. Offer a polite invitation that allows the customer to answer later rather than assuming every buyer has already tested the product personally.

## Make exceptions part of the schedule
A return, replacement or open delivery problem can make a routine request feel careless. Where supported data is available, define how your process handles those situations. Do not promise that an app will suppress every exception unless the conditions are actually configured and tested.

The customer must still be able to leave honest feedback. Handling an unresolved support issue is different from selectively asking only satisfied buyers to post publicly. Keep your collection policy neutral and provide an accessible review route regardless of whether the experience was positive.

## Test a single timing change
Choose comparable orders and change one delay at a time. Record how many orders were eligible, how many invitations reached the intended recipients and how many useful reviews followed. Also record replies saying that the parcel has not arrived or that the buyer has not used the item yet.

Those replies can be more informative than a small movement in submission rate. They tell you whether the schedule fits the real customer journey. Avoid declaring a winner after only a few orders, especially when one group contains products with a different price or delivery method.

## Coordinate the channels before adding reminders
If your review app sends email and another workflow sends WhatsApp, decide whether they form one planned sequence or duplicate each other. The buyer experiences the combined contact volume. Different dashboards do not make repeated requests feel like different conversations.

WhatFlow can provide the WhatsApp conversation and inbox side of the process. Use an eligible approved template when the invitation is outside the active customer-service window, and respect the customer’s messaging preferences. The review app controls its form, scheduling capabilities and verification rules.

## Review the schedule as the business changes
Revisit timing when shipping routes, product categories or customer expectations change. A schedule that worked for locally stocked items can become unsuitable after adding preorders. Keep a short note explaining the chosen event and delay so a new colleague can understand the reasoning.

Start with a schedule that feels reasonable from the customer’s side, measure the whole sequence and improve the part that causes confusion. More requests are useful only when the recipient has something meaningful to say and an easy way to say it.
`,['collection','policy','app'],[{question:'Is there one best review-request delay?',answer:'No single delay fits every delivery process and product. Start from the customer’s opportunity to use the item and test a consistent schedule.'},{question:'Should a delayed shipment receive the normal request?',answer:'Review the operational exception and your message wording. Avoid claiming delivery when your data does not establish it, while preserving the customer’s ability to leave honest feedback.'}]),
article('review-request-messages-examples-whatsapp-email','Review request messages: examples for WhatsApp and email','Write clear, neutral review invitations with a single next step, useful context and examples you can adapt to your store.','reviews',['Message examples','Review requests','Copywriting'],`
A review request does not need to sound like a campaign announcement. The customer needs to recognize the purchase, understand what you are asking and find the right link. Anything that obscures those three things adds effort to a task they are doing for your business.

The examples below are writing starting points. They are not pre-approved WhatsApp templates, actual customer messages or promises of a particular response rate. Adapt them to your product, permissions and review provider before using them in a live sequence.

## Start with the product, not the brand’s ambition
A vague message asking the buyer to “support our journey” makes the request about the store. A more useful invitation identifies the item and asks about the customer’s experience. Mentioning the product also helps someone who has placed several recent orders find the correct context.

A simple email opening could be: “How is the insulated lunch bag working for you? We would appreciate an honest review of what you liked and what could be better.” Follow it with a clearly labeled review link. Avoid adding several promotional buttons around the main task.

## A short WhatsApp invitation
A concise draft is: “Hi [first name], this is [store]. When you have had a chance to use [product], you can share an honest review here: [review link]. If you need help with the order, reply to this message.” Each placeholder needs a real, appropriate value before sending.

Do not assume a short message is unrestricted. Eligible outbound WhatsApp messages may require an approved template, and the customer must meet the applicable messaging requirements. A conversational tone is a writing choice; it does not replace the channel’s rules or a working opt-out process.

## A reminder that adds clarity rather than pressure
A reminder can acknowledge that the buyer may not have had time: “A quick follow-up about [product]: if you would like to share your experience, your review link is [link]. There is no need to reply if you have already reviewed it.” Use reliable suppression where the tools support it.

If you cannot identify completed reviewers across channels, say less and send fewer reminders. Repeatedly asking someone who already submitted feedback undermines the care the first message tried to convey. Decide which system owns the reminder schedule instead of letting every installed app run independently.

## Ask for useful detail without steering the rating
A product-specific prompt can help: “What was the fit like, and how did the fabric feel after washing?” That invites information a future buyer can use. It is different from telling the customer that a five-star rating would help the store or implying that criticism is unwelcome.

For photo requests, explain what would be useful and make the addition optional. “A photo showing the bag in everyday use is welcome” is more concrete than “send amazing content.” Obtain the appropriate permission before reusing the image in advertising or other marketing placements.

## Give support replies a real destination
If the invitation says “reply if you need help,” someone needs to read those replies. Decide who checks the inbox, how order context is found and when a question should move to another colleague. The request is part of a customer relationship, not just a link-delivery exercise.

WhatFlow’s shared inbox can support that conversational handoff without inbox seat fees on Business API plans. Review storage, publication and verification remain the review provider’s responsibility. Avoid telling customers that a WhatsApp reply itself will appear as a product review unless your actual integration does that.

## Edit against the phone screen
Read the finished message on a small screen. Remove an introductory sentence if it delays recognition of the product. Check that the link opens the intended form, that the language matches the customer and that the sender identity is clear. Test placeholders with missing values before automating them.

The final check is simple: would the customer understand the request without knowing your internal marketing goal? If they can recognize the purchase, leave an honest answer and ask for help, the message has done its job.
`,['ownership','verification','policy','app'],[{question:'Can I copy these examples into a WhatsApp campaign?',answer:'Use them as draft wording and adapt them to the approved message format, recipient data and permissions required by your setup.'},{question:'Should the request ask specifically for five stars?',answer:'Ask for an honest review and useful details. Avoid wording that pressures the buyer toward a positive rating.'}]),
article('respond-negative-product-reviews-shopify','How to respond to negative product reviews without sounding defensive','Use a calm response process that acknowledges the issue, protects private information and turns review themes into practical improvements.','reviews',['Negative reviews','Customer support','Trust'],`
A negative review creates two conversations at once. The customer needs a useful response to a specific experience. Future shoppers are watching how the business behaves when something goes wrong. A defensive public reply can make the second conversation worse even if the original problem is fixable.

Start by separating resolution from reputation management. Your job is to understand what happened and explain the next appropriate step. You cannot promise a positive updated review, and resolving the issue should not depend on the customer removing their criticism.

## Read the complaint before choosing a response
Identify whether the review concerns the product, shipping, expectations or the support experience. Check the relevant order privately if you have the necessary information. A complaint about an unclear size guide needs a different response from a parcel that has not arrived.

Avoid beginning with a canned explanation of company policy. Acknowledge the specific issue in plain language: “The strap arriving with a loose stitch is disappointing, and we would like to inspect it with you.” That is more useful than announcing that quality is your highest priority.

## Keep the public reply concise and factual
A public response should acknowledge the experience, explain an appropriate next step and make the support route clear. Do not publish the buyer’s phone number, address, order details or private correspondence to demonstrate that the business was right. Those details belong in a controlled support conversation.

For example: “We are sorry the replacement part did not fit. Please contact our support team with your order reference so we can check the version and available options.” Only state that you have contacted the customer if the team actually has. Do not imply a resolution that has not happened.

## Use a private channel to investigate
The detailed conversation may need photographs, a product identifier or delivery information. Explain why each item is needed, and avoid asking for data the team already has. Record the agreed next step so another colleague can continue the case without making the customer repeat the story.

If WhatsApp is an appropriate, permitted support channel for that customer, WhatFlow’s team inbox can help keep the conversation accessible to the team. It is not permission to contact every reviewer on WhatsApp. Public review data and messaging consent are separate parts of the customer relationship.

## Follow the same moderation standard for every rating
Spam, private information and irrelevant content can need moderation. A low rating alone should not become the reason honest feedback disappears. Write a moderation policy that a colleague can apply consistently, then use your review provider’s supported statuses and reporting tools.

Judge.me documents separate published, pending, hidden and archived review states. The exact behavior of those states belongs to its current product documentation. Do not assume hiding a storefront review removes it from every other feed or channel where it might have been shared.

## Turn repeated complaints into product work
Review cases together rather than treating every critical message as an isolated exception. Repeated fit complaints may indicate an unclear product description. Repeated missing-accessory reports may point to packaging. A long response delay may mean the inbox needs a clearer owner during busy hours.

Keep a short issue log with the theme, affected product, frequency and proposed change. Avoid copying unnecessary personal details into that log. Assign a person and a review date to the improvement; otherwise the same complaint will keep receiving polished replies without a better customer experience.

## Close the support loop without bargaining over the review
Tell the customer what was done and what remains open. If they choose to update the review, that decision is theirs. Do not make a replacement or other appropriate support outcome conditional on a new rating. The resolution and the public feedback should remain honest.

A careful reply does not guarantee that every reader will buy. It does show that the store can acknowledge a problem and follow through. Over time, that operational consistency is more credible than a page that appears to have never disappointed anyone.
`,['moderation','ownership','app'],[{question:'Should I hide every one-star review?',answer:'Use a consistent moderation policy for legitimate issues such as spam or private information. A negative opinion alone should not be treated as a reason to suppress honest feedback.'},{question:'Can I ask the customer to remove the review before helping?',answer:'Keep appropriate support separate from review changes. Do not make resolution conditional on deleting criticism or increasing a rating.'}]),
article('photo-video-reviews-customer-permission','How to collect useful photo and video reviews for your store','Make customer media requests specific and optional, preserve context and get the right permission before reusing photos or videos.','reviews',['Photo reviews','Video reviews','Customer content'],`
A customer photograph can answer a question that a studio image misses: how big the bag looks on a person, how a finish appears in daylight or how a product fits into an ordinary room. The value is in the context. A large folder of unlabelled uploads is much less useful than a few clear examples tied to the correct product.

Build a process for requesting, receiving and using media before asking every buyer for it. The process should explain what would help, give the customer an easy way to participate and make clear how the material may be used.

## Ask for a specific kind of detail
Replace “send us content” with a practical prompt. A homeware store might ask for a photo showing the item in a room. A travel-accessory store might ask what fits inside the organizer. The request helps the customer understand what makes the image useful without scripting a positive review.

Keep the upload optional. A buyer can have a valuable opinion without wanting to photograph their home, family or body. Avoid language suggesting that a text review matters less or that only highly produced videos deserve to be published.

## Preserve the product and experience context
Use the review provider’s supported form or collection process so the media remains associated with the correct item. When a customer sends an attachment in a support conversation, do not automatically republish it as a product review. Support evidence and marketing material have different purposes.

WhatFlow can receive WhatsApp media in the inbox, and its Flow integration includes a media-received event. That is useful for handling a conversation. It does not by itself create a public review, a permanent media archive or permission to use the attachment in an advertisement.

## Make reuse permission explicit
A photo displayed as part of a submitted review is not necessarily cleared for every future campaign. Decide what permissions your intended use requires, explain that use and keep a record of the customer’s agreement where appropriate. Review text and media belong to their authors.

For a paid advertisement, check the proposed crop, caption and placement before publication. Avoid implying that a reviewer endorsed a claim they did not make. A photograph of a product in use does not prove a medical, performance or durability claim on its own.

## Keep private details out of the final asset
Inspect backgrounds and metadata-sensitive context before reusing customer material. Address labels, school names, children, personal documents and identifiable interiors may create issues that were not obvious when the image first arrived. Ask for a different image or choose another asset when the context is unsuitable.

Do not solve every problem with a tight crop that changes the meaning of the original photograph. The final presentation should still fairly represent the customer’s experience. Keep the original submission and the approved marketing version distinguishable in your internal process.

## Design the upload experience for a phone
Follow your own request from a mobile device. Check how many steps come before the upload, whether the customer can understand file requirements and whether the review is lost if they decide not to attach anything. A clear optional step is often better than a long instruction block.

Judge.me’s current form settings describe which photo and video prompts its product supports. Consult that interface for exact configuration. Your messaging channel can bring the customer to the form, but the form itself has to make the task understandable and manageable.

## Publish examples that help a decision
Choose presentation around common buyer questions rather than visual polish alone. A useful image with clear context may explain fit or scale better than a carefully styled but ambiguous shot. Preserve attribution and any relevant disclosure when showing the material elsewhere.

Measure how the content is used and whether it answers recurring questions. Do not attach an invented conversion uplift to a collection of customer photos. The first useful outcome is a more informative product experience supported by material you have the right to display.
`,['ownership','form','app'],[{question:'Can I reuse any image sent to my support inbox?',answer:'Do not assume so. Support attachments are not automatically marketing assets or product reviews. Establish the intended use and appropriate permission first.'},{question:'Does receiving a WhatsApp photo create a Judge.me review?',answer:'No. Review submission, publication and verification depend on the review provider and the configured integration.'}]),
article('product-reviews-vs-store-reviews','Product reviews vs store reviews: what each should help shoppers decide','Separate product feedback from service feedback so your review forms, product pages and support conversations answer the right questions.','reviews',['Store reviews','Product reviews','Customer feedback'],`
“The jacket fits well, but the parcel arrived late” contains two kinds of feedback. One helps someone choose a product. The other describes the shopping experience. Treating both as the same measurement can leave the product team investigating delivery problems and the support team missing a recurring sizing issue.

Product reviews and store reviews can work together, but they should have a clear purpose. Decide what each asks, where it is displayed and which person acts on the resulting feedback. That makes the public information more useful and the internal response less confused.

## Product feedback should stay close to the item
A product review is most helpful when it explains use, fit, materials, compatibility or another item-specific experience. The form and display should preserve the relationship to the correct product. A review of one version should not silently become evidence for a different product with substantially different characteristics.

When variants differ meaningfully, give shoppers enough context to interpret the review. A comment about a large backpack may not explain the small version’s capacity. Where your review provider supports grouping or variant information, configure it carefully rather than combining everything simply to increase the visible count.

## Store feedback describes the buying experience
Store-level feedback can cover communication, packaging, fulfillment and the experience of getting help. It helps a visitor understand what dealing with the business may be like. Those signals belong near appropriate store information as well as within the customer-service improvement process.

A buyer may have a good product experience and a poor support experience, or the reverse. Give them a clear route to describe either honestly. Do not force every concern into a product star rating just because that is the only widget currently installed.

## Ask questions that fit the destination
For a product form, ask about the item and how it was used. For a store form, ask about the shopping experience. Avoid sending two nearly identical messages back-to-back without explaining the difference. The customer should not have to understand your review software to answer the right question.

A short sequence can invite product feedback first and offer store feedback where appropriate. Test the actual route on a phone and check what appears publicly. Review apps differ in the forms, widgets and cross-prompts they provide, so confirm the current behavior before describing it in a message.

## Route action items to the right owner
A report about a broken zipper may need product inspection. A complaint about repeated tracking questions may need clearer delivery communications. Assign feedback themes to an owner and keep the public review process separate from the private details needed to resolve an individual order.

WhatFlow’s inbox can help the team continue an appropriate WhatsApp support conversation. It should not be described as the system that stores or verifies all product reviews. Keeping those responsibilities clear makes it easier to connect the tools without promising capabilities the workflow does not have.

## Compare like with like in reporting
Do not combine product and store ratings into a single operational conclusion without understanding what the underlying reviews measure. A rise in service complaints after a carrier change does not necessarily mean the product quality declined. A product-specific issue can also disappear inside a large store-wide average.

Review counts, sources and date ranges alongside the average. Small samples can change quickly, and older feedback may concern a process you have already changed. Keep the context visible when sharing results with the team rather than announcing one number as the whole customer experience.

## Display both kinds of proof honestly
Use product feedback where shoppers evaluate an item and store feedback where they assess the business. Check labels so the visitor can tell which is which. Do not describe a store-wide testimonial as a verified review of a particular product if that is not its source.

A good system makes two decisions easier: the shopper can understand the evidence, and the merchant can identify what to improve. More visible stars are useful only when the page explains what those stars actually represent.
`,['widgets','collection','verification','app'],[{question:'Can store reviews replace product reviews?',answer:'They answer different questions. Store feedback describes the shopping experience; product feedback should help buyers evaluate the specific item.'},{question:'Should all variants share one review count?',answer:'Use your provider’s supported grouping carefully and preserve useful context. Do not merge materially different products in a way that misleads shoppers.'}]),
article('review-collection-rate-measurement-shopify','How to measure review collection rate without misleading yourself','Define eligible orders, requests and submissions before judging review performance or comparing different collection channels.','reviews',['Review metrics','Measurement','Review collection'],`
A review dashboard can show a lower percentage even while a store collects more useful feedback. The difference may come from a larger denominator, a new channel or a delay between the invitation and the submission. Before changing the process, establish what the number actually measures.

Review collection rate is useful when the team agrees on its definition. It becomes misleading when eligible orders, requests sent and published reviews are treated as interchangeable stages. Write the calculation next to the report so a colleague can reproduce it.

## Define the journey in separate counts
Begin with orders that qualify for your collection process. Count the requests actually sent, then the submissions received and the reviews published. These stages can differ because of contact data, timing, customer choice and moderation. A missing request should not be diagnosed as a poorly written review form.

For a simple working measure, divide submissions attributed to a defined request cohort by requests sent to that cohort. Label it precisely. If you instead divide published reviews by all orders, call that a different measure and explain what it includes. Neither calculation becomes comparable merely because both use a percent sign.

## Give the cohort time to respond
A request sent yesterday has had less opportunity to produce a review than one sent two weeks ago. Comparing unfinished cohorts can make a recent improvement appear worse. Choose a response window that fits the product and your process, and keep it consistent across the comparison.

Record the request date as well as the review date when the tools support it. A report of reviews received this month may include invitations from the previous month. That report is useful for workload, but it does not automatically measure the effectiveness of this month’s invitations.

## Keep channel attribution honest
If email, WhatsApp and organic website forms all collect responses, check what each dashboard can attribute. One provider may only measure requests sent through its own system. A WhatsApp click may later produce a form submission that is not connected to the messaging dashboard at all.

Do not add several channel-reported conversions and assume every result is a different review. Use supported identifiers and clearly described attribution rules where available. When a clean connection is missing, report the limitation rather than filling the gap with an estimated success story.

## Diagnose the first weak stage
A low request rate suggests that many eligible buyers are never asked. Check configuration, missing contact details and exclusions. A reasonable request count with few form visits points toward timing, recognition or the next-step link. Form visits without submissions suggest another set of questions about effort or relevance.

Read a sample of customer replies alongside the counts. Someone saying “I have not received it yet” reveals a timing problem the final percentage hides. A broken product link can also affect a small group of SKUs without making the overall dashboard look obviously wrong.

## Treat small samples as learning material
Twenty requests with three reviews should not become a permanent forecast. Differences between products, delivery routes and repeat customers can outweigh a small wording change. Keep the raw counts visible and resist presenting a minor short-term movement as a proven improvement.

A useful experiment changes one significant variable and records what else happened during the period. A large sale, a stock issue or a new carrier can affect the customer experience. Note those conditions so the next person reading the report understands why the periods may differ.

## Use the result to choose one improvement
The goal is a better collection process, not a more flattering chart. Choose one fix tied to the evidence, such as correcting links, adjusting a premature request or simplifying a form. Review the next completed cohort before layering on several more changes.

WhatFlow can support the WhatsApp conversation and follow-up side of the process. Its inbox access without seat fees can help the team handle replies, but it does not make every review channel attributable automatically. Keep the measurement tied to the data your actual tools provide.
`,['collection','app'],[{question:'What denominator should review collection rate use?',answer:'Choose and label a consistent definition, such as submissions attributed to a request cohort divided by requests sent. Eligible-order and published-review ratios measure different stages.'},{question:'Can I combine email and WhatsApp dashboard conversions?',answer:'Only with a clear deduplication and attribution method. Different tools can count the same outcome or miss connections between channels.'}]),
article('review-moderation-policy-small-store','A practical review moderation policy for a small Shopify store','Set consistent rules for spam, private information and genuine criticism, with a clear record of decisions your team can follow.','reviews',['Review moderation','Team process','Transparency'],`
A moderation policy is useful before the first difficult review arrives. Without one, the decision can depend on who is working that day or how upsetting the comment feels. That makes the process harder to explain to customers and harder to apply consistently as the team grows.

The policy does not need to be a large document. It should explain what the store publishes, which issues require review, who makes the decision and how the original customer can get help. Keep the policy grounded in honest feedback rather than protecting a perfect-looking average.

## Separate criticism from content problems
A customer saying the product did not meet their expectations is providing an opinion. A submission containing someone’s home address creates a different problem. Spam, impersonation, irrelevant material and personal information each need an explicit handling rule rather than one broad category called “negative.”

Write a short example for each reason your team may use. Examples help a colleague distinguish a sharp but relevant complaint from unrelated abuse. Apply the same standard to positive submissions: enthusiastic spam is still spam, and a flattering review can still expose private information.

## Decide who can act and who reviews exceptions
A small store may have one person making routine decisions and the founder handling uncertain cases. State that responsibility clearly. A colleague should know when they can apply a documented rule and when they should pause for review instead of inventing a new standard.

Keep a brief decision record with the review identifier, reason, action and date. Avoid copying unnecessary personal content into another spreadsheet. The record should help the team understand a decision without creating a second uncontrolled store of customer information.

## Understand the review app’s actual statuses
Published, pending, hidden and archived are not universal synonyms across every app. Consult the provider’s current documentation for what each status does, which counts it affects and whether other channels may still receive the review. Do not promise a customer that one dashboard action removes every copy everywhere.

Judge.me documents several distinct moderation states and the behavior of pending reviews. Use its supported tools when it is your provider. A store policy should describe the customer-facing principle while the internal procedure notes the exact app steps and any timing constraints.

## Keep support available without trading it for silence
A review can reveal an order problem that deserves attention. Invite the customer to an appropriate support route and investigate the details privately. Do not make a replacement, refund decision or other appropriate resolution depend on changing the public rating.

If the customer chooses to update their review after the experience changes, that is their decision. The team can explain how the provider’s edit process works without dictating the outcome. Separating resolution from reputation pressure makes the support conversation more credible.

## Handle images and private details carefully
Review media can include address labels, faces or documents that the customer did not intend to share widely. Define how the team flags those cases and contacts the author when needed. Do not casually republish an attachment from WhatsApp as a public review image.

WhatFlow can help colleagues continue a permitted support conversation in the shared inbox. The review provider remains responsible for its publication and verification mechanics. Assign an owner to the case so a conversation moving between tools does not leave the underlying concern unresolved.

## Review the policy after real cases
Set aside a short monthly review of difficult decisions and recurring themes. If several colleagues interpret one rule differently, improve the wording and examples. If the same product issue appears repeatedly, send it to the person who can change the product or its description.

A strong policy protects honest participation and makes exceptions understandable. It should help the team make a defensible, consistent decision even when the review is uncomfortable. A clean-looking page is not a substitute for a process the business can explain.
`,['moderation','ownership','app'],[{question:'Should positive and negative reviews use different moderation rules?',answer:'Apply consistent standards for relevance, authenticity and private information regardless of the rating. Do not treat criticism itself as a content violation.'},{question:'Can support resolve the issue privately while the review remains public?',answer:'Yes. Keep the public feedback and the private investigation distinct, and do not make appropriate help conditional on removing criticism.'}]),
];
export default articles;
