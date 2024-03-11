let followerPage = 1;
let currentUserName = "";
const searchFollowers = async (username, page) => {
    console.log("ok");
    // Get Followers
    followerPage = page;
    currentUserName = username;
    const data = await (
        await fetch(
            `http://127.0.0.1:8000/api/users/${username}/followers/?page=${followerPage}`
        )
    ).json();

    // load more button
    if (data.length < 30) {
        document.getElementById("btn-load-more").style.visibility = "hidden";
    } else {
        document.getElementById("btn-load-more").style.visibility = "visible";
    }
    // Mapping Data
    const parent = document.getElementById("section-followers-content");
    parent.innerHTML = `${page === 1 ? "" : parent.innerHTML}${data
        .map((user) => {
            // username
            const username = user.login;
            // avatar
            const avatar = user.avatar_url;

            // template
            return `<div class="section-item-followers">
            <span>${username}</span>
            <img src="${avatar}" class="avatar"/>
            </div>`;
        })
        .join("")}`;
};
const searchUsers = async () => {
    // Get Search Result
    const query = document.getElementById("input-search-user").value;
    const data = await (
        await fetch(`http://127.0.0.1:8000/api/users?search=${query}`)
    ).json();

    // Mapping Data
    const parent = document.getElementById("section-users");
    parent.innerHTML = data.items
        .map((user) => {
            // username
            const username = user.login;
            // avatar
            const avatar = user.avatar_url;

            // template
            return `<button class="btn-user" onclick="searchFollowers('${username}', 1)">
            <span>${username}</span>
            <img src="${avatar}" class="avatar"/>
            </button>`;
        })
        .join("");
};

document
    .getElementById("input-search-user")
    .addEventListener("change", searchUsers);
document.getElementById("btn-load-more").addEventListener("click", () => {
    searchFollowers(currentUserName, followerPage + 1);
});
