const url = 'http://localhost:8080/colaboradores';

function carregarColaboradores() {
	const tabela = document.getElementById('colaboradores');
	const linhas = tabela.getElementsByTagName('tr');
	while (linhas.length > 1) {
		tabela.deleteRow(1);
	}

	fetch(url)
	.then(response => {
		if (!response.ok) {
			throw new Error('Erro ao fazer a solicitação.');
		} 
		return response.json();
	})
	.then(colaboradores => {
		colaboradores.forEach(colaborador => {
			const novaLinha = tabela.insertRow(-1);
			const nome = novaLinha.insertCell(0);
			nome.innerHTML = colaborador.nome;
			const percentual = novaLinha.insertCell(1);
			percentual.innerHTML = colaborador.score;
      const percentualDesc = novaLinha.insertCell(2);
			percentualDesc.innerHTML = montarDescricaoPercentual(colaborador.score);
			const editar = novaLinha.insertCell(3);
			const btnEditar = document.createElement('button');
			btnEditar.textContent = 'Editar';
			btnEditar.addEventListener('click', () => editarColaborador(colaborador));
			editar.appendChild(btnEditar);
			const deletar = novaLinha.insertCell(4);
			const btnDeletar = document.createElement('button');
			btnDeletar.textContent = 'Deletar';
            console.log(colaborador.id);
			btnDeletar.addEventListener('click', () => deletarColaborador(colaborador.id));
			deletar.appendChild(btnDeletar);
		});
	})
	.catch(error => console.error(error));
}

function montarDescricaoPercentual(score) {
    let descricao = null;
    if (score >= 0 && score < 20) { 
        descricao = "Ruim"; 
    } else if (score >= 20 && score < 40) { 
        descricao = "Mediana"; 
    } else if (score >= 40 && score < 60) { 
        descricao = "Bom"; 
    } else if (score >= 60 && score < 80) { 
        descricao = "Forte"; 
    } else if (score >= 80 && score <= 100) { 
        descricao = "Muito Forte"; 
    }
    return descricao;
}

async function deletarColaborador(id) {
    try {
        let response;
           response = await fetch(`${url}/${id}`, {
           method: 'DELETE',
           headers: { 'Content-Type': 'application/json' },
        });
      if (!response.ok) { 
         throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      window.location.href = 'index.html';
  
    } catch (error) {
      console.error(error);
      alert(`Erro ao deletar colaborador: ${error.message}`);
    }
}

async function editarColaborador(colaborador) {
    try {
        console.log(colaborador);
        let response;
           response = await fetch(`${url}/${colaborador.id}`, {
           method: 'PUT',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(colaborador)
        });
      if (!response.ok) {
         throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }
      window.location.href = 'index.html';
  
    } catch (error) {
      console.error(error);
      alert(`Erro ao deletar colaborador: ${error.message}`);
    }
}

const form = document.querySelector('#formColaborador');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); 

  const nome = document.querySelector('#nome').value;
  const senha = document.querySelector('#senha').value;

  const colaborador = { nome, senha };

  try {
    let response;
      response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(colaborador)
      });

    if (!response.ok) { 
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    window.location.href = 'index.html';

  } catch (error) {
    console.error(error);
    alert(`Erro ao salvar colaborador: ${error.message}`);
  }
});


// carrega os colaboradores ao carregar a página
document.addEventListener('DOMContentLoaded', carregarColaboradores);