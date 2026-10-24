import {article} from './shared.mjs';
const articles = [
article('qr-code-review-requests-product-packaging','Use QR codes for review requests without creating a dead end','Choose the right review destination, explain the scan and keep packaging links maintainable when your products or review tools change.','reviews',['QR codes','Packaging','Review requests'],`
A QR code on packaging can make it easier for a customer to find the next step after opening an order. It can also become a confusing shortcut if the buyer does not know whether it opens instructions, support or a public review form. Explain the purpose beside the code.

Start with one destination and one customer task. A package insert should not require the buyer to understand your app stack. The scan should lead to a page or form that matches the printed promise and works on an ordinary phone.

## Decide what the scan is asking the buyer to do
Choose whether the code opens product help, a review form or a clearly labelled page offering those routes. Do not label a support destination as an instant review submission. The buyer should understand whether they are starting a private conversation or publishing feedback.

If the package contains several products, check whether the destination can identify the relevant item. A generic store-level review route is different from a product-specific form. Keep that difference clear in the wording so the resulting feedback reaches the appropriate place.

## Use a destination you can maintain
A printed insert can remain in circulation after the website or review app changes. Consider a store-controlled landing page when that fits the experience, and keep its route stable. Avoid adding an unnecessary intermediary if the direct review form is already the clearest destination.

Record where the code appears and who owns the destination. A packaging change should include a link check, not only a new visual design. When migrating tools, test existing printed material before assuming that an old link continues to work.

## Ask for honest feedback neutrally
A simple prompt can invite the customer to share what worked and what could be improved. Do not ask only satisfied customers to use the public review route while diverting everyone else away from it. Support should be available without becoming a barrier to honest criticism.

Review verification remains the provider’s decision. A QR scan does not prove a purchase merely because the code was printed in a parcel. Check the current requirements of the review system and avoid labelling every resulting submission as a verified product review.

## Test the whole phone journey
Scan the actual printed size under ordinary lighting. Check whether the destination loads, the text is readable and the relevant form can be completed. A code that works on a large design preview may be difficult to scan on curved or reflective packaging.

Try the journey without being signed into a staff account. A link that opens correctly for the merchant can still require an unintended login or lead a buyer to an administrative page. Keep test submissions controlled and distinguish them from real public customer feedback.

## Keep support reachable after the scan
Some customers scan because they need help rather than because they are ready to review. Provide a clearly labelled support route where appropriate and make sure the team monitors it. Do not imply that a private message will automatically appear as a public review.

WhatFlow can support a WhatsApp conversation through an appropriate store entry point and the team inbox. That complements the review provider’s form and verification process. The message, form and public review are separate stages that need understandable labels.

## Measure use without overstating the result
A dedicated destination can help distinguish visits from this insert when your analytics setup supports it. Form submissions and verified reviews are different measures. Do not equate every scan with a completed review or a future purchase.

Use the information to improve the journey: a clearer printed instruction, a more relevant destination or a simpler mobile form. The best QR code removes a small obstacle for the buyer and remains useful after the current campaign is over.
`,['collection','verification','ownership','app'],[{question:'Does a QR code automatically create a verified review?',answer:'No. The review provider applies its own identity and purchase verification requirements to the resulting submission.'},{question:'Should the code open support or a review form?',answer:'Choose the route that matches the printed instruction, or offer clearly labelled choices on a useful landing page.'}]),
article('loyalty-messages-customer-value-shopify','Make loyalty messages useful beyond announcing points','Explain the customer’s actual benefit, keep eligibility accurate and give the team a clear way to answer reward questions.','retention',['Loyalty','Customer value','Messaging'],`
A customer receiving a points notification may still have no idea what they can do next. The number is only useful if the benefit, conditions and destination are understandable. Loyalty messaging should turn the program’s mechanics into a practical choice for the buyer.

Start with the actual program terms and the data your loyalty app supplies. A message should not claim that a reward is available merely because the customer reached an activity milestone. Eligibility, redemption rules and the current state of the account can be separate questions.

## Identify the event and the useful consequence
Decide whether the message concerns points earned, a tier change or an available reward. Explain the consequence that matters to the customer rather than treating those events as interchangeable. A tier upgrade may change future benefits without creating a redeemable discount today.

Use the supported fields in the loyalty tool and check how quickly they update. If the messaging workflow cannot reliably establish the current balance, avoid presenting a stale value as live account information. Link to the appropriate account destination for the current details.

## Explain the conditions near the benefit
A reward with a minimum spend, product exclusion or expiry needs clear context. Do not make the customer open several pages to discover why the promised discount does not work. A concise summary should match the maintained program terms.

Keep deadlines honest. A reminder should not imply that a reward expires tonight if it does not. If the store changes the program, update the message sequence and saved support explanations at the same time so the channels do not contradict each other.

## Coordinate with the loyalty app’s existing messages
List the notifications the loyalty provider already sends. Decide which channel owns each stage and whether a WhatsApp message replaces or supplements an email. Sending the same event through several systems can feel repetitive even when each dashboard shows only one notification.

Compatible Shopify Flow tasks can support some app-to-message combinations when installed connectors expose the required data and actions. Do not claim that every loyalty app provides the same trigger or that WhatFlow can read every account field automatically.

## Keep the invitation relevant and permitted
A loyalty account does not remove the requirements for the chosen messaging channel. Check recipient preferences and use the appropriate WhatsApp format for an eligible outbound message. A friendly “you earned this” sentence is still a business message with a commercial purpose.

WhatFlow Business API can provide the WhatsApp action and the inbox for replies. Feature access is included across its plans, while allowances and rates differ. The loyalty provider continues to own the reward rules and account state.

## Prepare for ordinary reward questions
Customers may ask why a balance changed, whether a reward can combine with a sale or where to redeem it. Give the team a current reference and an escalation route. Do not promise a balance correction or manual exception unless someone has actually authorized and performed it.

A shared inbox helps maintain the conversation when another colleague needs to investigate. WhatFlow does not charge inbox seat fees, but the team still needs an owner and a clear next step. Access alone does not resolve an unclear loyalty rule.

## Judge the experience after redemption
Review successful use, confused replies and failed redemption attempts alongside attributed purchases. A high click count can hide a destination where customers cannot apply the benefit they expected. Fix the explanation or integration before increasing the message volume.

A useful loyalty message makes the customer’s next choice clearer. It should help them understand a real benefit under real conditions, rather than simply create another reason for the store to interrupt them.
`,['flow','policy','app'],[{question:'Can any loyalty app trigger a WhatFlow message automatically?',answer:'Only when the installed tools expose compatible tasks and the required data through the configured integration.'},{question:'Should a message show a balance the workflow cannot keep current?',answer:'Avoid presenting uncertain data as live account information. Use a supported current field or direct the customer to the maintained account view.'}]),
article('customer-referral-messages-shopify','Write referral messages with clear expectations and honest rewards','Explain who benefits, how the referral works and which conditions apply before asking customers to recommend your store.','retention',['Referrals','Customer advocacy','Message writing'],`
A referral request asks a customer to put their own reputation behind the store. That makes clarity especially important. They should know what they are sharing, whether anyone receives a benefit and what the friend can reasonably expect after opening the link.

Build the message from the actual referral program rather than starting with an enthusiastic slogan. A useful invitation makes the arrangement easy to understand without pressuring the customer to recruit people or implying a personal endorsement they have not chosen to make.

## Explain the two sides of the offer
State what, if anything, the referring customer receives and what the new buyer receives. Keep the conditions distinct. A reward earned after a qualifying purchase is not the same as an immediate payment for sharing a link.

Use the program’s current terms as the source. If exclusions, minimum spend or a waiting period apply, make the important point visible near the invitation. Do not write a broad promise that the redemption experience later narrows unexpectedly.

## Make the shared destination understandable
Open the referral link as someone unfamiliar with the store. Check the offer, products, destination market and any required steps. The friend should not need the original customer to explain why a code is not being accepted.

Use the referral tool’s supported links and tracking rather than inventing a manual attribution scheme that the team cannot maintain. Test the configured journey with controlled data and distinguish test activity from real reward claims.

## Ask at a sensible moment
A customer needs enough experience with the store to decide whether they want to recommend it. An invitation sent before arrival can ask for advocacy before the business has fulfilled the order. Choose a plausible stage and keep unresolved support issues in mind.

Do not assume every satisfied buyer wants to participate. Make the invitation optional and avoid language that turns loyalty into an obligation. A person can enjoy the product without wanting to share marketing messages with friends.

## Keep the sending channel appropriate
Check the recipient’s channel preferences and the applicable message format. A referral offer may have a different purpose from an order update. For WhatsApp, use the required approved template and eligibility process rather than assuming a previous support chat covers every later campaign.

WhatFlow can support the message and subsequent questions in the team inbox. The referral app remains responsible for its program rules, tracking and reward state. Do not describe WhatFlow as issuing a referral benefit unless the actual configured integration performs that task.

## Prepare a fair support process
A customer may report that a friend purchased but a reward is missing. Give the team a way to investigate through the provider’s supported records. Do not promise to identify a friend’s private order details or share information that the referrer is not entitled to receive.

Explain the next step and the program’s timing accurately. A shared inbox can keep the conversation accessible to colleagues, but someone still needs responsibility for the case. WhatFlow Business API’s lack of inbox seat fees can help with access without replacing that ownership.

## Measure completed participation, not just shares
Link clicks, qualifying purchases and rewards issued are different stages. Use the program’s actual reporting and check how duplicate or self-referral activity is handled. Do not treat every shared link as a new customer or assume that attributed orders are all incremental.

The most durable referral program is easy to explain and dependable to use. A clear message should support that experience, not hide complicated conditions behind a friendly request to tell a friend.
`,['policy','flow','app'],[{question:'Does sharing a referral link mean a reward was earned?',answer:'Not necessarily. Explain the program’s actual qualifying conditions and distinguish sharing, purchase attribution and reward issuance.'},{question:'Does WhatFlow itself run the referral program?',answer:'This guide uses WhatFlow for messaging and replies. Referral rules and rewards belong to the selected provider unless a supported configured action explicitly connects them.'}]),
article('reuse-customer-reviews-social-media','Reuse customer reviews on social media without losing their meaning','Choose relevant feedback, preserve context and establish the right permission before turning a review into a social post or advertisement.','reviews',['Social media','Testimonials','Customer content'],`
A useful review can help someone who has not reached the product page yet. It might explain a real use case, answer a common concern or show the item in ordinary life. Moving the review to social media should preserve that meaning rather than turn it into a broader claim the customer never made.

Start with the audience question and the intended placement. An organic post, an advertisement and a product image can have different practical requirements. Establish the appropriate rights and permission for the use rather than assuming that public visibility makes any reuse acceptable.

## Choose feedback that answers a real question
Look for a specific experience related to the product being discussed. A comment explaining capacity, fit or everyday use can be more informative than a short declaration that the store is amazing. Keep the product association visible where it affects interpretation.

Do not use a store-level service review as though it proves a technical property of one item. A customer praising delivery speed does not substantiate a durability or performance claim. The social post should make the source and subject understandable.

## Preserve the meaning when editing for space
A short excerpt should not reverse a qualification or remove the part that changes the conclusion. If the full review contains both praise and a relevant limitation, consider whether the proposed excerpt remains fair. Do not join separate sentences into a new statement the reviewer did not write.

Keep the original submission accessible in the appropriate system so the team can verify the context. Any correction or approval process should follow the provider’s supported approach. Review text and media belong to their authors.

## Match the asset to the placement
A square social image and a vertical story require different presentation, but readability matters in both. Use clear text and an appropriate amount of content. A tiny paragraph squeezed into a branded graphic is not useful simply because it contains five stars.

Label illustrations and hypothetical examples honestly. If a visual is an actual customer submission, preserve the relevant attribution and context. Do not create a fabricated customer screenshot or profile to make the post appear more authentic.

## Check the image beyond the product
Inspect faces, address labels, documents and private details in the background before reuse. A photograph originally submitted to a review form may expose more when enlarged or distributed to a wider audience. Choose another asset or obtain an appropriate approved version when needed.

Do not assume a private support attachment is cleared for public marketing. WhatFlow can receive media in a WhatsApp conversation, but receiving the file does not turn it into a public testimonial or grant broad usage rights.

## Make the destination useful
Link the post to the product or guide that completes the viewer’s next decision. If the testimonial concerns a specific version, make sure the destination still represents it accurately. An old post should not silently become evidence for a substantially changed product.

Prepare the team for questions generated by the post. WhatFlow’s inbox can support an appropriate WhatsApp conversation, and its no-seat-fee model can help colleagues participate. The team still needs accurate product information and a realistic support promise.

## Evaluate the post without inventing a result
Track available reach, visits, questions and attributed purchases under consistent definitions. A popular review post does not prove a conversion uplift by itself. Keep paid distribution costs and any other campaign changes visible when assessing the result.

The strongest use of customer feedback helps a new reader understand something real. Respecting context and ownership is part of that usefulness. A review should remain credible after it leaves the original widget, not merely become another persuasive-looking graphic.
`,['ownership','widgets','app'],[{question:'Can I remove any part of a review to make a shorter social quote?',answer:'Use an excerpt that fairly preserves the meaning and relevant qualifications. Do not turn the customer’s words into a different claim.'},{question:'Are WhatsApp support photos automatically usable in ads?',answer:'No. Establish appropriate permission and review the content and context for the intended public use.'}]),
article('multilingual-customer-messaging-shopify','Plan multilingual customer messages without losing the practical details','Keep product names, links, message templates and support ownership consistent when serving customers in more than one language.','operations',['Localization','Multilingual support','Messaging'],`
Translating a greeting is the easy part of multilingual messaging. The harder part is making sure the customer receives the right link, understands the same offer conditions and can get help in a language the team can actually support. A translated message should lead to a coherent experience.

Start with one language and one customer journey. Check the message, destination and support process together before expanding the sequence. A large set of translated drafts can hide basic mismatches between the copy and the store’s actual capabilities.

## Decide how the language is chosen
Use a supported customer or store preference where available and understand its limits. A shipping destination does not prove a person’s preferred language. Avoid guessing from a name, and provide a practical fallback when the relevant field is missing.

Keep the rule understandable to the team. If different apps choose language from different sources, the same customer may receive a mixed sequence. Document the source used by each message and the cases that require manual review.

## Review meaning, not just translated words
Check product terms, units, dates, currency and the conditions that affect the next step. An apparently fluent sentence can still change the offer or promise a service the store does not provide. Have an appropriately competent reviewer check important customer-facing copy.

Avoid translating product identifiers or template names that the system expects to match exactly. The display language and the internal reference can have different roles. A readable phrase should not replace a required configured value in a message action.

## Match the message to the destination
Follow every link in the intended language context. A translated invitation opening a form in another language creates another task for the buyer. Confirm that the product, policy and relevant instructions remain accurate at the destination.

Review-app localization and WhatsApp template language are separate settings. Do not assume that translating a review widget also creates the correct approved message in the sending account. Check the capabilities and configuration of each tool involved.

## Plan the reply before promising language support
A customer may answer the message with a detailed question. Decide who can handle it and when translation assistance is appropriate. Do not present machine-generated wording as a specialist answer to a question the team has not understood.

WhatFlow’s team inbox can keep the conversation accessible while the right colleague helps. Its lack of inbox seat fees can make involving that person simpler. The operational responsibility remains with the store, including the accuracy of the final answer.

## Test edge cases with controlled examples
Use long product names, missing personal fields and different date formats where relevant. Check buttons and links on a phone. A layout that works in one language can become difficult to read when the translated text is longer.

For WhatsApp, use the appropriate approved template and recipient permissions. Language choice does not change the customer-service window or other channel requirements. Test the actual configured format rather than only reviewing a separate translation document.

## Maintain one source of truth for changes
When a policy, promotion or product detail changes, update each affected language. Record the owner and review status so an old translation does not continue making an obsolete promise. Keep saved support answers aligned with the public information.

A useful multilingual program makes the same practical decision clear to more customers. It should expand understanding without pretending the store has unlimited language coverage or that every connected app shares the same translation settings automatically.
`,['policy','flow','app'],[{question:'Can I choose a customer’s language from their country alone?',answer:'A country can be an imperfect proxy. Prefer supported preference data where available and define a clear fallback rather than assuming every resident uses one language.'},{question:'Does a translated review widget configure WhatsApp template language?',answer:'No. Check the review provider’s localization and the messaging account’s template setup separately.'}]),
article('migrate-review-app-preserve-customer-feedback','Plan a review-app migration without losing the meaning of the data','Check exports, product matching, review sources and storefront behavior before replacing a review provider.','operations',['Review migration','Data quality','App changes'],`
Moving reviews is more than transferring a spreadsheet. A review has a product association, a source, a date and sometimes a verification status or media reference. The new provider may interpret those fields differently. Plan the migration around preserving meaning, not merely matching a total count.

Begin with a supported export and a recovery plan. Keep the old configuration available until the replacement has been checked. Avoid deleting the previous setup just because the first import screen reports that some rows were accepted.

## Inventory the data you actually have
List product reviews, store reviews, media, merchant replies and relevant metadata. Confirm what the current provider can export through its normal tools. Do not assume every visible feature has an equivalent portable field or that an export includes every attachment permanently.

Keep a protected copy of the supported export and record when it was created. Review whether the file contains private contact details and limit access appropriately. A migration worksheet should not become a broadly shared customer database.

## Match products deliberately
Decide how the destination identifies the correct item. Handles, IDs and variant references can change across stores or migrations. A row importing successfully does not prove that it appears beside the intended product on the storefront.

Test representative examples, including deleted products, variants and items with similar names. Do not merge materially different products simply to preserve a larger visible count. If a review cannot be matched reliably, keep it for investigation rather than guessing the destination.

## Preserve source and verification distinctions
An imported review is not automatically a verified purchase review in the new system. The destination provider applies its own requirements. Keep original source information where supported and do not relabel the evidence to make the imported set look more authoritative.

Judge.me’s verification documentation describes several different sources and qualifying conditions. Consult the current destination policy for your actual migration. A generic promise that all imported reviews keep every badge can be misleading.

## Check media and replies
Open imported photos and videos and confirm that the references remain accessible through the supported process. A temporary URL is not a permanent archive. Check that any retained merchant reply still belongs to the correct review and has not become detached from its context.

Review permissions for the intended continued use of customer material. A technical migration does not create broader marketing rights. Keep private support attachments distinct from public review media rather than using one folder to fill missing assets in the other.

## Test the storefront before switching fully
Check rating counts, written feedback, filters and the mobile experience on representative products. Inspect relevant structured data through the appropriate tools and identify which theme or app component owns it. Avoid leaving several competing widgets in place without understanding the effect.

Review existing review-request messages and printed links. WhatFlow may send customers to a form supplied by the review provider; those destinations need updating when the provider changes. Messaging and review storage are separate responsibilities even when the customer journey connects them.

## Switch in a controlled sequence
Choose a practical cutover point, document what changed and monitor early submissions. Keep a way to identify feedback collected during the transition so it is not omitted or duplicated. Decide when the previous tool can be retired only after the relevant checks pass.

The useful outcome is a coherent customer feedback history displayed accurately in the new system. Counts matter, but correct associations, source labels and working links matter just as much. A careful migration avoids turning a valuable review archive into a collection of unexplained stars.
`,['verification','ownership','widgets','app'],[{question:'Does a successful import prove every review is on the correct product?',answer:'No. Validate product matching and representative storefront pages after import, including variants and similar product names.'},{question:'Will every imported review retain a verified badge?',answer:'Not necessarily. Verification depends on the destination provider’s current criteria and the available source and purchase data.'}]),
];
export default articles;
