const triggerWorkflow = async () => {
    const url = 'https://api.github.com/repos/mathlover24/my-game/actions/workflows/main.yml/dispatches';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ref: 'main', // Branch to trigger
            inputs: {}   // Pass any workflow inputs if needed
        }),
    });

    if (response.ok) {
        console.log('Workflow triggered successfully!');
    } else {
        console.error('Failed to trigger workflow:', await response.json());
    }
};

triggerWorkflow();
