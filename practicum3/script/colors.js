function Colors()
{
	this.country_clear = function(){return "fill:rgb(40,40,40);stroke:rgb(0,0,0)"};
	this.country_hover = function(){return "fill:rgb(256,256,256);stroke:rgb(0,0,0)"};
	this.country_selected1 = function(){return "fill:rgb(256,0,0);stroke:rgb(0,0,0)"};
	this.country_selected2 = function(){return "fill:rgb(256,0,256);stroke:rgb(0,0,0)"};
	this.country_selected3 = function(){return "fill:rgb(256,256,0);stroke:rgb(0,0,0)"};

	this.gradient = function(red,green,blue,min,max,data)
	{
			var constant = (data-min)/(max-min);
			var grad = 40;
			var inv  = 256-grad;
			var diff = inv*constant;
			r = grad+Math.round(diff*red);
			g = grad+Math.round(diff*green);
			b = grad+Math.round(diff*blue);	
			base = "fill:rgb("+grad+","+grad+","+grad+");stroke:rgb(0,0,0)";
			color = "fill:rgb("+r+","+g+","+b+");stroke:rgb(0,0,0)";
		    return (!isNaN(data)) ? color : base;
	}

}