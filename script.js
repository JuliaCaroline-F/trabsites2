let cidade="";
let long="";
let lat="";
let not="";
document.querySelector("#botaocep").addEventListener("click", async function(e){
    /*criar uma variavel para o cep e colocar o valor da caixacep */

    let cep =document.querySelector("#caixacep").value;
    console.log(cep);
    /*mandar o link pra API e espera uma resposta. O then executa a ação apos a espera ele retorna apromisse, serve pra maipular objeto de uma promisse */
    await fetch(`https://viacep.com.br/ws/${cep}/json/`).then((resp)=>
        /*pegar o resultado da promisse e retorna como objeto json e then pega a info para manipular*/
        resp.json()).then(async(resp)=>{
            console.log(resp);
            console.log(resp.localidade);
            cidade= resp.localidade;
            estado= resp.uf;
            document.querySelector("#cid").innerText=resp.localidade+", "+ resp.uf;
            document.querySelector("#end").innerText=resp.logradouro + ", " +resp.bairro;
            Previsãotempo();
            Noticias();
            Maps();
    
             
        })

});

   function Previsãotempo(){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&appid=453520dd2bbd9d80b2908e8f6553cb97&lang=pt_br`).then((resp)=>
            resp.json()).then((prev)=>{
                console.log(prev);
                console.log(prev.main);
                console.log(prev.weather[0].description);
                console.log(prev.coord)
                long = prev.coord.lon;
                lat = prev.coord.lat;
                console.log(long);
                console.log(lat);

                document.querySelector("#clima").innerText=prev.weather[0].description+" "+prev.main.temp+"°c";;
            
             
            
                    })
    };

    function Noticias(){ 
        console.log("X");
        fetch(`https://newsapi.org/v2/everything?q=${estado}&language=pt&sortBy=relevancy&apiKey=995dfe65c0484402b6e6c8fcc0d7c65c`).then((resp)=>
            resp.json()).then((resp)=>{
               console.log(resp);
               console.log(resp.articles[0]); 
               console.log(document); 
               document.querySelector("#noticia").innerText=resp.articles[0].title;
               document.querySelector("#noticia").innerText=resp.articles[0].author+"<br>";
               document.querySelector("#noticia").innerText=resp.articles[0].description+"<br>";
               document.querySelector("#noticia").innerText=resp.articles[0].content+"<br>";
               
            })
        
   };
   function Maps(){ 
    fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${long}&appid=8d540014541ecd29672dd3401dd86b77`).then((resp)=>
        resp.json()).then((resp)=>{
            console.log(resp);
        })
    
    };
    