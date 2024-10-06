import React, { useState, useEffect } from 'react';
import Button from './styles/components/button/Button';
import Container from './styles/components/container/Container';
import Text from './styles/components/text/Text';
import './styles/main.scss';

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [editandoIndex, setEditandoIndex] = useState(null);
  const [tarefaEditada, setTarefaEditada] = useState('');
  const [menuAbertoIndex, setMenuAbertoIndex] = useState(null);

  const adicionarTarefa = (e) => {
    e.preventDefault();
    if (novaTarefa.trim()) {
      const novaTarefaObj = {
        id: Date.now(),
        texto: novaTarefa,
        concluida: false,
      };
      setTarefas([...tarefas, novaTarefaObj]);
      setNovaTarefa('');
    }
  };

  const marcarComoConcluida = (id) => {
    const novasTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        return { ...tarefa, concluida: !tarefa.concluida };
      }
      return tarefa;
    });
    setTarefas(novasTarefas);
  };

  const editarTarefa = (id) => {
    const tarefa = tarefas.find(tarefa => tarefa.id === id);
    setEditandoIndex(id);
    setTarefaEditada(tarefa.texto);
  };

  const salvarEdicao = (id) => {
    const novasTarefas = tarefas.map(tarefa => {
      if (tarefa.id === id) {
        return { ...tarefa, texto: tarefaEditada };
      }
      return tarefa;
    });
    setTarefas(novasTarefas);
    setEditandoIndex(null);
    setTarefaEditada('');
  };

  const removerTarefa = (id) => {
    const novasTarefas = tarefas.filter(tarefa => tarefa.id !== id);
    setTarefas(novasTarefas);
  };

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setMenuAbertoIndex(menuAbertoIndex === id ? null : id);
  };

  useEffect(() => {
    const fecharMenu = (e) => {
      if (!e.target.closest('.menu-opcoes')) {
        setMenuAbertoIndex(null);
      }
    };

    document.addEventListener('click', fecharMenu);
    return () => {
      document.removeEventListener('click', fecharMenu);
    };
  }, []);

  return (
    <div className='main-container'>
      <h1 className='h1-title'>To-Do List</h1>
      <form onSubmit={adicionarTarefa} className='task-form'>
        <input
          type="text"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          placeholder="Adicionar nova tarefa"
        />
        <button type="submit" className='add-button'>Adicionar</button>
      </form>

      <div className='tasks-container'>
        <div className='todo-container'>
          <h2 className='h2-title'>Tarefas a Fazer</h2>
          <ul className='task-list'>
            {tarefas.filter(tarefa => !tarefa.concluida).map((tarefa) => (
              <li key={tarefa.id} style={{ position: 'relative' }} className='task-item'>
                <input
                  type="checkbox"
                  checked={tarefa.concluida}
                  onChange={() => marcarComoConcluida(tarefa.id)} 
                />
                {editandoIndex === tarefa.id ? (
                  <input
                    type="text"
                    value={tarefaEditada}
                    onChange={(e) => setTarefaEditada(e.target.value)}
                  />
                ) : (
                  tarefa.texto
                )}

                <button onClick={(e) => toggleMenu(e, tarefa.id)} style={{ marginLeft: '10px' }} className='toggle-menu'>...</button>

                {menuAbertoIndex === tarefa.id && (
                  <div className="menu-opcoes" style={{
                    position: 'absolute',
                    top: '100%',
                    left: '10px',
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    padding: '5px',
                    zIndex: 1
                  }}>
                    {editandoIndex === tarefa.id ? (
                      <button onClick={() => salvarEdicao(tarefa.id)}>Salvar</button>
                    ) : (
                      <button onClick={() => editarTarefa(tarefa.id)}>Editar</button>
                    )}
                    <button onClick={() => removerTarefa(tarefa.id)} style={{ marginLeft: '5px' }}>Remover</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className='finish-container'>
          <h2 className='h2-title'>Tarefas Feitas</h2>
          <ul className='task-list'>
            {tarefas.filter(tarefa => tarefa.concluida).map((tarefa) => (
              <li key={tarefa.id} className='task-item'>
                <input
                  type="checkbox"
                  checked={tarefa.concluida}
                  onChange={() => marcarComoConcluida(tarefa.id)}
                />
                {editandoIndex === tarefa.id ? (
                  <input
                    type="text"
                    value={tarefaEditada}
                    onChange={(e) => setTarefaEditada(e.target.value)}
                  />
                ) : (
                  tarefa.texto
                )}

                <button onClick={(e) => toggleMenu(e, tarefa.id)} style={{ marginLeft: '10px' }} className='toggle-menu'>...</button>

                {menuAbertoIndex === tarefa.id && (
                  <div className="menu-opcoes" style={{
                    zIndex: 1
                  }}>
                    {editandoIndex === tarefa.id ? (
                      <button onClick={() => salvarEdicao(tarefa.id)} className='save-btn'>Salvar</button>
                    ) : (
                      <button onClick={() => editarTarefa(tarefa.id)} className='edit-btn'>Editar</button>
                    )}
                    <button onClick={() => removerTarefa(tarefa.id)} style={{ marginLeft: '5px' }} className='remove-btn'>Remover</button>
                  </div>
                )}
              </li>
            ))}
          </ul>

        </div>
      </div>
    </div>
  );
}

export default App;
