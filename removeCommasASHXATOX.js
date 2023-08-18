const processButton = document.getElementById('processButton');
const fileInput = document.getElementById('fileInput');
const downloadLink = document.getElementById('downloadLink');
const statusDiv = document.getElementById('status');

processButton.addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (!file) {
        statusDiv.textContent = 'Please select file to remove commas';
        return;
    }

    const reader = new FileReader();

    reader.onload = async (event) => {
        const fileContent = event.target.result;
        const updatedContent = fileContent.replace(/("[^"]*")|,/g, (_, p1) => {
            if (p1) {
                return p1;
            } else {
                return '';
            }
        });

        const updatedBlob = new Blob([updatedContent], { type: 'text/plain' });

        const downloadUrl = URL.createObjectURL(updatedBlob);

        downloadLink.href = downloadUrl;
        downloadLink.download = file.name;
        downloadLink.style.display = 'block';

        downloadLink.click();

        URL.revokeObjectURL(downloadUrl);
    };

    reader.readAsText(file);
    // window.location.replace('ASHXATOX.HTML'); // for web browser
});