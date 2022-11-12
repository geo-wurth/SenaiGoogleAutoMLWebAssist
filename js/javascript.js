let data = {
   "instances": [{
      "content": ""
   }],
   "parameters": {
      "confidenceThreshold": 0.5,
      "maxPredictions": 5
   }
};

let responseAPI = "";

let base64File = "";

let apiURL = "https://automl-proxy-mhs3osypeq-uc.a.run.app";

document.getElementById('convertToBase64Button').addEventListener('click', function() {
   var files = document.getElementById('formFile').files;

   if (files.length > 0) {
      getBase64(files[0]);
   }

   function getBase64(file) {
      var reader = new FileReader();
   
      reader.readAsDataURL(file);
   
      reader.onload = function () {
         base64File = reader.result;
         base64File = base64File.split(',')[1];

         document.getElementById('formFile').disabled = true;
         let button = document.getElementById('convertToBase64Button');
         button.disabled = true
         button.classList.remove("btn-outline-primary");
         button.classList.add("btn-secondary");

         let fileString = document.getElementById('base64Code');
         
         fileString.value = base64File;
         fileString.disabled = true;
      };
   
      reader.onerror = function (error) {
         alert('Error: ', error);
         console.log("Fail");
         conversionStatus = false;
      };
   }
});

document.getElementById('loadAPIButton').addEventListener('click', function() {
   let apiLinkInput = document.getElementById('apiLink');
   apiLink = apiLinkInput.value;
   apiLinkInput.disabled = true;

   let button = document.getElementById('loadAPIButton');
   button.disabled = true
   button.classList.remove("btn-outline-primary");
   button.classList.add("btn-secondary");
});

document.getElementById('sendToAPIButton').addEventListener('click', function() {
   var myHeaders = new Headers();
   myHeaders.append("Content-Type", "application/json");
   myHeaders.append('Access-Control-Allow-Headers', 'Content-Type, Authorization');

   var raw = JSON.stringify({
      "instances": [
        {
          "content": base64File
        }
      ],
      "parameters": {
        "confidenceThreshold": 0.5,
        "maxPredictions": 5
      }
   });

   var requestOptions = {
      // mode: "no-cors",
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
   };

   fetch(apiURL + "/v1", requestOptions)
   .then(response => {
      const promise = Promise.resolve(response.result);

      promise.then((value) => {
      alert("This is a " + value.predictions[0].displayNames[0]);
      });   
   })
   .then(data => console.log(data))
   .catch(error => console.log('error', error));
});

