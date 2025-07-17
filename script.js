async function consultar() {
  const codigo = document.getElementById("codigo").value.trim();
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = "";

  if (!codigo) {
    resultado.innerHTML = "<p>Ingrese un código válido.</p>";
    return;
  }

  try {
    const url = `https://script.google.com/macros/s/AKfycbxHOKnrAEUKuxKA4FSwAsF-V3G8grQ7fy-hM_NVMEwA9lse7VMjEYiVqR2rx-X-HT8N/exec?codigo=${encodeURIComponent(codigo)}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      resultado.innerHTML = `<p><strong>Error:</strong> ${data.error}</p>`;
    } else {
      resultado.innerHTML = `
        <p><strong>Cliente:</strong> ${data.cliente || '-'}</p>
        <p><strong>Pedido:</strong> ${data.pedido}</p>
        <p><strong>Fecha de entrega:</strong> ${data.fecha}</p>
      `;
    }
  } catch (error) {
    resultado.innerHTML = `<p><strong>Error:</strong> ${error.message}</p>`;
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const boton = document.getElementById("btn-consultar");
  if (boton) {
    boton.addEventListener("click", consultar);
  }
});