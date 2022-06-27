const  https =  require('https'); 
const axios = require('axios');

async function makeGetRequest(ip) {

    try {                
        
        const httpsAgent = new https.Agent({ rejectUnauthorized: false });
        
        const response = await axios.get(`https://${ip}/ext/health`,{ httpsAgent });                
        console.log("."+response.status+".");
    
        console.log(`${ip} :`, response.data);
    
 
      } catch (errors) {
        console.error(errors);
      }
  }
  
makeGetRequest("ip");
