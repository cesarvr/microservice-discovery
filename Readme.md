#Autodiscovery module for microservices.
This Node module encapsulates a set of useful functions to discover nearby services in Openshift 3.x / Kubernetes, you just need to remember the service name to retrieve connectivity information.

## Features

- Discovery through environment variables.
  - Look for surrounding services looking at environment variables.
- DNS Lookup
  - You can discover services that are in your same network/project in OSE3/Kubernetes.
- DNS SRV (Experimental)
  - Looking for services using this more robust [DNS specification](https://en.wikipedia.org/wiki/SRV_record).
- Whoami
  - Get information on how to connect to your own service, useful if you want to send this info to other services.

## Demo
 - [Service discovery example.](https://github.com/cesarvr/microservice-discovery-demo)

## API

  * **discover.searchInEnvVars**
    - it look for environment variables of other containers shared with your service.

```javascript
  let discover = require('discovery');

  //{"service": "172.30.228.0","port": "8080" }
  discover.searchInEnvVars('service name');
```

 * **discover.searchInDNS**
  - if for some reason environment variables are not shared, this method allow you to lookup the service name in the DNS.  
  - return an object with IP address and port.

```javascript

  // returns the IP of the cluster.
discover.searchInDNS('service name'); //"172.30.228.0"
```

 * **discover.searchInDNSSRV**
  - You can retrieve address and port from a DNS with SRV record support.

```javascript
//returns the IP address.
// {  "service": "172.30.228.0","port": "8080" },
discover.searchInDNSSRV('service name');  
```

* **discover.whoami**
 - the connection details for your own service, can be handy to report to some orchestrator.   

```javascript
//return.
discover.whoami();
                        //  "name": "discovery",
                        //  "info": {
                        //    "service": "172.30.234.24",
                        //    "port": "8080"
                        //  }
}
```

## More info

- [Openshift 3.x](https://docs.openshift.com/enterprise/3.0/getting_started/index.html)
- [Kubernetes](http://kubernetes.io/docs/user-guide/servicesSS)
