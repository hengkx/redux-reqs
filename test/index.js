import should from 'should';
import { expect } from 'chai';
import Req from '../src';

describe('module', () => {
  it('should expose Req', () => {
    should.exist(Req);
    Req.should.be.type('function');
  });
});


describe('req', () => {
  it('should throw an error if type, url is not a string', () => {
    const req = new Req();
    const wrongTypes = [1, false, null, undefined, () => { }, {}, []];

    wrongTypes.forEach(wrongType => {
      expect(() => {
        req.get(wrongType, 'url');
      }).to.throw(Error,
        'Expected type, url to be a string');

      expect(() => {
        req.get('type', wrongType);
      }).to.throw(Error,
        'Expected type, url to be a string');
    });
  });

  it('should get method return this', () => {
    const req = new Req({ prefix: 'student' });

    expect(req.del('UPDATE', '/api/update/:id'))
      .to.deep.equal(req);
  });

  it('normal get action', () => {
    const req = new Req({ prefix: 'student' });
    req.get('UPDATE', 'url');
    const actionCreators = req.getCreateActions();
    const action = actionCreators['update']({ test: 'aaa' });
    expect(action)
      .to.deep.equal({
        meta: {
          method: 'get',
          url: 'url'
        },
        payload: {
          test: 'aaa'
        },
        type: 'STUDENT_UPDATE'
      });
  });

  it('normal get action with meta', () => {
    const req = new Req({ prefix: 'student' });
    req.get('UPDATE', 'url');
    const actionCreators = req.getCreateActions();
    const action = actionCreators['update']({ test: 'aaa' }, { meta: '2' });
    expect(action)
      .to.deep.equal({
        meta: {
          meta: '2',
          method: 'get',
          url: 'url'
        },
        payload: {
          test: 'aaa'
        },
        type: 'STUDENT_UPDATE'
      });
  });


  it('normal reducer', () => {
    const req = new Req({ prefix: 'student' });
    req.get('UPDATE', 'url');
    const reducer = req.getReducers();
    expect(reducer({ counter: 3 }, { type: 'STUDENT_UPDATE' }))
      .to.deep.equal({
        counter: 3,
        isfetching: true
      });

    expect(reducer({ counter: 3 },
      { type: 'STUDENT_UPDATE_RESULT', payload: { id: 1 } }))
      .to.deep.equal({
        counter: 3,
        isfetching: false,
        updateResult: {
          id: 1
        }
      });
  });

  it('normal reducer default state', () => {
    const req = new Req({ prefix: 'student', defaultState: { counter: 1 } });
    req.get('UPDATE', 'url');
    const reducer = req.getReducers();
    expect(reducer(undefined, { type: 'STUDENT_UPDATE_RESULT', payload: { id: 1 } }))
      .to.deep.equal({
        counter: 1,
        isfetching: false,
        updateResult: {
          id: 1
        }
      });
  });
});
