export function getAllProblemNodes () {
    //List of problems in this page
    let ptable = document.querySelector("table[class='problems']");
    //Taking td[0] and td[1] each problem (to uniquely identify that problem)
    let thead = []
    for (let i = 1; i < ptable.rows.length; ++i) {
        thead.push([ptable.rows[i].querySelectorAll('td')[0], ptable.rows[i].querySelectorAll('td')[1]]);
    }
    return thead;
}

export function getAllProblems() {
    //Returns array of objects {num: contestID, name: problemName}
    let thead = getAllProblemNodes();
    thead = thead.map(element => {
        return {num: parseInt(element[0].textContent.trim()), pname: element[1].querySelector('div').textContent.trim()};
    })
    return thead;
}

export function colorNodes(idxList, color) {
    //idxList is the list of indices in thead to be colored
    console.log(idxList);
    let thead = getAllProblemNodes();
    for (let i = 0; i < idxList.length; ++i) {
        thead[idxList[i]][0].style.backgroundColor = color;
    }
}