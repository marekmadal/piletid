document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const minInput = document.getElementById('min');
    const maxInput = document.getElementById('max');
    const numberDisplay = document.getElementById('number-display');
    const generatedNumbersContainer = document.getElementById('generated-numbers');
    const nameList = document.getElementById('name-list');
    const paginationControls = document.getElementById('pagination-controls');
    const printBtn = document.getElementById('print-btn');
    const hideBtn = document.getElementById('hide-btn');
    const nameListContainer = document.getElementById('name-list-container');
    const body = document.body;

    let numberPool = [];
    let usedNumbers = [];
    let namesAndComments = [];
    let currentPage = 0;
    const itemsPerPage = 5;

    const generateNumber = () => {
        const min = parseInt(minInput.value);
        const max = parseInt(maxInput.value);

        if (isNaN(min) || isNaN(max)) {
            alert('Please enter valid numbers for both Min and Max.');
            return;
        }

        if (min > max) {
            alert('Min should be less than or equal to Max');
            return;
        }

        if (numberPool.length === 0) {
            for (let i = min; i <= max; i++) {
                if (!usedNumbers.includes(i)) {
                    numberPool.push(i);
                }
            }
        }

        if (numberPool.length === 0) {
            alert('No numbers left in the pool. Reset or reintroduce numbers.');
            return;
        }

        const randomIndex = Math.floor(Math.random() * numberPool.length);
        const randomNumber = numberPool[randomIndex];
        numberPool.splice(randomIndex, 1);
        usedNumbers.push(randomNumber);

        numberDisplay.textContent = randomNumber;
        displayGeneratedNumber(randomNumber);
        addNameFields(randomNumber);
        updatePaginationControls();
        showPage(currentPage);
    };

    const reintroduceNumber = (number) => {
        const index = usedNumbers.indexOf(number);
        if (index > -1) {
            usedNumbers.splice(index, 1);
            numberPool.push(number);
            document.getElementById(`num-${number}`).remove();
        }
    };

    const displayGeneratedNumber = (number) => {
        const numberElement = document.createElement('div');
        numberElement.textContent = number;
        numberElement.classList.add('generated-number');
        numberElement.id = `num-${number}`;
        numberElement.addEventListener('click', () => reintroduceNumber(number));
        generatedNumbersContainer.appendChild(numberElement);
    };

    const addNameFields = (number) => {
        const listItem = document.createElement('li');
        
        const inputContainer = document.createElement('div');
        inputContainer.classList.add('input-container');
        
        const numberSpan = document.createElement('span');
        numberSpan.textContent = number;
        
        const nameInput = document.createElement('input');
        nameInput.placeholder = `Nimi`;

        const commentInput = document.createElement('textarea');
        commentInput.placeholder = `Kommentaarid`;
        commentInput.classList.add('comment-input');

        inputContainer.appendChild(numberSpan);
        inputContainer.appendChild(nameInput);
        
        listItem.appendChild(inputContainer);
        listItem.appendChild(commentInput);

        namesAndComments.push(listItem);
    };

    const updatePaginationControls = () => {
        paginationControls.innerHTML = '';

        const totalPages = Math.ceil(namesAndComments.length / itemsPerPage);
        for (let i = 0; i < totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i + 1;
            pageBtn.classList.add('pagination-btn');
            pageBtn.addEventListener('click', () => showPage(i));
            paginationControls.appendChild(pageBtn);
        }
    };

    const showPage = (page) => {
        nameList.innerHTML = '';
        currentPage = page;
        const start = page * itemsPerPage;
        const end = start + itemsPerPage;
        const itemsToShow = namesAndComments.slice(start, end);

        itemsToShow.forEach(item => nameList.appendChild(item));
    };

    const toggleDarkMode = () => {
        body.classList.toggle('dark-mode');
        const icon = darkModeBtn.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    };

    const printSidebar = () => {
        const printWindow = window.open('', '', 'height=400,width=800');
        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write('<link rel="stylesheet" href="style.css">');
        printWindow.document.write('</head><body>');
        printWindow.document.write('<h2>Nimed ja piletid</h2>');
        namesAndComments.forEach(item => {
            const number = item.querySelector('span').textContent;
            const name = item.querySelector('input').value;
            const comments = item.querySelector('textarea').value;
            printWindow.document.write(`<p><strong>${number}</strong></p>`);
            printWindow.document.write(`<p>${name}</p>`);
            printWindow.document.write(`<p>${comments}</p>`);
        });
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    };

    const toggleComments = () => {
        const commentFields = document.querySelectorAll('.comment-input');
        commentFields.forEach(field => {
            field.style.display = field.style.display === 'none' ? 'block' : 'none';
        });
        hideBtn.textContent = hideBtn.textContent === 'Peida kommentaarid' ? 'Näita kommentaare' : 'Peida kommentaarid';
    };

    generateBtn.addEventListener('click', generateNumber);
    printBtn.addEventListener('click', printSidebar);
    hideBtn.addEventListener('click', toggleComments);

    // Create a dark mode toggle button
    const darkModeBtn = document.createElement('button');
    darkModeBtn.classList.add('dark-mode-btn');
    darkModeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    darkModeBtn.addEventListener('click', toggleDarkMode);
    document.body.appendChild(darkModeBtn);
});
