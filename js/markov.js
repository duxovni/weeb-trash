var chain_size = 1;

function generate_dialogue() {
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
    var dialogue = generate_dialogue();
    document.getElementById("dialogue").textContent = dialogue;
    responsiveVoice.speak(dialogue, "Japanese Female");
}

function markov_word(chain) {
    var keys = [];
    for (var el in chain) {
        if (chain.hasOwnProperty(el)) {
            keys.push(el);
        }
    }

    var word1 = keys[Math.floor(Math.random()*keys.length)];

    var stop = 50;

    while (word1[0] === '.' || word1[1] === '.') {
	word1 = keys[Math.floor(Math.random()*keys.length)];
    }

    message = word1.charAt(0).toUpperCase() + word1.slice(1);

    while (true) {
        var word2 = chain[word1][Math.floor(Math.random()*chain[word1].length)];
	if (word2 === '.') {
	    break;
	}
        word1 = word1[1]+word2;
        message += word2;
    }

    return message;
}

function generate_name() {
    return markov_word(last) + ' ' + markov_word(first) + '-' + honorifics[Math.floor(Math.random()*honorifics.length)];
}

function new_name() {
    document.getElementById("name").textContent = generate_name();
}
