/**
 * Move editorial covers and screenshots from public/ into the Payload media library (R2).
 * Offline: writes SQL only. Objects must already be uploaded to R2 under `filename`.
 *  - Inserts one media row per file (skips filenames that already exist).
 *  - Posts and comparisons: points the cover upload field at the media row and clears the legacy URL field.
 *  - Rewrites screenshot block URLs in posts, comparisons and the latest comparison versions.
 * Usage: node scripts/build-media-migration-sql.mjs <media-manifest.json> <out.sql>
 * Manifest rows: {path, filename, mime, filesize, width, height, alt}
 */
import {readFile,writeFile} from 'node:fs/promises';

const [manifestFile,out]=process.argv.slice(2);
if(!out)throw Error('usage: build-media-migration-sql.mjs <media-manifest.json> <out.sql>');
const q=v=>v===null||v===undefined?'NULL':typeof v==='number'?String(v):`'${String(v).replaceAll("'","''")}'`;
const now=new Date().toISOString();
const manifest=JSON.parse(await readFile(manifestFile,'utf8'));
const statements=[];
for(const m of manifest){
 if(!/^[a-z0-9.-]+$/.test(m.filename))throw Error('unsafe filename '+m.filename);
 const url='/api/media/file/'+m.filename;
 const media=`(SELECT id FROM media WHERE filename=${q(m.filename)})`;
 statements.push(`INSERT INTO media (filename,url,mime_type,filesize,width,height,alt,created_at,updated_at) SELECT ${[m.filename,url,m.mime,m.filesize,m.width,m.height,m.alt,now,now].map(q).join(',')} WHERE NOT EXISTS (SELECT 1 FROM media WHERE filename=${q(m.filename)});`);
 statements.push(`UPDATE posts SET cover_image_id=${media},cover_image_url=NULL WHERE cover_image_url=${q(m.path)} AND ${media} IS NOT NULL;`);
 statements.push(`UPDATE comparisons SET cover_image_id=${media},image_url=NULL WHERE image_url=${q(m.path)} AND ${media} IS NOT NULL;`);
 statements.push(`UPDATE _comparisons_v SET version_cover_image_id=${media},version_image_url=NULL WHERE latest=1 AND version_image_url=${q(m.path)} AND ${media} IS NOT NULL;`);
 const from=q(`"url":"${m.path}"`),to=q(`"url":"${url}"`);
 statements.push(`UPDATE posts SET content=replace(content,${from},${to}) WHERE instr(content,${from})>0;`);
 statements.push(`UPDATE comparisons SET content=replace(content,${from},${to}) WHERE instr(content,${from})>0;`);
 statements.push(`UPDATE _comparisons_v SET version_content=replace(version_content,${from},${to}) WHERE latest=1 AND instr(version_content,${from})>0;`);
}
for(const s of statements){const t=s.match(/^(?:INSERT INTO|UPDATE)\s+([^\s(]+)/)?.[1];if(!['media','posts','comparisons','_comparisons_v'].includes(t))throw Error('Unexpected SQL target '+t);}
await writeFile(out,statements.join('\n')+'\n');
console.log(JSON.stringify({files:manifest.length,statements:statements.length,out}));
