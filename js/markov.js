var chain_size = 1;

function generate() {
    var ngram = ['START'];
    var output = [];
    var word = '';

    while (true) {
        for (var i = 0; i <= ngram.length; ++i) {
            var key = ngram.slice(i).join(' ');
            if (yuri[key]) {
                var total = 0;
                for (var el in yuri[key]) {
                    if (yuri[key].hasOwnProperty(el)) {
                        total += yuri[key][el];
                    }
                }
                var target = Math.floor(Math.random() * total);
                var n = 0;
                for (var el in yuri[key]) {
                    if (yuri[key].hasOwnProperty(el)) {
                        n += yuri[key][el];
                        if (n >= target) {
                            word = el;
                            break;
                        }
                    }
                }
                break;
            }
        }
        if (word === 'END') {
            break;
        } else {
            output.push(word);
            if (chain_size > 1) {
                ngram = ngram.slice(1-chain_size);
            } else {
                ngram = [];
            }
            ngram.push(word);
        }
    }
    return output.join(' ');
}

function talk() {
    var line = generate();
    document.getElementById("dialogue").textContent = line;
    responsiveVoice.speak(line, "Japanese Female");
}
