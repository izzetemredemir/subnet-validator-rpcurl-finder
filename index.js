
const  { Avalanche} =  require("avalanche");
const { PChainVMName } = require("avalanche/dist/utils");
const  https =  require('https'); 
const axios = require('axios');

const ip = "api.avax-test.network/"
const avalanche = new Avalanche(ip, null, "https");

async function makeGetRequest(ip) {

    try {                
    
        const httpsAgent = new https.Agent({ rejectUnauthorized: false });

        const response = await axios.get(`https://${ip}/ext/health`,{ httpsAgent });                


        if(response.status == 200){
            console.log(`ip:${ip} :`, response.data);
        }
       
    
        return response;
      } catch (errors) {
        //console.error(errors);
      }
  }
  


async function main(){
 try {
    const PChain = avalanche.PChain();
    const info = avalanche.Info();

 
    let getSubnets = await PChain.getSubnets();
    //console.log(getSubnets);  

    getSubnets.forEach(x => {
        //console.log(x);

        
    });

    let getBlockchains = await PChain.getBlockchains();

    //console.log(getBlockchains);

    getBlockchains.forEach(x => {
        //console.log(x);
        
    });
    // return subnet's blockchain list
    let validates = await PChain.validates("9m6a3Qte8FaRbLZixLhh8Ptdkemm4csNaLwQeKkENx5wskbWP");

    //console.log(validates);

    let getCurrentValidators = await PChain.getCurrentValidators("9m6a3Qte8FaRbLZixLhh8Ptdkemm4csNaLwQeKkENx5wskbWP");
    //console.log(getCurrentValidators);

   // let  getBlockchainID = await   PChain.getBlockchainID();


    //console.log("getBlockchainID",getBlockchainID);

    let peers = await info.peers();
    const { exec } = require('child_process');
    peers.forEach(x => {
        x.ip = x.ip.split(":")[0];
     

        exec('nmap '+x.ip, (err, stdout, stderr) => {
            if (err) {
                //some err occurred
                console.error(err)
            } else {
            if(stdout.search("443/tcp open")>0){
                makeGetRequest(x.ip);
             

            }
            

            }
            });
    });
    //console.log(peers.length);



       

 } catch (error) {
     console.log(error);
     
 }
} 



main()



