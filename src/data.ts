export enum Mode {
  WEEK_A,
  WEEK_B,
  UNIFIED,
  ALL
}

export enum Definition {
  BLUE,
  YELLOW,
  BLACK,
  WHITE,
  RED,
  GREEN
}

type DaySchedule = Record<Definition, Definition[]>;

export const currentPeriods = {
  [Mode.WEEK_B]: {
    monday: [
      Definition.BLUE,
      Definition.BLUE,
      Definition.RED,
      Definition.RED,
      Definition.BLACK,
      Definition.BLACK
    ],
    tuesday: [
      Definition.GREEN,
      Definition.YELLOW,
      Definition.BLACK,
      Definition.BLUE,
      Definition.WHITE,
      Definition.RED
    ],
    wednesday: [
      Definition.YELLOW,
      Definition.YELLOW,
      Definition.GREEN,
      Definition.GREEN,
      Definition.BLACK,
      Definition.BLACK
    ],
    thursday: [
      Definition.WHITE,
      Definition.WHITE,
      Definition.YELLOW,
      Definition.YELLOW,
      Definition.BLACK,
      Definition.BLUE
    ],
    friday: [
      Definition.YELLOW,
      Definition.GREEN,
      Definition.WHITE,
      Definition.WHITE,
      Definition.BLACK,
      Definition.BLACK
    ]
  },
  [Mode.WEEK_A]: {
    monday: [
      Definition.BLUE,
      Definition.BLUE,
      Definition.RED,
      Definition.RED,
      Definition.BLACK,
      Definition.BLACK
    ],
    tuesday: [
      Definition.GREEN,
      Definition.YELLOW,
      Definition.BLACK,
      Definition.BLUE,
      Definition.WHITE,
      Definition.RED
    ],
    wednesday: [
      Definition.YELLOW,
      Definition.YELLOW,
      Definition.GREEN,
      Definition.GREEN,
      Definition.BLACK,
      Definition.BLACK
    ],
    thursday: [
      Definition.BLACK,
      Definition.BLACK,
      Definition.BLUE,
      Definition.BLUE,
      Definition.RED,
      Definition.WHITE
    ],
    friday: [
      Definition.GREEN,
      Definition.GREEN,
      Definition.WHITE,
      Definition.WHITE,
      Definition.YELLOW,
      Definition.YELLOW
    ]
  },
  [Mode.UNIFIED]: {
    monday: [
      Definition.BLUE,
      Definition.BLUE,
      Definition.YELLOW,
      Definition.YELLOW,
      Definition.BLACK,
      Definition.BLACK
    ],
    tuesday: [
      Definition.GREEN,
      Definition.YELLOW,
      Definition.BLACK,
      Definition.BLUE,
      Definition.WHITE,
      Definition.RED
    ],
    wednesday: [
      Definition.WHITE,
      Definition.WHITE,
      Definition.GREEN,
      Definition.GREEN,
      Definition.RED,
      Definition.RED
    ],
    thursday: [
      Definition.YELLOW,
      Definition.YELLOW,
      Definition.BLACK,
      Definition.BLACK,
      Definition.BLUE,
      Definition.BLUE
    ],
    friday: [
      Definition.RED,
      Definition.RED,
      Definition.GREEN,
      Definition.GREEN,
      Definition.WHITE,
      Definition.WHITE
    ]
  }
} as Record<any, any>;
