"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

export default function SignInPage() {

    type formData = {
        email: string,
        password: string
    }
    const router = useRouter()
    const form = useForm(
        {
            defaultValues : {
                email : "",
                password : ""
            }
        }
    );
    const onSubmit = async(data :formData)=>{
        try {
            const response = await axios.post("http://localhost:8080/users/sign-in" , data);
            if(response.status==200){
                console.log("The response has been submitted succesfully")
                router.push("/")
            }else{
                alert("There is an error in logging in.......")
            }
        }catch(error){
            console.log("The error in logging in is : " , error);
            throw new Error("Logging in error")
        }

    }
  return (
    <section
      className="min-h-screen w-full flex items-center justify-center bg-black/70 backdrop-blur-xl"
      style={{ backgroundImage: "url('/bg-img.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="flex flex-row w-full max-w-4xl items-center justify-center gap-0 md:gap-12">
        {/* Left: W3ins branding */}
        <div className="flex-1 flex flex-col items-center md:items-start justify-center">
          <h1 className="text-6xl md:text-7xl font-bold font-poppins text-white select-none mb-4" style={{ letterSpacing: '0.04em', textShadow: '0 2px 24px #FF8C42' }}>
            W3<span className="italic text-yellow-400">ins</span>
          </h1>
          <p className="text-lg md:text-xl text-[#C0B8AD] font-poppins max-w-xs md:max-w-sm text-center md:text-left">
            Mint your wins, celebrate your journey, and join a community where every W matters.
          </p>
        </div>
        {/* Right: Sign In Form */}
        <div
          className="flex-1 max-w-md min-h-[260px] bg-[#1A1A1A]/90 rounded-3xl shadow-xl border border-white/20 p-8 md:p-10 font-poppins relative flex flex-col items-center justify-center"
          style={{ boxShadow: '0 0 8px 1px #FF8C42, 0 0 0 1px #FF8C42 inset' }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center tracking-wide" style={{ color: '#F5F5F5', letterSpacing: '0.02em' }}>
            Welcome Back to <span className="italic text-yellow-400">W3ins</span>
          </h2>
          <p className="text-[#C0B8AD] text-center text-base mb-4">Sign in to continue your journey!</p>
          <form className="w-full flex flex-col gap-3" onSubmit={form.handleSubmit(onSubmit)}>
            <label className="font-medium" style={{ color: '#C0B8AD' }}>Email</label>
            <input type="email" placeholder="Enter your email" className="rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" style={{ background: '#2C2C2C', border: '1px solid #3A3A3A', color: '#F5F5F5' }} {...form.register("email")} />
            <div className="border-t border-[#3A3A3A] my-1" />
            <label className="font-medium" style={{ color: '#C0B8AD' }}>Password</label>
            <input type="password" placeholder="Enter your password" className="rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400" style={{ background: '#2C2C2C', border: '1px solid #3A3A3A', color: '#F5F5F5' }}  {...form.register("password")}/>
            <button
              type="submit"
              className="mt-5 px-6 py-3 rounded-lg text-lg font-normal shadow transition-colors hover:scale-105 hover:shadow-xl duration-200"
              style={{ background: '#C86B27', color: '#FFFFFF', boxShadow: '0 0 12px 2px #FF8C42' }}
            >
              Sign In
            </button>
          </form>
          <div className="mt-6 text-center text-[#C0B8AD] text-base">
            Don't have an account? <a href="/sign-up" className="text-yellow-400 underline hover:text-yellow-300">Sign up</a>
          </div>
        </div>
      </div>
    </section>
  );
}
