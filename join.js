// Import Octokit
import { Octokit } from 'https://cdn.skypack.dev/@octokit/core';

const GITHUB_API_OWNER = 'mathlover24';
const GITHUB_API_REPO = 'my-game';
const GITHUB_TOKEN = '*******';

const octokit = new Octokit({ auth: GITHUB_TOKEN });

async function joinGame() {
    const gameCode = document.getElementById('join-game-code').value.trim();
    const playerName = document.getElementById('player-name').value.trim();
    const contactInfo = document.getElementById('contact-info').value.trim();
    const profilePicture = document.getElementById('profile-picture').files[0];

    if (!gameCode || !playerName || !contactInfo || !profilePicture) {
        alert("Please fill in all fields and upload a picture.");
        return;
    }

    const filePath = `${gameCode}.json`;

    try {
        const response = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: GITHUB_API_OWNER,
            repo: GITHUB_API_REPO,
            path: filePath
        });

        if (response.status === 200) {
            const gameData = JSON.parse(atob(response.data.content));

            const newPlayer = { name: playerName, contact: contactInfo, status: "alive" };
            gameData.players.push(newPlayer);

            const updateResponse = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
                owner: GITHUB_API_OWNER,
                repo: GITHUB_API_REPO,
                path: filePath,
                message: `Add player ${playerName}`,
                content: btoa(JSON.stringify(gameData)),
                sha: response.data.sha
            });

            if (updateResponse.status === 200) {
                alert(`${playerName} has joined the game.`);
            }
        }
    } catch (error) {
        console.error(error);
        alert("Failed to join the game.");
    }
}

window.joinGame = joinGame;
