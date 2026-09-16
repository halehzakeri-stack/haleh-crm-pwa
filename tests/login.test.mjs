import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizePhone,phoneError,persianDigits} from '../login-core.mjs';
test('normalizes Persian and Arabic mobile digits',()=>{assert.equal(normalizePhone('۰۹۱۲۱۲۳۴۵۶۷'),'09121234567');assert.equal(normalizePhone('٠٩١٢١٢٣٤٥٦٧'),'09121234567');assert.equal(phoneError('۰۹۱۲۱۲۳۴۵۶۷'),'')});
test('rejects missing, short, long, invalid prefix and non-digit numbers',()=>{for(const value of ['', '0912123456','091212345678','08121234567','0912abc4567','+989121234567'])assert.notEqual(phoneError(value),'')});
test('localized display does not truncate extra digits',()=>{assert.equal(persianDigits('091212345678'),'۰۹۱۲۱۲۳۴۵۶۷۸');assert.equal(persianDigits('٠٩١٢'),'۰۹۱۲');assert.equal(persianDigits('09abc'),'۰۹abc')});
