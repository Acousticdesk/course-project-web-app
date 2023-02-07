(async function () {
  const endpoints = [
    '/residences',
    '/developers',
    '/residence_classes',
    '/construction_technologies',
    '/walls',
    '/insulation',
    '/heating',
    '/renovation',
    '/protected_area',
    '/installment_plan',
    '/installment_plan_term',
    '/parking',
    '/rooms',
  ]
  
  const promises = endpoints.map(endpoint => {
    return fetch(`http://localhost:5000${endpoint}`).then(res => res.json())
  })
  
  const selectOptions = await Promise.all(promises)
  
  const formElement = document.querySelector('form[name="form"]')
  
  if (!formElement) {
    throw new Error('Form was not created')
  }
  
  const selectElements = [...document.querySelectorAll('select')]
  
  selectElements.forEach((selectElement, index) => {
    selectOptions[index].forEach((optionValue) => {
      const option = document.createElement('option')
      
      option.value = optionValue
      option.textContent = optionValue
      
      selectElement.appendChild(option)
    })
  })
  
  formElement.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target)

    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });
    
    // TODO akicha: remove
    payload.installment_plan = "1";
    
    const json = JSON.stringify(payload);
    
    const response = await fetch('http://localhost:5000/prediction', {
      method: 'POST',
      body: json,
      headers: { 'Content-Type': 'application/json' }
    })
    const predictionData = await response.json();
    
    document.querySelector('#price').hidden = false;
    document.querySelector('#price span').textContent = predictionData.prediction;
  })
})()
