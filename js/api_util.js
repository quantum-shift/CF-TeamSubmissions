let proto = 'https://'
let cf = 'codeforces.com/'
let api = 'api/'
export function getSubUrl(handle) {
    //Get the api url to get the submissions of a handle
    return proto + cf + api + 'user.status?' + 'handle=' + handle;
}

export function getUserInfoUrl(handle) {
    return proto + cf + api + 'user.info?' + 'handles=' + handle;
}

export async function getAC (handle) {
    //Returns list of objects of accepted problems in the form
    //{num: contestID, name: problem}
    return new Promise(async (resolve, reject) => {
        await fetch(getSubUrl(handle)).then(
            subList => {
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
                resolve(list);
            }
        );    
    })
}

export async function checkHandle (handle) {
    alert(getUserInfoUrl(handle));
    return new Promise (async (resolve, reject) => {
        await fetch(getUserInfoUrl(handle)).then(
            result => {
                return result.json();
            }
        ).then(
            result => {
                resolve(result.status == "OK");
            }
        );
    });
}