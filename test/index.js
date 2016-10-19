'use strict';

let assert = require('chai').assert
let discovery = require('../index');

before(()=>{
  process.env.MY_AWESOME_ENGINE_SERVICE_HOST = '0.0.0.0';
  process.env.MY_AWESOME_ENGINE_SERVICE_PORT = 25;
  process.env['DISCOVERY_0X1_SERVICE_HOST'] = '10.0.0.66';
  process.env['DISCOVERY_0X1_SERVICE_PORT'] = 3225;
  process.env.OPENSHIFT_BUILD_NAME = 'discovery-0x1-22';
})

after(()=>{
  delete process.env.MY_AWESOME_ENGINE_SERVICE_HOST;
  delete process.env.MY_AWESOME_ENGINE_SERVICE_PORT;
  delete process.env['DISCOVERY_0X1_SERVICE_HOST'];
  delete process.env['DISCOVERY_0X1_SERVICE_PORT'];
  delete process.env.OPENSHIFT_BUILD_NAME;
})

describe('Testing Discovery API ', function() {

  it('Testing hostname toServiceNotation ',()=>{
      assert.isFunction(discovery.toServiceNotation, 'expected true');
      assert.equal(discovery.toServiceNotation('red-hat'), 'red_hat', 'should be equals');
      assert.equal(discovery.toServiceNotation('red-hat com'),'red_hat_com', 'expected to be true');
      assert.equal(discovery.toServiceNotation('red hat com'),'red_hat_com', 'expected to be true');
  });


  it('testing DNS discovery', ()=>{

        assert.isFunction(discovery.searchInDNS, 'expected true');
        return discovery.searchInDNS('localhost')
                  .then(addr => assert.equal(addr, '127.0.0.1', 'we expect to return 127.0.0.1'))
                  .catch((e)=>assert.isNull(e), 'no error expected in this call.');
  });

  it('testing whoami', ()=>{

        assert.isFunction(discovery.whoami, 'expected true');
        let info = discovery.whoami();

        assert.isDefined(info.info);
        assert.isDefined(info.info.service);
        assert.isDefined(info.info.port);
        assert.isDefined(info.name);

        assert.equal(info.name, 'discovery-0x1', 'should be equals to discovery-0x1');
        assert.equal(info.info.service, '10.0.0.66', 'should be equals to 10.0.0.66');
        assert.equal(info.info.port, 3225, 'should be equals to 3225');
  });




    /* it('testing DNS SRV Protocol discovery', ()=> {
          assert.isFunction(discovery.searchInDNS, 'expected true');
          return discovery.searchInDNSServ('nodejs.org').then(svc => console.log('svc->', svc));
                  //  .then(addr => assert.equal(addr, '127.0.0.1', 'we expect to return 127.0.0.1'))
                    //.catch((e)=>assert.isNull(e), 'no error expected in this call.');
    }); */



});
