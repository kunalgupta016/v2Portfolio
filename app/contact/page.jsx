"use client";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm(
        "service_p1k8gwd",       // ✅ Your EmailJS service ID
        "template_vd3diow",      // ✅ Your EmailJS template ID
        form.current,
        "FIYct977dtpgSCuz_"      // ✅ Your EmailJS public key
      )
      .then(
        () => {
          toast.success("📩 Message sent successfully!");
          form.current.reset();
          setLoading(false);
        },
        (error) => {
          console.log("❌ Email send failed:", error.text);
          toast.error("❌ An error occurred. Please try again.");
          setLoading(false);
        }
      );
  };

  const socials = [
    { icon: "🐙", link: "https://github.com/kunalgupta016" },
    { icon: "💼", link: "https://www.linkedin.com/in/kunal-gupta-1b6065291/" },
    { icon: "🐦", link: "https://x.com/KunalGupta75260" },
    { icon: "📷", link: "https://www.instagram.com/kunal_gupta016/" },
  ];

  return (
    <section id="contact" className="py-20 px-6 bg-black text-white">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center mb-16"
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Let's Create Together
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="glass p-6 rounded-2xl backdrop-blur-md border border-white/10">
              <h3 className="text-2xl font-bold mb-4">Get In Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">📧</div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-400">kunalgupta55005@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">📍</div>
                  <div>
                    <p className="font-semibold">Location</p>
                    <p className="text-gray-400">Jaipur, Rajasthan</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socials.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-all duration-300 hover:scale-110"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            ref={form}
            onSubmit={handleSubmit}
            className="space-y-6"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="glass p-8 rounded-2xl backdrop-blur-md border border-white/10">
              <div className="space-y-6">
                <input
                  type="text"
                  name="name" // ✅ Must match template var
                  placeholder="Your Name"
                  className="w-full p-4 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="email"
                  name="email" // ✅ Must match template var
                  placeholder="Your Email"
                  className="w-full p-4 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="w-full p-4 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows="5"
                  className="w-full p-4 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition-transform duration-300"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </div>
          </motion.form>
        </div>
      </div>

      {/* Toast container */}
      <ToastContainer position="bottom-center" theme="dark" />
    </section>
  );
};

export default Contact;
