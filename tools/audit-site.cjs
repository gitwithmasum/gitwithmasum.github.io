#!/usr/bin/env node
'use strict';
// Release v3.0.0 — reproducible, offline static-site checks.
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('index.html'),css=read('style.css'),js=read('script.js');
const notfound=read('404.html'),robots=read('robots.txt'),map=read('sitemap.xml');
const guest=read('aurora-bachelor-demo.html');
const count=(s,n)=>s.split(n).length-1;
let passed=0;
function test(name,check){check();passed++;console.log('PASS',name)}
test('Page metadata',()=>{assert.match(html,/<title>.+<\/title>/);assert.match(html,/<meta name="description" content="/);assert.match(html,/rel="canonical" href="https:\/\/gitwithmasum.github.io\/"/)});
test('Structured data',()=>{const x=html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);assert.ok(x);const g=JSON.parse(x[1])['@graph'];assert.equal(g.length,2);assert.equal(g[0]['@type'],'Person');assert.equal(g[1]['@type'],'WebSite')});
test('Sitemap and robots',()=>{assert.match(robots,/Sitemap: https:\/\/gitwithmasum.github.io\/sitemap.xml/);assert.match(map,/<loc>https:\/\/gitwithmasum.github.io\/<\/loc>/)});
test('Accessible 404',()=>{assert.match(notfound,/name="robots" content="noindex,follow"/);assert.match(notfound,/href="\/#projects"/)});
test('In-page anchor links',()=>{const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]));for(const [,id] of html.matchAll(/href="#([^"]+)"/g))assert.ok(ids.has(id),'Missing #'+id)});
test('Local assets',()=>{let n=0;for(const [,ref] of html.matchAll(/\b(?:href|src|srcset)="([^"]+)"/g)){if(!ref.startsWith('./'))continue;const p=path.resolve(root,decodeURIComponent(ref.split(/[?#]/)[0]));assert.ok(p.startsWith(root+path.sep),'Unsafe path '+ref);assert.ok(fs.existsSync(p),'Missing asset '+ref);n++}assert.ok(n>=6)});
test('Compressed WebP and original fallback',()=>{assert.ok(fs.statSync(path.join(root,'Assets/formal-portrait.webp')).size<120000);assert.ok(fs.statSync(path.join(root,'Assets/formal 1.0.png')).size>0);assert.match(html,/<picture><source srcset="\.\/Assets\/formal-portrait.webp" type="image\/webp">/)});
test('Public projects and guest demo',()=>{assert.equal(count(html,'<article class="project-card"'),8);assert.equal(count(html,'data-project-filter='),5);assert.match(html,/href="https:\/\/gitwithmasum.github.io\/aurora-bachelor-demo.html"/);assert.equal(count(guest,'data-panel='),5)});
test('Research integrity',()=>{assert.equal(count(html,'class="study-card glass"'),3);assert.match(html,/not peer-reviewed or journal\/conference-accepted publications/);assert.equal(count(html,'href="https://gitwithmasum.github.io/MB-Portfolio/research/papers/'),3)});
test('Accessibility markers',()=>{assert.match(html,/id="nav-toggle" aria-controls="primary-navigation" aria-expanded="false"/);assert.match(html,/id="theme-toggle" aria-pressed="false"/);assert.match(css,/focus-visible/);assert.match(css,/prefers-reduced-motion/)});
test('Existing JavaScript',()=>{new Function(js);assert.match(js,/const projectSearch/);assert.match(js,/themePreferenceKey/)});
test('Cache and site icons',()=>{assert.match(html,/style.css\?v=3.0.0/);assert.match(html,/favicon.svg/)});
console.log('Site audit passed:',passed,'checks');
