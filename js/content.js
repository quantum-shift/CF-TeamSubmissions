import {getFriendList} from './storage_util.js'
import {getAC} from './api_util.js'
import {getAllProblems, colorNodes} from './parse_util.js'


function checkEqual(pa, pb) {
    return pa.pname == pb.pname && (pa.num <= pb.num + 1 || pb.num <= pa.num + 1);
}


async function updatePset() {
    let friendList = await getFriendList();
    let totalSet = new Set();
    for (let i = 0; i < friendList.length; ++i) {
        let list = await getAC(friendList[i]);
        list.forEach(element => {
            totalSet.add(element);
        });
    }
    let parsedList = getAllProblems();
    let idxList = []
    let problemList = Array.from(totalSet);
    parsedList.forEach((element, index) => {
        let exist = false;
        for (let i = 0; i < problemList.length; ++i) {
            if (checkEqual(element, problemList[i])) {
                exist = true;
                break;
            }
        }
        if (exist) idxList.push(index);
    })
    colorNodes(idxList, "skyblue");
}
updatePset();