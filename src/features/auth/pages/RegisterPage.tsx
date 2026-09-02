import RegisterForm from "../components/RegisterForm"
import { Link } from "react-router-dom"

export default function RegisterPage(){
  return (
    <main className="min-h-screen bg-[#171B36] text-white px-4 py-18 md:py-10 md:pr-12 md:pl-32 transition-all flex flex-col justify-center items-center">
      <div className="w-full max-w-md">

        <header className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Crear <span className="text-[#E50914]">Cuenta</span>
          </h1>
        </header>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm shadow-xl">
          <RegisterForm />

          <p className="mt-6 text-center text-sm text-gray-400">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/login"
              className="text-[#E50914] font-medium hover:underline transition-all">
              Inicia sesión
            </Link>
          </p>

        </div>
        
      </div>
    </main>
  )
}