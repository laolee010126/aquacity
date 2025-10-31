export type LevelType = 'beginner' | 'intermediate' | 'advanced' | 'kids' | 'free' | '';

export interface LaneInfo {
  lane: number | string;
  program: string;
  instructor: string;
  level: LevelType;
}

export interface TimeSlot {
  [time: string]: LaneInfo[];
}

export interface ScheduleData {
  [day: string]: TimeSlot;
}

export const scheduleData: ScheduleData = {
  "월/수": {
    "06:00~06:50": [
      { lane: 1, program: "초/중급", instructor: "유채연", level: "intermediate" },
      { lane: 2, program: "상급(숨차)", instructor: "김동복", level: "advanced" },
      { lane: 3, program: "고급(백호)", instructor: "박경미", level: "advanced" },
      { lane: 4, program: "자유수영", instructor: "", level: "free" },
      { lane: "유수풀", program: "걷기레인", instructor: "", level: "free" }
    ],
    "07:00~07:50": [
      { lane: 1, program: "기초", instructor: "김동복", level: "beginner" },
      { lane: 2, program: "중급", instructor: "유채연", level: "intermediate" },
      { lane: 3, program: "고급(노랭이)", instructor: "박경미", level: "advanced" }
    ],
    "08:00~08:50": [
      { lane: 1, program: "초/중급", instructor: "김동복", level: "intermediate" },
      { lane: 2, program: "상급", instructor: "유채연", level: "advanced" },
      { lane: 3, program: "고급(스마일)", instructor: "", level: "advanced" },
      { lane: 4, program: "", instructor: "박경미", level: "" }
    ],
    "09:00~09:50": [
      { lane: 1, program: "기초", instructor: "문정서", level: "beginner" },
      { lane: 2, program: "상급", instructor: "박경미", level: "advanced" },
      { lane: 3, program: "고급(악)", instructor: "김동복", level: "advanced" },
      { lane: 4, program: "자유수영", instructor: "", level: "free" },
      { lane: "유수풀", program: "수중건강", instructor: "", level: "free" }
    ],
    "10:00~10:50": [
      { lane: 1, program: "기초", instructor: "유채연", level: "beginner" },
      { lane: 2, program: "중/상급", instructor: "박경미", level: "intermediate" }
    ],
    "10:00~17:00": [
      { lane: "전체", program: "워터파크", instructor: "", level: "free" }
    ],
    "17:00~17:45": [
      { lane: 1, program: "키즈 기/초급", instructor: "문정서", level: "kids" },
      { lane: 2, program: "키즈 중/상급", instructor: "여이수", level: "kids" },
      { lane: 3, program: "자유수영", instructor: "", level: "free" },
      { lane: 4, program: "자유수영", instructor: "", level: "free" },
      { lane: "유수풀", program: "걷기레인", instructor: "", level: "free" }
    ],
    "18:00~18:50": [
      { lane: 1, program: "중급", instructor: "문정서", level: "intermediate" },
      { lane: 2, program: "고급", instructor: "", level: "advanced" },
      { lane: 3, program: "", instructor: "여이수", level: "" }
    ],
    "19:00~19:50": [
      { lane: 1, program: "기초", instructor: "문정서", level: "beginner" },
      { lane: 2, program: "중급", instructor: "문정서", level: "intermediate" },
      { lane: 3, program: "고급", instructor: "", level: "advanced" },
      { lane: 4, program: "", instructor: "여이수", level: "" }
    ],
    "20:00~20:50": [
      { lane: 1, program: "중급", instructor: "문정서", level: "intermediate" },
      { lane: 2, program: "고급", instructor: "여이수", level: "advanced" },
      { lane: 3, program: "자유수영", instructor: "", level: "free" },
      { lane: 4, program: "자유수영", instructor: "", level: "free" }
    ]
  },
  "화/목": {
    "06:00~06:50": [
      { lane: 1, program: "중/상급", instructor: "유채연", level: "intermediate" },
      { lane: 2, program: "고급(해달)", instructor: "", level: "advanced" },
      { lane: 3, program: "", instructor: "박경미", level: "" },
      { lane: 4, program: "자유수영", instructor: "", level: "free" },
      { lane: "유수풀", program: "걷기레인", instructor: "", level: "free" }
    ],
    "07:00~07:50": [
      { lane: 1, program: "초급", instructor: "유채연", level: "beginner" },
      { lane: 2, program: "고급(폼생폼수)", instructor: "박경미", level: "advanced" },
      { lane: 3, program: "자유수영", instructor: "", level: "free" }
    ],
    "08:00~08:50": [
      { lane: 1, program: "아쿠아로빅", instructor: "", level: "free" }
    ],
    "09:00~09:50": [
      { lane: 1, program: "초/중급", instructor: "유채연", level: "intermediate" },
      { lane: 2, program: "고급", instructor: "박경미", level: "advanced" },
      { lane: 3, program: "자유수영", instructor: "", level: "free" }
    ],
    "10:00~10:50": [
      { lane: 1, program: "기초", instructor: "유채연", level: "beginner" },
      { lane: 2, program: "중/상급", instructor: "박경미", level: "intermediate" }
    ],
    "17:00~17:45": [
      { lane: 1, program: "키즈 초/중급", instructor: "문정서", level: "kids" },
      { lane: 2, program: "키즈 중/상급", instructor: "여이수", level: "kids" },
      { lane: 3, program: "키즈 마스터즈", instructor: "김동복", level: "kids" },
      { lane: 4, program: "자유수영", instructor: "", level: "free" },
      { lane: "유수풀", program: "걷기레인", instructor: "", level: "free" }
    ],
    "18:00~18:50": [
      { lane: 1, program: "키즈 중/상급", instructor: "여이수", level: "kids" },
      { lane: 2, program: "초/중급", instructor: "김동복", level: "intermediate" },
      { lane: 3, program: "기초", instructor: "문정서", level: "beginner" }
    ],
    "19:00~19:50": [
      { lane: 1, program: "기/초급", instructor: "문정서", level: "beginner" },
      { lane: 2, program: "중급", instructor: "여이수", level: "intermediate" },
      { lane: 3, program: "상/고급", instructor: "김동복", level: "advanced" }
    ],
    "20:00~20:50": [
      { lane: 1, program: "기/초급", instructor: "문정서", level: "beginner" },
      { lane: 2, program: "중급", instructor: "여이수", level: "intermediate" },
      { lane: 3, program: "상/고급", instructor: "김동복", level: "advanced" }
    ]
  },
  "금": {
    "06:00~06:50": [
      { lane: 1, program: "기/초급", instructor: "유채연", level: "beginner" },
      { lane: 2, program: "중/상급", instructor: "김동복", level: "intermediate" },
      { lane: 3, program: "자유수영", instructor: "", level: "free" },
      { lane: "유수풀", program: "걷기레인", instructor: "", level: "free" }
    ],
    "07:00~07:50": [
      { lane: 1, program: "중급", instructor: "유채연", level: "intermediate" },
      { lane: 2, program: "상급", instructor: "김동복", level: "advanced" }
    ],
    "08:00~08:50": [
      { lane: 1, program: "기/초급", instructor: "유채연", level: "beginner" },
      { lane: 2, program: "중급", instructor: "김동복", level: "intermediate" },
      { lane: 3, program: "상급", instructor: "", level: "advanced" },
      { lane: 4, program: "", instructor: "김동복", level: "" }
    ],
    "09:00~09:50": [
      { lane: 1, program: "기/초급", instructor: "유채연", level: "beginner" },
      { lane: 2, program: "중급", instructor: "김동복", level: "intermediate" },
      { lane: 3, program: "상급", instructor: "김동복", level: "advanced" },
      { lane: 4, program: "자유수영", instructor: "", level: "free" }
    ],
    "17:00~17:45": [
      { lane: 1, program: "키즈 기/초급", instructor: "문정서", level: "kids" },
      { lane: 2, program: "키즈중/상급", instructor: "여이수", level: "kids" },
      { lane: 3, program: "자유수영", instructor: "", level: "free" },
      { lane: "유수풀", program: "걷기레인", instructor: "", level: "free" }
    ],
    "18:00~18:50": [
      { lane: 1, program: "초/중급", instructor: "문정서", level: "intermediate" },
      { lane: 2, program: "상/고급", instructor: "여이수", level: "advanced" }
    ],
    "19:00~19:50": [
      { lane: 1, program: "기/초급", instructor: "문정서", level: "beginner" },
      { lane: 2, program: "중/상급", instructor: "여이수", level: "intermediate" }
    ],
    "20:00~20:50": [
      { lane: 1, program: "중급", instructor: "여이수", level: "intermediate" },
      { lane: 2, program: "기/초급", instructor: "문정서", level: "beginner" }
    ]
  },
  "주말": {
    "06:00~06:50": [
      { lane: 1, program: "자유수영", instructor: "", level: "free" }
    ],
    "07:00~07:50": [
      { lane: 1, program: "기/초/중급", instructor: "장세건", level: "intermediate" }
    ],
    "08:00~08:50": [
      { lane: 1, program: "자유수영", instructor: "", level: "free" }
    ]
  }
};
