import { expect } from 'chai';
import Req from '../src';


describe('req', () => {
  it('absolute url request', () => {
    const req = new Req({ prefix: 'student' });
    req.get('UPDATE', 'http://192.168.1.11:8000');
    const { update } = req.getCreateActions();
    const result = req.request(update({ a: '1' }));
    result.next().value;
    result.next().value;
    result.next().value;
  });
});
