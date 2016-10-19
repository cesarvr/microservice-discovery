'use strict';

const dns = require('dns');

function toServiceNotation(name){
  return name.replace(/-|\s/g, '_');
}

function searchInEnvVars(_name){
  let evars = process.env;
  let svcName = toServiceNotation(_name).toUpperCase().trim();

  let service = evars[svcName + '_SERVICE_HOST'];
  let port = evars[svcName + '_SERVICE_PORT'];

  return {service:service, port: port};
}

function searchInDNS(_name){
  return new Promise((resolve, reject) => {
    let service =dns.lookup(_name, (err, addr, family) => {
        if(err) reject(err);
        resolve(addr);
    });
  });
}

// @Experimental
function searchInDNSSRV(_name){
  return new Promise((resolve, reject) => {
    let service =dns.resolveSrv(_name, (err, addr, family) => {
        if(err) reject(err);
        resolve(addr);
    });
  });
}

function whoami(){
  let build = process.env['OPENSHIFT_BUILD_NAME'];
    if(build){
      let tmp = build.replace(/-\d+$/, '');
      return { name: tmp , info: searchInEnvVars(tmp) };
    }else
      throw 'can\'t find openshift build name environment variable.';
}


/*
function getService(name){
  return searchInEnvVars(name)
}
*/

module.exports = {
  toServiceNotation: toServiceNotation,
  searchInEnvVars: searchInEnvVars,
  searchInDNS: searchInDNS,
  searchInDNSSRV: searchInDNSSRV,
  whoami: whoami
};
