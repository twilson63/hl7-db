# hl7-pouchdb

HL7 PouchDB Server

This server listens for hl7 transactions on a given port number and then encrypts them using a secret and inserts them into a encrypted pouchdb database that can be replicated to
a secure server.

## Usage

ENV Variables (.env)

``` sh
DB=[local datbase name]
PORT=7777
SECRET=[secret code]
REMOTE_DB=https://demo:demo@server.com/database
```

## Install and run

``` sh
npm install hl7-db
mkdir adt
cd adt
touch .env # add env variables
hl7-db
```

## Installing on a raspberry pi

* Install NodeJS

```
wget https://nodejs.org/dist/v8.4.0/node-v8.4.0-linux-armv6l.tar.xz
tar -xvf node-v8.4.0-linux-armv6l.tar.xz
cd node-v8.4.0-linux-armv6l.tar.xz
sudo cp -R * /usr/local
sudo chown -R pi /usr/local
```

* Install pm2

```
npm install pm2 -g
```

* Install hl7-db

```
npm install hl7-db -g
```

* Create shell script file

hl7-adt.sh

```
#!/usr/local/env bash

export DB=adt
export PORT=7777
export REMOTE_DB=https://[user]:[pwd]@server/db
export SECRET=A really long secret

hl7-db
```

`chmod +x hl7-adt.sh`

* Startup Settings

```
pm2 startup

sudo env PATH=$PATH:/usr/local/bin /usr/local/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/pi

pm2 save

```

## LICENSE

MIT
