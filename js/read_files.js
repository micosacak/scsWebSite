var rawFile = new XMLHttpRequest();
var rf_inputData;
var rf_allText = undefined;
var rf_my_tsne = {cell_names:[],tsne_1:[],tsne_2:[],cell_colors:[],cell_clusters:[]};
var rf_my_ftr = [];
var rf_my_gene_names = [];
function getTheFileInput(theFile){
	rawFile.open("GET", theFile, false);
	rawFile.onreadystatechange = function (){
		if(rawFile.readyState === 4){
			if(rawFile.status === 200 || rawFile.status == 0){
				rf_allText = rawFile.responseText;
				rf_allText = rf_allText.split("\r\n")
			}
		}
	}
	rawFile.send(null);
}
function GetTsneMatrix(){
	for(let i = 1; i < rf_allText.length; i++){
		let my_slt = rf_allText[i].split("\t");
		rf_my_tsne["cell_names"].push(my_slt[0]);
		rf_my_tsne["tsne_1"].push(my_slt[1]);
		rf_my_tsne["tsne_2"].push(my_slt[2]);
		rf_my_tsne["cell_colors"].push(my_slt[3]);
		rf_my_tsne["cell_clusters"].push(my_slt[4]);
		
	}
}
function getFtrVlnMatrix(){
	for(var i=1; i < rf_allText.length;i++){
		var my_splt = rf_allText[i].split("\t");
		rf_my_gene_names.push(my_splt[0]);
		rf_my_ftr.push(rf_allText[i]);
	}
};
function read_files(){
	let rf_my_files = {
		all_cells : {},
		glia_cells : {},
		neuron_cells : {}
	};
	for(let theFile of ["all","glia","neuron"]){
		let theFile_colors = theFile+".tsne.matrix.colornames.tab";
		let theFile_FtrVln = theFile+".data.for.FtrVln.tab";
		rf_allText = undefined;
		getTheFileInput(theFile_colors);
		GetTsneMatrix(rf_allText);
		getTheFileInput(theFile_FtrVln);
		getFtrVlnMatrix();
		tag = theFile+"_cells";
		rf_my_files[tag] = {
			my_ftr:rf_my_ftr,
			my_tsne:rf_my_tsne,
			my_gene_names:rf_my_gene_names
		};
		rf_my_ftr = [];
		rf_my_tsne = {cell_names:[],tsne_1:[],tsne_2:[],cell_colors:[],cell_clusters:[]};
		rf_my_gene_names = [];
	}
	rf_allText = undefined;
	return rf_my_files;
}
var rf_inputData = read_files();