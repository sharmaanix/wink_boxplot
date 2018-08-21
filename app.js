var boxplot = require("wink-statistics").stats.boxplot;
var raw_data={};
var sepal_length=[];
var sepal_width=[];
var petal_length=[];
var petal_width=[];
var width = 800;
var height = 500;
var padding = 100;




d3.csv("flower.csv").then(function(data)
{
	
	// data extraction as per the requirement of the client

	var number = +prompt("Press the number according to the require grpahical representation"+
						"\n Press 1 for  overall Boxplot "+
						"\n Press 2 for Setosa Boxplot"+
						"\n Press 3 for Versicolor Boxplot "+
						"\n Press 4 for Virginica Boxplot");

	switch(number)
	{
		case 1:
		 sepal_length = data.map(function(i)
		 {

		 	return +(i.sepal_length);
		 });
		 
		 sepal_width = data.map(function(i)
		 {

		 	return +(i.sepal_width);
		 });

		 petal_length = data.map(function(i)
		 {

		 	return +(i.petal_length);
		 });
		
		 petal_width = data.map(function(i)
		 {

		 	return +(i.petal_width);
		 });
		 raw_data = [sepal_length,sepal_width,petal_length,petal_width];
		 break;

		case 2:
		for (key in data)
		{
			if(data[key].species=="setosa")
			{
				sepal_length.push(data[key].sepal_length);
			}

			if(data[key].species=="setosa")
			{
				sepal_width.push(data[key].sepal_width);
			}

			if(data[key].species=="setosa")
			{
				petal_length.push(data[key].petal_length);
			}

			if(data[key].species=="setosa")
			{
				petal_width.push(data[key].petal_width);
			}
		}
		raw_data = [sepal_length,sepal_width,petal_length,petal_width];
		break;

		case 3:
		for (key in data)
		{
			if(data[key].species=="versicolor")
			{
				sepal_length.push(data[key].sepal_length);
			}

			if(data[key].species=="versicolor")
			{
				sepal_width.push(data[key].sepal_width);
			}

			if(data[key].species=="versicolor")
			{
				petal_length.push(data[key].petal_length);
			}

			if(data[key].species=="versicolor")
			{
				petal_width.push(data[key].petal_width);
			}
		}
		raw_data = [sepal_length,sepal_width,petal_length,petal_width];
		break;

		break;

		case 4 :
		for (key in data)
		{
			if(data[key].species=="virginica")
			{
				sepal_length.push(data[key].sepal_length);
			}

			if(data[key].species=="virginica")
			{
				sepal_width.push(data[key].sepal_width);
			}

			if(data[key].species=="virginica")
			{
				petal_length.push(data[key].petal_length);
			}

			if(data[key].species=="virginica")
			{
				petal_width.push(data[key].petal_width);
			}
		}
		raw_data = [sepal_length,sepal_width,petal_length,petal_width];
		
		break;

		default:
		alert("the number you are typing didnot matched as mentioned in the instruction.Please Try Again!!!");
		break;
	}
      
	//console.log(raw_data);

	//data processing to have a figure and plot;
	var box_plot=[];
	for (key in raw_data)
	 {
	 	var record ={};
	 	record["key"] = key;
	 	record["count"] = raw_data[key];
		var bxplt = boxplot(raw_data[key].sort());
		record["boxplot"] =  bxplt;		
		box_plot.push(record);
		
	}
	//console.log(box_plot);

	var svg = d3.select("body")
            	.append("svg")
            	.attr("width",width+padding)
            	.attr("height",height+padding);

  	var y_scale = d3.scaleLinear()
                	.domain([0,8])
					.range([height,0]);

	var bar = svg.selectAll("rect")
                  .data(box_plot)
                  .enter()
                  .append("rect")
                  .attr("y",function(d)
                  {	
                  	//console.log(d.boxplot.q3);
                    return  y_scale(d.boxplot.q3)+padding/2;
                  })
                  .attr("height",function(d)
                  {
                  	//console.log(d.boxplot.q1);
                    return  height-y_scale(d.boxplot.iqr);
                  })
                  .attr("width",padding/2)
                  .attr("transform",function(d,i)
                  {
                    var translate = [(i*padding)+padding,0];
                    return "translate("+translate+")";
                  })
				  .attr("fill","blue")
				  .attr("stroke", "black")
    			  .attr("stroke-width", 2);

    var median = svg.selectAll("line")
    				.data(box_plot)
    				.enter()
    				.append("line")
    				.attr("y1",function(d)
    				{	
    					//console.log(d.boxplot);
    					//console.log(d.boxplot.median);
    					return y_scale(d.boxplot.median)+padding/2;
    				})
    				.attr("y2",function(d)
    				{	
    					//console.log(d.boxplot);
    					//console.log(d.boxplot.median);
    					return y_scale(d.boxplot.median)+padding/2;
    				})
    				.attr("x1",function(d,i)
    				{
    					return (i*padding)+padding;
    				})
    				.attr("x2",function(d,i)
    				{
    					return (i+1.5)*padding;
    				})
    				.attr("stroke","black")
    				.attr("stroke-width",2);


    var lower_whisker = svg.selectAll("body")
    					   .append("line")
    					   .data(box_plot)
    					   .enter()
    					   .append("line")
    					   .attr("y1",function(d)
    					   {	
    							return y_scale(d.boxplot.min)+padding/2;
    						})
    					   .attr("y2",function(d)
    						{	
    							return y_scale(d.boxplot.min)+padding/2;
    						})
    					   .attr("x1",function(d,i)
    						{
    							return (i*padding)+padding;
    						})
    					   .attr("x2",function(d,i)
    						{
    							return (i+1.5)*padding;
    						})
    					   .attr("stroke","black")
    					   .attr("stroke-width",2);

    var upper_whisker = svg.selectAll("body")
    					   .append("line")
    					   .data(box_plot)
    					   .enter()
    					   .append("line")
    					   .attr("y1",function(d)
    					   {	
    							return y_scale(d.boxplot.max)+padding/2;
    						})
    					   .attr("y2",function(d)
    						{	
    							return y_scale(d.boxplot.max)+padding/2;
    						})
    					   .attr("x1",function(d,i)
    						{
    							return (i*padding)+padding;
    						})
    					   .attr("x2",function(d,i)
    						{
    							return (i+1.5)*padding;
    						})
    					   .attr("stroke","black")
    					   .attr("stroke-width",2);


    var upper_line = svg.selectAll("body")
    					   .append("line")
    					   .data(box_plot)
    					   .enter()
    					   .append("line")
    					   .attr("y1",function(d)
    					   {	
    							return y_scale(d.boxplot.max)+padding/2;
    						})
    					   .attr("y2",function(d)
    						{	
    							return y_scale(d.boxplot.q3)+padding/2;
    						})
    					   .attr("x1",function(d,i)
    						{
    							return (i+1.25)*padding;
    						})
    					   .attr("x2",function(d,i)
    						{
    							return (i+1.25)*padding;
    						})
    					   .attr("stroke","black")
    					   .attr("stroke-width",2);
	

	var lower_line = svg.selectAll("body")
    					   .append("line")
    					   .data(box_plot)
    					   .enter()
    					   .append("line")
    					   .attr("y1",function(d)
    					   {	
    							return y_scale(d.boxplot.q1)+padding/2;
    						})
    					   .attr("y2",function(d)
    						{	
    							return y_scale(d.boxplot.min)+padding/2;
    						})
    					   .attr("x1",function(d,i)
    						{
    							return (i+1.25)*padding;
    						})
    					   .attr("x2",function(d,i)
    						{
    							return (i+1.25)*padding;
    						})
    					   .attr("stroke","black")
    					   .attr("stroke-width",2);
					   
	var max_text = svg.selectAll("body")
					  .append("text")
              		  .data(box_plot)
              		  .enter()
              		  .append("text")
              		  .text(function(d)
              			{
                			return d.boxplot.max;
              			})
              			.attr("y",function(d)
              			{
                			return y_scale(d.boxplot.max)+padding/2.1;
              			})
              			.attr("x",function(d,i)
              			{
              				return (i+1)*padding;
              			})
              			.attr("fill","red");

	
	var min_text = svg.selectAll("body")
					  .append("text")
              		  .data(box_plot)
              		  .enter()
              		  .append("text")
              		  .text(function(d)
              			{
                			return d.boxplot.min;
              			})
              			.attr("y",function(d)
              			{
                			return y_scale(d.boxplot.min)+padding/2.1;
              			})
              			.attr("x",function(d,i)
              			{
              				return (i+1)*padding;
              			})
              			.attr("fill","red");
     
	var q1_text = svg.selectAll("body")
					  .append("text")
              		  .data(box_plot)
              		  .enter()
              		  .append("text")
              		  .text(function(d)
              			{
                			return d.boxplot.q1;
              			})
              			.attr("y",function(d)
              			{
                			return y_scale(d.boxplot.q1)+padding/2.1;
              			})
              			.attr("x",function(d,i)
              			{
              				return (i+1)*padding;
              			})
              			.attr("fill","white");

	var q3_text = svg.selectAll("body")
					  .append("text")
              		  .data(box_plot)
              		  .enter()
              		  .append("text")
              		  .text(function(d)
              			{
                			return d.boxplot.q3;
              			})
              			.attr("y",function(d)
              			{
                			return y_scale(d.boxplot.q3)+padding/2.1;
              			})
              			.attr("x",function(d,i)
              			{
              				return (i+1)*padding;
              			})
              			.attr("fill","white");

    var median_text = svg.selectAll("body")
					  .append("text")
              		  .data(box_plot)
              		  .enter()
              		  .append("text")
              		  .text(function(d)
              			{
                			return d.boxplot.median;
              			})
              			.attr("y",function(d)
              			{
                			return y_scale(d.boxplot.median)+padding/2.1;
              			})
              			.attr("x",function(d,i)
              			{
              				return (i+1)*padding;
              			})
              			.attr("fill","yellow");
    

    var labelling = ["sepal_len","sepal_wid","petal_len","petal_wid"];
    var label = svg.selectAll("body")
					  .append("text")
              		  .data(labelling)
              		  .enter()
              		  .append("text")
              		  .text(function(d)
              			{
                			return d;
              			})
              			.attr("y",function(d)
              			{
                			return height + padding/1.2;
              			})
              			.attr("x",function(d,i)
              			{
              				return (i+1)*padding;
              			})
              			.attr("stroke","green");
        

	var y_axis = d3.axisLeft().scale(y_scale);

  	svg.append("g")
   	   .attr("transform",function()
   	   	{
   	   		var translate = [padding/2,padding/2];
   	   		return "translate("+translate+")";
   	   	})	
       .call(y_axis);

});