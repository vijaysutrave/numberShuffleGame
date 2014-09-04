secs = 0;
hour = 0;
mins = 0;
var Intr;

function start_timer() {

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
        time.innerHTML = hour + "hr(s) : " + mins + "m : " + secs + "s";

    }, 1000);

}

function listToMatrix(list, elementsPerSubArray) {
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


function redraw() {

    if (typeof(m) == "undefined" && typeof(n) == "undefined") {
        m = 3;
        n = 3;
    }
    game(m, n);

}


function shuffle(o) {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

var numbers = new Array();
var order_numbers = new Array();



function game(gamem, gamen) {
    secs = 0;
    hour = 0;
    mins = 0;

    window.clearInterval(Intr);
    start_timer();
    getwrapper = document.getElementById('wrapper');

    getwrapper.innerHTML = "";

    m = gamem;
    n = gamen;

    numbers = [];
    for (var q = 1; q <= (m * n); q++) {

        numbers.push(q);

    }

    order_numbers = numbers.slice(0);
    matrix_order = listToMatrix(order_numbers, m);


    numbers = shuffle(numbers);
    matrix = listToMatrix(numbers, m);

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
            p.onclick = result;
            getwrapper.appendChild(p);



        }
        var br = document.createElement('div');
        getwrapper.appendChild(br);

    }

}



function result() {
    var getid = this.id

    var i = getid.substring(4, 5);
    var j = getid.substring(5, 6);

    var j = parseInt(j);
    var i = parseInt(i);

    var top, right, bottom, left;

    var counter = parseInt(1);
    var gethtml;


    if (j - 1 >= 0)
        left = document.getElementById('cell' + i + (j - 1)).innerHTML;
    else
        left = "na";



    if (i - 1 >= 0)
        top = document.getElementById('cell' + (i - 1) + j).innerHTML;
    else
        top = "na";


    if (j + 1 < n)
        right = document.getElementById('cell' + i + (j + 1)).innerHTML;
    else
        right = "na";


    if (i + 1 < m)
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

    check_completion();

}

function check_completion() {

    flag = 1;
    for (i = 0; i < m; i++) {
        for (j = 0; j < n; j++) {

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