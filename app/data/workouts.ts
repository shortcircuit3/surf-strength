export type EquipmentType =
  | "bodyweight"
  | "bands"
  | "dumbbells"
  | "kettlebell"
  | "pullupbar";

// =============================================================================
// RIR (REPS IN RESERVE) EXPLANATION
// =============================================================================
// RIR = Reps In Reserve - how many more reps you could have done with good form
// RIR 0 = muscular failure (no more reps possible)
// RIR 1 = could have done 1 more rep
// RIR 2 = could have done 2 more reps
// RIR 2-3 is ideal for most strength training - hard but sustainable

export const RIR_EXPLANATION = {
  title: "RIR (Reps In Reserve)",
  description:
    "RIR tells you how hard to push each set. It's how many more reps you could have done with good form.",
  examples: [
    { rir: "RIR 0", meaning: "Failure - no more reps possible" },
    { rir: "RIR 1", meaning: "Could have done 1 more rep" },
    { rir: "RIR 2", meaning: "Could have done 2 more reps" },
    { rir: "RIR 3", meaning: "Could have done 3 more reps" },
  ],
  recommendation:
    "RIR 2-3 is the sweet spot for most exercises - challenging but sustainable.",
  youtube: "https://www.youtube.com/watch?v=5_vjP-QHd5A",
};

export interface Exercise {
  id: number;
  name: string;
  sets: string;
  reps?: string;
  time?: string;
  tempo?: string;
  rest?: string; // Rest between sets, e.g., "60-90 sec", "2 min"
  load: string;
  notes?: string;
  gif?: string;
  youtube?: string;
  equipment?: EquipmentType;
}

export interface MobilityExercise {
  id: number;
  name: string;
  reps?: string;
  time?: string;
  notes?: string;
  gif?: string;
  youtube?: string;
  requiresEquipment?: EquipmentType;
  alternative?: MobilityExercise; // Alternative when required equipment not available
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
// BASE EXERCISE DEFINITIONS - Define each exercise once with equipment variants
// =============================================================================

interface BaseExercise {
  name: string;
  load: string;
  equipment: EquipmentType;
  gif?: string;
  defaultNotes: string;
  youtube?: string;
}

// Dumbbell exercises (default)
const DUMBBELL_EXERCISES: Record<string, BaseExercise> = {
  chestSupportedRow: {
    name: "Chest-Supported DB Row",
    load: "Matched DBs",
    equipment: "dumbbells",
    gif: "/exercises/chest-supported-row.gif",
    defaultNotes: "Focus on squeezing shoulder blades together at the top.",
  },
  singleArmRow: {
    name: "1-Arm DB Row (split stance)",
    load: "1 DB",
    equipment: "dumbbells",
    gif: "/exercises/single-arm-row.gif",
    defaultNotes:
      "Stagger your stance for stability. Keep hips square to the ground.",
  },
  suitcaseCarry: {
    name: "DB Suitcase Carry",
    load: "1 DB",
    equipment: "dumbbells",
    gif: "/exercises/suitcase-carry.gif",
    defaultNotes:
      "Walk tall, don't lean. Builds anti-lateral flexion strength crucial for balance on the board.",
  },
  deadBug: {
    name: "Dead Bug (DBs held straight up)",
    load: "Matched DBs",
    equipment: "dumbbells",
    gif: "/exercises/dead-bug.gif",
    defaultNotes:
      "Press DBs toward ceiling throughout. Only lower opposite arm/leg as far as you can maintain flat back.",
  },
  gobletSquat: {
    name: "Goblet Squat",
    load: "1 DB",
    equipment: "dumbbells",
    gif: "/exercises/goblet-squat.gif",
    defaultNotes:
      "Explode up from the bottom. This builds the power for quick pop-ups.",
  },
  romanianDeadlift: {
    name: "DB Romanian Deadlift",
    load: "Matched DBs",
    equipment: "dumbbells",
    gif: "/exercises/db-rdl.gif",
    defaultNotes:
      "Hinge at hips, keep slight knee bend. Feel stretch in hamstrings, not lower back.",
  },
  halfKneelingPress: {
    name: "Half-Kneeling DB Press",
    load: "1 DB",
    equipment: "dumbbells",
    gif: "/exercises/half-kneeling-press.gif",
    defaultNotes:
      "Squeeze glute on kneeling side. Press straight up, no lean. Builds rotational stability.",
  },
  floorPress: {
    name: "DB Floor Press",
    load: "Matched DBs",
    equipment: "dumbbells",
    gif: "/exercises/floor-press.gif",
    defaultNotes:
      "Elbows at 45 degrees. Control the descent until triceps touch floor.",
  },
  windmill: {
    name: "DB Windmill",
    load: "1 DB",
    equipment: "dumbbells",
    gif: "/exercises/windmill.gif",
    defaultNotes:
      "Light weight, focus on hip hinge and thoracic rotation. Keep eyes on the DB overhead.",
  },
  halo: {
    name: "Tall-Kneeling DB Halo",
    load: "1 DB",
    equipment: "dumbbells",
    gif: "/exercises/halo.gif",
    defaultNotes:
      "Circle the DB around your head slowly. Engages shoulders and core for paddling stability.",
  },
  reverseLunge: {
    name: "Reverse Lunges (goblet hold)",
    load: "1 DB",
    equipment: "dumbbells",
    gif: "/exercises/reverse-lunge.gif",
    defaultNotes: "",
  },
  bentOverRow: {
    name: "Bent-Over DB Rows",
    load: "Matched DBs",
    equipment: "dumbbells",
    gif: "/exercises/bent-over-row.gif",
    defaultNotes: "",
  },
  farmerCarry: {
    name: "Farmer Carry",
    load: "Matched DBs",
    equipment: "dumbbells",
    gif: "/exercises/farmer-carry.gif",
    defaultNotes:
      "Walk tall, brace core. Builds grip strength and full-body stability.",
  },
  renegadeRow: {
    name: "Renegade Row",
    load: "Matched DBs",
    equipment: "dumbbells",
    defaultNotes:
      "Plank position on DBs. Row one arm while bracing core. Anti-rotation and pulling combined.",
    youtube: "https://www.youtube.com/watch?v=wTqlJ0aoJlM",
  },
  dbPullover: {
    name: "DB Pullover",
    load: "1 DB",
    equipment: "dumbbells",
    defaultNotes:
      "Lie on bench or floor. Arms extended, lower DB behind head with control. Great lat stretch and paddle-specific strength.",
  },
  overheadWaiterCarry: {
    name: "Overhead Waiter Carry",
    load: "1 DB",
    equipment: "dumbbells",
    defaultNotes:
      "One arm locked overhead, palm up like a waiter. Walk with control. Builds end-range overhead stability for pop-ups and duck dives.",
    youtube: "https://www.youtube.com/watch?v=_-iffpjv0zE",
  },
};

// Kettlebell exercises
const KETTLEBELL_EXERCISES: Record<string, BaseExercise> = {
  kettlebellSwing: {
    name: "Kettlebell Swing",
    load: "Kettlebell",
    equipment: "kettlebell",
    gif: "/exercises/kbs.gif",
    defaultNotes:
      "Hinge style - drive with hips, not arms. This is your hip power generator.",
  },
};

// Band exercises (alternatives)
const BAND_EXERCISES: Record<string, BaseExercise> = {
  bandRow: {
    name: "Band Bent-Over Row",
    load: "Band",
    equipment: "bands",
    defaultNotes:
      "Step on band, hinge forward. Pull to hips, squeeze shoulder blades.",
    youtube: "https://www.youtube.com/watch?v=DgPGoJ7PM1k",
  },
  bandSingleArmRow: {
    name: "Band Single-Arm Row",
    load: "Band",
    equipment: "bands",
    defaultNotes: "Anchor band low, pull to hip. Focus on lat engagement.",
  },
  bandPullApart: {
    name: "Band Pull-Apart",
    load: "Band",
    equipment: "bands",
    defaultNotes:
      "Arms straight, pull band apart to chest level. Great for shoulder health.",
  },
  bandSquat: {
    name: "Band Squat",
    load: "Band",
    equipment: "bands",
    defaultNotes: "Stand on band, hold at shoulders. Explode up for power.",
    youtube: "https://www.youtube.com/watch?v=S5cTdwO1Trk",
  },
  bandRdl: {
    name: "Band Romanian Deadlift",
    load: "Band",
    equipment: "bands",
    defaultNotes:
      "Step on band, hinge at hips. Feel the tension in hamstrings.",
    youtube: "https://www.youtube.com/watch?v=jaRAR9l1e2o",
  },
  bandPullThrough: {
    name: "Band Pull-Through",
    load: "Band",
    equipment: "bands",
    defaultNotes:
      "Anchor band low behind you. Hinge and drive hips forward explosively.",
    youtube: "https://www.youtube.com/watch?v=ZuKowDpVVXM",
  },
  bandPress: {
    name: "Half-Kneeling Band Overhead Press",
    load: "Band",
    equipment: "bands",
    defaultNotes:
      "Half-kneeling position, step on band with back foot. Press overhead with core engaged. Builds overhead stability with anti-extension.",
    youtube: "https://www.youtube.com/watch?v=89g7CwgmXiw",
  },
  bandChestPress: {
    name: "Band Chest Press",
    load: "Band",
    equipment: "bands",
    defaultNotes:
      "Anchor band behind you at chest height. Press forward with control.",
    youtube: "https://www.youtube.com/watch?v=T9Wv88jVYf4",
  },
  bandHalo: {
    name: "Band Halo",
    load: "Band",
    equipment: "bands",
    defaultNotes:
      "Hold band taut, circle around head. Engages shoulders and core.",
  },
  bandReverseLunge: {
    name: "Band Reverse Lunges",
    load: "Band",
    equipment: "bands",
    defaultNotes: "Stand on band, hold at shoulders. Step back with control.",
  },
  bandCarry: {
    name: "Band Pallof Walk",
    load: "Band",
    equipment: "bands",
    defaultNotes:
      "Anchor band at side, hold at chest. Walk sideways resisting rotation.",
    youtube: "https://www.youtube.com/watch?v=FjMofGI6rz8",
  },
  bandPulldown: {
    name: "Band Straight-Arm Pulldown",
    load: "Band",
    equipment: "bands",
    defaultNotes:
      "Anchor band high. Keep arms straight, pull down to hips. Mimics the paddle catch phase.",
  },
  halfKneelingAntiRotationRow: {
    name: "Half-Kneeling Anti-Rotation Row",
    load: "Band",
    equipment: "bands",
    defaultNotes:
      "Half-kneeling, band anchored to side. Row while resisting rotation. Core + pull combined.",
    youtube: "https://www.youtube.com/watch?v=VYjLtiAY95E",
  },
  bandLatPulldown: {
    name: "Band Lat Pulldown",
    load: "Band",
    equipment: "bands",
    defaultNotes:
      "Anchor band high. Pull down to chest with elbows driving to sides. Vertical pull alternative.",
    youtube: "https://www.youtube.com/watch?v=nmY4MTSFln8",
  },
  serratusPunch: {
    name: "Serratus Punch",
    load: "Band",
    equipment: "bands",
    defaultNotes:
      "Anchor band behind. Punch forward with protraction at end. Builds serratus anterior for scapular stability.",
    youtube: "https://www.youtube.com/watch?v=NkTWEsXgDlY",
  },
  bandHighToLowChop: {
    name: "Half-Kneeling Band High-to-Low Chop",
    load: "Band",
    equipment: "bands",
    defaultNotes:
      "Anchor band high to side. Half-kneeling, pull diagonally across body from high to low. Rotation + shoulder-trunk integration for powerful turns.",
    youtube: "https://www.youtube.com/watch?v=8gu5U580aM8",
  },
};

// Pull-up bar exercises
const PULLUPBAR_EXERCISES: Record<string, BaseExercise> = {
  pullUps: {
    name: "Pull-Ups",
    load: "BW",
    equipment: "pullupbar",
    defaultNotes:
      "Full range of motion. Start from dead hang, pull until chin over bar. The king of back exercises.",
    youtube: "https://www.youtube.com/shorts/l6-aIZTbAR0",
  },
  invertedRow: {
    name: "Inverted Row",
    load: "BW",
    equipment: "pullupbar",
    defaultNotes:
      "Use a low bar or rings. Pull chest to bar, squeeze shoulder blades.",
  },
  singleArmInvertedRow: {
    name: "Archer Inverted Row",
    load: "BW",
    equipment: "pullupbar",
    defaultNotes:
      "One arm pulls while other assists. Great for building single-arm strength.",
  },
  deadHang: {
    name: "Dead Hang",
    load: "BW",
    equipment: "pullupbar",
    defaultNotes:
      "Passive hang from bar. Let shoulders decompress. Great for shoulder health.",
    youtube: "https://www.youtube.com/watch?v=fq9gDvNZQ2c",
  },
  scapPullUps: {
    name: "Scap Pull-Ups",
    load: "BW",
    equipment: "pullupbar",
    defaultNotes:
      "Hang from bar, depress and retract shoulder blades without bending elbows. Builds scapular control for paddling.",
  },
};

// Bodyweight exercises (alternatives)
const BODYWEIGHT_EXERCISES: Record<string, BaseExercise> = {
  proneRow: {
    name: "Prone Y-T-W Raises",
    load: "BW",
    equipment: "bodyweight",
    defaultNotes:
      "Lie face down, raise arms in Y, T, and W positions. Squeeze shoulder blades throughout.",
    youtube: "https://www.youtube.com/watch?v=QdGTI4Lshg4",
  },
  doorFrameRow: {
    name: "Door Frame Row",
    load: "BW",
    equipment: "bodyweight",
    defaultNotes:
      "Hold door frame, lean back, pull chest to hands. Keep body straight like a plank.",
    youtube: "https://www.youtube.com/watch?v=AhUSbudCWro",
  },

  deadBugBw: {
    name: "Dead Bug",
    load: "BW",
    equipment: "bodyweight",
    gif: "/exercises/dead-bug.gif",
    defaultNotes:
      "Arms reaching to ceiling. Lower opposite arm/leg maintaining flat back.",
    youtube: "https://www.youtube.com/watch?v=DqLL45uk2Tk",
  },
  airSquat: {
    name: "Jump Squat",
    load: "BW",
    equipment: "bodyweight",
    defaultNotes:
      "Explosive jump from squat position. Land soft, immediately descend.",
    youtube: "https://www.youtube.com/watch?v=BRfxI2Es2lE",
  },
  singleLegRdl: {
    name: "Single-Leg Romanian Deadlift",
    load: "BW",
    equipment: "bodyweight",
    defaultNotes:
      "Balance on one leg, hinge forward. Builds stability and hamstring strength.",
    youtube: "https://www.youtube.com/watch?v=U4sOY8Gyc-s",
  },
  hipThrust: {
    name: "Hip Thrust / Glute Bridge",
    load: "BW",
    equipment: "bodyweight",
    defaultNotes:
      "Drive through heels, squeeze glutes at top. Explosive hip extension for pop-ups.",
    youtube: "https://www.youtube.com/watch?v=rc9O9xpwqUY",
  },
  pronePopUp: {
    name: "Prone Pop-Up",
    load: "BW",
    equipment: "bodyweight",
    gif: "/exercises/pop-up-sprawl.gif",
    defaultNotes:
      "Start face down, hands by chest. Pop up to surf stance in one explosive movement. Focus on speed and landing position.",
  },
  pushUps: {
    name: "Push-Ups",
    load: "BW",
    equipment: "bodyweight",
    defaultNotes: "Full range of motion. Elbows at 45 degrees.",
    youtube: "https://www.youtube.com/watch?v=WDIpL0pjun0",
  },
  inclinePushUps: {
    name: "Incline Push-Ups",
    load: "BW",
    equipment: "bodyweight",
    defaultNotes:
      "Hands on bench, box, or wall. Body straight, chest to hands, push away with control.",
    youtube: "https://www.youtube.com/watch?v=cfns5VDVVvk&t=11s",
  },
  pikePushUp: {
    name: "Pike Push-Up",
    load: "BW",
    equipment: "bodyweight",
    defaultNotes:
      "Hips high, head toward ground. Builds overhead pressing strength.",
    youtube: "https://www.youtube.com/watch?v=fXgou2W10ok",
  },
  windmillBw: {
    name: "Bodyweight Windmill",
    load: "BW",
    equipment: "bodyweight",
    defaultNotes: "Arm overhead, hinge and rotate. Focus on thoracic mobility.",
  },
  haloBw: {
    name: "Arm Circles",
    load: "BW",
    equipment: "bodyweight",
    defaultNotes: "Large controlled circles. Warms up and mobilizes shoulders.",
  },
  walkingLunge: {
    name: "Walking Lunges",
    load: "BW",
    equipment: "bodyweight",
    defaultNotes: "Long steps, upright torso. Drive through front heel.",
  },
  overheadCarry: {
    name: "Overhead Carry",
    load: "Heavy Object",
    equipment: "bodyweight",
    defaultNotes:
      "Use a backpack, water jug, or any heavy object. Arms locked overhead, walk tall. Builds shoulder stability and core.",
  },
  suitcaseCarryBw: {
    name: "Suitcase Carry",
    load: "Heavy Object",
    equipment: "bodyweight",
    gif: "/exercises/suitcase-carry.gif",
    defaultNotes:
      "Use a backpack, water jug, or any heavy object in one hand. Walk tall, don't lean. Builds anti-lateral flexion strength.",
  },
  bearCrawl: {
    name: "Bear Crawl",
    load: "BW",
    equipment: "bodyweight",
    defaultNotes:
      "Opposite hand/foot move together. Great for coordination and core.",
    youtube: "https://www.youtube.com/watch?v=t8XLor7unqU",
  },
  prayerStretch: {
    name: "Prayer Stretch",
    load: "BW",
    equipment: "bodyweight",
    defaultNotes:
      "Kneel, sit hips back toward heels, arms extended forward on floor. Let chest sink toward ground. Great for lat and shoulder decompression.",
    youtube: "https://www.youtube.com/watch?v=Zbq7zvUK4ps",
  },
  lateralShuffle: {
    name: "Lateral Shuffle",
    load: "BW",
    equipment: "bodyweight",
    defaultNotes:
      "Rhythm over intensity, light feet. Stay low, move side to side smoothly.",
    youtube: "https://www.youtube.com/watch?v=Z0HtdkwhHnI",
  },
  easyJog: {
    name: "Easy Jog",
    load: "BW",
    equipment: "bodyweight",
    defaultNotes:
      "In place or outside. Nose breathing if possible. Pure aerobic stimulus.",
  },
  closeGripPushUps: {
    name: "Close-Grip Push-Ups",
    load: "BW",
    equipment: "bodyweight",
    defaultNotes:
      "Hands close together, elbows tight to body. Triceps and elbow health focus.",
  },
  plankShoulderTaps: {
    name: "Plank Shoulder Taps",
    load: "BW",
    equipment: "bodyweight",
    defaultNotes:
      "High plank position. Tap opposite shoulder while resisting rotation. Anti-rotation core work.",
  },
  sidePlankRow: {
    name: "Side Plank Row",
    load: "BW",
    equipment: "bodyweight",
    defaultNotes:
      "Side plank position, row with top arm (band or towel anchor). Anti-rotation plus pulling.",
    youtube: "https://www.youtube.com/watch?v=N-2u_5eNR4Y",
  },
  wallSlideLiftOff: {
    name: "Wall Slide + Lift-Off",
    load: "BW",
    equipment: "bodyweight",
    defaultNotes:
      "Back against wall, arms in W position. Slide up to Y, lift off wall briefly. Builds scapular control.",
    youtube: "https://www.youtube.com/watch?v=k_zZ6XB9jds",
  },
  highKneesSprint: {
    name: "High-Knees Sprint",
    load: "BW",
    equipment: "bodyweight",
    defaultNotes:
      "MAX EFFORT. Drive knees high and fast. Mimics paddle sprint intensity. Go HARD, recover during jog.",
    youtube: "https://www.youtube.com/watch?v=ZZZoCNMU48U",
  },
};

// Combine all exercises for BASE_EXERCISES reference
const BASE_EXERCISES = {
  ...DUMBBELL_EXERCISES,
  ...KETTLEBELL_EXERCISES,
  ...PULLUPBAR_EXERCISES,
  ...BAND_EXERCISES,
  ...BODYWEIGHT_EXERCISES,
} as const;

type BaseExerciseKey = keyof typeof BASE_EXERCISES;

// =============================================================================
// EXERCISE ALTERNATIVES - Maps equipment exercises to alternatives
// =============================================================================

// Maps exercises to their alternatives by equipment type
const EXERCISE_ALTERNATIVES: Record<
  string,
  { bands?: string; pullupbar?: string; bodyweight: string }
> = {
  // Pull exercises (DB -> pullupbar/bands -> bodyweight)
  chestSupportedRow: {
    bands: "bandRow",
    pullupbar: "invertedRow",
    bodyweight: "proneRow",
  },
  singleArmRow: {
    bands: "bandSingleArmRow",
    pullupbar: "singleArmInvertedRow",
    bodyweight: "doorFrameRow",
  },
  bentOverRow: {
    bands: "bandRow",
    pullupbar: "invertedRow",
    bodyweight: "proneRow",
  },

  // Vertical pull alternatives
  pullUps: {
    bands: "bandLatPulldown",
    bodyweight: "doorFrameRow",
  },

  // Pull-up bar exercises -> bodyweight alternatives
  invertedRow: { bands: "bandRow", bodyweight: "proneRow" },
  singleArmInvertedRow: {
    bands: "bandSingleArmRow",
    bodyweight: "doorFrameRow",
  },
  deadHang: { bodyweight: "prayerStretch" },
  scapPullUps: { bands: "bandPulldown", bodyweight: "proneRow" },

  // Scapular health alternatives
  wallSlideLiftOff: { bands: "serratusPunch", bodyweight: "bearCrawl" },
  serratusPunch: { bodyweight: "bearCrawl" },

  // DB Pullover alternatives (vertical pull option)
  dbPullover: { bands: "bandLatPulldown", bodyweight: "doorFrameRow" },

  // Anti-rotation row alternatives
  renegadeRow: {
    bands: "halfKneelingAntiRotationRow",
    bodyweight: "sidePlankRow",
  },
  halfKneelingAntiRotationRow: { bodyweight: "sidePlankRow" },

  // Carry exercises
  suitcaseCarry: { bands: "bandCarry", bodyweight: "suitcaseCarryBw" },
  farmerCarry: { bands: "bandCarry", bodyweight: "overheadCarry" },

  // Core
  deadBug: { bodyweight: "deadBugBw" },

  // Lower body
  gobletSquat: { bands: "bandSquat", bodyweight: "airSquat" },
  romanianDeadlift: { bands: "bandRdl", bodyweight: "singleLegRdl" },
  reverseLunge: { bands: "bandReverseLunge", bodyweight: "walkingLunge" },

  // Kettlebell alternatives
  kettlebellSwing: { bands: "bandPullThrough", bodyweight: "hipThrust" },

  // Push exercises
  halfKneelingPress: { bands: "bandPress", bodyweight: "pikePushUp" },
  floorPress: { bands: "bandChestPress", bodyweight: "pushUps" },

  // Overhead stability / trunk integration
  overheadWaiterCarry: { bands: "bandHighToLowChop", bodyweight: "bearCrawl" },

  // Mobility/rotation
  windmill: { bodyweight: "windmillBw" },
  halo: { bands: "bandHalo", bodyweight: "haloBw" },
};

/**
 * Get the appropriate exercise key based on available equipment
 * Priority: original equipment -> pullupbar -> bands -> bodyweight
 */
export function getExerciseKeyForEquipment(
  baseKey: string,
  availableEquipment: EquipmentType[]
): string {
  const hasDumbbells = availableEquipment.includes("dumbbells");
  const hasKettlebell = availableEquipment.includes("kettlebell");
  const hasBands = availableEquipment.includes("bands");
  const hasPullupBar = availableEquipment.includes("pullupbar");

  // Helper to find best alternative
  const findAlternative = (key: string): string => {
    const alternatives = EXERCISE_ALTERNATIVES[key];
    if (!alternatives) return key;

    // Try pullupbar first, then bands, then bodyweight
    if (hasPullupBar && alternatives.pullupbar) {
      return alternatives.pullupbar;
    }
    if (hasBands && alternatives.bands) {
      return alternatives.bands;
    }
    return alternatives.bodyweight;
  };

  // If the base exercise is a kettlebell exercise
  if (baseKey in KETTLEBELL_EXERCISES) {
    if (hasKettlebell) return baseKey;
    return findAlternative(baseKey);
  }

  // If the base exercise is a dumbbell exercise
  if (baseKey in DUMBBELL_EXERCISES) {
    if (hasDumbbells) return baseKey;
    return findAlternative(baseKey);
  }

  // If the base exercise is a pullupbar exercise
  if (baseKey in PULLUPBAR_EXERCISES) {
    if (hasPullupBar) return baseKey;
    // Check for alternatives since user doesn't have pullup bar
    const alternatives = EXERCISE_ALTERNATIVES[baseKey];
    if (alternatives) {
      if (hasBands && alternatives.bands) return alternatives.bands;
      return alternatives.bodyweight;
    }
  }

  // Check if it's already a bodyweight or band exercise
  if (baseKey in BODYWEIGHT_EXERCISES) return baseKey;
  if (baseKey in BAND_EXERCISES) {
    if (hasBands) return baseKey;
    // Find the bodyweight alternative
    for (const alts of Object.values(EXERCISE_ALTERNATIVES)) {
      if (alts.bands === baseKey) {
        return alts.bodyweight;
      }
    }
  }

  return baseKey;
}

/**
 * Get a base exercise with equipment substitution applied
 */
export function getBaseExerciseForEquipment(
  baseKey: string,
  availableEquipment: EquipmentType[]
): BaseExercise {
  const targetKey = getExerciseKeyForEquipment(baseKey, availableEquipment);
  return (
    BASE_EXERCISES[targetKey as BaseExerciseKey] ||
    BASE_EXERCISES[baseKey as BaseExerciseKey]
  );
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

// Auto-incrementing ID generator for exercises
let exerciseIdCounter = 0;
const nextId = () => ++exerciseIdCounter;

// Reset counter for each workout day to keep IDs predictable
const resetIdCounter = () => {
  exerciseIdCounter = 0;
};

/**
 * Create an exercise from a base definition with specific config
 */
function ex(
  baseKey: BaseExerciseKey,
  config: {
    sets: string;
    reps?: string;
    time?: string;
    tempo?: string;
    rest?: string;
    notes?: string;
    load?: string;
  }
): Exercise {
  const base = BASE_EXERCISES[baseKey];
  return {
    id: nextId(),
    name: base.name,
    sets: config.sets,
    reps: config.reps,
    time: config.time,
    tempo: config.tempo,
    rest: config.rest,
    load: config.load ?? base.load,
    notes: config.notes ?? (base.defaultNotes || undefined),
    gif: base.gif,
    youtube: base.youtube,
    equipment: base.equipment,
  };
}

/**
 * Create an exercise with equipment-aware substitution
 */
export function createExerciseForEquipment(
  baseKey: string,
  config: {
    sets: string;
    reps?: string;
    time?: string;
    tempo?: string;
    rest?: string;
    notes?: string;
  },
  availableEquipment: EquipmentType[]
): Exercise {
  const base = getBaseExerciseForEquipment(baseKey, availableEquipment);
  return {
    id: nextId(),
    name: base.name,
    sets: config.sets,
    reps: config.reps,
    time: config.time,
    tempo: config.tempo,
    rest: config.rest,
    load: base.load,
    notes: config.notes ?? (base.defaultNotes || undefined),
    gif: base.gif,
    youtube: base.youtube,
    equipment: base.equipment,
  };
}

/**
 * Create a circuit exercise with equipment-aware substitution
 */
export function createCircuitExerciseForEquipment(
  baseKey: string,
  config: { reps?: string; time?: string; notes?: string },
  availableEquipment: EquipmentType[]
): Exercise {
  const base = getBaseExerciseForEquipment(baseKey, availableEquipment);
  return {
    id: nextId(),
    name: `→ ${base.name}`,
    sets: "",
    reps: config.reps,
    time: config.time,
    load: base.load,
    notes: config.notes,
    gif: base.gif,
    youtube: base.youtube,
    equipment: base.equipment,
  };
}

/**
 * Create a circuit exercise (prefixed with →, no sets)
 */
function circuitEx(
  baseKey: BaseExerciseKey,
  config: { reps?: string; time?: string; notes?: string }
): Exercise {
  const base = BASE_EXERCISES[baseKey];
  return {
    id: nextId(),
    name: `→ ${base.name}`,
    sets: "",
    reps: config.reps,
    time: config.time,
    load: base.load,
    notes: config.notes,
    gif: base.gif,
    youtube: base.youtube,
    equipment: base.equipment,
  };
}

/**
 * Create a circuit header
 */
function circuitHeader(rounds: number, notes: string): Exercise {
  return {
    id: nextId(),
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

// Auto-incrementing ID generator for mobility exercises
let mobilityIdCounter = 0;
const nextMobilityId = () => ++mobilityIdCounter;

export const DAILY_MOBILITY: MobilityBlock[] = [
  {
    title: "T-Spine + Scap",
    duration: "3-4 min",
    exercises: [
      {
        id: nextMobilityId(),
        name: "Quadruped T-Spine Rotation",
        reps: "5/side",
        notes: "Hand behind head, rotate through mid-back. Keep hips square.",
        youtube: "https://www.youtube.com/shorts/IJhZNTsLf-A",
      },
      {
        id: nextMobilityId(),
        name: "Scapula Push-Ups",
        reps: "8-10",
        notes: "Push floor away at top, let shoulder blades pinch at bottom.",
        youtube: "https://www.youtube.com/watch?v=NKekqeudgWs",
      },
      {
        id: nextMobilityId(),
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
        id: nextMobilityId(),
        name: "Arm Circles (controlled)",
        reps: "10 each direction",
        notes: "Forward and backward. Smooth, not jerky.",
        youtube: "https://www.youtube.com/shorts/2sEZSRbOlVA",
      },
      {
        id: nextMobilityId(),
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
        id: nextMobilityId(),
        name: "World's Greatest Stretch",
        reps: "3/side",
        notes: "Lunge, elbow to instep, rotate and reach to sky.",
        youtube: "https://www.youtube.com/watch?v=-CiWQ2IvY34",
      },
      {
        id: nextMobilityId(),
        name: "Hip Airplanes",
        reps: "3/side",
        notes: "Single leg, rotate torso open and closed. Control balance.",
        youtube: "https://www.youtube.com/watch?v=4XCbYaQGF2o",
      },
    ],
  },
];

const SHOULDER_FINISHER_A: ShoulderFinisher = {
  name: "Overhead Stability",
  exercises: [
    {
      id: nextMobilityId(),
      name: "Overhead Waiter Hold",
      time: "25-45 sec/side × 2-4",
      notes:
        "Biceps by ear, knuckles to ceiling. Use moderate load - you should feel shaking around 25s. Trains upward rotation and scapular stability.",
      youtube: "https://www.youtube.com/watch?v=_-iffpjv0zE",
    },
  ],
};

const SHOULDER_FINISHER_B: ShoulderFinisher = {
  name: "Scap Endurance",
  exercises: [
    {
      id: nextMobilityId(),
      name: "Wall Slide + Lift-Off",
      reps: "2×8-12 slow",
      notes:
        "Back to wall, slide to Y position, lift off briefly. Scapular control.",
      youtube: "https://www.youtube.com/watch?v=k_zZ6XB9jds",
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
      exercises:
        (resetIdCounter(),
        [
          // 1. PRIMARY HORIZONTAL PULL (Strength)
          ex("chestSupportedRow", {
            sets: "3",
            reps: "6-8",
            tempo: "3s down",
            rest: "90 sec",
            notes: "Heavy. 1-2 RIR. Squeeze shoulder blades at top.",
          }),
          // 2. VERTICAL PULL (Paddle Specific)
          ex("pullUps", {
            sets: "3",
            reps: "5-8",
            rest: "90 sec",
            notes: "Full ROM. Scale with band if needed.",
          }),
          // 3. CORE - ANTI-ROTATION (Surf Transfer)
          ex("renegadeRow", {
            sets: "3",
            reps: "5-6/side",
            rest: "60-75 sec",
            notes: "Slow, strict. Resist rotation throughout.",
          }),
          // 4. CARRY - ANTI-LATERAL FLEXION
          ex("suitcaseCarry", {
            sets: "3",
            time: "30-45 sec/side",
            rest: "30-45 sec",
            notes: "Walk tall, don't lean. Build board balance stability.",
          }),
          // 5. GRIP FINISHER
          ex("deadHang", {
            sets: "3",
            time: "30-60 sec",
            rest: "60 sec",
            notes: "Finisher. Shoulders decompress. Build grip endurance.",
          }),
        ]),
    },
    {
      id: 2,
      dayOfWeek: "Tuesday",
      title: "LOWER BODY",
      subtitle: "Pop-Up Power",
      exercises:
        (resetIdCounter(),
        [
          ex("gobletSquat", {
            sets: "3",
            reps: "8",
            tempo: "Fast up",
            rest: "90 sec",
            notes: "Explode up from the bottom. Baseline volume week.",
          }),
          ex("romanianDeadlift", {
            sets: "3",
            reps: "6",
            tempo: "3s down",
            rest: "90 sec",
            notes:
              "Controlled eccentric. Moderate hinge volume. Reduce to 2 sets if hamstrings loaded.",
          }),
          ex("kettlebellSwing", {
            sets: "3",
            reps: "12",
            rest: "60 sec",
            notes:
              "Hip snap. Moderate power volume. Reduce to 2×10 if fatigue is high.",
          }),
          ex("airSquat", {
            sets: "3",
            reps: "5",
            rest: "60 sec",
            notes: "Baseline week. Soft landings, full depth before each jump.",
          }),
        ]),
    },
    restDay(3, "Wednesday"),
    {
      id: 4,
      dayOfWeek: "Thursday",
      title: "UPPER PUSH",
      subtitle: "Surf-Optimized Push",
      exercises:
        (resetIdCounter(),
        [
          // 1. VERTICAL PRESS (Primary Strength)
          ex("halfKneelingPress", {
            sets: "4",
            reps: "5-6/side",
            rest: "75-90 sec",
            notes:
              "Glute tight, ribs down, press straight up. No grind. Anti-rotation for pop-ups.",
          }),
          // 2. HORIZONTAL PRESS (Low Joint Cost)
          ex("floorPress", {
            sets: "3",
            reps: "6-8",
            rest: "75-90 sec",
            notes:
              "Elbows ~45°, control the lower. If surf volume is high, remove this first.",
          }),
          // 3. OVERHEAD STABILITY (Isometric, Not More Pressing)
          ex("overheadWaiterCarry", {
            sets: "3",
            time: "30-45 sec/side",
            rest: "45 sec",
            notes:
              "Arm locked, ribs stacked, walk slow. End-range stability for duck dives and pop-ups.",
          }),
          // 4. SCAPULAR CONTROL FINISHER (Low Fatigue)
          ex("wallSlideLiftOff", {
            sets: "2",
            reps: "8-12 slow",
            notes:
              "Slide up, lift off briefly, no shrug. Near-zero recovery cost finisher.",
          }),
        ]),
    },
    {
      id: 5,
      dayOfWeek: "Friday",
      title: "SURF CARDIO",
      subtitle: "Paddle Sprint Intervals",
      exercises:
        (resetIdCounter(),
        [
          circuitHeader(
            5,
            "Rest 60-75 sec between rounds. Mix of aerobic base + anaerobic bursts. ~25 min total."
          ),
          circuitEx("kettlebellSwing", {
            time: "40 sec",
            notes: "Steady pace, crisp hip snap. Aerobic power base.",
          }),
          circuitEx("lateralShuffle", {
            time: "40 sec",
            notes:
              "Light feet, stay low. Lateral agility for board positioning.",
          }),
          circuitEx("highKneesSprint", {
            time: "15 sec",
            notes: "MAX EFFORT! Mimics paddle sprint for a wave. Go HARD.",
          }),
          circuitEx("bearCrawl", {
            time: "40 sec",
            notes: "Forward/backward. Trunk stability, controlled breathing.",
          }),
          circuitEx("easyJog", {
            time: "75 sec",
            notes:
              "Recovery pace. Nasal breathing. RPE 4-5. Let heart rate drop.",
          }),
        ]),
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
      exercises:
        (resetIdCounter(),
        [
          // 1. PRIMARY HORIZONTAL PULL (+1 set)
          ex("chestSupportedRow", {
            sets: "4",
            reps: "6-8",
            tempo: "3s down",
            rest: "90 sec",
            notes: "Volume bump. Same controlled tempo. 1-2 RIR.",
          }),
          // 2. VERTICAL PULL (+1 set)
          ex("pullUps", {
            sets: "4",
            reps: "6-8",
            rest: "90 sec",
            notes: "Added set. Aim for more reps than Week 1.",
          }),
          // 3. SCAPULAR HEALTH (increased reps)
          ex("wallSlideLiftOff", {
            sets: "3",
            reps: "10-15",
            rest: "45-60 sec",
            notes: "Increased reps. Build scapular endurance.",
          }),
          // 4. CORE - ANTI-ROTATION (+1 set)
          ex("renegadeRow", {
            sets: "4",
            reps: "6-8/side",
            rest: "60-75 sec",
            notes: "Volume bump. Maintain strict form.",
          }),
          // 5. CARRY (extended time)
          ex("suitcaseCarry", {
            sets: "3",
            time: "40-50 sec/side",
            rest: "30-45 sec",
            notes: "Extended time. Stay tall, breathe steadily.",
          }),
          // 6. GRIP FINISHER
          ex("deadHang", {
            sets: "3",
            time: "40-75 sec",
            rest: "60 sec",
            notes: "Finisher. Extended time from Week 1. Grip endurance.",
          }),
        ]),
    },
    {
      id: 9,
      dayOfWeek: "Tuesday",
      title: "LOWER BODY",
      subtitle: "Pop-Up Power +",
      exercises:
        (resetIdCounter(),
        [
          ex("gobletSquat", {
            sets: "4",
            reps: "8",
            tempo: "Fast up",
            rest: "90 sec",
            notes: "Volume bump from Week 1. Same explosive intent.",
          }),
          ex("romanianDeadlift", {
            sets: "4",
            reps: "8",
            rest: "90 sec",
            notes:
              "1-2 RIR on all sets. Don't increase load unless all reps are clean and controlled.",
          }),
          ex("kettlebellSwing", {
            sets: "2",
            reps: "10",
            rest: "60 sec",
            notes:
              "Speed work, not conditioning. Crisp hip snap, full recovery between sets.",
          }),
          ex("airSquat", {
            sets: "3",
            reps: "5",
            rest: "60 sec",
            notes: "Full reset between reps, stop if height drops.",
          }),
        ]),
    },
    restDay(10, "Wednesday"),
    {
      id: 11,
      dayOfWeek: "Thursday",
      title: "UPPER PUSH",
      subtitle: "Surf-Optimized Push +",
      exercises:
        (resetIdCounter(),
        [
          // 1. VERTICAL PRESS (+volume)
          ex("halfKneelingPress", {
            sets: "4",
            reps: "6-8/side",
            rest: "75-90 sec",
            notes:
              "Volume bump from Week 1. Same cues: glute tight, ribs down.",
          }),
          // 2. HORIZONTAL PRESS (+1 set)
          ex("floorPress", {
            sets: "4",
            reps: "6-8",
            rest: "75-90 sec",
            notes: "Added set. Elbows ~45°, control the lower.",
          }),
          // 3. OVERHEAD STABILITY (Extended time)
          ex("overheadWaiterCarry", {
            sets: "3",
            time: "35-50 sec/side",
            rest: "45 sec",
            notes: "Extended time from Week 1. Arm locked, ribs stacked.",
          }),
          // 4. SCAPULAR CONTROL FINISHER
          ex("wallSlideLiftOff", {
            sets: "2",
            reps: "10-15 slow",
            notes: "Increased reps. Slide up, lift off briefly, no shrug.",
          }),
        ]),
    },
    {
      id: 12,
      dayOfWeek: "Friday",
      title: "SURF CARDIO",
      subtitle: "Paddle Sprint Intervals +",
      exercises:
        (resetIdCounter(),
        [
          circuitHeader(
            5,
            "Rest 60-75 sec between rounds. Longer burst duration this week. ~25 min total."
          ),
          circuitEx("kettlebellSwing", {
            time: "40 sec",
            notes: "Steady pace, crisp hip snap. Building aerobic power.",
          }),
          circuitEx("lateralShuffle", {
            time: "40 sec",
            notes: "Light feet, stay low. Board positioning agility.",
          }),
          circuitEx("highKneesSprint", {
            time: "20 sec",
            notes:
              "MAX EFFORT! Extended burst from Week 1. Paddle sprint simulation.",
          }),
          circuitEx("bandCarry", {
            time: "40 sec",
            notes:
              "Band at chest, walk sideways. Anti-rotation trunk stability.",
          }),
          circuitEx("easyJog", {
            time: "75 sec",
            notes: "Recovery pace. Nasal breathing. RPE 4-5. Active recovery.",
          }),
        ]),
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
      exercises:
        (resetIdCounter(),
        [
          // 1. PRIMARY HORIZONTAL PULL (slow eccentrics)
          ex("chestSupportedRow", {
            sets: "4",
            reps: "5-6",
            tempo: "3s down",
            rest: "90-120 sec",
            notes: "Controlled eccentric. Fewer reps, maintain tension.",
          }),
          // 2. VERTICAL PULL (slow eccentrics)
          ex("pullUps", {
            sets: "3",
            reps: "4-6",
            tempo: "4s down",
            rest: "120 sec",
            notes: "Slow eccentric. Control the descent completely.",
          }),
          // 3. SCAPULAR HEALTH (slow + controlled)
          ex("bearCrawl", {
            sets: "2",
            time: "20-30 sec",
            rest: "45-60 sec",
            notes:
              "Auto-regulate: 2 sets if shoulders loaded. Focus on scapular stability.",
          }),
          // 4. CORE - ANTI-ROTATION (pauses)
          ex("renegadeRow", {
            sets: "3",
            reps: "5-6/side",
            tempo: "2s pause",
            rest: "60-75 sec",
            notes: "Pause at top. Anti-rotation focus, not a second main lift.",
          }),
          // 5. CARRY (capped time)
          ex("suitcaseCarry", {
            sets: "3",
            time: "45 sec/side",
            rest: "30-45 sec",
            notes:
              "Max 45 sec. Stay perfectly vertical. Limit grip fatigue stacking.",
          }),
          // 6. GRIP FINISHER (capped)
          ex("deadHang", {
            sets: "3",
            time: "30-60 sec",
            rest: "45 sec",
            notes: "Cap at 60 sec. End early if shoulders start shrugging.",
          }),
        ]),
    },
    {
      id: 16,
      dayOfWeek: "Tuesday",
      title: "LOWER BODY",
      subtitle: "Tension & Power",
      exercises:
        (resetIdCounter(),
        [
          ex("gobletSquat", {
            sets: "4",
            reps: "6",
            tempo: "1s pause at bottom",
            rest: "90-120 sec",
            notes: "Pause squat. Explode from the dead stop.",
          }),
          ex("romanianDeadlift", {
            sets: "3",
            reps: "6",
            tempo: "4s down",
            rest: "90 sec",
            notes: "Lower hinge strength volume. Slow eccentric for intensity.",
          }),
          ex("kettlebellSwing", {
            sets: "4",
            reps: "15",
            rest: "60 sec",
            notes:
              "High swing volume this week. RDL volume is reduced. Crisp hip drive.",
          }),
          ex("airSquat", {
            sets: "4",
            reps: "6",
            rest: "60 sec",
            notes: "Peak intensity. Explode for max height, stick the landing.",
          }),
        ]),
    },
    restDay(17, "Wednesday"),
    {
      id: 18,
      dayOfWeek: "Thursday",
      title: "UPPER PUSH",
      subtitle: "Slow & Strong",
      exercises:
        (resetIdCounter(),
        [
          // 1. VERTICAL PRESS (Slow eccentrics)
          ex("halfKneelingPress", {
            sets: "4",
            reps: "5/side",
            tempo: "4 sec down",
            rest: "90 sec",
            notes:
              "Slow lowering phase. Fewer reps, more time under tension. Control is power.",
          }),
          // 2. HORIZONTAL PRESS (Slow eccentrics)
          ex("floorPress", {
            sets: "4",
            reps: "5-6",
            tempo: "4 sec down",
            rest: "90 sec",
            notes: "Slow eccentric until triceps touch floor. Maximum control.",
          }),
          // 3. SERRATUS / PROTRACTION ENDURANCE (Paused)
          ex("serratusPunch", {
            sets: "3",
            reps: "12-15/side",
            tempo: "2 sec pause at end",
            rest: "60 sec",
            notes:
              "Punch forward, hold protraction 2 sec. Serratus under tension.",
          }),
          // 4. OVERHEAD STABILITY (Extended holds)
          ex("overheadWaiterCarry", {
            sets: "4",
            time: "40-60 sec/side",
            rest: "45 sec",
            notes: "Extended time. Maximum overhead stability challenge.",
          }),
          // 5. SCAPULAR CONTROL FINISHER
          ex("wallSlideLiftOff", {
            sets: "3",
            reps: "10-12 slow",
            notes: "Extra slow this week. Build control and endurance.",
          }),
        ]),
    },
    {
      id: 19,
      dayOfWeek: "Friday",
      title: "SURF CARDIO",
      subtitle: "Peak Paddle Power",
      exercises:
        (resetIdCounter(),
        [
          circuitHeader(
            5,
            "Rest 45-60 sec between rounds. Peak anaerobic intensity. ~25 min total."
          ),
          circuitEx("kettlebellSwing", {
            time: "45 sec",
            notes: "Peak volume. Crisp hip snap, controlled breathing.",
          }),
          circuitEx("lateralShuffle", {
            time: "45 sec",
            notes: "Stay low, quick feet. Peak lateral conditioning.",
          }),
          circuitEx("highKneesSprint", {
            time: "20 sec",
            notes:
              "ALL OUT! Peak intensity week. Simulate catching the wave of the day.",
          }),
          circuitEx("bearCrawl", {
            time: "40 sec",
            notes: "Forward/backward. Trunk endurance under fatigue.",
          }),
          circuitEx("easyJog", {
            time: "90 sec",
            notes:
              "Recovery. Nasal breathing. RPE 4-5. Recover for next burst.",
          }),
        ]),
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
      subtitle: "Sharp & Fresh",
      shoulderFinisher: SHOULDER_FINISHER_B,
      exercises:
        (resetIdCounter(),
        [
          // 1. PRIMARY HORIZONTAL PULL (explosive, stay fresh)
          ex("chestSupportedRow", {
            sets: "3",
            reps: "5-6",
            tempo: "Explosive",
            rest: "90 sec",
            notes: "Stop 2 reps before failure. Preserve speed and quality.",
          }),
          // 2. VERTICAL PULL (submaximal)
          ex("pullUps", {
            sets: "3",
            reps: "4-6",
            tempo: "Explosive",
            rest: "2 min",
            notes: "Leave 2 RIR. Neural sharpness, not max-effort fatigue.",
          }),
          // 3. SCAPULAR HEALTH (maintenance)
          ex("proneRow", {
            sets: "2",
            reps: "8 each position",
            rest: "45-60 sec",
            notes: "Y-T-W. Shoulder health, zero fatigue cost.",
          }),
          // 4. CORE - ANTI-ROTATION (controlled)
          ex("renegadeRow", {
            sets: "3",
            reps: "5/side",
            tempo: "Controlled",
            rest: "60 sec",
            notes: "1-2s up, no pause. Reduce grip + shoulder CNS demand.",
          }),
          // 5. CARRY (reduced, stay fresh)
          ex("suitcaseCarry", {
            sets: "3",
            time: "30 sec/side",
            rest: "30 sec",
            notes: "Low-cost trunk activation. Stay fresh.",
          }),
          // 6. GRIP FINISHER (submax)
          ex("deadHang", {
            sets: "2",
            time: "Submax (70-80% of best)",
            rest: "90 sec",
            notes: "Decompression only. No max holds. Stop before shrugging.",
          }),
        ]),
    },
    {
      id: 23,
      dayOfWeek: "Tuesday",
      title: "LOWER BODY",
      subtitle: "Deload",
      exercises:
        (resetIdCounter(),
        [
          ex("gobletSquat", {
            sets: "2",
            reps: "6",
            tempo: "Fast up",
            rest: "90 sec",
            notes: "Deload week. Reduced volume, maintain movement quality.",
          }),
          ex("romanianDeadlift", {
            sets: "2",
            reps: "6",
            rest: "90 sec",
            notes: "Deload. Light and controlled. Stay fresh for surfing.",
          }),
          ex("kettlebellSwing", {
            sets: "2",
            reps: "10",
            rest: "60 sec",
            notes: "Deload. Crisp reps, stay sharp, don't grind.",
          }),
          ex("airSquat", {
            sets: "2",
            reps: "4",
            rest: "60 sec",
            notes: "Deload. Low reps, springy and fresh. No grinding.",
          }),
        ]),
    },
    restDay(24, "Wednesday"),
    {
      id: 25,
      dayOfWeek: "Thursday",
      title: "UPPER PUSH",
      subtitle: "Peak Power",
      exercises:
        (resetIdCounter(),
        [
          // 1. VERTICAL PRESS (Explosive, reduced volume)
          ex("halfKneelingPress", {
            sets: "4",
            reps: "4-5/side",
            tempo: "Explosive up",
            rest: "90 sec",
            notes: "Explosive pressing power. Quality reps only. Stay fresh.",
          }),
          // 2. HORIZONTAL PRESS (Explosive, reduced)
          ex("floorPress", {
            sets: "3",
            reps: "5-6",
            tempo: "Explosive up",
            rest: "90 sec",
            notes: "Reduced volume. Fast up, controlled down. Peak week.",
          }),
          // 3. SERRATUS / PROTRACTION ENDURANCE (Maintenance)
          ex("serratusPunch", {
            sets: "2",
            reps: "10-12/side",
            rest: "60 sec",
            notes: "Maintenance volume. Keep serratus active for benchmark.",
          }),
          // 4. OVERHEAD STABILITY (Reduced, stay fresh)
          ex("overheadWaiterCarry", {
            sets: "2",
            time: "30-40 sec/side",
            rest: "45 sec",
            notes: "Reduced volume. Maintain stability, stay fresh for test.",
          }),
          // 5. SCAPULAR CONTROL FINISHER (Maintenance)
          ex("wallSlideLiftOff", {
            sets: "2",
            reps: "8-10 slow",
            notes: "Maintenance. Ready for benchmark.",
          }),
        ]),
    },
    {
      id: 26,
      dayOfWeek: "Friday",
      title: "SURF CARDIO",
      subtitle: "Deload Flow",
      exercises:
        (resetIdCounter(),
        [
          circuitHeader(
            4,
            "Rest 75-90 sec between rounds. RPE 4-5. Stay fresh, maintain movement quality. ~20 min total."
          ),
          circuitEx("kettlebellSwing", {
            time: "30 sec",
            notes: "Deload. Crisp and controlled, no grind.",
          }),
          circuitEx("lateralShuffle", {
            time: "30 sec",
            notes: "Light feet, easy rhythm. Stay loose.",
          }),
          circuitEx("highKneesSprint", {
            time: "10 sec",
            notes:
              "Short burst. Maintain speed quality, don't max out. Stay fresh.",
          }),
          circuitEx("easyJog", {
            time: "90 sec",
            notes:
              "Easy recovery pace. Nasal breathing. Finish warm, not tired.",
          }),
        ]),
    },
    restDay(27, "Saturday", "Surf or Recover"),
    restDay(28, "Sunday", "Surf or Recover"),
  ],
};

// =============================================================================
// EQUIPMENT-BASED WORKOUT TRANSFORMATION
// =============================================================================

// Map exercise names to their base keys for reverse lookup
const EXERCISE_NAME_TO_KEY: Record<string, string> = {
  "Chest-Supported DB Row": "chestSupportedRow",
  "1-Arm DB Row (split stance)": "singleArmRow",
  "DB Suitcase Carry": "suitcaseCarry",
  "Dead Bug (DBs held straight up)": "deadBug",
  "Goblet Squat": "gobletSquat",
  "DB Romanian Deadlift": "romanianDeadlift",
  "Kettlebell Swing": "kettlebellSwing",
  "Prone Pop-Up": "pronePopUp",
  "Half-Kneeling DB Press": "halfKneelingPress",
  "DB Floor Press": "floorPress",
  "DB Windmill": "windmill",
  "Tall-Kneeling DB Halo": "halo",
  "Reverse Lunges (goblet hold)": "reverseLunge",
  "Bent-Over DB Rows": "bentOverRow",
  "Farmer Carry": "farmerCarry",
  "Push-Ups": "pushUps",
  "Incline Push-Ups": "inclinePushUps",
  "Pull-Ups": "pullUps",
  "Renegade Row": "renegadeRow",
  "Prone Y-T-W Raises": "proneRow",
  "Band Straight-Arm Pulldown": "bandPulldown",
  "Plank Shoulder Taps": "plankShoulderTaps",
  "Dead Hang": "deadHang",
  "DB Pullover": "dbPullover",
  "Scap Pull-Ups": "scapPullUps",
  "Half-Kneeling Anti-Rotation Row": "halfKneelingAntiRotationRow",
  "Band Lat Pulldown": "bandLatPulldown",
  "Side Plank Row": "sidePlankRow",
  "Inverted Row": "invertedRow",
  "Wall Slide + Lift-Off": "wallSlideLiftOff",
  "Serratus Punch": "serratusPunch",
  "Bear Crawl": "bearCrawl",
  "Lateral Shuffle": "lateralShuffle",
  "Easy Jog": "easyJog",
  "Overhead Waiter Carry": "overheadWaiterCarry",
  "Close-Grip Push-Ups": "closeGripPushUps",
  "Half-Kneeling Band Overhead Press": "bandPress",
  "Pike Push-Up": "pikePushUp",
  "Half-Kneeling Band High-to-Low Chop": "bandHighToLowChop",
  "High-Knees Sprint": "highKneesSprint",
  "Band Pallof Walk": "bandCarry",
  "Prayer Stretch": "prayerStretch",
};

/**
 * Find the base key for an exercise by name
 */
function findBaseKeyByName(name: string): string | null {
  // Remove circuit prefix if present
  const cleanName = name.replace(/^→\s*/, "");
  return EXERCISE_NAME_TO_KEY[cleanName] || null;
}

/**
 * Transform a single exercise based on available equipment
 */
export function transformExerciseForEquipment(
  exercise: Exercise,
  availableEquipment: EquipmentType[]
): Exercise {
  // Skip circuit headers
  if (
    exercise.name.startsWith("Circuit:") ||
    exercise.name.startsWith("Benchmark")
  ) {
    return exercise;
  }

  const isCircuit = exercise.name.startsWith("→");
  const cleanName = exercise.name.replace(/^→\s*/, "");
  const baseKey = findBaseKeyByName(cleanName);

  if (!baseKey) {
    return exercise; // Unknown exercise, return as-is
  }

  const base = getBaseExerciseForEquipment(baseKey, availableEquipment);

  return {
    ...exercise,
    name: isCircuit ? `→ ${base.name}` : base.name,
    load: base.load,
    gif: base.gif,
    youtube: base.youtube,
    equipment: base.equipment,
    // Keep the original notes if custom, otherwise use base notes
    notes: exercise.notes || base.defaultNotes || undefined,
  };
}

/**
 * Transform mobility exercises based on available equipment
 * Substitutes alternatives when required equipment is not available
 */
export function transformMobilityExercises(
  exercises: MobilityExercise[],
  availableEquipment: EquipmentType[]
): MobilityExercise[] {
  return exercises
    .map((ex) => {
      // If no equipment required or user has the equipment, return as-is
      if (!ex.requiresEquipment) return ex;
      if (availableEquipment.includes(ex.requiresEquipment)) return ex;

      // Equipment not available - use alternative if provided
      if (ex.alternative) {
        return ex.alternative;
      }

      // No alternative, filter out (return null and filter later)
      return null;
    })
    .filter((ex): ex is MobilityExercise => ex !== null);
}

/**
 * Transform shoulder finisher based on available equipment
 */
export function transformShoulderFinisher(
  finisher: ShoulderFinisher | undefined,
  availableEquipment: EquipmentType[]
): ShoulderFinisher | undefined {
  if (!finisher) return undefined;

  const transformedExercises = transformMobilityExercises(
    finisher.exercises,
    availableEquipment
  );

  // If all exercises were filtered out, don't include the finisher
  if (transformedExercises.length === 0) return undefined;

  return {
    ...finisher,
    exercises: transformedExercises,
  };
}

/**
 * Transform all exercises in a workout day based on available equipment
 */
export function transformWorkoutDayForEquipment(
  day: WorkoutDay,
  availableEquipment: EquipmentType[]
): WorkoutDay {
  if (day.isRest) {
    return day;
  }

  return {
    ...day,
    exercises: day.exercises.map((ex) =>
      transformExerciseForEquipment(ex, availableEquipment)
    ),
    shoulderFinisher: transformShoulderFinisher(
      day.shoulderFinisher,
      availableEquipment
    ),
  };
}

/**
 * Transform entire workout plan based on available equipment
 */
export function transformWorkoutPlanForEquipment(
  plan: Week[],
  availableEquipment: EquipmentType[]
): Week[] {
  return plan.map((week) => ({
    ...week,
    days: week.days.map((day) =>
      transformWorkoutDayForEquipment(day, availableEquipment)
    ),
  }));
}

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
