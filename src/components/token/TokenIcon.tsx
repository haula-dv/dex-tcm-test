import Image from "next/image";

interface IProps {
  size?: number;
  url: string;
}

export const TokenIcon = ({ url, size = 20 }: IProps) => {
  return (
    <Image
      src={url}
      height={size}
      width={size}
      alt=""
      style={{
        overflow: "hidden",
        borderRadius: "50%",
      }}
    />
  );
};
