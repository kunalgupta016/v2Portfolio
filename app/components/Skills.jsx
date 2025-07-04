"use client";
import { motion } from "framer-motion";

const skills = [
  {
    name: "HTML",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    name: "CSS",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    name: "JavaScript",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "React",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg",
    url: "https://reactjs.org/",
  },
  {
    name: "Tailwind CSS",
    logo: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
    url: "https://tailwindcss.com/",
  },
  {
    name: "Git",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg",
    url: "https://git-scm.com/",
  },
  {
    name: "Framer Motion",
    logo: "https://seeklogo.com/images/F/framer-motion-logo-DA1E33CAA1-seeklogo.com.png",
    url: "https://www.framer.com/motion/",
  },
  {
    name: "Node.js",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg",
    url: "https://nodejs.org/",
  },
  {
    name: "MongoDB",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original.svg",
    url: "https://www.mongodb.com/",
  },
  {
    name: "Python",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg",
    url: "https://www.python.org/",
  },
  {
    name: "NumPy",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/31/NumPy_logo_2020.svg",
    url: "https://numpy.org/",
  },
  {
    name: "Pandas",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Pandas_logo.svg",
    url: "https://pandas.pydata.org/",
  },
  {
    name: "Matplotlib",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT82xL7k4Jg3wY8lvMswfzZvUyJMhGmv-MaDQ&s",
    url: "https://matplotlib.org/",
  },
  {
    name: "C",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/c/c-original.svg",
    url: "https://en.wikipedia.org/wiki/C_(programming_language)",
  },
  {
    name: "C++",
    logo: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg",
    url: "https://isocpp.org/",
  },
  {
    name: "Scikit-Learn",
    logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
    url: "https://scikit-learn.org/",
  },
  {
    name: "Machine Learning",
    logo: "https://i0.wp.com/www.wi6labs.com/wp-content/uploads/2019/12/Machine-learning-logo-1.png?ssl=1",
    url: "https://en.wikipedia.org/wiki/Machine_learning",
  },
];

export default function Skills() {
  return (
    <motion.section
      id="skills"
      className="py-24 bg-black text-white px-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Skills
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-lg font-medium text-gray-300 overflow-hidden">
          {skills.map((skill, i) => (
            <motion.a
              key={i}
              href={skill.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center text-center bg-white/5 border border-white/10 rounded-xl py-4 px-6 backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <img
                src={skill.logo}
                alt={skill.name}
                className="w-12 h-12 mb-2 object-contain"
                loading="lazy"
              />
              {skill.name}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
