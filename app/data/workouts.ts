export interface Exercise {
  id: string;
  name: string;
  sets: string;
  reps?: string;
  time?: string;
  tempo?: string;
  load: string;
  notes?: string;
  gif?: string;
  youtube?: string;
}

export interface MobilityExercise {
  id: string;
  name: string;
  reps?: string;
  time?: string;
  notes?: string;
  gif?: string;
  youtube?: string;
}

export interface MobilityBlock {
  title: string;
  duration: string;
  exercises: MobilityExercise[];
}

export interface ShoulderFinisher {
  name: string;
  exercises: MobilityExercise[];
}

export interface WorkoutDay {
  id: number;
  dayOfWeek: string;
  title: string;
  subtitle: string;
  exercises: Exercise[];
  isRest?: boolean;
  shoulderFinisher?: ShoulderFinisher;
}

export interface Week {
  id: number;
  name: string;
  theme: string;
  days: WorkoutDay[];
}

// =============================================================================
// BASE EXERCISE DEFINITIONS - Define each exercise once
// =============================================================================

const BASE_EXERCISES = {
  chestSupportedRow: {
    name: "Chest-Supported DB Row",
    load: "Matched DBs",
    gif: "/exercises/chest-supported-row.gif",
    defaultNotes: "Focus on squeezing shoulder blades together at the top.",
  },
  singleArmRow: {
    name: "1-Arm DB Row (split stance)",
    load: "1 DB",
    gif: "/exercises/single-arm-row.gif",
    defaultNotes:
      "Stagger your stance for stability. Keep hips square to the ground.",
  },
  suitcaseCarry: {
    name: "DB Suitcase Carry",
    load: "1 DB",
    gif: "/exercises/suitcase-carry.gif",
    defaultNotes:
      "Walk tall, don't lean. Builds anti-lateral flexion strength crucial for balance on the board.",
  },
  deadBug: {
    name: "Dead Bug (DBs held straight up)",
    load: "Matched DBs",
    gif: "/exercises/dead-bug.gif",
    defaultNotes:
      "Press DBs toward ceiling throughout. Only lower opposite arm/leg as far as you can maintain flat back.",
  },
  gobletSquat: {
    name: "Goblet Squat",
    load: "1 DB",
    gif: "/exercises/goblet-squat.gif",
    defaultNotes:
      "Explode up from the bottom. This builds the power for quick pop-ups.",
  },
  romanianDeadlift: {
    name: "DB Romanian Deadlift",
    load: "Matched DBs",
    gif: "/exercises/db-rdl.gif",
    defaultNotes:
      "Hinge at hips, keep slight knee bend. Feel stretch in hamstrings, not lower back.",
  },
  kettlebellSwing: {
    name: "Kettlebell Swing",
    load: "Kettlebell",
    gif: "/exercises/kbs.gif",
    defaultNotes:
      "Hinge style - drive with hips, not arms. This is your hip power generator.",
  },
  popUpSprawl: {
    name: "Pop-Up Sprawl → Stand",
    load: "BW",
    gif: "/exercises/pop-up-sprawl.gif",
    defaultNotes:
      "Smooth and controlled. Start prone, sprawl to pop-up position, stand.",
  },
  halfKneelingPress: {
    name: "Half-Kneeling DB Press",
    load: "1 DB",
    gif: "/exercises/half-kneeling-press.gif",
    defaultNotes:
      "Squeeze glute on kneeling side. Press straight up, no lean. Builds rotational stability.",
  },
  floorPress: {
    name: "DB Floor Press",
    load: "Matched DBs",
    gif: "/exercises/floor-press.gif",
    defaultNotes:
      "Elbows at 45 degrees. Control the descent until triceps touch floor.",
  },
  windmill: {
    name: "DB Windmill",
    load: "1 DB",
    gif: "/exercises/windmill.gif",
    defaultNotes:
      "Light weight, focus on hip hinge and thoracic rotation. Keep eyes on the DB overhead.",
  },
  halo: {
    name: "Tall-Kneeling DB Halo",
    load: "1 DB",
    gif: "/exercises/halo.gif",
    defaultNotes:
      "Circle the DB around your head slowly. Engages shoulders and core for paddling stability.",
  },
  reverseLunge: {
    name: "Reverse Lunges (goblet hold)",
    load: "1 DB",
    gif: "/exercises/reverse-lunge.gif",
    defaultNotes: "",
  },
  bentOverRow: {
    name: "Bent-Over DB Rows",
    load: "Matched DBs",
    gif: "/exercises/bent-over-row.gif",
    defaultNotes: "",
  },
  farmerCarry: {
    name: "Farmer Carry",
    load: "Matched DBs",
    gif: "/exercises/farmer-carry.gif",
    defaultNotes: "",
  },
  pushUps: {
    name: "Push-Ups",
    load: "BW",
    gif: undefined,
    defaultNotes: "",
  },
} as const;

type BaseExerciseKey = keyof typeof BASE_EXERCISES;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Create an exercise from a base definition with specific config
 */
function ex(
  id: string,
  baseKey: BaseExerciseKey,
  config: {
    sets: string;
    reps?: string;
    time?: string;
    tempo?: string;
    notes?: string;
    load?: string;
  }
): Exercise {
  const base = BASE_EXERCISES[baseKey];
  return {
    id,
    name: base.name,
    sets: config.sets,
    reps: config.reps,
    time: config.time,
    tempo: config.tempo,
    load: config.load ?? base.load,
    notes: config.notes ?? (base.defaultNotes || undefined),
    gif: base.gif,
  };
}

/**
 * Create a circuit exercise (prefixed with →, no sets)
 */
function circuitEx(
  id: string,
  baseKey: BaseExerciseKey,
  config: { reps?: string; time?: string; notes?: string }
): Exercise {
  const base = BASE_EXERCISES[baseKey];
  return {
    id,
    name: `→ ${base.name}`,
    sets: "",
    reps: config.reps,
    time: config.time,
    load: base.load,
    notes: config.notes,
    gif: base.gif,
  };
}

/**
 * Create a circuit header
 */
function circuitHeader(id: string, rounds: number, notes: string): Exercise {
  return {
    id,
    name: `Circuit: ${rounds} Rounds`,
    sets: `${rounds} rounds`,
    load: "Mixed",
    notes,
  };
}

/**
 * Create a rest day
 */
function restDay(
  id: number,
  dayOfWeek: string,
  subtitle = "Recovery Day"
): WorkoutDay {
  return {
    id,
    dayOfWeek,
    title: "REST",
    subtitle,
    isRest: true,
    exercises: [],
  };
}

// =============================================================================
// MOBILITY & SHOULDER FINISHERS
// =============================================================================

export const DAILY_MOBILITY: MobilityBlock[] = [
  {
    title: "T-Spine + Scap",
    duration: "3-4 min",
    exercises: [
      {
        id: "m1a",
        name: "Quadruped T-Spine Rotation",
        reps: "5/side",
        notes: "Hand behind head, rotate through mid-back. Keep hips square.",
        youtube: "https://www.youtube.com/shorts/IJhZNTsLf-A",
      },
      {
        id: "m1b",
        name: "Scapula Push-Ups",
        reps: "8-10",
        notes: "Push floor away at top, let shoulder blades pinch at bottom.",
        youtube: "https://www.youtube.com/watch?v=NKekqeudgWs",
      },
      {
        id: "m1c",
        name: "Neck CARs",
        reps: "2 circles each way",
        notes: "Slow, controlled circles. Don't force range.",
        youtube: "https://www.youtube.com/shorts/beLPmjhPcWw",
      },
    ],
  },
  {
    title: "Shoulders",
    duration: "2-3 min",
    exercises: [
      {
        id: "m2a",
        name: "Arm Circles (controlled)",
        reps: "10 each direction",
        notes: "Forward and backward. Smooth, not jerky.",
        youtube: "https://www.youtube.com/shorts/2sEZSRbOlVA",
      },
      {
        id: "m2b",
        name: "Shoulder CARs",
        reps: "3 slow reps/side",
        notes: "Biggest circle possible without moving torso.",
        youtube: "https://www.youtube.com/watch?v=9FFiaMIkcNY",
      },
    ],
  },
  {
    title: "Hips",
    duration: "1-2 min",
    exercises: [
      {
        id: "m3a",
        name: "World's Greatest Stretch",
        reps: "3/side",
        notes: "Lunge, elbow to instep, rotate and reach to sky.",
        youtube: "https://www.youtube.com/watch?v=-CiWQ2IvY34",
      },
      {
        id: "m3b",
        name: "Hip Airplanes",
        reps: "3/side",
        notes: "Single leg, rotate torso open and closed. Control balance.",
        youtube: "https://www.youtube.com/watch?v=4XCbYaQGF2o",
      },
    ],
  },
];

const SHOULDER_FINISHER_A: ShoulderFinisher = {
  name: "Long-Lever Hold",
  exercises: [
    {
      id: "sf1",
      name: "Bottom-Up DB Hold",
      time: "20-30 sec/side × 2",
      notes: "Light DB held bottom-up. Builds rotator cuff endurance.",
    },
  ],
};

const SHOULDER_FINISHER_B: ShoulderFinisher = {
  name: "Scap Endurance",
  exercises: [
    {
      id: "sf2a",
      name: "Prone Y-Raise",
      reps: "2×8 slow",
      notes: "Light DBs or bodyweight. Squeeze shoulder blades, thumbs up.",
      youtube: "https://www.youtube.com/watch?v=w1AWGKubE5U",
    },
    {
      id: "sf2b",
      name: "Dead Hang",
      time: "30-45 sec",
      notes: "Passive hang. Let shoulders decompress.",
      youtube: "https://www.youtube.com/shorts/9eY15prKcUY",
    },
  ],
};

// =============================================================================
// WEEK 1 - BASELINE CONTROL
// =============================================================================

const week1: Week = {
  id: 1,
  name: "WEEK 1",
  theme: "BASELINE CONTROL",
  days: [
    {
      id: 1,
      dayOfWeek: "Monday",
      title: "UPPER PULL",
      subtitle: "Paddling Engine",
      shoulderFinisher: SHOULDER_FINISHER_A,
      exercises: [
        ex("1a", "chestSupportedRow", {
          sets: "3",
          reps: "8",
          tempo: "3 sec down",
          notes:
            "Focus on squeezing shoulder blades together at the top. Control the descent for 3 full seconds.",
        }),
        ex("1b", "singleArmRow", { sets: "2", reps: "10/side" }),
        ex("1c", "suitcaseCarry", { sets: "4", time: "30 sec/side" }),
        ex("1d", "deadBug", { sets: "3", reps: "6/side" }),
      ],
    },
    {
      id: 2,
      dayOfWeek: "Tuesday",
      title: "LOWER BODY",
      subtitle: "Pop-Up Power",
      exercises: [
        ex("2a", "gobletSquat", { sets: "3", reps: "6", tempo: "Fast up" }),
        ex("2b", "romanianDeadlift", { sets: "3", reps: "8" }),
        ex("2c", "kettlebellSwing", { sets: "4", reps: "15" }),
        ex("2d", "popUpSprawl", {
          sets: "3",
          reps: "5",
          notes: "Quality over speed.",
        }),
      ],
    },
    restDay(3, "Wednesday"),
    {
      id: 4,
      dayOfWeek: "Thursday",
      title: "UPPER PUSH",
      subtitle: "Rotation Power",
      shoulderFinisher: SHOULDER_FINISHER_B,
      exercises: [
        ex("4a", "halfKneelingPress", { sets: "3", reps: "6/side" }),
        ex("4b", "floorPress", { sets: "3", reps: "8" }),
        ex("4c", "windmill", { sets: "3", reps: "5/side" }),
        ex("4d", "halo", { sets: "3", reps: "8 each direction" }),
      ],
    },
    {
      id: 5,
      dayOfWeek: "Friday",
      title: "FLOW",
      subtitle: "Conditioning",
      exercises: [
        circuitHeader(
          "5a",
          4,
          "Rest 90 sec between rounds. Move with purpose but don't rush."
        ),
        circuitEx("5b", "kettlebellSwing", { reps: "12" }),
        circuitEx("5c", "reverseLunge", { reps: "8 total" }),
        circuitEx("5d", "bentOverRow", { reps: "10" }),
        circuitEx("5e", "farmerCarry", { time: "40 sec" }),
      ],
    },
    restDay(6, "Saturday", "Surf or Recover"),
    restDay(7, "Sunday", "Surf or Recover"),
  ],
};

// =============================================================================
// WEEK 2 - VOLUME PROGRESSION
// =============================================================================

const week2: Week = {
  id: 2,
  name: "WEEK 2",
  theme: "VOLUME PROGRESSION",
  days: [
    {
      id: 8,
      dayOfWeek: "Monday",
      title: "UPPER PULL",
      subtitle: "Paddling Engine +",
      shoulderFinisher: SHOULDER_FINISHER_B,
      exercises: [
        ex("8a", "chestSupportedRow", {
          sets: "4",
          reps: "8",
          tempo: "3 sec down",
          notes: "Added set from Week 1. Same controlled tempo.",
        }),
        ex("8b", "singleArmRow", {
          sets: "3",
          reps: "10/side",
          notes: "One more set than Week 1. Maintain form quality.",
        }),
        ex("8c", "suitcaseCarry", {
          sets: "4",
          time: "40-45 sec/side",
          notes: "Extended time under tension. Stay tall, breathe steadily.",
        }),
        ex("8d", "deadBug", {
          sets: "4",
          reps: "6/side",
          notes: "Added set. Same quality focus - flat back throughout.",
        }),
      ],
    },
    {
      id: 9,
      dayOfWeek: "Tuesday",
      title: "LOWER BODY",
      subtitle: "Pop-Up Power +",
      exercises: [
        ex("9a", "gobletSquat", {
          sets: "4",
          reps: "6",
          tempo: "Fast up",
          notes: "Volume increase. Same explosive intent.",
        }),
        ex("9b", "romanianDeadlift", {
          sets: "4",
          reps: "8",
          notes: "Added set. Keep the stretch-tension in hamstrings.",
        }),
        ex("9c", "kettlebellSwing", {
          sets: "5",
          reps: "15",
          notes: "5 sets now. Short rest between sets (60 sec max).",
        }),
        ex("9d", "popUpSprawl", {
          sets: "4",
          reps: "5",
          notes:
            "Added set. Start adding a bit more speed while staying smooth.",
        }),
      ],
    },
    restDay(10, "Wednesday"),
    {
      id: 11,
      dayOfWeek: "Thursday",
      title: "UPPER PUSH",
      subtitle: "Rotation Power +",
      shoulderFinisher: SHOULDER_FINISHER_A,
      exercises: [
        ex("11a", "halfKneelingPress", {
          sets: "4",
          reps: "6/side",
          notes: "Volume bump. Same technique focus.",
        }),
        ex("11b", "floorPress", {
          sets: "4",
          reps: "8",
          notes: "Added set. Maintain the 45-degree elbow angle.",
        }),
        ex("11c", "windmill", {
          sets: "4",
          reps: "5/side",
          notes: "One more set. Feeling looser in the hips yet?",
        }),
        ex("11d", "halo", {
          sets: "4",
          reps: "8 each direction",
          notes: "Added set. Keep the circles smooth and controlled.",
        }),
      ],
    },
    {
      id: 12,
      dayOfWeek: "Friday",
      title: "FLOW",
      subtitle: "Conditioning +",
      exercises: [
        circuitHeader(
          "12a",
          4,
          "Same structure, try to reduce rest to 75 sec between rounds."
        ),
        circuitEx("12b", "kettlebellSwing", {
          reps: "15",
          notes: "Bumped from 12 reps",
        }),
        circuitEx("12c", "reverseLunge", {
          reps: "10 total",
          notes: "Bumped from 8 reps",
        }),
        circuitEx("12d", "bentOverRow", {
          reps: "12",
          notes: "Bumped from 10 reps",
        }),
        circuitEx("12e", "farmerCarry", {
          time: "45 sec",
          notes: "Extended from 40 sec",
        }),
      ],
    },
    restDay(13, "Saturday", "Surf or Recover"),
    restDay(14, "Sunday", "Surf or Recover"),
  ],
};

// =============================================================================
// WEEK 3 - INTENSITY FOCUS
// =============================================================================

const week3: Week = {
  id: 3,
  name: "WEEK 3",
  theme: "INTENSITY FOCUS",
  days: [
    {
      id: 15,
      dayOfWeek: "Monday",
      title: "UPPER PULL",
      subtitle: "Slow & Strong",
      shoulderFinisher: SHOULDER_FINISHER_A,
      exercises: [
        ex("15a", "chestSupportedRow", {
          sets: "4",
          reps: "5-6",
          tempo: "4 sec down",
          notes: "Slower eccentric now. Fewer reps, more time under tension.",
        }),
        ex("15b", "singleArmRow", {
          sets: "3",
          reps: "6/side",
          tempo: "4 sec down",
          notes: "Same slow tempo. Feel every inch of the movement.",
        }),
        ex("15c", "suitcaseCarry", {
          sets: "4",
          time: "45 sec/side",
          notes: "Maximum time. Stay perfectly vertical.",
        }),
        ex("15d", "deadBug", {
          sets: "4",
          reps: "8/side",
          notes: "Added reps. Slower, more controlled extension.",
        }),
      ],
    },
    {
      id: 16,
      dayOfWeek: "Tuesday",
      title: "LOWER BODY",
      subtitle: "Tension & Power",
      exercises: [
        ex("16a", "gobletSquat", {
          sets: "4",
          reps: "5",
          tempo: "1 sec pause at bottom",
          notes: "Pause squat. Explode from the dead stop.",
        }),
        ex("16b", "romanianDeadlift", {
          sets: "4",
          reps: "6",
          tempo: "4 sec down",
          notes: "Slow eccentric. Deep hamstring stretch.",
        }),
        {
          id: "16c",
          name: "Kettlebell Swing EMOM",
          sets: "10 min",
          reps: "10 every minute",
          load: "Kettlebell",
          notes:
            "Every Minute On the Minute. 10 swings, rest remainder of minute. Repeat for 10 minutes.",
          gif: "/exercises/kbs.gif",
        },
        ex("16d", "popUpSprawl", {
          sets: "4",
          reps: "5",
          notes: "Focus on speed now. Quick and snappy.",
        }),
      ],
    },
    restDay(17, "Wednesday"),
    {
      id: 18,
      dayOfWeek: "Thursday",
      title: "UPPER PUSH",
      subtitle: "Slow & Strong",
      shoulderFinisher: SHOULDER_FINISHER_B,
      exercises: [
        ex("18a", "halfKneelingPress", {
          sets: "4",
          reps: "5/side",
          tempo: "4 sec down",
          notes: "Slow lowering phase. Control is power.",
        }),
        ex("18b", "floorPress", {
          sets: "4",
          reps: "6",
          tempo: "4 sec down",
          notes: "Slow eccentric until triceps touch floor.",
        }),
        ex("18c", "windmill", {
          sets: "4",
          reps: "5/side",
          notes: "Same as Week 2. Maintain the quality.",
        }),
        ex("18d", "halo", {
          sets: "4",
          reps: "10 each direction",
          notes: "Added reps. Slow, deliberate circles.",
        }),
      ],
    },
    {
      id: 19,
      dayOfWeek: "Friday",
      title: "FLOW",
      subtitle: "Endurance Push",
      exercises: [
        circuitHeader(
          "19a",
          5,
          "Added a round. Push through but don't sacrifice form."
        ),
        circuitEx("19b", "kettlebellSwing", { reps: "15" }),
        circuitEx("19c", "reverseLunge", { reps: "10 total" }),
        circuitEx("19d", "bentOverRow", { reps: "12" }),
        circuitEx("19e", "farmerCarry", { time: "45 sec" }),
      ],
    },
    restDay(20, "Saturday", "Surf or Recover"),
    restDay(21, "Sunday", "Surf or Recover"),
  ],
};

// =============================================================================
// WEEK 4 - POWER & DENSITY
// =============================================================================

const week4: Week = {
  id: 4,
  name: "WEEK 4",
  theme: "POWER & DENSITY",
  days: [
    {
      id: 22,
      dayOfWeek: "Monday",
      title: "UPPER PULL",
      subtitle: "Peak Power",
      shoulderFinisher: SHOULDER_FINISHER_B,
      exercises: [
        ex("22a", "chestSupportedRow", {
          sets: "3",
          reps: "6",
          tempo: "Explosive up",
          notes: "Reduced sets, explosive intent. Quality reps only.",
        }),
        ex("22b", "singleArmRow", {
          sets: "2",
          reps: "8/side",
          tempo: "Explosive up",
          notes: "Power focus. Pull fast, control down.",
        }),
        ex("22c", "suitcaseCarry", {
          sets: "3",
          time: "40 sec/side",
          notes: "Slightly reduced. Stay fresh, stay strong.",
        }),
        ex("22d", "deadBug", {
          sets: "3",
          reps: "6/side",
          notes: "Back to baseline. Perfect reps.",
        }),
      ],
    },
    {
      id: 23,
      dayOfWeek: "Tuesday",
      title: "LOWER BODY",
      subtitle: "Explosive Power",
      exercises: [
        ex("23a", "gobletSquat", {
          sets: "6",
          reps: "3",
          tempo: "FAST",
          notes: "Power clusters. 3 explosive reps, long rest between sets.",
        }),
        ex("23b", "romanianDeadlift", {
          sets: "3",
          reps: "6",
          notes: "Reduced volume. Maintain quality.",
        }),
        {
          id: "23c",
          name: "Kettlebell Swing EMOM",
          sets: "15 min",
          reps: "10 every minute",
          load: "Kettlebell",
          notes: "Extended to 15 minutes. This is your peak conditioning test.",
          gif: "/exercises/kbs.gif",
        },
        ex("23d", "popUpSprawl", {
          sets: "4",
          reps: "3",
          notes: "Fast and crisp. Like you're catching a wave.",
        }),
      ],
    },
    restDay(24, "Wednesday"),
    {
      id: 25,
      dayOfWeek: "Thursday",
      title: "UPPER PUSH",
      subtitle: "Peak Power",
      shoulderFinisher: SHOULDER_FINISHER_A,
      exercises: [
        ex("25a", "halfKneelingPress", {
          sets: "3",
          reps: "5/side",
          tempo: "Explosive up",
          notes: "Reduced sets. Explosive pressing power.",
        }),
        ex("25b", "floorPress", {
          sets: "3",
          reps: "6",
          tempo: "Explosive up",
          notes: "Power focus. Fast up, controlled down.",
        }),
        ex("25c", "windmill", {
          sets: "3",
          reps: "5/side",
          notes: "Reduced volume. Maintain mobility.",
        }),
        ex("25d", "halo", {
          sets: "3",
          reps: "8 each direction",
          notes: "Back to baseline. Keep shoulders healthy.",
        }),
      ],
    },
    {
      id: 26,
      dayOfWeek: "Friday",
      title: "BENCHMARK",
      subtitle: "Peak Flow Test",
      exercises: [
        {
          id: "26a",
          name: "Benchmark Circuit: 5 Rounds",
          sets: "5 rounds",
          load: "Mixed",
          notes: "This is your test. Time it. Feel SPRINGY, not smoked.",
        },
        circuitEx("26b", "kettlebellSwing", { reps: "15" }),
        circuitEx("26c", "pushUps", { reps: "10" }),
        circuitEx("26d", "bentOverRow", { reps: "10" }),
        circuitEx("26e", "farmerCarry", { time: "45 sec" }),
      ],
    },
    restDay(27, "Saturday", "Surf or Recover"),
    restDay(28, "Sunday", "Surf or Recover"),
  ],
};

// =============================================================================
// EXPORTS
// =============================================================================

export const workoutPlan: Week[] = [week1, week2, week3, week4];

export function getWorkoutDay(dayId: number): WorkoutDay | undefined {
  for (const week of workoutPlan) {
    const day = week.days.find((d) => d.id === dayId);
    if (day) return day;
  }
  return undefined;
}

export function getWeekForDay(dayId: number): Week | undefined {
  for (const week of workoutPlan) {
    if (week.days.some((d) => d.id === dayId)) {
      return week;
    }
  }
  return undefined;
}
