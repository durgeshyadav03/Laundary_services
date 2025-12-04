
      let cart = [];

      function toggleItem(name, price, buttonElement) {
        const existingIndex = cart.findIndex(item => item.name === name);

        if (existingIndex > -1) {
          // Remove Item
          removeItem(existingIndex);
        } else {
          // Add Item
          if (cart.length >= 10) {
            alert("You can only add up to 10 items!");
            return;
          }

          cart.push({ name, price, buttonRef: buttonElement });

          // Update Button UI
          buttonElement.innerHTML = `Remove Item <ion-icon name="remove-circle-outline"></ion-icon>`;
          buttonElement.classList.remove('btn-add');
          buttonElement.classList.add('btn-remove');
          
          renderCart();
        }
      }

      function removeItem(index) {
        const item = cart[index];
        const btn = item.buttonRef;

        // Reset Button UI
        if(btn) {
           btn.innerHTML = `Add Item <ion-icon name="add-circle-outline"></ion-icon>`;
           btn.classList.remove('btn-remove');
           btn.classList.add('btn-add');
        }

        cart.splice(index, 1);
        renderCart();
      }

      function renderCart() {
        const tbody = document.getElementById("cart-body");
        const table = document.getElementById("cart-table");
        const emptyMsg = document.getElementById("empty-msg");
        const totalEl = document.getElementById("total-price");

        tbody.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
          table.style.display = "none";
          emptyMsg.style.display = "flex";
        } else {
          table.style.display = "table"; // Shows the header
          // tbody.style.display = "block"; // REMOVED THIS
          emptyMsg.style.display = "none";

          cart.forEach((item, index) => {
            total += item.price;
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="col-sno">${index + 1}</td>
                <td class="col-name" style="font-weight: 500;">${item.name}</td>
                <td class="col-price">₹${item.price.toFixed(2)}</td>
                <td class="col-action">
                   <button class="remove-row-btn" onclick="removeItem(${index})">
                     <ion-icon name="close-circle-outline"></ion-icon>
                   </button>
                </td>
            `;
            tbody.appendChild(row);
          });
        }
        
        totalEl.textContent = `₹ ${total.toFixed(2)}`;
      }
    