'use client'

import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Clock } from "lucide-react";
import { useState } from "react";

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
  curriculumContent?: string;
  requirements?: string;
  children?: Array<{
    title: string;
    level: string;
    curriculumContent?: string;
    requirements?: string;
  }>;
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
  levelColor,
  curriculumContent,
  requirements,
  children
}: ProgramCardProps) {
  const [isScheduleExpanded, setIsScheduleExpanded] = useState(false);

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="mb-4">
          <Badge className={`${levelColors[levelColor]}`}>
            {level}
          </Badge>
        </div>
        <div>
          <CardTitle className="text-lg md:text-xl">{title}</CardTitle>
          <div className="mt-1">
            <span className="text-xl font-bold text-blue-600">{price}</span>
            <span className="text-sm text-muted-foreground ml-1">/ 월</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1">
        <p className="text-muted-foreground mb-4 text-sm md:text-base">{description}</p>

        {/* Curriculum Content */}
        {curriculumContent && (
          <div className="mb-3 bg-blue-50 p-2 rounded text-xs">
            <span className="font-medium">수업 내용:</span> {curriculumContent}
          </div>
        )}

        {/* Requirements */}
        {requirements && (
          <div className="mb-3 bg-yellow-50 p-2 rounded text-xs border border-yellow-200">
            <span className="font-medium">수강 조건:</span> {requirements}
          </div>
        )}

        {/* Sub-levels */}
        {children && children.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-medium text-gray-700 mb-2">세부 단계</h4>
            <div className="flex flex-wrap gap-2">
              {children.map((child, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded border border-red-200"
                  title={child.curriculumContent || child.requirements || ''}
                >
                  {child.level}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <span>{duration}</span>
        </div>
        
        <div className="mt-4">
          <h4 className="font-medium mb-2 text-sm md:text-base">수업 시간</h4>
          <div className="space-y-1">
            {schedule.slice(0, isScheduleExpanded ? schedule.length : 2).map((time, index) => (
              <div key={index} className="text-xs md:text-sm text-muted-foreground bg-gray-50 px-2 py-1 rounded">
                {time}
              </div>
            ))}
            {schedule.length > 2 && (
              <button
                onClick={() => setIsScheduleExpanded(!isScheduleExpanded)}
                className="text-xs text-blue-600 hover:text-blue-800 text-center py-1 w-full hover:bg-blue-50 rounded transition-colors cursor-pointer"
              >
                {isScheduleExpanded ? '접기' : `+${schedule.length - 2}개 시간대 더 보기`}
              </button>
            )}
          </div>
        </div>
      </CardContent>
      
    </Card>
  );
}
