import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const context=vm.createContext({});
for(const name of ['normalizeDigits','productIdentityKeyV61','resolveProductFormColors','productFormMissingField']){
 const start=html.indexOf(`function ${name}(`),next=html.indexOf('\nfunction ',start+1);
 const end=html.indexOf('\nconst ',start+1);
 vm.runInContext(html.slice(start,Math.min(...[next,end].filter(n=>n>start))),context);
}
const catalog=[{name:'آبی',hex:'#123456'},{name:'مشکی',hex:'#111111'}];
test('exact typed color is accepted without a suggestion click',()=>{const r=context.resolveProductFormColors([],'آبی',catalog);assert.equal(r.error,'');assert.equal(r.colors[0],catalog[0]);});
test('Persian/Arabic equivalent names and multiple colors resolve',()=>{const r=context.resolveProductFormColors([],'آبي، مشكي',catalog);assert.equal(r.error,'');assert.equal(r.colors.length,2);});
test('typed color does not duplicate an existing selection',()=>{assert.equal(context.resolveProductFormColors([catalog[0]],'آبی',catalog).colors.length,1);});
test('partial or unknown color is rejected without losing selected colors',()=>{const r=context.resolveProductFormColors([catalog[1]],'آب',catalog);assert.ok(r.error.includes('آب'));assert.equal(r.colors.length,1);assert.equal(r.colors[0],catalog[1]);});
test('complete form and Persian price pass; missing fields are specific',()=>{const values={name:'شلوار',cat:'جین',price:Number(context.normalizeDigits('۱۲۵۰۰۰۰')),colors:catalog,sizes:['36','38']};assert.equal(context.productFormMissingField(values),null);for(const [key,value,id] of [['name','','npName'],['cat','','npCat'],['price',0,'npPrice'],['colors',[],'npColorSearch'],['sizes',[],'npSizes']])assert.equal(context.productFormMissingField({...values,[key]:value})[0],id);});
test('inline scripts remain syntactically valid',()=>{for(const match of html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))new vm.Script(match[1]);});
