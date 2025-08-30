import { Parallax } from "react-parallax";

const Cover = ({ coverBg, title, desc }) => {
  return (
    <Parallax
      blur={{ min: -20, max: 20 }}
      bgImage={coverBg}
      bgImageAlt="cover background"
      strength={400}
    >
      <div className="relative hero h-[600px] z-0 flex items-center justify-center">
        {/* Gradient overlay for dramatic effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/50"></div>

        {/* Content */}
        <div className="relative bg-black/30 rounded-md text-center text-white z-0 px-6 py-8">
          <h1 className="mb-6 text-4xl md:text-6xl font-extrabold tracking-wide uppercase drop-shadow-2xl animate-fade-in">
            {title}
          </h1>
          <p className="mb-8 max-w-2xl mx-auto text-lg md:text-xl text-gray-200 leading-relaxed animate-slide-up">
            {desc}
          </p>
        </div>
      </div>
    </Parallax>
  );
};

export default Cover;