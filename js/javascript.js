let data = {
   "instances": [{
      "content": ""
   }],
   "parameters": {
      "confidenceThreshold": 0.5,
      "maxPredictions": 5
   }
};

let base64File = "";

let apiURL = "https://automl-proxy-xfpm6c62ta-uc.a.run.app";

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

fetch('https://example.com/profile', {
   method: 'POST',
   headers: {
      'Content-Type': 'application/json',
   },
   body: JSON.stringify(data),
})
  .then((response) => response.json())
  .then((data) => {
      console.log('Success:', data);
  })
  .catch((error) => {
      console.error('Error:', error);
  });

