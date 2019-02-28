

function Photo(conf, i) {
    this.id = i;
    this.pos = conf[0];
    this.tags = conf.slice(2);
    this.tagsSet = new Set(this.tags);
    this.tagsLen = this.tags.length;
    this.max = 0;
    this.next = null;
}

Photo.prototype.joinV = function(f) {
    this.id = this.id + " " + f.id;
    let me = this;

    f.tags.forEach((t) => {
        if (!me.tagsSet.has(t)) {
            me.tagsSet.add(t);
            me.tags.push(t);
        }
    });
}

var fs = require('fs');

//var stdinBuffer = fs.readFileSync(0); // STDIN_FILENO = 0

var stdinBuffer = fs.readFileSync('c_memorable_moments.txt');

var [ N, ...lines ] = stdinBuffer.toString().split('\n');

lines.pop();

var fotos = [];
lines.forEach((l, idx) => {
    let p = new Photo(l.split(' '), idx);

    if (p.pos == 'V') {
        if (lastV) {
            p.joinV(lastV);
            lastV = null;

            fotos.push(p);
            
        } else {
            lastV = p;
        }

        return;
    }

    fotos.push(p);
});

var fotoSeq = [], fotoSeqSet = new Set();

var lastV = null;

let f1 = fotos[0];
fotoSeqSet.add(fotos[0]);

while (true) {
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

    if (f1.next == null) {
        break;
    }

    f1 = f1.next;
    fotoSeqSet.add(f1);
}

let f = fotos[0];

console.log(fotos.length);

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
