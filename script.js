let selectuser = document.querySelector('#select-users');
let nameofuser = document.querySelector('#name');
let username = document.querySelector('#username');
let website = document.querySelector('#user-website');
let user_location = document.querySelector('#location');
let catchPhrase = document.querySelector('#phrase');
let tweets = document.querySelector('.tweet-column');
let comment_column = document.querySelector('.comment-column');



async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        console.log(users);
        return users;
    } catch (error) {
        throw error;
    }
}


async function firstRender() {
  try {
    const users = await fetchUsers();
    const posts = await fetchPosts();

    
    users.map(user => {
      const option = document.createElement('option');
      option.value = `${user.id}`;
      option.text = `${user.name}`;
      selectuser.appendChild(option);
    });

    user_id = renderUserDetails(users[0]);
    current_user_posts = posts.filter(post => post.userId == user_id);
    renderPosts(current_user_posts);
    renderComments(1);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

firstRender();



function renderPosts(allposts){
    let username = document.querySelector('#name').textContent;
    let posts = '';
    allposts.map(post => {
        posts += `
        <div class="single-tweet" id="${post.id}">
                    <img src="images/avatar.png" alt="">
                    <div class="others">
                        <div class="top" style="margin-bottom: 10px;">
                            <p>${username}</p>
                            <img src="images/icons8-verified-48.png" alt="">
                            <img src="images/icons8-twitter-squared-48.png" alt="">
                        </div>
                        <div>
                        <p  style="margin-bottom: 10px;">${post.body}</p>
                        </div>
                        <div class="numbers">
                        <div class="row"><img src="images/icons8-message-50.png" alt="">
                            <h6>200</h6>
                            </div>
                            <div class="row"><img src="images/icons8-retweet-50.png" alt="">
                            <h6>200</h6>
                            </div>
                            <div class="row"><img src="images/icons8-like-16.png" alt="">
                            <h6>200</h6>
                            </div>
                        </div>
                    </div>
                </div>
        `
    })
    tweets.innerHTML = posts;

    let tweeted_post = document.querySelectorAll('.single-tweet');
    tweeted_post.forEach(tweet => {
        tweet.addEventListener('click', () => {
            let postId= tweet.id;
            console.log(postId);
            renderComments(postId);
        })
    })
    

}



function renderUserDetails(user){
    nameofuser.textContent = user.name;
    username.textContent = '@ '+user.username;
    website.setAttribute('href', user.website);
    user_location.textContent = user.address.city
    catchPhrase.textContent = user.company.catchPhrase
    return user.id

}

async function fetchPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const posts = await response.json();
        return posts;
    } catch (error) {
        throw error;
    }
}

async function fetchComments() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments');
        const comments = await response.json();
        return comments;
    } catch (error) {
        throw error;
    }
}


async function renderComments(post_id){
    try{
        comments = await fetchComments();


        let current_comments = comments.filter(comment => comment.postId == post_id);

        let comment_elements = "";
        comment_elements = "<div style=margin-bottom:3px;>post " + post_id + " comments</div>"
        current_comments.map(comment => {
            comment_elements += `
                    <div class="single-tweet" id="comments">
                    <img src="images/avatar.png" alt="">
                    <div class="others">
                        <div class="top"  style="margin-bottom: 10px;">
                            <p>${comment.name}</p>
                            <img src="images/icons8-verified-48.png" alt="">
                            <img src="images/icons8-twitter-squared-48.png" alt="">
                        </div>
                        <div  style="margin-bottom: 10px;">
                        <p >${comment.body}</p>
                        </div>
                        <div class="numbers">
                            <div class="row"><img src="images/icons8-message-50.png" alt="">
                            <h6>200</h6>
                            </div>
                            <div class="row"><img src="images/icons8-retweet-50.png" alt="">
                            <h6>200</h6>
                            </div>
                            <div class="row"><img src="images/icons8-like-16.png" alt="">
                            <h6>200</h6>
                            </div>
                        </div>
                        </div>
                    </div>
            `;
        })
        comment_column.innerHTML = comment_elements;




    } catch (error) {
        throw error;
    }
}
///////////////////////////////////////////////////////
////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
//////after lights/////////////////////////////////////////

selectuser.addEventListener('change',() => {
    let user_id = selectuser.value;
    fetchUsers().then(users => {
        const user = users.filter(user => user.id == user_id)
        return user[0];
    }).then(user => {
        renderUserDetails(user);
        return user.id;
    }).then(user_id => {
        fetchPosts().then(posts => {
            const post=posts.filter(post => post.userId == user_id)
            renderPosts(post);
            renderComments(post[0].id);
        }).catch(error => {
            console.error('Error:',error);
        })
    })
    
})




// renderUserDetails('name')