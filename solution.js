

function Photo(conf, i) {
    this.id = i;
    this.pos = conf[0];
    this.tags = conf.slice(2);
    this.tagsSet = new Set(this.tags);
    this.tagsLen = this.tags.length;
    this.max = 0;
    this.next = null;
}

var fs = require('fs');

var stdinBuffer = fs.readFileSync(0); // STDIN_FILENO = 0
var [ N, ...lines ] = stdinBuffer.toString().split('\r\n');

lines.pop();

var fotos = lines.map((l, idx) => new Photo(l.split(' '), idx));

var fotoSeq = [], fotoSeqSet = new Set();

fotoSeqSet.add(fotos[0]);

fotos.forEach((f1) => {
    if (fotoSeqSet.has(f1)) return;

    fotos.forEach((f2) => {
        let Sij = 0;

        if (fotoSeqSet.has(f2)) return;

        f1.tags.forEach((t1) => {
            if (f2.tagsSet.has(t1)) {
                Sij++;
            }
        });

        let min = Math.min(f1.tagsLen - Sij, Sij, f1.tagsLen - Sij);

        if (f1.max <= min) {
            f1.max = min;
            f1.next = f2;
        }
    });

    fotoSeqSet.add(f1.next);
});

let f = fotos[0];

while (true) {
    console.log(f.id);
    if (f.next == null) {
        break;
    }
    else {
        f = f.next;
    }
}

//console.log(fotos);
