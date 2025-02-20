```yaml
project:
  name: vsh-frontend
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
