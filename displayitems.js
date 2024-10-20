import items from './items.js'; 

function displayItems(filteredItems) {
    const container = document.getElementById('item-container');
    container.innerHTML = ''; 

    filteredItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'grid-item';

        itemDiv.innerHTML = `
            <div class="shoe-item">
                <img src="${item.image}" alt="${item.name}" class="responsive-image"></img>
                <div class="content">
                    <a href="${item.url}">${item.name}</a>
                    <p> Size: ${item.size.join(', ')}</p>
                </div>
            </div>
        `;

        container.appendChild(itemDiv);
    });
}

function populateSizeFilter() {
    const sizeDropdown = document.getElementById('size-filter');
    const sizes = new Set();

    items.forEach(item => {
        item.size.forEach(size => sizes.add(size));
    });
    

    const sortedSizes = Array.from(sizes).sort((a, b) => b - a);
    

    sortedSizes.forEach(size => {
        const option = document.createElement('option');
        option.value = size;
        option.textContent = size+'us';
        sizeDropdown.appendChild(option);
    });
}

function filterItemsBySize() {
    const selectedSize = document.getElementById('size-filter').value;
    const filteredItems = items.filter(item => item.size.includes(selectedSize) || selectedSize === 'all');
    displayItems(filteredItems);
}

populateSizeFilter();
document.getElementById('size-filter').addEventListener('change', filterItemsBySize);
displayItems(items);
