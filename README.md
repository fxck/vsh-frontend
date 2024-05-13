```yaml
project:
  name: copy of vsh-frontend
services:
  - hostname: db
    type: postgresql@16
    mode: NON_HA
    verticalAutoscaling:
      cpuMode: SHARED
      minRam: 0.5
      maxRam: 32
      minDisk: 1
      maxDisk: 100
      startCpuCoreCount: 2
      minCpu: 1
      maxCpu: 5
  - hostname: app
    type: nginx@1.22
    nginxConfig: |-
      server {
          listen 80 default_server;
          listen [::]:80 default_server;

          server_name _;
          root /var/www;

          location / {
              try_files $uri $uri/ /index.html;
          }

          access_log syslog:server=unix:/dev/log,facility=local1 default_short;
          error_log syslog:server=unix:/dev/log,facility=local1;
      }
    verticalAutoscaling:
      cpuMode: SHARED
      minRam: 0.25
      maxRam: 32
      minDisk: 1
      maxDisk: 100
      startCpuCoreCount: 1
      minCpu: 1
      maxCpu: 5
  - hostname: api
    type: nodejs@18
    envSecrets:
      DB_URL: ${db_connectionString}
    ports:
      - port: 3000
        httpSupport: true
    verticalAutoscaling:
      cpuMode: SHARED
      minRam: 0.25
      maxRam: 32
      minDisk: 1
      maxDisk: 100
      startCpuCoreCount: 1
      minCpu: 1
      maxCpu: 5

```
