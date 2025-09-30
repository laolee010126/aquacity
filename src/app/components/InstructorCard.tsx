import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./ImageWithFallback";
import { Award } from "lucide-react";

interface InstructorCardProps {
  name: string;
  photo: string;
  specialty: string[];
  rating: number;
  description: string;
}

export function InstructorCard({
  name,
  photo,
  specialty,
  rating,
  description
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
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
            <span className="text-yellow-500">⭐</span>
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        
        <div className="text-center">
          <h3 className="text-lg md:text-xl font-bold mb-1">{name}</h3>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground mb-4 text-center">{description}</p>

        <div>
          <h4 className="font-medium mb-2 flex items-center gap-2">
            <Award className="w-4 h-4 text-blue-600" />
            전문 분야
          </h4>
          <div className="flex flex-wrap gap-2">
            {specialty.map((spec, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {spec}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
