// ===== Select elements =====
const contacts = document.querySelectorAll('.contacts');
const chatName = document.querySelector('.chatcontactname h1');
const chatBody = document.querySelector('.chatbody');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendBtn');

// ===== Map to store messages per contact =====
// key = unique contact ID, value = { name, messages: [], draft: '' }
const chatMap = new Map();

// ===== Initialize chat map for all contacts =====
contacts.forEach((contact, index) => {
    const name = contact.querySelector('h1').textContent;
    const id = `contact-${index}`; // unique ID
    contact.dataset.id = id; // store ID in DOM element
    chatMap.set(id, { name, messages: [], draft: '' }); // initialize
});

// ===== Function to render chat messages =====
function renderChat(id){
    chatBody.innerHTML = ''; // clear previous messages
    const chatData = chatMap.get(id);
    if(!chatData) return;

    chatName.textContent = chatData.name;
    chatInput.value = chatData.draft || '';

    chatData.messages.forEach(msg => {
        const div = document.createElement('div');
        div.classList.add('message', msg.type);
        div.innerHTML = `<span>${msg.text}</span><span class="time">${msg.time}</span>`;
        chatBody.appendChild(div);
    });

    // Scroll to bottom
    chatBody.scrollTop = chatBody.scrollHeight;
}

// ===== Handle clicking a contact =====
contacts.forEach(contact => {
    contact.addEventListener('click', () => {
        // Remove active class from all
        contacts.forEach(c => c.classList.remove('active'));
        contact.classList.add('active');

        const id = contact.dataset.id;
        renderChat(id);
    });
});

// ===== Function to send a message =====
function sendMessage(){
    const text = chatInput.value.trim();
    if(text === '') return;

    // Get current active contact
    const activeContact = document.querySelector('.contacts.active');
    if(!activeContact) return;
    const id = activeContact.dataset.id;
    const chatData = chatMap.get(id);

    const time = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});

    // Add message to map
    chatData.messages.push({text, type:'sent', time});
    chatData.draft = ''; // clear draft

    renderChat(id);

    // Optional fake reply
    setTimeout(() => receiveMessage(id), 1000);
}

// ===== Function to simulate receiving a message =====
function receiveMessage(id){
    const chatData = chatMap.get(id);
    const replies = ["Okay 👍", "Got it!", "Sounds good!", "Thanks!"];
    const text = replies[Math.floor(Math.random() * replies.length)];
    const time = new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});

    chatData.messages.push({text, type:'received', time});
    renderChat(id);
}

// ===== Save draft text as user types =====
chatInput.addEventListener('input', () => {
    const activeContact = document.querySelector('.contacts.active');
    if(!activeContact) return;
    const id = activeContact.dataset.id;
    const chatData = chatMap.get(id);
    chatData.draft = chatInput.value;
});

// ===== Event listeners for sending =====
sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', e => {
    if(e.key === 'Enter') sendMessage();
});
