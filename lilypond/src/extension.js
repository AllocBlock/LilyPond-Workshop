const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const cp = require('child_process');

exports.activate = function(context) {
	// register commands
	context.subscriptions.push(vscode.commands.registerCommand('extension.lilypond.compile', compileManual));
	
	// register events
	vscode.workspace.onDidSaveTextDocument(compileAuto);
};

function compileAuto(){
	if (vscode.workspace.getConfiguration('lilypond').get('compileOnSave'))
		compile(true);
}

function compileManual(){
	compile(false);
}

function compile(auto){
	// check compiler path
	let compilerPath = vscode.workspace.getConfiguration('lilypond').get('compilerPath');
	if (!fs.existsSync(compilerPath)){
		vscode.window.showErrorMessage(`LilyPond compiler not found! Please set compiler path in setting.\n(${compilerPath})`);
		return;
	}

	// check file format and path
	if (!auto){
		if (!vscode.window.activeTextEditor){
			vscode.window.showErrorMessage(`No input file is set.`);
			return;
		}
	}
	let filePath = vscode.window.activeTextEditor.document.fileName;
	let fileFolder = path.dirname(filePath);
	let fileExt = path.extname(filePath);
	if (!auto){
		if (fileExt != ".ly" && fileExt != ".ily"){
			vscode.window.showErrorMessage(`Incorrect file extension. Require .ly or .ily but found (.${fileExt})`);
			return;
		}
	}
	if (!fs.existsSync(filePath)){
		vscode.window.showErrorMessage(`File not found. (${filePath})`);
		return;
	}

	// compile
	cp.exec(
		`"${compilerPath}" "${filePath}"`, 
		{
			cwd: fileFolder,
			timeout: 5000,
		},
		(err, stdout, stderr) => {
			if (err)
				vscode.window.showErrorMessage(stderr);
			else if (!auto)
				vscode.window.showInformationMessage('Compiled successfully');
		}
	);
}