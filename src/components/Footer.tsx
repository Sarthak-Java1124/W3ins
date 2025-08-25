export default function Footer(){
return (
  <div
    className="flex flex-col items-center justify-center  p-6"
    style={{ backgroundImage: "url('/bg-img.png')" }}
  >
    <h1 className="font-mono text-2xl font-semibold bg-gradient-to-r from-[#9945FF] via-[#43E7AD] to-[#2AF598] ">
      Made By Sarthak Harsh
    </h1>
    <div className="flex gap-2">
      <h1 className="font-mono text-lg text-white ">Let's Connect on</h1>
      <a
        href="https://www.linkedin.com/in/sarthak-harsh-3980b625b"
        target="_blank"
        className="font-mono text-lg text-blue-500"
      >
        Linkedin
      </a>
    </div>
  </div>
);
} 