'use strict';



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

function getService(name){
  return searchInEnvVars(name)
}

module.exports = {
  toServiceNotation: toServiceNotation,
  searchInEnvVars: searchInEnvVars,
  getService: getService,
};
