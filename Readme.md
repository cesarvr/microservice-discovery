#Autodiscovery module for microservices.
This Node module encapsulates a set of useful functions to discover nearby services in Openshift 3.x / Kubernetes.

## Features

- Discovery through environment variables.
  - Look for surrounding services looking at environment variables.
- DNS Lookup
  - You can discover services that are in your same network/project in OSE3/Kubernetes.
- DNS SRV (Experimental)
  - Looking for services using this more robust [DNS specification](https://en.wikipedia.org/wiki/SRV_record).

## API

  ### discover.searchInEnvVars
    - it look for environment variables of other containers shared with your service.

```javascript
  let discover = require('discovery');

  //{"service": "172.30.228.0","port": "8080" }
  discover.searchInEnvVars('service name');
```

  ### discover.searchInDNS
  - if for some reason environment variables are not shared, this method allow you to lookup the service name in the DNS.  
  - return an object with IP address and port.

```javascript

  // returns the IP of the cluster.
discover.searchInDNS('service name'); //"172.30.228.0"
```

  ### discover.searchInDNS
  - if for some reason environment variables are not shared, this method allow you to lookup the service name in the DNS.  
  - return a promise, with IP address if fulfilled, or error.

```javascript
//returns the IP address.
// {  "service": "172.30.228.0","port": "8080" },
discover.searchInDNSSRV('service name');  
```

## More info

- [Openshift 3.x](https://docs.openshift.com/enterprise/3.0/getting_started/index.html)
- [Kubernetes](http://kubernetes.io/docs/user-guide/servicesSS)
