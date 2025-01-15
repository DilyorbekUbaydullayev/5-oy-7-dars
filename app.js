const form = document.getElementById('form');
const input = document.getElementById('task');
const wrapper = document.getElementById('wrapper');
const text = document.getElementById('p');

// Taskni validatsiya qilish funksiyasi
function validate(task) {
    if (!task) {
        alert('Please enter a task');
        return false;
    }
    return true;
}

// Taskni yaratish funksiyasi
function Tasks(tasks) {
    return `
        <div class="div">
            <p>${tasks.task}</p> 
            <p task-id=${tasks.id} class='btn'>
                <i class="fa-solid fa-trash"></i>
            </p>
        </div>
    `;
}

// Task qo'shish
form && form.addEventListener('submit', (e) => {
    wrapper.style.display = 'block';
    e.preventDefault();
    const isValid = validate(input.value);
    if (!isValid) {
        return;
    }

    const tasks = {
        task: input.value,
        id: Date.now(),
    };

    // DOMga qo'shish
    const card = Tasks(tasks);
    wrapper.innerHTML += card;

    // LocalStorage'ga qo'shish
    let data = JSON.parse(localStorage.getItem('tasks')) || [];
    data.push(tasks);
    localStorage.setItem('tasks', JSON.stringify(data));

    // Tasklar sonini yangilash
    text.innerHTML = `Tasks - ${data.length}`;
    form.reset();
});

// Sahifa yuklanayotganda tasklarni yuklash
document.addEventListener('DOMContentLoaded', () => {
    
    let data = JSON.parse(localStorage.getItem('tasks')) || [];
    if (data.length > 0) {
        text.innerHTML = `Tasks - ${data.length}`;
    }
    if(data.length ==0) {
        wrapper.style.display = 'none';
    }
    

    data.forEach((task) => {
        const card = Tasks(task);
        wrapper.innerHTML += card;
    });
});

// Taskni o'chirish
wrapper.addEventListener('click', (e) => {
    const coniform = confirm("o'chirilsinmi?")
    if (e.target.classList.contains('fa-trash')&&coniform) {
        // DOMdan elementni o'chirish
        const parentDiv = e.target.parentElement.parentElement;
        const taskId = e.target.parentElement.getAttribute('task-id');
        parentDiv.remove();

        // LocalStorage'dan o'chirish
        let data = JSON.parse(localStorage.getItem('tasks')) || [];
        data = data.filter((task) => task.id !== Number(taskId));
        localStorage.setItem('tasks', JSON.stringify(data));

        // Tasklar sonini yangilash
        text.innerHTML = `Tasks - ${data.length}`;
        if(data.length==0){
            text.innerHTML = ``;
            wrapper.style.display = 'none';
        }
    }
    
});
