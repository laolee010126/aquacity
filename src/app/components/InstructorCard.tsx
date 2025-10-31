import { Card, CardHeader } from "./ui/card";
import { ImageWithFallback } from "./ImageWithFallback";

interface InstructorCardProps {
  name: string;
  photo: string;
  specialty?: string[];
  description?: string;
}

export function InstructorCard({
  name,
  photo
}: InstructorCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="relative mb-4">
          <ImageWithFallback
            src={photo}
            alt={`강사 ${name}`}
            className="w-full h-48 md:h-56 object-cover rounded-md"
          />
        </div>
        
        <div className="text-center">
          <h3 className="text-lg md:text-xl font-bold mb-1">{name}</h3>
        </div>
      </CardHeader>
      
    </Card>
  );
}
