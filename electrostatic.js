const charges = [];
const points = [];
const r = [];
const d = [];
const force = [];
const ff = [0, 0, 0];



function fix() {
    const q_src = document.getElementById("q-src").value;
    charges[0] = (q_src);
    console.log(q_src);
    const q_s_loc = "[" + document.getElementById("q-s-loc").value + "]";
    points[0] = (q_s_loc);
    console.log(q_s_loc);
};

function q_add() {
    const q_pt = document.getElementById("q-pt").value;
    console.log(q_pt);
    charges.push(q_pt);
    const q_loc = "[" + document.getElementById("q-loc").value + "]";
    points.push(q_loc);
    console.log(points);
};



function addVectors(a, b) {
    if (a.length !== b.length) {
        throw new Error('Vectors must be of same length');
    }
    const result = [];
    for (let i = 0; i < a.length; i++) {
        result.push(a[i] + b[i]);
    }
    return result;
}

function subVectors(a, b) {
    if (a.length !== b.length) {
        throw new Error('Vectors must be of same length');
    }
    const result = [];
    var temp = 0;
    for (let i = 1; i < a.length; i += 2) {
        result.push(a[i] - b[i]);
        console.log(a[i] + ' ' + b[i]);
        temp += Math.pow(a[i] - b[i], 2);
    }
    d.push(Math.sqrt(temp))
    r.push(result);
}

function electrostaticForce(q1, q2, r, d) {
    const k = 9 * Math.pow(10, 9);
    const t = [];
    for (let i = 0; i < r.length; i++) {
        const f = (k * q1 * q2) * r[i] / Math.pow(d, 3);
        t.push(f);
        console.log(f);
    }
    console.log(t);
    force.push(t);
}


function calculate() {


    for (let i = 1; i < charges.length; i++) {
        subVectors(points[i], points[0]);
        electrostaticForce(charges[i], charges[0], r[i - 1], d[i - 1])
        ff[0] += force[i - 1][0];
        ff[1] += force[i - 1][1];
        ff[2] += force[i - 1][2];
    }
    console.log(ff);
    if (ff[1] > 0) {
        ff[1] = "+ " + ff[1];
    };
    if (ff[2] > 0) {
        ff[2] = "+ " + ff[2];
    };
    document.getElementById("answer").innerHTML = `
<h3>Force = ${ff[0]} i ${ff[1]} j ${ff[2]} k</h3>
`;
};

