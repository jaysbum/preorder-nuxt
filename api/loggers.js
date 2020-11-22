const axios = require('axios')
export default function (req, res, next) {
  axios.get("http://localhost:1337/customers").then(function(resp){
    res.end(JSON.stringify(resp.data))
  });
}
