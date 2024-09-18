// script.js

// Get current page from URL
const page = window.location.pathname.split('/').pop().split('.')[0]; // 'page1', 'page2', etc.
const language = page === 'page1' ? 'python' : page === 'page2' ? 'c' : page === 'page3' ? 'java' : 'cpp';
const questionId = new URLSearchParams(window.location.search).get('id') || 1;

// Fetch the question
async function fetchQuestion(id) {
    try {
        const response = await fetch(`/questions/${language}/${id}`);
        if (response.ok) {
            const question = await response.json();
            displayQuestion(question);
        } else {
            throw new Error('Question not found');
        }
    } catch (error) {
        document.getElementById('question-container').innerHTML = '<p>Error fetching question.</p>';
    }
}

function displayQuestion(question) {
    document.getElementById('statement').innerText = question.statement;
    document.getElementById('explanation').innerText = question.explanation;
    document.getElementById('output').innerText = question.output;
}

// Navigation buttons
document.getElementById('next').addEventListener('click', () => {
    fetchQuestion(parseInt(questionId) + 1);
});
document.getElementById('prev').addEventListener('click', () => {
    fetchQuestion(parseInt(questionId) - 1);
});

// Initial fetch
fetchQuestion(questionId);
