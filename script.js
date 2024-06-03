document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const minInput = document.getElementById('min');
    const maxInput = document.getElementById('max');
    const numberDisplay = document.getElementById('number-display');
    const generatedNumbersContainer = document.getElementById('generated-numbers');

    let numberPool = [];
    let usedNumbers = [];

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

    generateBtn.addEventListener('click', generateNumber);
});
