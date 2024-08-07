function autoScroll() {
  const orderNowButton = document.getElementById("orderNow");
  orderNowButton.addEventListener("click", function () {
    const brothOrderSection = document.getElementById("broth-order");
    if (brothOrderSection) {
      brothOrderSection.scrollIntoView({ behavior: "smooth" });
    }
  });
}

const API_Ramengo = "https://api.tech.redventures.com.br";
const API_Broths = `${API_Ramengo}/broths`;
const API_Proteins = `${API_Ramengo}/proteins`;
const API_Order = `${API_Ramengo}/orders`;
const key = "ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf";

async function optionBroth() {
  const response = await fetch(API_Broths, {
    method: "GET",
    headers: {
      "x-api-key": key,
    },
  });
  return response.json();
}

async function optionProtein() {
  const response = await fetch(API_Proteins, {
    method: "GET",
    headers: {
      "x-api-key": key,
    },
  });
  return response.json();
}


async function createOrder(brothId, proteinId) {
  try {
    const response = await fetch(API_Order, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
      },
      body: JSON.stringify({ brothId, proteinId }),
    });

    const responseData = response.json();

    if (!response.ok) {
      console.error("Response status:", response.status);
      console.error("Response body:", responseData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log("Response data:", responseData);
    return responseData;
  } catch (error) {
    console.error("Failed to create order:", error);
    return { error: error.message };
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const brothsContainer = document.getElementById("broths");
  const proteinsContainer = document.getElementById("proteins");
  const orderButton = document.getElementById("create-order");
  const mainContent = document.getElementById("main-content");
  const modal = document.getElementById("msg-modal");
  const modalMessage = document.getElementById("modal-message");
  const closeButton = document.querySelector(".close");
  let selected_broth_id = null;
  let selected_protein_id = null;

  orderButton.classList.add("inactive-button");

  function stateOrderButton() {
    orderButton.classList.remove("active-button", "inactive-button");
    if (selected_broth_id && selected_protein_id) {
      orderButton.classList.add("active-button");
    } else {
      orderButton.classList.add("inactive-button");
    }
  }

  function createCard(item, type) {
    const card = document.createElement("div");
    card.className = "option-card";
    card.dataset.id = item.id;
    card.dataset.type = type;

    card.innerHTML = `
      <div class="option-card" card-active-img="/assets/${item.name}/active.png" card-inactive-img="/assets/${item.name}/inactive.png">
        <img src="/assets/${item.name}/inactive.png" alt="${item.name}">
        <h4>${item.name}</h4>
        <p>${item.description}</p>
        <h3>U$${item.price}</h3>
      </div>`;
    console.log("Inactive image path:", `/assets/${item.name}/inactive.png`);
    console.log("Active image path:", `/assets/${item.name}/active.png`);

    card.addEventListener("click", () => {
      const chosenOption = card.classList.contains("selected");
      document
        .querySelectorAll(`.option-card[data-type='${type}']`)
        .forEach((b) => {
          b.classList.remove("selected");
          const inactiveImg = b
            .querySelector("div")
            .getAttribute("card-inactive-img");
          b.querySelector("img").src = inactiveImg;
        });

      if (!chosenOption) {
        card.classList.add("selected");
        const activeImg = card
          .querySelector("div")
          .getAttribute("card-active-img");
        card.querySelector("img").src = activeImg;
        if (type === "broth") {
          selected_broth_id = item.id;
          console.log("selected broth:", selected_broth_id);
        } else {
          selected_protein_id = item.id;
          console.log("selected protein:", selected_protein_id);
        }
      } else {
        if (type === "broth") {
          selected_broth_id = null;
        } else {
          selected_protein_id = null;
        }
      }

      stateOrderButton();
    });
    return card;
  }

  async function loadBroths() {
    const broths = await optionBroth();
    broths.forEach((broth) => {
      const button = createCard(broth, "broth");
      brothsContainer.appendChild(button);
    });
  }

  async function loadProteins() {
    const proteins = await optionProtein();
    proteins.forEach((protein) => {
      const button = createCard(protein, "protein");
      proteinsContainer.appendChild(button);
    });
  }

  function showModal(message) {
    modal.style.display = "block";
    modalMessage.textContent = message;
    closeButton.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  async function createNewOrder() {
    if (!selected_broth_id || !selected_protein_id) {
      showModal("Please select a broth and a protein.");
      return;
    }
  
    console.log("Selected broth ID:", selected_broth_id);
    console.log("Selected protein ID:", selected_protein_id);
  
    const result = await createOrder(selected_broth_id, selected_protein_id);
    console.log("Order creation result:", result);
  
    if (result && result.id) {
      document.getElementById("order-id-confirm").textContent = result.id;
      document.getElementById("order-image").src = result.image;
      document.getElementById("order-name").textContent = result.description;
  
      mainContent.style.display = "none";
      document.querySelector(".confirmation-page").style.display = "flex";
      const newOrderButton = document.getElementById("new-order");
      newOrderButton.removeEventListener("click", () => {});
      newOrderButton.addEventListener("click", () => {
        location.reload()
      });
    } else {
      showModal(`Error creating order: ${result.error || "Unknown error"}`);
    }
  }
  orderButton.removeEventListener("click", () => {});
  orderButton.addEventListener("click", createNewOrder);

  await loadBroths();
  await loadProteins();
});
