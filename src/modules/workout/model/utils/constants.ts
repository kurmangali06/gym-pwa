import { DateType, MixGroup, MuscleGroup } from 'shared/lib/types/app/pages';

export const dayList = ref([
  {
    value: DateType.Monday,
    label: 'Понедельник',
  },
  {
    value: DateType.Tuesday,
    label: 'Вторник',
  },
  {
    value: DateType.Wednesday,
    label: 'Среда',
  },
  {
    value: DateType.Thursday,
    label: 'Четверг',
  },
  {
    value: DateType.Friday,
    label: 'Пятница',
  },
  {
    value: DateType.Saturday,
    label: 'Суббота',
  },
  {
    value: DateType.Sunday,
    label: 'Воскресенье',
  },
]);

export const MuscleList = ref([
  {
    value: MuscleGroup.Shoulders,
    label: 'Плечи',
  },
  {
    value: MuscleGroup.Biceps,
    label: 'Бицепс',
  },
  {
    value: MuscleGroup.Triceps,
    label: 'Трицепс',
  },
  {
    value: MuscleGroup.Chest,
    label: 'Грудь',
  },
  {
    value: MuscleGroup.Press,
    label: 'Пресс',
  },
  {
    value: MuscleGroup.Back,
    label: 'Спина',
  },
  {
    value: MuscleGroup.Logs,
    label: 'Ноги',
  },
]);

export const dictionaryMuscleGroup = {
  [MuscleGroup.Shoulders]: 'Плечи',
  [MuscleGroup.Biceps]: 'Бицепс',
  [MuscleGroup.Triceps]: 'Трицепс',
  [MuscleGroup.Chest]: 'Грудь',
  [MuscleGroup.Press]: 'Пресс',
  [MuscleGroup.Back]: 'Спина',
  [MuscleGroup.Logs]: 'Ноги',
};
export const MuscleListVant = ref([
  {
    id: MixGroup.ShouldersLogs,
    text: 'Плечи / Ноги',
    children: [
      {
        id: MuscleGroup.Shoulders,
        text: 'Плечи',
      },
      {
        id: MuscleGroup.Logs,
        text: 'Ноги',
      },
    ],
  },
  {
    id: MixGroup.BicepsBack,
    text: 'Бицепс /Спина',
    children: [
      {
        id: MuscleGroup.Biceps,
        text: 'Бицепс',
      },
      {
        id: MuscleGroup.Back,
        text: 'Спина',
      },
    ],
  },
  {
    id: MixGroup.TricepsChest,
    text: 'Трицепс /Грудь',
    children: [
      {
        id: MuscleGroup.Chest,
        text: 'Грудь',
      },
      {
        id: MuscleGroup.Triceps,
        text: 'Трицепс',
      },
    ],
  },
]);

export const columns = [
  {
    title: 'Упражнение',
    key: 'exercise',
    width: '40%',
  },
  {
    title: 'Подходы',
    key: 'approaches',
    width: '40%',
  },
  {
    title: 'Действия',
    key: 'operation',
    width: '20%',
  },

];

interface Exercise {
  value: string
  label: string
  sets: number
  description: string
  videoUrl: string
  imageUrl: string // Added property for the image
}

export const exercisesByMuscleGroup: Record<MuscleGroup, Exercise[]> = {
  [MuscleGroup.Shoulders]: [
    {
      value: 'Overhead Press',
      label: 'Жим над головой',
      sets: 5,
      description: 'Основное упражнение для развития дельтовидных мышц, выполняемое стоя или сидя.',
      videoUrl: 'https://www.youtube.com/watch?v=2yjwXTZQDDI',
      imageUrl: 'https://example.com/images/overhead-press.jpg', // Placeholder URL
    },
    {
      value: 'Lateral Raises',
      label: 'Подъём гантелей через стороны',
      sets: 3,
      description: 'Изолирующее упражнение для тренировки средних пучков дельт.',
      videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo',
      imageUrl: 'https://example.com/images/lateral-raises.jpg', // Placeholder URL
    },
    {
      value: 'Front Raises',
      label: 'Подъём гантелей перед собой',
      sets: 3,
      description: 'Упражнение для тренировки передней части дельтовидных мышц.',
      videoUrl: 'https://www.youtube.com/watch?v=-t7fuZ0KhDA',
      imageUrl: 'https://example.com/images/front-raises.jpg', // Placeholder URL
    },
    {
      value: 'Arnold Press',
      label: 'Жим Арнольда',
      sets: 5,
      description: 'Вариация жима с дополнительным разворотом кистей, названная в честь Арнольда Шварценеггера.',
      videoUrl: 'https://www.youtube.com/watch?v=6Z15_WdXmVw',
      imageUrl: 'https://example.com/images/arnold-press.jpg', // Placeholder URL
    },
    {
      value: 'Face Pulls',
      label: 'Тяга к лицу',
      sets: 3,
      description: 'Упражнение для тренировки задних дельт и трапеций, выполняемое с использованием канатного тренажера.',
      videoUrl: 'https://www.youtube.com/watch?v=rep-qVOkqgk',
      imageUrl: 'https://example.com/images/face-pulls.jpg', // Placeholder URL
    },
    {
      value: 'Rear Delt Flyes',
      label: 'Махи на задние дельты',
      sets: 3,
      description: 'Упражнение для тренировки задних дельт, выполняемое с гантелями или на тренажере.',
      videoUrl: 'https://www.youtube.com/watch?v=J5Qka7MCn5A', // Placeholder URL
      imageUrl: 'https://example.com/images/rear-delt-flyes.jpg', // Placeholder URL
    },
    {
      value: 'Lateral Raises',
      label: 'Махи на средние дельты',
      sets: 3,
      description: 'Упражнение для тренировки средних дельт, выполняемое с гантелями для увеличения ширины плеч.',
      videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo', // Placeholder URL
      imageUrl: 'https://example.com/images/lateral-raises.jpg', // Placeholder URL
    },
  ],
  [MuscleGroup.Biceps]: [
    {
      value: 'Barbell Curl',
      label: 'Сгибание рук со штангой',
      sets: 5,
      description: 'Классическое упражнение для увеличения массы и силы бицепсов.',
      videoUrl: 'https://www.youtube.com/watch?v=kwG2ipFRgfo',
      imageUrl: 'https://example.com/images/barbell-curl.jpg', // Placeholder URL
    },
    {
      value: 'Dumbbell Curl',
      label: 'Сгибание рук с гантелями',
      sets: 3,
      description: 'Изолированное упражнение для каждой руки с гантелями.',
      videoUrl: 'https://www.youtube.com/watch?v=ykJmrZ5v0Oo',
      imageUrl: 'https://example.com/images/dumbbell-curl.jpg', // Placeholder URL
    },
    {
      value: 'Hammer Curl',
      label: 'Молотковые сгибания',
      sets: 3,
      description: 'Упражнение, акцентирующее нагрузку на брахиалис и брахиорадиалис.',
      videoUrl: 'https://www.youtube.com/watch?v=zC3nLlEvin4',
      imageUrl: 'https://example.com/images/hammer-curl.jpg', // Placeholder URL
    },
    {
      value: 'Concentration Curl',
      label: 'Концентрированные сгибания',
      sets: 3,
      description: 'Изолирующее упражнение, позволяющее максимально сфокусироваться на бицепсе.',
      videoUrl: 'https://www.youtube.com/watch?v=soxrZlIl35U',
      imageUrl: 'https://example.com/images/concentration-curl.jpg', // Placeholder URL
    },
    {
      value: 'Preacher Curl',
      label: 'Сгибание рук на скамье Скотта',
      sets: 5,
      description: 'Упражнение, обеспечивающее глубокую растяжку и сокращение бицепса.',
      videoUrl: 'https://www.youtube.com/watch?v=-M4-G8p8fmc',
      imageUrl: 'https://example.com/images/preacher-curl.jpg', // Placeholder URL
    },
  ],
  [MuscleGroup.Triceps]: [
    {
      value: 'Tricep Dips',
      label: 'Отжимания на трицепс',
      sets: 5,
      description: 'Эффективное упражнение для работы над трицепсами, выполняемое на брусьях или скамье.',
      videoUrl: 'https://www.youtube.com/watch?v=0326dy_-CzM',
      imageUrl: 'https://example.com/images/tricep-dips.jpg', // Placeholder URL
    },
    {
      value: 'Overhead Tricep Extension',
      label: 'Французский жим сидя',
      sets: 3,
      description: 'Упражнение для растягивания и укрепления длинной головки трицепса.',
      videoUrl: 'https://www.youtube.com/watch?v=YbX7Wd8jQ-Q',
      imageUrl: 'https://example.com/images/overhead-tricep-extension.jpg', // Placeholder URL
    },
    {
      value: 'Tricep Pushdown',
      label: 'Разгибание рук на блоке',
      sets: 5,
      description: 'Изолированное упражнение для трицепсов, выполняемое на канатном тренажере.',
      videoUrl: 'https://www.youtube.com/watch?v=2-LAMcpzODU',
      imageUrl: 'https://example.com/images/tricep-pushdown.jpg', // Placeholder URL
    },
    {
      value: 'Close-Grip Bench Press',
      label: 'Жим узким хватом',
      sets: 5,
      description: 'Базовое упражнение для развития массы и силы трицепсов.',
      videoUrl: 'https://www.youtube.com/watch?v=oqPNliN7UTo',
      imageUrl: 'https://example.com/images/close-grip-bench-press.jpg', // Placeholder URL
    },
    {
      value: 'Skull Crushers',
      label: 'Французский жим лёжа',
      sets: 5,
      description: 'Упражнение для изоляции трицепсов, выполняемое с EZ-штангой или гантелями.',
      videoUrl: 'https://www.youtube.com/watch?v=d_KZxkY_0cM',
      imageUrl: 'https://example.com/images/skull-crushers.jpg', // Placeholder URL
    },
  ],
  [MuscleGroup.Chest]: [
    {
      value: 'Bench Press',
      label: 'Жим лёжа',
      sets: 5,
      description: 'Основное базовое упражнение для развития силы и массы грудных мышц.',
      videoUrl: 'https://www.youtube.com/watch?v=rT7DgCr-3pg',
      imageUrl: 'https://example.com/images/bench-press.jpg', // Placeholder URL
    },
    {
      value: 'Incline Bench Press',
      label: 'Жим на наклонной скамье',
      sets: 5,
      description: 'Упражнение, акцентирующее нагрузку на верхнюю часть грудных мышц.',
      videoUrl: 'https://www.youtube.com/watch?v=SrqOu55lrYU',
      imageUrl: 'https://example.com/images/incline-bench-press.jpg', // Placeholder URL
    },
    {
      value: 'Chest Fly',
      label: 'Разводка гантелей лёжа',
      sets: 3,
      description: 'Изолирующее упражнение для проработки грудных мышц.',
      videoUrl: 'https://www.youtube.com/watch?v=eozdVDA78K0',
      imageUrl: 'https://example.com/images/chest-fly.jpg', // Placeholder URL
    },
    {
      value: 'Push-Ups',
      label: 'Отжимания',
      sets: 5,
      description: 'Базовое упражнение с собственным весом для тренировки грудных, дельт и трицепсов.',
      videoUrl: 'https://www.youtube.com/watch?v=_l3ySVKYVJ8',
      imageUrl: 'https://example.com/images/push-ups.jpg', // Placeholder URL
    },
    {
      value: 'Chest Dips',
      label: 'Отжимания на брусьях для грудных',
      sets: 5,
      description: 'Упражнение для нижней части грудных мышц, выполняемое на брусьях.',
      videoUrl: 'https://www.youtube.com/watch?v=2z8JmcrW-As',
      imageUrl: 'https://example.com/images/chest-dips.jpg', // Placeholder URL
    },
  ],
  [MuscleGroup.Back]: [
    {
      value: 'Deadlift',
      label: 'Становая тяга',
      sets: 5,
      description: 'Базовое многосуставное упражнение, развивающее силу и массу спины, ног и кора.',
      videoUrl: 'https://www.youtube.com/watch?v=ytGaGIn3SjE',
      imageUrl: 'https://example.com/images/deadlift.jpg', // Placeholder URL
    },
    {
      value: 'Pull-Ups',
      label: 'Подтягивания',
      sets: 5,
      description: 'Упражнение с собственным весом для тренировки широчайших мышц спины.',
      videoUrl: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
      imageUrl: 'https://example.com/images/pull-ups.jpg', // Placeholder URL
    },
    {
      value: 'Bent-Over Rows',
      label: 'Тяга штанги в наклоне',
      sets: 5,
      description: 'Основное упражнение для развития средней части спины и ромбовидных мышц.',
      videoUrl: 'https://www.youtube.com/watch?v=vT2GjY_Umpw',
      imageUrl: 'https://example.com/images/bent-over-rows.jpg', // Placeholder URL
    },
    {
      value: 'Lat Pulldown',
      label: 'Тяга верхнего блока',
      sets: 5,
      description: 'Упражнение для тренировки широчайших мышц спины, выполняемое на тренажере.',
      videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc',
      imageUrl: 'https://example.com/images/lat-pulldown.jpg', // Placeholder URL
    },
    {
      value: 'T-Bar Row',
      label: 'Тяга Т-грифа',
      sets: 5,
      description: 'Упражнение для развития толщины спины, выполняемое с Т-грифом.',
      videoUrl: 'https://www.youtube.com/watch?v=9efgcAjQe7E',
      imageUrl: 'https://example.com/images/t-bar-row.jpg', // Placeholder URL
    },
  ],
  [MuscleGroup.Logs]: [
    {
      value: 'Squat',
      label: 'Приседания',
      sets: 5,
      description: 'Основное базовое упражнение для тренировки квадрицепсов, ягодиц и кора.',
      videoUrl: 'https://www.youtube.com/watch?v=aclHkVaku9U',
      imageUrl: 'https://example.com/images/squat.jpg', // Placeholder URL
    },
    {
      value: 'Lunges',
      label: 'Выпады',
      sets: 3,
      description: 'Упражнение для развития квадрицепсов, ягодиц и баланса.',
      videoUrl: 'https://www.youtube.com/watch?v=QOVaHwm-Q6U',
      imageUrl: 'https://example.com/images/lunges.jpg', // Placeholder URL
    },
    {
      value: 'Leg Press',
      label: 'Жим ногами',
      sets: 5,
      description: 'Изолирующее упражнение для тренировки квадрицепсов и ягодиц, выполняемое на тренажере.',
      videoUrl: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ',
      imageUrl: 'https://example.com/images/leg-press.jpg', // Placeholder URL
    },
    {
      value: 'Leg Curl',
      label: 'Сгибание ног',
      sets: 3,
      description: 'Упражнение для тренировки бицепсов бедра, выполняемое на тренажере.',
      videoUrl: 'https://www.youtube.com/watch?v=1Tq3QdYUuHs',
      imageUrl: 'https://example.com/images/leg-curl.jpg', // Placeholder URL
    },
    {
      value: 'Calf Raises',
      label: 'Подъёмы на носки',
      sets: 5,
      description: 'Упражнение для тренировки икроножных мышц.',
      videoUrl: 'https://www.youtube.com/watch?v=-M4-G8p8fmc',
      imageUrl: 'https://example.com/images/calf-raises.jpg', // Placeholder URL
    },
    {
      value: 'Hip Thrust',
      label: 'Тяга ягодиц',
      sets: 5,
      description: 'Упражнение для тренировки ягодичных мышц, выполняемое с использованием штанги или гантелей.',
      videoUrl: 'https://www.youtube.com/watch?v=EMn9Jc4k_rU',
      imageUrl: 'https://example.com/images/hip-thrust.jpg', // Placeholder URL
    },
    {
      value: 'Glute Bridge',
      label: 'Ягодичный мостик',
      sets: 5,
      description: 'Упражнение для развития ягодиц и укрепления кора.',
      videoUrl: 'https://www.youtube.com/watch?v=8bbE64NuDTU',
      imageUrl: 'https://example.com/images/glute-bridge.jpg', // Placeholder URL
    },
    {
      value: 'Cable Kickbacks',
      label: 'Разгибания ног на блоке',
      sets: 3,
      description: 'Изолированное упражнение для тренировки ягодиц, выполняемое на тренажере.',
      videoUrl: 'https://www.youtube.com/watch?v=d3eStM1hO0I',
      imageUrl: 'https://example.com/images/cable-kickbacks.jpg', // Placeholder URL
    },
    {
      value: 'Bulgarian Split Squats',
      label: 'Болгарские сплит-приседания',
      sets: 3,
      description: 'Упражнение для тренировки ягодиц и ног, выполняемое с использованием скамьи.',
      videoUrl: 'https://www.youtube.com/watch?v=2C-uNgKwPLE',
      imageUrl: 'https://example.com/images/bulgarian-split-squats.jpg', // Placeholder URL
    },
    {
      value: 'Sumo Deadlift',
      label: 'Сумо становая тяга',
      sets: 5,
      description: 'Упражнение, акцентирующее нагрузку на внутреннюю часть бедер и ягодицы.',
      videoUrl: 'https://www.youtube.com/watch?v=9Jg8JpVVtXg',
      imageUrl: 'https://example.com/images/sumo-deadlift.jpg', // Placeholder URL
    },
  ],
  [MuscleGroup.Press]: [
    {
      value: 'Crunches',
      label: 'Скручивания',
      sets: 3,
      description: 'Основное упражнение для тренировки прямой мышцы живота.',
      videoUrl: 'https://www.youtube.com/watch?v=Xyd_fa5zoEU',
      imageUrl: 'https://example.com/images/crunches.jpg', // Placeholder URL
    },
    {
      value: 'Leg Raises',
      label: 'Подъём ног',
      sets: 3,
      description: 'Упражнение для нижней части пресса, выполняемое лежа или на турнике.',
      videoUrl: 'https://www.youtube.com/watch?v=JB2oyawG9KI',
      imageUrl: 'https://example.com/images/leg-raises.jpg', // Placeholder URL
    },
    {
      value: 'Plank',
      label: 'Планка',
      sets: 3,
      description: 'Изометрическое упражнение для тренировки кора и выносливости мышц.',
      videoUrl: 'https://www.youtube.com/watch?v=ASdvN_XEl_c',
      imageUrl: 'https://example.com/images/plank.jpg', // Placeholder URL
    },
    {
      value: 'Russian Twists',
      label: 'Русские скручивания',
      sets: 3,
      description: 'Упражнение для тренировки косых мышц живота.',
      videoUrl: 'https://www.youtube.com/watch?v=wkD8rjkodUI',
      imageUrl: 'https://example.com/images/russian-twists.jpg', // Placeholder URL
    },
    {
      value: 'Bicycle Crunches',
      label: 'Велосипед',
      sets: 3,
      description: 'Упражнение для тренировки косых и прямых мышц живота.',
      videoUrl: 'https://www.youtube.com/watch?v=9FGilxCbdz8',
      imageUrl: 'https://example.com/images/bicycle-crunches.jpg', // Placeholder URL
    },
  ],

};
