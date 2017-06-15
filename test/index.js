import { expect } from 'chai';
import Req from '../src';


describe('req', () => {
  it('should expose Req', () => {
    const req = new Req({ prefix: 'student' });
    req.get('UPDATE', 'url');
    const { update } = req.getCreateActions();
    const result = req.request(update({ a: '1' }));
    result.next().value;
    // console.log(result.next().value);
  });
});
