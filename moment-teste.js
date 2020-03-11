const moment = require('moment')
moment.locale('en');
const data_hora_fim = moment('2020-03-15').add(2, 'days').format('YYYY-MM-DD HH:mm:ss Z');
console.log(moment.parseZone('2020-03-04T17:33:35.000Z', 'YYYY-MM-DD HH:mm:ss +3').format()); 