export interface Exercise {
  id: string;
  name: string;
  sets: string;
  reps?: string;
  time?: string;
  tempo?: string;
  load: string;
  notes?: string;
  gif?: string; // Path to exercise demonstration GIF
  youtube?: string; // YouTube video URL for exercise demo
}

export interface MobilityExercise {
  id: string;
  name: string;
  reps?: string;
  time?: string;
  notes?: string;
  gif?: string;
  youtube?: string; // YouTube video URL for exercise demo
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

// Standard Daily Mobility Warmup (5-8 min) - Same for every workout
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
      },
      {
        id: "m2b",
        name: "Shoulder CARs",
        reps: "3 slow reps/side",
        notes: "Biggest circle possible without moving torso.",
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
      },
      {
        id: "m3b",
        name: "Hip Airplanes",
        reps: "3/side",
        notes: "Single leg, rotate torso open and closed. Control balance.",
      },
    ],
  },
];

// Shoulder finisher options for upper body days
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
    },
    {
      id: "sf2b",
      name: "Dead Hang",
      time: "30-45 sec",
      notes: "Passive hang. Let shoulders decompress.",
    },
  ],
};

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
        {
          id: "1a",
          name: "Chest-Supported DB Row",
          sets: "3",
          reps: "8",
          tempo: "3 sec down",
          load: "Matched DBs",
          notes:
            "Focus on squeezing shoulder blades together at the top. Control the descent for 3 full seconds.",
          gif: "/exercises/chest-supported-row.gif",
        },
        {
          id: "1b",
          name: "1-Arm DB Row (split stance)",
          sets: "2",
          reps: "10/side",
          load: "1 DB",
          notes:
            "Stagger your stance for stability. Keep hips square to the ground.",
          gif: "/exercises/single-arm-row.gif",
        },
        {
          id: "1c",
          name: "DB Suitcase Carry",
          sets: "4",
          time: "30 sec/side",
          load: "1 DB",
          notes:
            "Walk tall, don't lean. This builds the anti-lateral flexion strength crucial for balance on the board.",
          gif: "/exercises/suitcase-carry.gif",
        },
        {
          id: "1d",
          name: "Dead Bug (DBs held straight up)",
          sets: "3",
          reps: "6/side",
          load: "Matched DBs",
          notes:
            "Press DBs toward ceiling throughout. Only lower opposite arm/leg as far as you can maintain flat back.",
          gif: "/exercises/dead-bug.gif",
        },
      ],
    },
    {
      id: 2,
      dayOfWeek: "Tuesday",
      title: "LOWER BODY",
      subtitle: "Pop-Up Power",
      exercises: [
        {
          id: "2a",
          name: "Goblet Squat",
          sets: "3",
          reps: "6",
          tempo: "Fast up",
          load: "1 DB",
          notes:
            "Explode up from the bottom. This builds the power for quick pop-ups.",
          gif: "/exercises/goblet-squat.gif",
        },
        {
          id: "2b",
          name: "DB Romanian Deadlift",
          sets: "3",
          reps: "8",
          load: "Matched DBs",
          notes:
            "Hinge at hips, keep slight knee bend. Feel stretch in hamstrings, not lower back.",
          gif: "/exercises/db-rdl.gif",
        },
        {
          id: "2c",
          name: "Kettlebell Swing",
          sets: "4",
          reps: "15",
          load: "Kettlebell",
          notes:
            "Hinge style - drive with hips, not arms. This is your hip power generator.",
          gif: "/exercises/kbs.gif",
        },
        {
          id: "2d",
          name: "Pop-Up Sprawl → Stand",
          sets: "3",
          reps: "5",
          load: "BW",
          notes:
            "Smooth and controlled. Start prone, sprawl to pop-up position, stand. Quality over speed.",
          gif: "/exercises/pop-up-sprawl.gif",
        },
      ],
    },
    {
      id: 3,
      dayOfWeek: "Wednesday",
      title: "REST",
      subtitle: "Recovery Day",
      isRest: true,
      exercises: [],
    },
    {
      id: 4,
      dayOfWeek: "Thursday",
      title: "UPPER PUSH",
      subtitle: "Rotation Power",
      shoulderFinisher: SHOULDER_FINISHER_B,
      exercises: [
        {
          id: "4a",
          name: "Half-Kneeling DB Press",
          sets: "3",
          reps: "6/side",
          load: "1 DB",
          notes:
            "Squeeze glute on kneeling side. Press straight up, no lean. Builds rotational stability.",
          gif: "/exercises/half-kneeling-press.gif",
        },
        {
          id: "4b",
          name: "DB Floor Press",
          sets: "3",
          reps: "8",
          load: "Matched DBs",
          notes:
            "Elbows at 45 degrees. Control the descent until triceps touch floor.",
          gif: "/exercises/floor-press.gif",
        },
        {
          id: "4c",
          name: "DB Windmill",
          sets: "3",
          reps: "5/side",
          load: "1 DB",
          notes:
            "Light weight, focus on hip hinge and thoracic rotation. Keep eyes on the DB overhead.",
          gif: "/exercises/windmill.gif",
        },
        {
          id: "4d",
          name: "Tall-Kneeling DB Halo",
          sets: "3",
          reps: "8 each direction",
          load: "1 DB",
          notes:
            "Circle the DB around your head slowly. Engages shoulders and core for paddling stability.",
          gif: "/exercises/halo.gif",
        },
      ],
    },
    {
      id: 5,
      dayOfWeek: "Friday",
      title: "FLOW",
      subtitle: "Conditioning",
      exercises: [
        {
          id: "5a",
          name: "Circuit: 4 Rounds",
          sets: "4 rounds",
          load: "Mixed",
          notes:
            "Rest 90 sec between rounds. Move with purpose but don't rush.",
        },
        {
          id: "5b",
          name: "→ Kettlebell Swings",
          sets: "",
          reps: "12",
          load: "Kettlebell",
          gif: "/exercises/kbs.gif",
        },
        {
          id: "5c",
          name: "→ Reverse Lunges (goblet hold)",
          sets: "",
          reps: "8 total",
          load: "1 DB",
          gif: "/exercises/reverse-lunge.gif",
        },
        {
          id: "5d",
          name: "→ Bent-Over DB Rows",
          sets: "",
          reps: "10",
          load: "Matched DBs",
          gif: "/exercises/bent-over-row.gif",
        },
        {
          id: "5e",
          name: "→ Farmer Carry",
          sets: "",
          time: "40 sec",
          load: "Matched DBs",
          gif: "/exercises/farmer-carry.gif",
        },
      ],
    },
    {
      id: 6,
      dayOfWeek: "Saturday",
      title: "REST",
      subtitle: "Surf or Recover",
      isRest: true,
      exercises: [],
    },
    {
      id: 7,
      dayOfWeek: "Sunday",
      title: "REST",
      subtitle: "Surf or Recover",
      isRest: true,
      exercises: [],
    },
  ],
};

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
        {
          id: "8a",
          name: "Chest-Supported DB Row",
          sets: "4",
          reps: "8",
          tempo: "3 sec down",
          load: "Matched DBs",
          notes: "Added set from Week 1. Same controlled tempo.",
          gif: "/exercises/chest-supported-row.gif",
        },
        {
          id: "8b",
          name: "1-Arm DB Row (split stance)",
          sets: "3",
          reps: "10/side",
          load: "1 DB",
          notes: "One more set than Week 1. Maintain form quality.",
          gif: "/exercises/single-arm-row.gif",
        },
        {
          id: "8c",
          name: "DB Suitcase Carry",
          sets: "4",
          time: "40-45 sec/side",
          load: "1 DB",
          notes: "Extended time under tension. Stay tall, breathe steadily.",
          gif: "/exercises/suitcase-carry.gif",
        },
        {
          id: "8d",
          name: "Dead Bug (DBs held straight up)",
          sets: "4",
          reps: "6/side",
          load: "Matched DBs",
          notes: "Added set. Same quality focus - flat back throughout.",
          gif: "/exercises/dead-bug.gif",
        },
      ],
    },
    {
      id: 9,
      dayOfWeek: "Tuesday",
      title: "LOWER BODY",
      subtitle: "Pop-Up Power +",
      exercises: [
        {
          id: "9a",
          name: "Goblet Squat",
          sets: "4",
          reps: "6",
          tempo: "Fast up",
          load: "1 DB",
          notes: "Volume increase. Same explosive intent.",
          gif: "/exercises/goblet-squat.gif",
        },
        {
          id: "9b",
          name: "DB Romanian Deadlift",
          sets: "4",
          reps: "8",
          load: "Matched DBs",
          notes: "Added set. Keep the stretch-tension in hamstrings.",
          gif: "/exercises/db-rdl.gif",
        },
        {
          id: "9c",
          name: "Kettlebell Swing",
          sets: "5",
          reps: "15",
          load: "Kettlebell",
          notes: "5 sets now. Short rest between sets (60 sec max).",
          gif: "/exercises/kbs.gif",
        },
        {
          id: "9d",
          name: "Pop-Up Sprawl → Stand",
          sets: "4",
          reps: "5",
          load: "BW",
          notes:
            "Added set. Start adding a bit more speed while staying smooth.",
          gif: "/exercises/pop-up-sprawl.gif",
        },
      ],
    },
    {
      id: 10,
      dayOfWeek: "Wednesday",
      title: "REST",
      subtitle: "Recovery Day",
      isRest: true,
      exercises: [],
    },
    {
      id: 11,
      dayOfWeek: "Thursday",
      title: "UPPER PUSH",
      subtitle: "Rotation Power +",
      shoulderFinisher: SHOULDER_FINISHER_A,
      exercises: [
        {
          id: "11a",
          name: "Half-Kneeling DB Press",
          sets: "4",
          reps: "6/side",
          load: "1 DB",
          notes: "Volume bump. Same technique focus.",
          gif: "/exercises/half-kneeling-press.gif",
        },
        {
          id: "11b",
          name: "DB Floor Press",
          sets: "4",
          reps: "8",
          load: "Matched DBs",
          notes: "Added set. Maintain the 45-degree elbow angle.",
          gif: "/exercises/floor-press.gif",
        },
        {
          id: "11c",
          name: "DB Windmill",
          sets: "4",
          reps: "5/side",
          load: "1 DB",
          notes: "One more set. Feeling looser in the hips yet?",
          gif: "/exercises/windmill.gif",
        },
        {
          id: "11d",
          name: "Tall-Kneeling DB Halo",
          sets: "4",
          reps: "8 each direction",
          load: "1 DB",
          notes: "Added set. Keep the circles smooth and controlled.",
          gif: "/exercises/halo.gif",
        },
      ],
    },
    {
      id: 12,
      dayOfWeek: "Friday",
      title: "FLOW",
      subtitle: "Conditioning +",
      exercises: [
        {
          id: "12a",
          name: "Circuit: 4 Rounds",
          sets: "4 rounds",
          load: "Mixed",
          notes: "Same structure, try to reduce rest to 75 sec between rounds.",
        },
        {
          id: "12b",
          name: "→ Kettlebell Swings",
          sets: "",
          reps: "15",
          load: "Kettlebell",
          notes: "Bumped from 12 reps",
          gif: "/exercises/kbs.gif",
        },
        {
          id: "12c",
          name: "→ Reverse Lunges (goblet hold)",
          sets: "",
          reps: "10 total",
          load: "1 DB",
          notes: "Bumped from 8 reps",
          gif: "/exercises/reverse-lunge.gif",
        },
        {
          id: "12d",
          name: "→ Bent-Over DB Rows",
          sets: "",
          reps: "12",
          load: "Matched DBs",
          notes: "Bumped from 10 reps",
          gif: "/exercises/bent-over-row.gif",
        },
        {
          id: "12e",
          name: "→ Farmer Carry",
          sets: "",
          time: "45 sec",
          load: "Matched DBs",
          notes: "Extended from 40 sec",
          gif: "/exercises/farmer-carry.gif",
        },
      ],
    },
    {
      id: 13,
      dayOfWeek: "Saturday",
      title: "REST",
      subtitle: "Surf or Recover",
      isRest: true,
      exercises: [],
    },
    {
      id: 14,
      dayOfWeek: "Sunday",
      title: "REST",
      subtitle: "Surf or Recover",
      isRest: true,
      exercises: [],
    },
  ],
};

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
        {
          id: "15a",
          name: "Chest-Supported DB Row",
          sets: "4",
          reps: "5-6",
          tempo: "4 sec down",
          load: "Matched DBs",
          notes: "Slower eccentric now. Fewer reps, more time under tension.",
          gif: "/exercises/chest-supported-row.gif",
        },
        {
          id: "15b",
          name: "1-Arm DB Row (split stance)",
          sets: "3",
          reps: "6/side",
          tempo: "4 sec down",
          load: "1 DB",
          notes: "Same slow tempo. Feel every inch of the movement.",
          gif: "/exercises/single-arm-row.gif",
        },
        {
          id: "15c",
          name: "DB Suitcase Carry",
          sets: "4",
          time: "45 sec/side",
          load: "1 DB",
          notes: "Maximum time. Stay perfectly vertical.",
          gif: "/exercises/suitcase-carry.gif",
        },
        {
          id: "15d",
          name: "Dead Bug (DBs held straight up)",
          sets: "4",
          reps: "8/side",
          load: "Matched DBs",
          notes: "Added reps. Slower, more controlled extension.",
          gif: "/exercises/dead-bug.gif",
        },
      ],
    },
    {
      id: 16,
      dayOfWeek: "Tuesday",
      title: "LOWER BODY",
      subtitle: "Tension & Power",
      exercises: [
        {
          id: "16a",
          name: "Goblet Squat",
          sets: "4",
          reps: "5",
          tempo: "1 sec pause at bottom",
          load: "1 DB",
          notes: "Pause squat. Explode from the dead stop.",
          gif: "/exercises/goblet-squat.gif",
        },
        {
          id: "16b",
          name: "DB Romanian Deadlift",
          sets: "4",
          reps: "6",
          tempo: "4 sec down",
          load: "Matched DBs",
          notes: "Slow eccentric. Deep hamstring stretch.",
          gif: "/exercises/db-rdl.gif",
        },
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
        {
          id: "16d",
          name: "Pop-Up Sprawl → Stand",
          sets: "4",
          reps: "5",
          load: "BW",
          notes: "Focus on speed now. Quick and snappy.",
          gif: "/exercises/pop-up-sprawl.gif",
        },
      ],
    },
    {
      id: 17,
      dayOfWeek: "Wednesday",
      title: "REST",
      subtitle: "Recovery Day",
      isRest: true,
      exercises: [],
    },
    {
      id: 18,
      dayOfWeek: "Thursday",
      title: "UPPER PUSH",
      subtitle: "Slow & Strong",
      shoulderFinisher: SHOULDER_FINISHER_B,
      exercises: [
        {
          id: "18a",
          name: "Half-Kneeling DB Press",
          sets: "4",
          reps: "5/side",
          tempo: "4 sec down",
          load: "1 DB",
          notes: "Slow lowering phase. Control is power.",
          gif: "/exercises/half-kneeling-press.gif",
        },
        {
          id: "18b",
          name: "DB Floor Press",
          sets: "4",
          reps: "6",
          tempo: "4 sec down",
          load: "Matched DBs",
          notes: "Slow eccentric until triceps touch floor.",
          gif: "/exercises/floor-press.gif",
        },
        {
          id: "18c",
          name: "DB Windmill",
          sets: "4",
          reps: "5/side",
          load: "1 DB",
          notes: "Same as Week 2. Maintain the quality.",
          gif: "/exercises/windmill.gif",
        },
        {
          id: "18d",
          name: "Tall-Kneeling DB Halo",
          sets: "4",
          reps: "10 each direction",
          load: "1 DB",
          notes: "Added reps. Slow, deliberate circles.",
          gif: "/exercises/halo.gif",
        },
      ],
    },
    {
      id: 19,
      dayOfWeek: "Friday",
      title: "FLOW",
      subtitle: "Endurance Push",
      exercises: [
        {
          id: "19a",
          name: "Circuit: 5 Rounds",
          sets: "5 rounds",
          load: "Mixed",
          notes: "Added a round. Push through but don't sacrifice form.",
        },
        {
          id: "19b",
          name: "→ Kettlebell Swings",
          sets: "",
          reps: "15",
          load: "Kettlebell",
          gif: "/exercises/kbs.gif",
        },
        {
          id: "19c",
          name: "→ Reverse Lunges (goblet hold)",
          sets: "",
          reps: "10 total",
          load: "1 DB",
          gif: "/exercises/reverse-lunge.gif",
        },
        {
          id: "19d",
          name: "→ Bent-Over DB Rows",
          sets: "",
          reps: "12",
          load: "Matched DBs",
          gif: "/exercises/bent-over-row.gif",
        },
        {
          id: "19e",
          name: "→ Farmer Carry",
          sets: "",
          time: "45 sec",
          load: "Matched DBs",
          gif: "/exercises/farmer-carry.gif",
        },
      ],
    },
    {
      id: 20,
      dayOfWeek: "Saturday",
      title: "REST",
      subtitle: "Surf or Recover",
      isRest: true,
      exercises: [],
    },
    {
      id: 21,
      dayOfWeek: "Sunday",
      title: "REST",
      subtitle: "Surf or Recover",
      isRest: true,
      exercises: [],
    },
  ],
};

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
        {
          id: "22a",
          name: "Chest-Supported DB Row",
          sets: "3",
          reps: "6",
          tempo: "Explosive up",
          load: "Matched DBs",
          notes: "Reduced sets, explosive intent. Quality reps only.",
          gif: "/exercises/chest-supported-row.gif",
        },
        {
          id: "22b",
          name: "1-Arm DB Row (split stance)",
          sets: "2",
          reps: "8/side",
          tempo: "Explosive up",
          load: "1 DB",
          notes: "Power focus. Pull fast, control down.",
          gif: "/exercises/single-arm-row.gif",
        },
        {
          id: "22c",
          name: "DB Suitcase Carry",
          sets: "3",
          time: "40 sec/side",
          load: "1 DB",
          notes: "Slightly reduced. Stay fresh, stay strong.",
          gif: "/exercises/suitcase-carry.gif",
        },
        {
          id: "22d",
          name: "Dead Bug (DBs held straight up)",
          sets: "3",
          reps: "6/side",
          load: "Matched DBs",
          notes: "Back to baseline. Perfect reps.",
          gif: "/exercises/dead-bug.gif",
        },
      ],
    },
    {
      id: 23,
      dayOfWeek: "Tuesday",
      title: "LOWER BODY",
      subtitle: "Explosive Power",
      exercises: [
        {
          id: "23a",
          name: "Goblet Squat",
          sets: "6",
          reps: "3",
          tempo: "FAST",
          load: "1 DB",
          notes: "Power clusters. 3 explosive reps, long rest between sets.",
          gif: "/exercises/goblet-squat.gif",
        },
        {
          id: "23b",
          name: "DB Romanian Deadlift",
          sets: "3",
          reps: "6",
          load: "Matched DBs",
          notes: "Reduced volume. Maintain quality.",
          gif: "/exercises/db-rdl.gif",
        },
        {
          id: "23c",
          name: "Kettlebell Swing EMOM",
          sets: "15 min",
          reps: "10 every minute",
          load: "Kettlebell",
          notes: "Extended to 15 minutes. This is your peak conditioning test.",
          gif: "/exercises/kbs.gif",
        },
        {
          id: "23d",
          name: "Pop-Up Sprawl → Stand",
          sets: "4",
          reps: "3",
          load: "BW",
          notes: "Fast and crisp. Like you're catching a wave.",
          gif: "/exercises/pop-up-sprawl.gif",
        },
      ],
    },
    {
      id: 24,
      dayOfWeek: "Wednesday",
      title: "REST",
      subtitle: "Recovery Day",
      isRest: true,
      exercises: [],
    },
    {
      id: 25,
      dayOfWeek: "Thursday",
      title: "UPPER PUSH",
      subtitle: "Peak Power",
      shoulderFinisher: SHOULDER_FINISHER_A,
      exercises: [
        {
          id: "25a",
          name: "Half-Kneeling DB Press",
          sets: "3",
          reps: "5/side",
          tempo: "Explosive up",
          load: "1 DB",
          notes: "Reduced sets. Explosive pressing power.",
          gif: "/exercises/half-kneeling-press.gif",
        },
        {
          id: "25b",
          name: "DB Floor Press",
          sets: "3",
          reps: "6",
          tempo: "Explosive up",
          load: "Matched DBs",
          notes: "Power focus. Fast up, controlled down.",
          gif: "/exercises/floor-press.gif",
        },
        {
          id: "25c",
          name: "DB Windmill",
          sets: "3",
          reps: "5/side",
          load: "1 DB",
          notes: "Reduced volume. Maintain mobility.",
          gif: "/exercises/windmill.gif",
        },
        {
          id: "25d",
          name: "Tall-Kneeling DB Halo",
          sets: "3",
          reps: "8 each direction",
          load: "1 DB",
          notes: "Back to baseline. Keep shoulders healthy.",
          gif: "/exercises/halo.gif",
        },
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
        {
          id: "26b",
          name: "→ Kettlebell Swings",
          sets: "",
          reps: "15",
          load: "Kettlebell",
          gif: "/exercises/kbs.gif",
        },
        {
          id: "26c",
          name: "→ Push-Ups",
          sets: "",
          reps: "10",
          load: "BW",
        },
        {
          id: "26d",
          name: "→ Bent-Over DB Rows",
          sets: "",
          reps: "10",
          load: "Matched DBs",
          gif: "/exercises/bent-over-row.gif",
        },
        {
          id: "26e",
          name: "→ Farmer Carry",
          sets: "",
          time: "45 sec",
          load: "Matched DBs",
          gif: "/exercises/farmer-carry.gif",
        },
      ],
    },
    {
      id: 27,
      dayOfWeek: "Saturday",
      title: "REST",
      subtitle: "Surf or Recover",
      isRest: true,
      exercises: [],
    },
    {
      id: 28,
      dayOfWeek: "Sunday",
      title: "REST",
      subtitle: "Surf or Recover",
      isRest: true,
      exercises: [],
    },
  ],
};

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
