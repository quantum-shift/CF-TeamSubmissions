import {getFriendList, clearFriendList, updateFriendList} from './storage_util.js'
import {checkHandle} from './api_util.js'
async function showFriends() {
    let friendList = await getFriendList();
    let list = document.getElementById('showFriends');
    list.innerHTML = "List of friends:";
    friendList.forEach(element => {
        let li = document.createElement("li");
        let text = document.createTextNode(element);
        li.appendChild(text);
        list.appendChild(li);
    });
}

$(async function() {
    //Always show list of friends
    await showFriends();
    //Add a friend
    $('#addFriend').on("click", async () => {
        let friendList = await getFriendList();
        let friendName = $('#friendName').val();
        if (!friendName) {
            alert('Handle name cannot be empty!');
        } else {
            let handleOk = await checkHandle(friendName);
            if (handleOk) {
                friendList.push(friendName.toLowerCase());
                await updateFriendList(friendList);
                await showFriends();
                $('#friendName').val('');    
            } else {
                alert('Enter a valid handle!');
            }
        }
    });
    //Clear all friends
    $('#clearAllFriends').on("click", async () => {
        await clearFriendList();
        await showFriends();
    });
});


