function heatmap_score() {

	d3.csv("https://virtuositeit.github.io/reviews_visualization/reviews_sort_time.csv", function(error, data){
		if (error) throw error;

	    data.forEach(function(d) {
	    	d.Time = +d.Time;
	    	d.Score = +d.Score;
	    	d.WordsInText = +d.WordsInText;
	    	d.WordsInSummary = +d.WordsInSummary;
	    	d.HelpfulnessScore = +d.HelpfulnessScore;
	    	d.TotalNumberOfVotes = +d.TotalNumberOfVotes;
	    });

	    console.log(data);

	    var colorDomain = d3.extent(data, function(d){
	    	return d.HelpfulnessScore;
	    });

	    var totalNumberOfVotesDomain = d3.extent(data, function(d){
	    	return d.TotalNumberOfVotes;
	    });

		Array.range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);
	    var votesRange = Array.range(totalNumberOfVotesDomain[0], totalNumberOfVotesDomain[1])
	    var HelpfulnessRange = Array.range(colorDomain[0], colorDomain[1])    

	    var colorScale = d3.scaleLinear()
	    	.domain(colorDomain)
	    	.range(["#FFFF00", "#FF0000"]);
	    	// .range(["#FFFFFF", "#00ABFF"]);

	    var yScale = d3.scaleQuantile()
	    	.domain(votesRange)
	    	.range(Array.range(0, 59));

	    var svg = d3.select(".heatmap")
	    	.append("svg")
	    	// .attr("width", 1200)
	    	// .attr("height", 600);
	    	.attr("width", 1000)
	    	.attr("height", 450)

	    var rectangles = svg.selectAll("rect")
	    	.data(data)
	      	.enter()
	      	.append("rect")
	      	.transition() // <------- TRANSITION STARTS HERE --------
	 		.delay(function(d,i){ return 0.06 * i; }) 
	 		.duration(0.01);


	 	// ----------------------------------------------------------
	 	// x-axis legends

	 	svg.append("text")
			.attr("class", "label")
			.attr("x", 12)
			.attr("y", 410)
			.attr("dy", ".35em")
			.style('fill', 'grey')
			.attr("font-family", "Helvetica Neue")
      		.text("Review");

      	svg.append("text")
			.attr("class", "label")
			.attr("x", 12)
			.attr("y", 430)
			.attr("dy", ".35em")
			.style('fill', 'grey')
			.attr("font-family", "Helvetica Neue")
      		.text("Score");

	 	svg.append("text")
			.attr("class", "label")
			.attr("x", 135)
			.attr("y", 425)
			.attr("dy", ".35em")
			.style('fill', 'grey')
			.attr("font-family", "Helvetica Neue")
      		.text("1 Star");

      	svg.append("text")
			.attr("class", "label")
			.attr("x", 293)
			.attr("y", 425)
			.attr("dy", ".35em")
			.style('fill', 'grey')
			.attr("font-family", "Helvetica Neue")
      		.text("2 Stars");

      	svg.append("text")
			.attr("class", "label")
			.attr("x", 453)
			.attr("y", 425)
			.attr("dy", ".35em")
			.style('fill', 'grey')
			.attr("font-family", "Helvetica Neue")
      		.text("3 Stars");

      	svg.append("text")
			.attr("class", "label")
			.attr("x", 613)
			.attr("y", 425)
			.attr("dy", ".35em")
			.style('fill', 'grey')
			.attr("font-family", "Helvetica Neue")
      		.text("4 Stars");

      	svg.append("text")
			.attr("class", "label")
			.attr("x", 773)
			.attr("y", 425)
			.attr("dy", ".35em")
			.style('fill', 'grey')
			.attr("font-family", "Helvetica Neue")
      		.text("5 Stars");

	 	// ----------------------------------------------------------
	 	// Legend 
	 	svg.append("text")
			.attr("class", "label")
			.attr("x", 890)
			.attr("y", 140)
			.attr("dy", ".35em")
			.style('fill', 'grey')
			.attr("font-family", "Helvetica Neue", "sans-serif")
      		.text("Helpfulness");

		var legend = svg.selectAll(".legend")
			.data(["Hi", "", "", "", "Lo"])//hard coding the labels as the datset may have or may not have but legend should be complete.
			.enter().append("g")
			.attr("class", "legend")
			.attr("transform", function(d, i) { return "translate(0," + i * 17 + ")"; });
		
		var legendRange = [100, 75, 50, 25, 0]

		// draw legend colored rectangles
		legend.append("rect")
			.attr("x", 930)
			.attr("y", 170)
			.attr("width", 15)
			.attr("height", 15)
			.style("fill", function(d, i){return colorScale( legendRange[i] )});

		// draw legend text
		legend.append("text")
			.attr("x", 920)
			.attr("y", 180)
			.attr("dy", ".2em")
			.style("text-anchor", "end")
			.style('fill', 'grey')
			.attr("font-family", "Helvetica Neue", "sans-serif")
			.text(function(d) { return d;});

		// ----------------------------------------------------------

	    rectangles
	    .attr("x", function(d){
	      	// return (d.Time - 1999) * 110 + ( Math.floor( Math.random() * (9 - 0 + 1) ) + 0 ) * 10; 
	      	// return (d.Score - 1) * 240 + ( Math.floor( Math.random() * (18 - 0 + 1) ) + 0 ) * 12; 
	      	return 85 + (d.Score - 1) * 160 + ( Math.floor( Math.random() * (14 - 0 + 1) ) + 0 ) * 10; 
	    })
	    .attr("y", function(d){
	    	// console.log(d.TotalNumberOfVotes, yRange(d.TotalNumberOfVotes), yRange(d.TotalNumberOfVotes) * 10)
	    	// return yScale(d.TotalNumberOfVotes) * 10;
	    	// return ( Math.floor( Math.random() * (59 - 0 + 1) ) + 0 ) * 10; 
	    	// return ( Math.floor( Math.random() * (49 - 0 + 1) ) + 0 ) * 12; 
	    	return ( Math.floor( Math.random() * (39 - 0 + 1) ) + 0 ) * 10; 
	    })
	    .attr("width", 8)
	    .attr("height", 8)
	    .style("fill", function(d){
	    	return colorScale(d.HelpfulnessScore); 
	    });    
	});
};


function heatmap_time() {

	d3.csv("https://virtuositeit.github.io/reviews_visualization/reviews_sort_time.csv", function(error, data){
		if (error) throw error;

	    data.forEach(function(d) {
	    	d.Time = +d.Time;
	    	d.Score = +d.Score;
	    	d.WordsInText = +d.WordsInText;
	    	d.WordsInSummary = +d.WordsInSummary;
	    	d.HelpfulnessScore = +d.HelpfulnessScore;
	    	d.TotalNumberOfVotes = +d.TotalNumberOfVotes;
	    });

	    console.log(data);

	    var colorDomain = d3.extent(data, function(d){
	    	return d.HelpfulnessScore;
	    });

	    var totalNumberOfVotesDomain = d3.extent(data, function(d){
	    	return d.TotalNumberOfVotes;
	    });

		Array.range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);
	    var votesRange = Array.range(totalNumberOfVotesDomain[0], totalNumberOfVotesDomain[1])
	    var HelpfulnessRange = Array.range(colorDomain[0], colorDomain[1])    

	    var colorScale = d3.scaleLinear()
	    	.domain(colorDomain)
	    	.range(["#FFFF00", "#FF0000"]);
	    	// .range(["#FFFFFF", "#00ABFF"]);

	    var yScale = d3.scaleQuantile()
	    	.domain(votesRange)
	    	.range(Array.range(0, 59));

	    var svg = d3.select(".heatmap")
	    	.append("svg")
	    	// .attr("width", 1200)
	    	// .attr("height", 600);
	    	.attr("width", 1000)
	    	.attr("height", 450)

	    var rectangles = svg.selectAll("rect")
	    	.data(data)
	      	.enter()
	      	.append("rect")
	      	.transition() // <------- TRANSITION STARTS HERE --------
	 		.delay(function(d,i){ return 0.1 * i; }) 
	 		.duration(0.01);


	 	// ----------------------------------------------------------
	 	// x-axis legends

	 	svg.append("text")
			.attr("class", "label")
			.attr("x", 20)
			.attr("y", 425)
			.attr("dy", ".35em")
			.style('fill', 'grey')
			.attr("font-family", "Helvetica Neue")
      		.text("Year");

	 	svg.append("text")
			.attr("class", "label")
			.attr("x", 104)
			.attr("y", 425)
			.attr("dy", ".35em")
			.style('fill', 'grey')
			.attr("font-family", "Helvetica Neue")
      		.text("1999");

      	svg.append("text")
			.attr("class", "label")
			.attr("x", 174)
			.attr("y", 425)
			.attr("dy", ".35em")
			.style('fill', 'grey')
			.attr("font-family", "Helvetica Neue")
      		.text("2000");

      	svg.append("text")
			.attr("class", "label")
			.attr("x", 244)
			.attr("y", 425)
			.attr("dy", ".35em")
			.style('fill', 'grey')
			.attr("font-family", "Helvetica Neue")
      		.text("2001");

      	svg.append("text")
			.attr("class", "label")
			.attr("x", 314)
			.attr("y", 425)
			.attr("dy", ".35em")
			.style('fill', 'grey')
			.attr("font-family", "Helvetica Neue")
      		.text("2002");

      	svg.append("text")
			.attr("class", "label")
			.attr("x", 384)
			.attr("y", 425)
			.attr("dy", ".35em")
			.style('fill', 'grey')
			.attr("font-family", "Helvetica Neue")
      		.text("2003");

      	svg.append("text")
			.attr("class", "label")
			.attr("x", 454)
			.attr("y", 425)
			.attr("dy", ".35em")
			.style('fill', 'grey')
			.attr("font-family", "Helvetica Neue")
      		.text("2004");

      	svg.append("text")
			.attr("class", "label")
			.attr("x", 524)
			.attr("y", 425)
			.attr("dy", ".35em")
			.style('fill', 'grey')
			.attr("font-family", "Helvetica Neue")
      		.text("2005");

      	svg.append("text")
			.attr("class", "label")
			.attr("x", 594)
			.attr("y", 425)
			.attr("dy", ".35em")
			.style('fill', 'grey')
			.attr("font-family", "Helvetica Neue")
      		.text("2006");

      	svg.append("text")
			.attr("class", "label")
			.attr("x", 664)
			.attr("y", 425)
			.attr("dy", ".35em")
			.style('fill', 'grey')
			.attr("font-family", "Helvetica Neue")
      		.text("2007");

      	svg.append("text")
			.attr("class", "label")
			.attr("x", 734)
			.attr("y", 425)
			.attr("dy", ".35em")
			.style('fill', 'grey')
			.attr("font-family", "Helvetica Neue")
      		.text("2008");

      	svg.append("text")
			.attr("class", "label")
			.attr("x", 804)
			.attr("y", 425)
			.attr("dy", ".35em")
			.style('fill', 'grey')
			.attr("font-family", "Helvetica Neue")
      		.text("2009");

	 	// ----------------------------------------------------------
	 	// Legend 
	 	svg.append("text")
			.attr("class", "label")
			.attr("x", 880)
			.attr("y", 140)
			.attr("dy", ".35em")
			.style('fill', 'grey')
			.attr("font-family", "Helvetica Neue", "sans-serif")
      		.text("Helpfulness");

		var legend = svg.selectAll(".legend")
			.data(["Hi", "", "", "", "Lo"])//hard coding the labels as the datset may have or may not have but legend should be complete.
			.enter().append("g")
			.attr("class", "legend")
			.attr("transform", function(d, i) { return "translate(0," + i * 17 + ")"; });
		
		var legendRange = [100, 75, 50, 25, 0]

		// draw legend colored rectangles
		legend.append("rect")
			.attr("x", 920)
			.attr("y", 170)
			.attr("width", 15)
			.attr("height", 15)
			.style("fill", function(d, i){return colorScale( legendRange[i] )});

		// draw legend text
		legend.append("text")
			.attr("x", 910)
			.attr("y", 180)
			.attr("dy", ".2em")
			.style("text-anchor", "end")
			.style('fill', 'grey')
			.attr("font-family", "Helvetica Neue", "sans-serif")
			.text(function(d) { return d;});

		// ----------------------------------------------------------

	    rectangles
	    .attr("x", function(d){
	      	// return (d.Time - 1999) * 110 + ( Math.floor( Math.random() * (9 - 0 + 1) ) + 0 ) * 10; 
	      	// return (d.Score - 1) * 240 + ( Math.floor( Math.random() * (18 - 0 + 1) ) + 0 ) * 12; 
	      	return 93 + (d.Time - 1999) * 70 + ( Math.floor( Math.random() * (5 - 0 + 1) ) + 0 ) * 10; 
	    })
	    .attr("y", function(d){
	    	// console.log(d.TotalNumberOfVotes, yRange(d.TotalNumberOfVotes), yRange(d.TotalNumberOfVotes) * 10)
	    	// return yScale(d.TotalNumberOfVotes) * 10;
	    	// return ( Math.floor( Math.random() * (59 - 0 + 1) ) + 0 ) * 10; 
	    	// return ( Math.floor( Math.random() * (49 - 0 + 1) ) + 0 ) * 12; 
	    	return ( Math.floor( Math.random() * (39 - 0 + 1) ) + 0 ) * 10; 
	    })
	    .attr("width", 8)
	    .attr("height", 8)
	    .style("fill", function(d){
	    	return colorScale(d.HelpfulnessScore); 
	    });    
	});
};

document.getElementById("score_button").focus();
heatmap_score();

document.getElementById("time_button").addEventListener("click", function() {
	d3.selectAll("svg").remove();
	heatmap_time();
});

document.getElementById("score_button").addEventListener("click", function() {
	d3.selectAll("svg").remove();
	heatmap_score();
});


