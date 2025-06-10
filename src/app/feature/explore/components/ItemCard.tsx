import { Card } from "@/components/ui/card";
import Image from "next/image";

const ItemCard = () => {
  return (
    <Card>
      <Image
        src="/path/to/image.jpg"
        alt="Item Image"
        width={500}
        height={300}
      />
    </Card>
  );
};

export default ItemCard;
