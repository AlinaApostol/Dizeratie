var app = angular.module("appMapping", []); 

app.controller("myCtrl", function($scope, $http) {
    $scope.uploadXmlFile = function(){
        var file = document.getElementById('importFile').files[0];
        $scope.contentXML = "";
        reader = new FileReader();
        reader.onload = function(e){
            $scope.data = e.target.result;
            $scope.contentXML += $scope.data;
            var preview = document.querySelector('#contCCDA');

            while(preview.firstChild) {
                preview.removeChild(preview.firstChild);
            }
            var textc = document.createElement('textarea');
            textc.textContent = $scope.contentXML;
            preview.appendChild(textc);
            $('#contCCDA textarea').addClass('contentInfo');
            document.getElementById("convert").style.display = "inline";
        };
        reader.readAsBinaryString(file);
    };

    $scope.convertXmlFile = function(){
        var file = document.getElementById('importFile').files[0];

        $http({
            method: 'POST',
            url: 'http://127.0.0.1:7202/api/document',
            data: file,
            async: true,
            crossDomain: true,
            processData: false,
            contentType: false,
            mimeType: "multipart/form-data",
            headers: { "Cache-Control": "no-cache" }
        }).then( function(response) {
                var preview = document.querySelector('#contJSON');
                while(preview.firstChild) {
                    preview.removeChild(preview.firstChild);
                }
                var textc = document.createElement('textarea');
                textc.textContent = JSON.stringify(response.data.entry, undefined, 2);
                preview.appendChild(textc);
                $('#contJSON textarea').addClass('contentInfo');
                document.getElementById("saveToPdf").style.display = "inline";
                document.getElementById("saveToJson").style.display = "inline";
            }, function(response) {
                // fail
            });              
    };
});

