var pg_grayBlue = ["#CCCCCC","#C1C1CF","#B7B7D1","#ACACD4","#A1A1D7","#9696D9","#8C8CDC","#8181DF","#7676E1","#6B6BE4","#6161E7","#5656EA","#4B4BEC","#4040EF","#3636F2","#2B2BF4","#2020F7","#1515FA","#0B0BFC","#0000FF"];
var pg_myRanges = [0,0.25,0.5,0.75,1.0,1.25,1.5,1.75,2.0,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7.,100];
var pg_geneName;
var xvals;
var yvals;
var midx = new Array();
var my_vln_styles_hexes ={all_cells: [{target: "Im", value: {line: {color: "#cdcd00"}}},{target: "NN_0", value: {line: {color: "#ff0000"}}},{target: "NN_1", value: {line: {color: "#87ceeb"}}},{target: "NN_2", value: {line: {color: "#00cdcd"}}},{target: "NN_3", value: {line: {color: "#ee82ee"}}},{target: "NN_4", value: {line: {color: "#a020f0"}}},{target: "NN_5", value: {line: {color: "#cccccc"}}},{target: "NN_6", value: {line: {color: "#ffa500"}}},{target: "NN_7", value: {line: {color: "#006400"}}},{target: "OPCOD_1", value: {line: {color: "#ffc0cb"}}},{target: "OPCOD_2", value: {line: {color: "#ffd700"}}},{target: "PC_0", value: {line: {color: "#98f5ff"}}},{target: "PC_1", value: {line: {color: "#00ff00"}}},{target: "PC_2", value: {line: {color: "#bdb76b"}}},{target: "PC_3", value: {line: {color: "#d2691e"}}},{target: "PC_4", value: {line: {color: "#8b0000"}}},{target: "PC_5", value: {line: {color: "#7fffd4"}}},{target: "PC_6", value: {line: {color: "#528b8b"}}},{target: "PC_7", value: {line: {color: "#0000ff"}}},{target: "PC_8", value: {line: {color: "#00ffff"}}}],glia_cells: [{target: "PC_0", value: {line: {color: "#98f5ff"}}},{target: "PC_1", value: {line: {color: "#00ff00"}}},{target: "PC_2", value: {line: {color: "#bdb76b"}}},{target: "PC_3", value: {line: {color: "#d2691e"}}},{target: "PC_4", value: {line: {color: "#8b0000"}}},{target: "PC_5", value: {line: {color: "#7fffd4"}}},{target: "PC_6", value: {line: {color: "#528b8b"}}},{target: "PC_7", value: {line: {color: "#0000ff"}}},{target: "PC_8", value: {line: {color: "#00ffff"}}}],neuron_cells: [{target: "NN_0", value: {line: {color: "#ff0000"}}},{target: "NN_1", value: {line: {color: "#87ceeb"}}},{target: "NN_2", value: {line: {color: "#00cdcd"}}},{target: "NN_3", value: {line: {color: "#ee82ee"}}},{target: "NN_4", value: {line: {color: "#a020f0"}}},{target: "NN_5", value: {line: {color: "#cccccc"}}},{target: "NN_6", value: {line: {color: "#ffa500"}}},{target: "NN_7", value: {line: {color: "#006400"}}}]}
function getTheColor(theValue){
	let myIndex = 0;
	let myValue = parseInt(theValue);
		for(let i = 1; i < pg_myRanges.length-1; i++){
			if(myValue <= pg_myRanges[i]){
				myIndex = i;
				break;
			}
		}
	return pg_grayBlue[myIndex];
};
function getColors(theValues){
	var new_colors = [];
	for(var i = 1; i < theValues.length;i++){
		new_colors.push(getTheColor(theValues[i]));
	}
	return new_colors;
};
function processFormData(e){
	var pg_geneName = document.getElementById('gene_id').value;
	var pg_theFile = e.elements[0].value;
	
	pg_the_tag = pg_theFile + "_cells";
	
	let pg_my_inputs = rf_inputData[pg_the_tag];
	let pg_my_ftr = pg_my_inputs["my_ftr"];
	let pg_my_tsne = pg_my_inputs["my_tsne"];
	let pg_my_gene_names = pg_my_inputs["my_gene_names"];
	
	pg_indx = pg_my_gene_names.indexOf(pg_geneName);
	if(pg_indx == -1){
		alert("Could not find the gene!");
	}else{
		pg_my_values = pg_my_ftr[pg_indx].split("\t");
		
		var pg_my_colors = getColors(pg_my_values);
		var pg_tsne = {x: pg_my_tsne["tsne_1"],
				y: pg_my_tsne["tsne_2"],
				mode: 'markers',
				marker: {color:  pg_my_tsne["cell_colors"],size: 7},
				text:pg_my_tsne["cell_names"]
			};
		var pg_FtrVln = {x: pg_my_tsne["tsne_1"],
				y: pg_my_tsne["tsne_2"],
				mode: 'markers',
				marker: {color:  pg_my_colors,size: 7},
				text:pg_my_tsne["cell_names"]
				};
		var pg_tsne_layout = {title: "cell types",
				xaxis: {title: 'TSNE_1',showline: false,showgrid: false,zeroline: false},
				yaxis: {title: 'TSNE_2',showline: false,showgrid: false,zeroline: false}};
		var pg_FtrVln_layout = {title: pg_geneName,	xaxis: {title: 'TSNE_1',showline: false,showgrid: false,zeroline: false},yaxis: {title: 'TSNE_2',showline: false,showgrid: false,zeroline: false}};
		var tsne_data = [pg_tsne];
		var FtrVln_data = [pg_FtrVln];
		Plotly.newPlot('myDiv1', [pg_FtrVln], pg_FtrVln_layout, {showSendToCloud: false});
		Plotly.newPlot('myDiv3', [pg_tsne], pg_tsne_layout, {showSendToCloud: false});
		
		// viloin plot template
		
		var pg_new_values = pg_my_values;
		pg_new_values.shift();
		
		// xvals = pg_my_tsne["cell_clusters"];
		// yvals = pg_new_values;
		// var my_array = [];
		// for(let ij = 0; ij < yvals.length;ij++){if(yvals[ij] != 0){my_array.push(ij);}};
		// var newx = [];
		// var newy = [];
		// for(let ik of my_array){
		// 	newx.push(xvals[ik]);
		// 	newy.push(yvals[ik]);
		// }
		// console.log(newx);
		// console.log(newy);
		
		var my_violin = [];
		var vln_layout = {};
		var my_violin =[
		{
			type:"violin",
			x:pg_my_tsne["cell_clusters"],
			y:pg_new_values,
			points:"all",
			pointpos:0,
			color:"black",
			width:0.75,
			marker:{color:"black",size:4},
			lines:{color:"black"},
			jitter:1,
			span:0,
			trace:{bandwith:0},
			transforms:[
			{
				type:"groupby",
				groups:pg_my_tsne["cell_clusters"],
				styles:my_vln_styles_hexes[pg_the_tag]
			}
			]
		}
		]
		
		var vln_layout = {title: pg_geneName,	xaxis:{showline: false,showgrid: false,zeroline: false,
			categoryorder: 'category ascending'}, yaxis: {showline: false,showgrid: false,zeroline:false,range:[0,10]},
			showlegend:true,legend:{traceorder:'normal',categoryorder:"ascending"}};

		Plotly.newPlot('myDiv2', my_violin, vln_layout, {showSendToCloud: false});
	}	
}


