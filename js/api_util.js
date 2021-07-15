export function getSubUrl(handle) {
    //Get the api url to get the submissions of a handle
    let proto = 'https://'
    let cf = 'codeforces.com/'
    let api = 'api/'
    return proto + cf + api + 'user.status?' + 'handle=' + handle;
}

export async function getAC (handle) {
    //Returns list of objects of accepted problems in the form
    //{num: contestID, name: problem}
    return new Promise(async (resolve, reject) => {
        await fetch(getSubUrl(handle)).then(
            subList => {
                // console.log(subList);
                return subList.json();
            }
        ).then(
            subs => {
                let subArr = subs.result;
                let list = subArr.filter(element => {
                    return element.verdict == "OK";
                });
                list = list.map(element => {
                    return {num: element.problem.contestId, pname: element.problem.name};
                })
                // console.log(list);
                resolve(list);
                // console.log(list);
            }
        );    
    })
}