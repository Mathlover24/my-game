const triggerWorkflow = async () => {
    const url = 'https://api.github.com/repos/mathlover24/my-game/actions/workflows/<workflow-file-name>.yml/dispatches';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ref: 'main', // The branch to trigger
            inputs: {
                exampleInput: 'Hello, GitHub Actions!',
            },
        }),
    });

    if (response.ok) {
        console.log('Workflow triggered successfully!');
    } else {
        console.error('Failed to trigger workflow:', await response.json());
    }
};

triggerWorkflow();
