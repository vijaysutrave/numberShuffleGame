var startGame = (function(Game) {
    var secs = 0;
    var hour = 0;
    var mins = 0;
    var Intr;

    // Start the Timer 
    Game.startTimer = function() {
        Intr = setInterval(function() {
            secs++;
            if (secs > 59) {
                mins++;
                secs = 0;
            }
            if (mins > 59) {
                hour++;
                mins = 0;
            }
            var time = document.getElementById('timer');
            time.innerHTML = hour + "hr(s) : " + mins + " m : " + secs + " s";
        }, 1000);
    }

    // Check if Game - over
    Game.isCompleted = function() {
        var flag = 1;
        for (var i = 0; i < this.m; i++) {
            for (var j = 0; j < this.n; j++) {
                var check = document.getElementById('cell' + i + j).innerHTML;
                if (check != ".") {
                    if (parseInt(check) == matrix_order[i][j]) {
                        continue;
                    } else {
                        flag = 0;

                    }
                }
            }
        }
        if (flag == 1) {
            alert('Congratulations, you did it in ' + hour + "hour(s) " + mins + "m " + secs + "s");
            window.clearInterval(Intr);
        }
    }

    //Initialize Game
    Game.init = function(m, n) {
        if (typeof m == "undefined" && typeof n == "undefined") {
            this.m = 3;
            this.n = 3;
        } else {
            this.m = m;
            this.n = n;
        }
        Game.start(this.m, this.n);

    }

    //Shuffle the numbers array
    Game.shuffle = function(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    }

    //Populate game
    Game.start = function(m, n) {
        secs = 0;
        hour = 0;
        mins = 0;
        this.m = m;
        this.n = n;

        window.clearInterval(Intr);
        this.startTimer();
        getwrapper = document.getElementById('wrapper');

        getwrapper.innerHTML = "";

        numbers = [];
        for (var q = 1; q <= (m * n); q++) {
            numbers.push(q);
        }

        order_numbers = numbers.slice(0);
        matrix_order = this.listToMatrix(order_numbers, m);

        numbers = this.shuffle(numbers);
        matrix = this.listToMatrix(numbers, m);

        for (var i = 0; i < m; i++) {
            for (j = 0; j < n; j++) {
                var p = document.createElement('div');
                if (matrix[i][j] == m * n) {
                    p.textContent = ".";
                    loci = i;
                    locj = j;
                } else
                    p.textContent = matrix[i][j];

                p.className = "general";
                p.id = "cell" + i + j;
                p.onclick = this.result;
                getwrapper.appendChild(p);
            }
            var br = document.createElement('div');
            getwrapper.appendChild(br);
        }
    }

    //Click event to move tiles
    Game.result = function() {
        var getid = this.id

        var i = getid.substring(4, 5);
        var j = getid.substring(5, 6);

        var j = parseInt(j);
        var i = parseInt(i);

        var top, right, bottom, left;

        var counter = 1;
        var gethtml;


        if (j - 1 >= 0)
            left = document.getElementById('cell' + i + (j - 1)).innerHTML;
        else
            left = "na";

        if (i - 1 >= 0)
            top = document.getElementById('cell' + (i - 1) + j).innerHTML;
        else
            top = "na";


        if (j + 1 < Game.n)
            right = document.getElementById('cell' + i + (j + 1)).innerHTML;
        else
            right = "na";


        if (i + 1 < Game.m)
            bottom = document.getElementById('cell' + (i + 1) + (j)).innerHTML;
        else
            bottom = "na";


        if (top == "." || bottom == "." || right == "." || left == ".") {

            ele1 = parseInt(loci);
            ele2 = parseInt(locj);
            temp = document.getElementById('cell' + ele1 + ele2).innerHTML;
            document.getElementById('cell' + ele1 + ele2).innerHTML = document.getElementById('cell' + i + j).innerHTML;
            document.getElementById('cell' + i + j).innerHTML = temp;
            loci = i;
            locj = j;
        }

        Game.isCompleted();
    }

    //Converts array to matrix of an order
    Game.listToMatrix = function(list, elementsPerSubArray) {
        var matrix = [],
            i, k;
        for (i = 0, k = -1; i < list.length; i++) {
            if (i % elementsPerSubArray === 0) {
                k++;
                matrix[k] = [];
            }

            matrix[k].push(list[i]);
        }
        return matrix;
    }

    return Game;

})(window.Game || {});

startGame.init();

