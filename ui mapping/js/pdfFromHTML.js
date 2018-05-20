function HTMLtoPDF(){
var pdf = new jsPDF('p', 'pt', 'letter');
source = $('#contJSON textarea')[0];
specialElementHandlers = {
	'#bypassme': function(element, renderer){
		return true
	}
}
margins = {
    top: 50,
    left: 60,
    width: 545
  };
pdf.fromHTML(
  	source // HTML string or DOM elem ref.
  	, margins.left // x coord
  	, margins.top // y coord
  	, {
  		'width': margins.width // max width of content on PDF
  		, 'elementHandlers': specialElementHandlers
  	},
  	function (dispose) {
  	  // dispose: object with X, Y of the last line add to the PDF
  	  //          this allow the insertion of new lines after html
        pdf.save('FhirBundle.pdf');
      }
  )		
}

function HTMLtoJSON() {
	source = $('#contJSON textarea')[0];
	var a = document.createElement("a");
	var file = new Blob([source.defaultValue], {type: 'text/plain'});
	a.href = URL.createObjectURL(file);
	a.download = 'FhirBundle.json';
	a.click();
}