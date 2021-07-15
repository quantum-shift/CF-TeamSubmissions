export async function getFriendList() {
    //Returns promise for array of friends
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get({'friendList': []}, result => {
            resolve(result.friendList);
        })
    });
}
export function getUnique(friendList) {
    return [...new Set(friendList)];
}
export async function updateFriendList(friendList) {
    //Updates friend list in storage
    friendList = getUnique(friendList);
    chrome.storage.sync.set({'friendList': friendList});
}

export async function clearFriendList() {
    //Clears list of friends
    await chrome.storage.sync.remove('friendList');
}