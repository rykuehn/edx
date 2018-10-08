document.onreadystatechange = () => {
  if(document.readyState === 'complete') {
    const analyze = () => {
      var reqBody = {
        "documents": {
          "language":"en",
          "id" : 1,
          "text": document.getElementById("input").value
        }
      };

      var myHeader =  new Headers({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key':'021b131d06a6429f990f0f492cf71d81'
      });

      var initObject = {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: myHeader
    }

      var request = new Request('https://westus.api.cognitive.microsoft.com/text/analytics', myHeader, initObject);

      fetch(request).then(function(response){
        if(response.ok){
          console.log(response.json())
            return response.json();
        }
        else{
            return Promise.reject(new Error(response.statusText));
        }
      });
    };

    document.getElementById('analyzeButton').addEventListener('click', analyze);
  }
}
