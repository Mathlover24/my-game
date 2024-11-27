const triggerWorkflow = async () => {
    const url = 'https://api.github.com/repos/YOUR_USERNAME/YOUR_REPOSITORY/actions/workflows/main.yml/dispatches';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${YOUR_GITHUB_PAT}`,
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
