import items from './items.js'; // Import the items array

function displayItems() {
    console.log('items', items);
    
    const container = document.getElementById('item-container');

    // Loop through each item in the array
    items.forEach(item => {
        // Create a div for each item
        const itemDiv = document.createElement('div');
        itemDiv.className = 'grid-item';

        // Add content to the div, including the image
        itemDiv.innerHTML = `
            <div class="shoe-item">
          <img src="${item.image}" alt="Dc Shoes Teknic Off White" class="responsive-image"></img>

                <div class="content">
                    <a href="${item.url}" target="_blank">${item.name}</a>
                    <p> Size: ${item.size}</p>
                </div>
            </div>
        `;

        // Append the div to the container
        container.appendChild(itemDiv);
    });
}


displayItems()