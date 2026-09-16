import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import vm from 'node:vm';
const code=await readFile(new URL('../sw.js',import.meta.url),'utf8');
function worker(offline=false){const handlers={},writes=[],reads=[];const context={URL,self:{registration:{scope:'https://example.test/crm/'},location:{origin:'https://example.test'},addEventListener:(name,handler)=>handlers[name]=handler},fetch:async()=>{if(offline)throw new Error('offline');return{clone:()=>({})}},caches:{open:async()=>({put:(key)=>writes.push(key)}),match:async(key)=>{reads.push(key);return {cached:true}}}};vm.runInNewContext(code,context);return{handlers,writes,reads}}
for(const [path,expected] of [['login.html','login.html'],['index.html','index.html']]){
 test(`navigation cache keeps ${path} isolated`,async()=>{const w=worker();let response;w.handlers.fetch({request:{method:'GET',url:`https://example.test/crm/${path}?v=test`,mode:'navigate'},respondWith:p=>response=p});await response;await Promise.resolve();assert.deepEqual(w.writes,[`https://example.test/crm/${expected}`])});
 test(`offline ${path} uses matching document`,async()=>{const w=worker(true);let response;w.handlers.fetch({request:{method:'GET',url:`https://example.test/crm/${path}`,mode:'navigate'},respondWith:p=>response=p});await response;assert.deepEqual(w.reads,[`https://example.test/crm/${expected}`])});
}
