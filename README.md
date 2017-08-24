# hl7-pouchdb

HL7 PouchDB Server

This server listens for hl7 transactions on a given port number and then encrypts them using a secret and inserts them into a encrypted pouchdb database that can be replicated to
a secure server.

## Usage

ENV Variables (.env)

``` sh
PORT=7777
SECRET=[secret code]
REMOTE_DB=https://demo:demo@db.example.com/hl7
```

## Install and run

``` sh
npm install hl7-db
mkdir adt
cd adt
touch .env # add env variables
hl7-db
```

## LICENSE

MIT
