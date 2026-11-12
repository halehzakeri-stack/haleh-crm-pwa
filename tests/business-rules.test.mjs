import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const context=vm.createContext({});
context.state={cart:[],discount:0,discountType:'amount',paid:null,payment:'POS'};
context.data={partnerStatements:[]};

function loadFunction(name){
  const start=html.indexOf(`function ${name}(`);
  const end=html.indexOf('\nfunction ',start+1);
  assert.ok(start>=0,`Missing ${name}`);
  vm.runInContext(html.slice(start,end<0?html.length:end),context);
}

loadFunction('totals');
loadFunction('partnerBalanceV120');
loadFunction('partnerMoneyV120');

test('sale totals cap discount and paid amount at the payable total',()=>{
  context.state={cart:[{price:100000,qty:2},{price:50000,qty:1}],discount:10,discountType:'percent',paid:null,payment:'POS'};
  assert.deepEqual(JSON.parse(JSON.stringify(context.totals())),{subtotal:250000,discount:25000,total:225000,paid:225000,balance:0});
  context.state={cart:[{price:100000,qty:1}],discount:200000,discountType:'amount',paid:300000,payment:'CASH'};
  assert.deepEqual(JSON.parse(JSON.stringify(context.totals())),{subtotal:100000,discount:100000,total:0,paid:0,balance:0});
});

test('partner settlement separates payable approval from historical reporting',()=>{
  context.data.partnerStatements=[
    {partnerId:'a',status:'SUBMITTED',gross:100,commission:20,rackRent:10,net:70},
    {partnerId:'a',status:'APPROVED',gross:200,commission:40,rackRent:10,net:150},
    {partnerId:'a',status:'SETTLED',gross:300,commission:60,rackRent:10,net:230},
    {partnerId:'b',status:'APPROVED',gross:500,commission:50,rackRent:0,net:450}
  ];
  assert.equal(context.partnerBalanceV120('a'),150);
  assert.deepEqual(JSON.parse(JSON.stringify(context.partnerMoneyV120())),{gross:1000,commission:150,rent:20,net:830});
});
