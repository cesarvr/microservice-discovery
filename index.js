'use strict';

const dns = require('dns');

function toServiceNotation(name){
  return name.replace(/-|\s/g, '_');
}

function searchInEnvVars(_name){
  let evars = process.env;
  let svcName = toServiceNotation(_name).trim();

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

function searchInDNSServ(_name){
  return new Promise((resolve, reject) => {
    let service =dns.resolveSrv(_name, (err, addr, family) => {
        if(err) resolve(err);
        resolve(addr);
    });
  });
}

function getService(name){
  return searchInEnvVars(name)
}

module.exports = {
  toServiceNotation: toServiceNotation,
  searchInEnvVars: searchInEnvVars,
  getService: getService,
  searchInDNS: searchInDNS,
  searchInDNSServ: searchInDNSServ
};
