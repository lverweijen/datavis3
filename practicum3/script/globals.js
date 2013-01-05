var year = 1960;
function updateSlider(value)
{
	var yearDisp = $('#yearDisp');
	year = value;
	console.log(year);
	yearDisp.html(""+ year);
}
updateSlider(1960);