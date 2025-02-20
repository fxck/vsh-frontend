```yaml
project:
  name: vsh-frontend
  envVariables:
    API_URL: https://api-${zeropsSubdomainHost}-3000.prg1.zerops.app

services:
  - hostname: db
    type: postgresql@16
    mode: NON_HA

  - hostname: app
    type: static
    buildFromGit: https://github.com/fxck/vsh-frontend
    enableSubdomainAccess: true

  - hostname: api
    type: nodejs@22
    buildFromGit: https://github.com/fxck/vsh-frontend
    enableSubdomainAccess: true
```
