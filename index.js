#!/usr/bin/env node

require('dotenv').config()

const hl7 = require('simple-hl7')
const app = hl7.tcp()
const cron = require('cron')

const PouchDB = require('pouchdb')
PouchDB.plugin(require('crypto-pouch'))

const db = PouchDB(process.env.DB || 'hl7')
process.env.SECRET && db.crypto(process.env.SECRET)
process.env.REMOTE_DB &&
  db.sync(process.env.REMOTE_DB, { live: true, retry: true })

app.use((req, res, next) => {
  // post to pouchdb
  db
    .post({ msg: req.msg.log() })
    .then(result => {
      next()
    })
    .catch(err => {
      console.log(err)
      next()
    })
})

app.use((req, res, next) => {
  // send ack
  res.end()
})

app.use(function(err, req, res, next) {
  //error handler
  //standard error middleware would be
  console.log('******ERROR*****')
  console.log(err)
  var msa = res.ack.getSegment('MSA')
  msa.editField(1, 'AR')
  res.ack.addSegment('ERR', err.message)
  res.end()
})

app.start(process.env.PORT || 7777)

// setup auto compact cron job
const job = new cron.CronJob('00 00 2 * * *', () => {
  db
    .compact()
    .then(res => {
      console.log('compact completed ' + new Date().toISOString())
    })
    .catch(err => {
      console.log('error occuried while trying to compact db: ', err.message)
    })
})
