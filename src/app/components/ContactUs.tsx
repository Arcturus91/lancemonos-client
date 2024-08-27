import React from "react";
import Image from "next/image";

const ContactUs: React.FC = () => {
  const openWhatsApp = () => {
    window.open("https://wa.link/vr6hz4", "_blank");
  };

  return (
    <section className="w-full bg-white py-12">
      <div className="container mx-auto px-4 flex items-center justify-evenly">
        <h2 className="text-4xl font-serif ml-8">
          Listo para cambiar tu vida?
        </h2>

        <button onClick={openWhatsApp} className="lancemonos-button">
          Contáctanos
        </button>
      </div>
    </section>
  );
};

export default ContactUs;
