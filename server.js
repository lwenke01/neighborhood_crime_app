'use strict';
require('express')().use(require('express').static(__dirname + '/build'))
.listen(3000, ()=>{
  console.log(('client up on 3000'));
});
