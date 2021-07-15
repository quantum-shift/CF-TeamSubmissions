import {getFriendList, clearFriendList, updateFriendList} from './storage_util.js'

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
    $('#addFriend').click(async () => {
        let friendList = await getFriendList();
        let friendName = $('#friendName').val();
        if (friendName) {
            friendList.push(friendName.toLowerCase());
            await updateFriendList(friendList);
            await showFriends();
            $('#friendName').val('');
        } else {
            alert('Handle name cannot be empty!');
        }
    });
    //Clear all friends
    $('#clearAllFriends').click(async () => {
        await clearFriendList();
        await showFriends();
    });
});


