import { Button } from "./components/Button";
import { useApi } from "./hook/useApi";
import "./styles.css";

// 1. [ x ] fazer um fetch da api https://jsonplaceholder.typicode.com/todos
// 2. [ x ] não usar axios ou qualquer outra lib, usar diretamente o fetch
// 3. [ x ] pegar o resultado e mostrar na pagina:
//    - [ x ] ID e Título
//    - [ x ] com flexbox deixar o ID a esquerda e os títulos a direita
// 4. [ x ] fazer uma filtragem: exibir apenas títulos com a primeira letra S
// 5. [ x ] adicionar um background cinza nas linhas pares com JS
// 6. [ x ] implementar paginação, botão de próximo e anterior, de 2 em 2

export default function App() {
  const {
    data,
    error,
    isLoading,
    totalPages,
    currentPage,
    isPrev,
    isNext,
    reload,
    prev,
    next,
  } = useApi({
    endpoint: "todos",
    limit: 2,
  });

  if (!!error) {
    return (
      <>
        <h1> Error </h1>
        <button onClick={() => reload()}> Recarregar </button>
      </>
    );
  }

  if (isLoading) return <h1> Carregando </h1>;

  return (
    <div className="App">
      <h1>FutureBrand Teste</h1>

      <ul className="todo-list">
        {data.map((todo, index) => (
          <li
            className={`todo-item ${index % 2 === 0 ? "todo-even" : ""}`}
            key={todo.id}
          >
            <p>{todo.id}</p>
            <p>{todo.title}</p>
          </li>
        ))}
      </ul>
      <div className="todo-pagination">
        <Button onClick={() => prev()} disabled={!isPrev}>
          prev
        </Button>
        <p>
          {currentPage + 1} de {totalPages}
        </p>
        <Button onClick={() => next()} disabled={!isNext}>
          next
        </Button>
      </div>
    </div>
  );
}
