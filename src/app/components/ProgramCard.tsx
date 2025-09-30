import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Clock, Users, Award } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

interface ProgramCardProps {
  title: string;
  description: string;
  level: string;
  duration: string;
  capacity: string;
  price: string;
  instructor: string;
  schedule: string[];
  image: string;
  levelColor: "green" | "yellow" | "red" | "blue" | "purple";
}

const levelColors = {
  green: "bg-green-100 text-green-800",
  yellow: "bg-yellow-100 text-yellow-800", 
  red: "bg-red-100 text-red-800",
  blue: "bg-blue-100 text-blue-800",
  purple: "bg-purple-100 text-purple-800"
};

export function ProgramCard({ 
  title, 
  description, 
  level, 
  duration, 
  capacity, 
  price, 
  instructor, 
  schedule, 
  image,
  levelColor 
}: ProgramCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="relative mb-4">
          <ImageWithFallback 
            src={image}
            alt={title}
            className="w-full h-40 md:h-48 object-cover rounded-md"
          />
          <Badge className={`absolute top-3 left-3 ${levelColors[levelColor]}`}>
            {level}
          </Badge>
          {/* Mobile: Show price badge on image */}
          <div className="absolute top-3 right-3 md:hidden bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md">
            <span className="text-sm font-bold text-blue-600">{price}</span>
            <span className="text-xs text-gray-600">/월</span>
          </div>
        </div>
        <div>
          <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
          {/* Desktop: Show price below title */}
          <div className="hidden md:block mt-1">
            <span className="text-xl font-bold text-blue-600">{price}</span>
            <span className="text-sm text-muted-foreground ml-1">/ 월</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <p className="text-muted-foreground mb-4 text-sm md:text-base">{description}</p>
        
        {/* Mobile: Compact info grid */}
        <div className="grid grid-cols-2 gap-3 md:space-y-3 md:block">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>{duration}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>{capacity}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm col-span-2">
            <Award className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>강사: {instructor}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium mb-2 text-sm md:text-base">수업 시간</h4>
          <div className="space-y-1">
            {schedule.slice(0, 2).map((time, index) => (
              <div key={index} className="text-xs md:text-sm text-muted-foreground bg-gray-50 px-2 py-1 rounded">
                {time}
              </div>
            ))}
            {schedule.length > 2 && (
              <div className="text-xs text-muted-foreground text-center py-1">
                +{schedule.length - 2}개 시간대 더 보기
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
    </Card>
  );
}
