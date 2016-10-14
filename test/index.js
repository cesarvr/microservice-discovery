'use strict';

let assert = require('chai').assert
let discovery = require('../index');

before(()=>{
  process.env.MY_AWESOME_ENGINE_SERVICE_HOST = '0.0.0.0';
  process.env.MY_AWESOME_ENGINE_SERVICE_PORT = 25;
})

describe('Testing Discovery API ', function() {

  it('Testing hostname toServiceNotation ',()=>{
      assert.isFunction(discovery.toServiceNotation, 'expected true');
      assert.equal(discovery.toServiceNotation('red-hat'), 'red_hat', 'should be equals');
      assert.equal(discovery.toServiceNotation('red-hat com'),'red_hat_com', 'expected to be true');
      assert.equal(discovery.toServiceNotation('red hat com'),'red_hat_com', 'expected to be true');
  });

  it('Testing getService ',()=>{
      assert.isFunction(discovery.getService, 'expected true');

      let svc = discovery.getService('MY AWESOME ENGINE');

      assert.equal(svc.service, '0.0.0.0', 'should be equal');
      assert.equal(svc.port, 25, 'should be equal');
  });


});
