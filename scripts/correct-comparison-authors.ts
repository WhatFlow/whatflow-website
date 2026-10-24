import { getPayload } from 'payload';
import config from '../src/payload.config';
const payload = await getPayload({ config });
const result = await payload.find({ collection: 'comparisons', limit: 200, draft: true });
const queue=[...result.docs];
await Promise.all(Array.from({length:3},async()=>{while(queue.length){const doc=queue.shift()!;if(doc.author!=='Safwan Adnan') await payload.update({collection:'comparisons',id:doc.id,data:{author:'Safwan Adnan',authorRole:'Co-founder and CEO of WhatFlow'},draft:false});console.log('Corrected author:',doc.slug);}}));
await payload.destroy();process.exit(0);
