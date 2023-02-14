import Head from "../../components/head/Head";
import TodoList from "../../components/todoList/TodoList";

const Index = () => {
  return (
    <div className="container py-16 px-6 mx-auto min-h-screen">
      <Head />
      <TodoList />
    </div>
  );
};

export default Index;
