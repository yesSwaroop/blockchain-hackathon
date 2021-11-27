var dealer = '0xB6163D10f8199c8356f8802c3Eeb1d1F47Bde726';
var client = 'null';
var KEY ='IG3D5Z1DX62AYHEVWBNCZ2E4ZQU4EDYKAN';

var begin = document.getElementById("begin");
var ip = document.getElementById("cad");

var purchases = `https://api-ropsten.etherscan.io/api?module=account&action=tokennfttx&address=${dealer}&page=1&offset=100&startblock=0&endblock=27025780&sort=asc&apikey=${KEY}`;
var contract=[];

begin.addEventListener("click",validate);

function validate(){
    
    var ldg = document.getElementById("ldg");
    ldg.style.visibility = "visible";
    client = ip.value;
    fetch(purchases).then(response => {
        return response.json();
    }).then(data =>{
        for(let i in data['result']){
            let purchase = data['result'][`${i}`];
            if(purchase['contractAddress']!=contract[contract.length-1])
                contract.push(purchase['contractAddress']);
        }
    }).then(()=>{
        setTimeout(()=>{
            ldg.style.visibility = "hidden";
            setTimeout(()=>{
                alert("Invalid Address / Authentication Failed!!\nTry again.");
                document.location.reload();
            },50)
    },6950);
        for(i in contract){
            isOwner(i);
        }
    });

}

function isOwner(i){

    let check = `https://api-ropsten.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${contract[i]}&address=${client}&tag=latest&apikey=${KEY}`;

    fetch(check).then(response => {
        return response.json();
    }).then(data => {
        if(data['result']>0){
            ldg.style.visibility = "hidden";
            window.location.href = 'video/vindex.html';
            authorized();
        }
    });

}




