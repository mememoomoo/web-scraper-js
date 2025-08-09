document.getElementById('scrape-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const url = document.getElementById('url').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = 'Scraping...';
    try {
    const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
    });
    const data = await response.json();
    if (data.error) {
        resultsDiv.innerHTML = `<span style="color:red;">${data.error}</span>`;
    } else {
        let html = '<table><tr><th>Tag</th><th>Content</th></tr>';
        data.results.forEach(item => {
        html += `<tr><td>${item.tag}</td><td>${item.content}</td></tr>`;
        });
        html += '</table>';
        resultsDiv.innerHTML = html;
    }
    } catch (err) {
    resultsDiv.innerHTML = `<span style="color:red;">Error: ${err.message}</span>`;
    }
});