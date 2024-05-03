const titleInput = document.getElementById('titleInput');
const titleInputValue = titleInput.value;
console.log(titleInputValue.length)
const textInput = document.getElementById('textInput');
const textInputValue = textInput.value;
console.log(titleInputValue.length)
const createPostButton = document.getElementById('createPostButton')
const error = document.getElementById('error')
const bloglist = document.getElementById('resultBlog');
const clearButton = document.getElementById('clearPostButton')
let blogItemsData = []


//обработчики событий для инпутов - чтобы проверить пустые или нет 
titleInput.addEventListener('input', () => {
    if (!titleInput.value.trim() && !textInput.value.trim()) {
        error.innerHTML = 'Кажется, вы что-то забыли заполнить';
        createPostButton.disabled = true;
    } else {
        error.innerHTML = '';
        createPostButton.disabled = false; // изменено на false
    }
});



textInput.addEventListener('input', () => {
    if (!titleInput.value.trim() && !textInput.value.trim()) {
        error.innerHTML = 'Кажется, вы что-то забыли заполнить';
        createPostButton.disabled = true;
    } else {
        error.innerHTML = '';
        createPostButton.disabled = false; 
    }
});

//отображение данных 
function displayData(element){
    let h2 = "<h2>" +element.title + "</h2>";
    let body = "<p>" +element.body + "</p>";
    return h2 + body;
}

function showTask(){
    let blogItemsResponse = JSON.parse(localStorage.getItem('blogItems'));
    if (blogItemsResponse === null || blogItemsResponse.length === 0) { 
       bloglist.innerHTML = 'Постов пока нет'; 

    } else {
        bloglist.innerHTML = '';
  
     blogItemsResponse.forEach(task => {


        bloglist.innerHTML += displayData(task);
        console.log(task)
        localStorage.setItem('blogItems', JSON.stringify(blogItemsResponse));
        });
      };
    }
  



document.addEventListener("DOMContentLoaded", showTask); 

//создание поста
function createTask() {
    if (titleInput.value.trim() && textInput.value.trim()) {
        let bodyPost = {
            'title': titleInput.value,
            'body': textInput.value,
            'userId': 1
        }
        sendPost(bodyPost);
    } else {
        error.innerHTML = 'Кажется, вы что-то забыли заполнить';
    }
}



function sendPost(bodyPost) {
    try {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(bodyPost)
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Request failed');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);
            blogItemsData = JSON.parse(localStorage.getItem('blogItems')) || [];
            blogItemsData.unshift(data); 
            localStorage.setItem('blogItems', JSON.stringify(blogItemsData));
            showTask();
        })
        .catch((error) => {
            console.error('Ошибка:', error);
        })
        .finally(() => {
            titleInput.value = '';
            textInput.value = '';
        });
    } catch (error) {
        console.error('Ошибка после fetch:', error);
    }
}

clearButton.addEventListener("click", function() {
    localStorage.removeItem('blogItems');
    showTask();
  });

createPostButton.addEventListener('click',createTask)