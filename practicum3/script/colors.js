function Colors()
{

	var base_text_fill = "fill:rgb(256,256,256)";
	var base_text_stroke = "stroke:rgb(256,256,256)";
	var base_text_font = "font:10px sans-serif"

	var base_fill = "fill:rgb(40,40,40)";
	var base_stroke = "stroke:rgb(20,20,20)";

	var hover_fill = "fill:rgb(256,256,256)";
	var hover_stroke = base_stroke;

	var selection1_fill = "fill:rgb(256,0,0)";
	var selection1_stroke = "stroke:rgb(256,0,0)";
	var selection2_fill = "fill:rgb(256,0,256)";
	var selection2_stroke = "stroke:rgb(256,0,256)";
	var selection3_fill = "fill:rgb(256,256,0)";
	var selection3_stroke = "stroke:rgb(256,256,0)";

	var devider	= 0.5;
	var window_width = window.innerWidth;
	var window_height = window.innerHeight;

        // wtf is this shit? doe gewoon
        this.selectColor = function(n) {
            switch(n) {
                case 0: return "rgb(256, 0, 0)";
                case 1: return "rgb(256, 0, 256)";
                case 2: return "rgb(256, 256, 0)";
            }
        }
        this.base_stroke = base_stroke;

	this.map_dim = function(){return [window_width*devider,(window_width*devider)/2];};
	this.azimuth_dim = function(){return [window_width*(1-devider),(window_width*devider)/2];};

	this.country_clear = function(){return base_fill + ";" + base_stroke};
	this.country_hover = function(){return hover_fill+";"+hover_stroke};

	this.country_selected1 = function(){return selection1_fill+";"+base_stroke};
	this.country_selected2 = function(){return selection2_fill+";"+base_stroke};
	this.country_selected3 = function(){return selection3_fill+";"+base_stroke};

	this.country_selected1_bar = function(){return selection1_fill+";"+selection1_stroke};
	this.country_selected2_bar = function(){return selection2_fill+";"+selection2_stroke};
	this.country_selected3_bar = function(){return selection3_fill+";"+selection3_stroke};

	this.text = function(){return base_text_fill+";"+base_text_font};
	this.line = function(){return base_text_stroke};


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
