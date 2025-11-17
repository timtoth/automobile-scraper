import CarInfoLanding from './components/CarInfoLanding/CarInfoLanding'
import './App.css';

const styles = {
  header: "w-full max-w-6xl p-4 bg-white shadow-lg rounded-sm mb-6"
};
  
function App() {
  return (
   <div className="flex flex-col items-center p-4">
      
      {/* Main Application Header */}
      <header className={styles.header}>
        <h1 className="text-4xl font-extrabold text-indigo-700 text-center">
          Full-Stack Car Inventory Dashboard
        </h1>
        <p className="text-center text-gray-500 mt-2">
          Data fetched from Node.js API via React frontend.
        </p>
      </header>

      {/* Render the CarInfoLanding Component */}
      <main className="w-full max-w-6xl">
        {/* We now call the function directly as it's defined in this file */}
        <CarInfoLanding /> 
      </main>

      {/* Footer (Optional) */}
      <footer className="mt-8 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Inventory App
      </footer>
    </div>
  );
}

export default App
