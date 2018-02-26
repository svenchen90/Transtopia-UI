var googleColorRandomPicker = function(){
	var color_list = ['rgb(55, 141, 59)', 'rgb(65, 65, 65)', 'rgb(29, 135, 228)', 'rgb(119, 143, 155)', 'rgb(91, 106, 191)', 'rgb(125, 86, 193)', 'rgb(248, 167, 36)', 
		'rgb(255, 111, 66)', 'rgb(235, 63, 121)', 'rgb(229, 57, 53)', 'rgb(140, 109, 98)'];
	var random = Math.floor(Math.random() * (color_list.length));
	//console.log(color_list[random]);
	return color_list[random];
};