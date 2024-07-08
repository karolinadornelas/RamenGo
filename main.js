function autoScroll() {
  const orderNowButton = document.getElementById('orderNow');
  orderNowButton.addEventListener('click', function () {
    const brothOrderSection = document.getElementById('broth-order');
    if (brothOrderSection) {
      brothOrderSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

const API_Ramengo = 'https://api.tech.redventures.com.br';
const API_Broths = 'https://api.tech.redventures.com.br/broths';
const API_Proteins = 'https://api.tech.redventures.com.br/proteins';
const API_Order = 'https://api.tech.redventures.com.br/orders';
const key = 'ZtVdh8XQ2U8pWI2gmZ7f796Vh8GllXoN7mr0djNf';

async function optionBroth() {
  const response = await fetch(`${API_Broths}`, {
    method: 'GET',
    headers: {
      'x-api-key': key
    }
  });
  return response.json();
}

async function optionProtein() {
  const response = await fetch(`${API_Proteins}`, {
    method: 'GET',
    headers: {
      'x-api-key': key
    }
  });
  return response.json();
}

async function createOrder(selected_broth_id, selected_protein_id) {
  const response = await fetch(`${API_Order}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': key
    },
    body: JSON.stringify({ brothId: selected_broth_id, proteinId: selected_protein_id })
  });

  console.log('Response from API:', response);

  return response.json();
}

document.addEventListener('DOMContentLoaded', async () => {
  const brothsContainer = document.getElementById('broths');
  const proteinsContainer = document.getElementById('proteins');
  const orderButton = document.getElementById('create-order');
  const orderResult = document.getElementById('order-result');
  const mainContent = document.getElementById('main-content');
  let selected_broth_id = null;
  let selected_protein_id = null;

  function createButton(item, type) {
    const button = document.createElement('div');
    button.className = 'option-card';
    button.dataset.id = item.id;
    button.dataset.type = type;
  
    button.innerHTML = `
        <div class="option-card">
          <img src="${API_Ramengo}/images/${item.image}" alt="${item.name}"> /*aqui???*/
          <h4>${item.name}</h4>
          <p>${item.description}</p>
          <h3>${item.price}</h3>
        <div>    
      `;
  
    button.addEventListener('click', () => {
      const chosenOption = button.classList.contains('selected');
      document.querySelectorAll(`.option-card[data-type="${type}"]`).forEach(b => b.classList.remove('selected'));
      if (!chosenOption) {
        button.classList.add('selected');
        if (type === 'broth') {
          selected_broth_id = item.id;
          console.log('selected brtoh:', selected_broth_id); 
        } else {
          selected_protein_id = item.id;
          console.log('selected broth:', selected_protein_id); 
          /*só pra conferir*/
        }
      } else {
        if (type === 'broth') {
          selected_broth_id = null;
        } else {
          selected_protein_id = null;
        }
      }
    });
    return button;
  }
  

  async function loadBroths() {
    const broths = await optionBroth();
    broths.forEach(broth => {
      const button = createButton(broth, 'broth');
      brothsContainer.appendChild(button);
    });
  }

  async function loadProteins() {
    const proteins = await optionProtein();
    proteins.forEach(protein => {
      const button = createButton(protein, 'protein');
      proteinsContainer.appendChild(button);
    });
  }

  async function createNewOrder() {
    if (!selected_broth_id || !selected_protein_id) {
      const modal = document.getElementById('myModal');
      const modalMessage = document.getElementById('modal-message');
      modal.style.display = 'block';
      modalMessage.textContent = 'Please select a broth and a protein.';

      const closeButton = document.querySelector('.close');
      closeButton.addEventListener('click', () => {
        modal.style.display = 'none'; 
      });
  
      return; 
    }
  
    const result = await createOrder(selected_broth_id, selected_protein_id);
    /*só teste*/
    if (result.orderId) {
      mainContent.innerHTML = `
        <h1>Sucesso</h1>
        <p>Obrigado</p>
        <a href="index.html">Volta</a>
      `;
    } else {
      orderResult.textContent = `Error creating order: ${result.message}`;
    }
  }
  
  
  orderButton.addEventListener('click', createNewOrder);

  await loadBroths();
  await loadProteins();
});
