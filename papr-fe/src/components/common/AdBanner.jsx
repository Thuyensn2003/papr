import Image from "next/image";

const AdBanner = () => {
  return (
    <div className="add-container m-b-xs-60">
      <a href="">
        <Image
          src="/images/clientbanner/clientbanner.jpg"
          alt="Ad Banner"
          width={728}
          height={90}
          className="w-100"
        />
      </a>
    </div>
  );
}

export default AdBanner;