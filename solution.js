

var fs = require('fs');

var stdinBuffer = fs.readFileSync(0); // STDIN_FILENO = 0
var [ N, ...lines ] = stdinBuffer.toString().split('\r\n');

//console.log(N + ".....");
//console.log(lines);

lines.pop();

var p = lines.map((l) => l.split(''));

var sol = `3
0 0 2 1
0 2 2 2
0 3 2 4`;

console.log(sol);
