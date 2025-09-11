interface HeadType {
  titre: string;
  description: string;
  background: string;
  bg_position: string;
}

const PageHeader: React.FC<HeadType> = ({
  titre,
  description,
  background,
  bg_position,
}) => {
  return (
    <div className={`p-10 bg-[url('${background}')] bg-cover ${bg_position}`}>
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
          <span className=" text-white">{titre}</span>
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PageHeader;
