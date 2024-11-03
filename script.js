async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const userMessage = userInput.value.trim();
    if (userMessage) {
        appendMessage('user', userMessage);
        await generateBotResponse(userMessage);
    }
    userInput.value = '';
}

function appendMessage(sender, text) {
    const messages = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = text;
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
}

async function generateBotResponse(userMessage) {
    // Utilisez l'URL de votre backend Glitch
    const apiUrl = 'https://jungle-grape-tugboat.glitch.me'; // Remplacez par l'URL de votre projet Glitch

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userMessage })
        });

        if (!response.ok) {
            throw new Error(`Erreur de l'API : ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        const botMessage = result.choices && result.choices.length > 0 && result.choices[0].message
            ? result.choices[0].message.content
            : "Je n'ai pas de réponse pour le moment.";

        appendMessage('bot', botMessage);
    } catch (error) {
        console.error('Erreur:', error);
        appendMessage('bot', `Désolé, une erreur s'est produite : ${error.message}`);
    }
}
