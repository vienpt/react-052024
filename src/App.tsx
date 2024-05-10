import BasicForm from "@/components/BasicForm.tsx";
import FormHook from "@/components/form-hook.tsx";

function App() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="container">
        <BasicForm />
        <FormHook />
      </div>
    </main>
  );
}

export default App;
