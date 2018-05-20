var app = angular.module("appMapping", []); 

app.controller("myCtrl", function($scope, $http) {
    $scope.uploadXmlFile = function(){
        var file = document.getElementById('importFile').files[0];
        reader = new FileReader();
        reader.onloadend = function(e){
            $scope.data = e.target.result;
            $scope.contentXML = $scope.data;
            var preview = document.querySelector('#contCCDA');

            while(preview.firstChild) {
                preview.removeChild(preview.firstChild);
            }
            var textc = document.createElement('textarea');
            textc.textContent = $scope.data;
            preview.appendChild(textc);
            $('#contCCDA textarea').addClass('contentInfo');
            
            // var postQuery = {
            //     method: 'POST',
            //     url: 'http://127:0:0.1:7202/api/document',
            //     data: $scope.contentXML,
            //     headers: { "Content-Type": 'text/plain' }
            // };

            $http({
                method: 'POST',
                url: 'http://127.0.0.1:7202/api/document',
                data: $scope.contentXML,
                headers: { "Content-Type": 'application/xml' }
            }).then( function(response) {
                    var preview = document.querySelector('#contJSON');
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
        reader.readAsBinaryString(file);
    };
});

