import { HabitsType, TimePeriodType } from "@/types/habits"
import { getFormattedDate } from "./dateHelpers"
import APP_CONSTANTS from "@/constants/AppConstants"

export interface HabitsFiltersInterface {
  filterByPeriod(periods: TimePeriodType | TimePeriodType[]): this
  filterByDay(date: string): this
  filterByDaysOnMonth: () => this
  filterByDaysOfWeek: () => this
  filterBySelectedDate(date: string): this
  getById(id: string): HabitsType[]
  getAll(): HabitsType[]
  getGrouped(): {
    title: string
    data: HabitsType[]
  }
  setDate(selectedDate: string): this
  groupByPeriod: () => this
}

/**
 * Creates a new instance of HabitsFilters to filter and manipulate habit data.
 *
 * @param habitsList - The initial list of habits to be filtered.
 * @returns An instance of HabitsFiltersInterface, which provides methods for filtering and manipulating habit data.
 *
 * @example
 * const habitsFilters = HabitsFilters(habitsList);
 * habitsFilters.filterByPeriod('DAILY').getByValidDates();
 * habitsFilters.filterByPeriod(['MORNING', 'ANYTIME']).getByValidDates();
 */
export default function HabitsFilters(habitsList: HabitsType[]): HabitsFiltersInterface {
  let habits: any = habitsList || []
  let selectedDate = getFormattedDate("yyyy-MM-dd", new Date())

  const habitsFunctions = {
    /**
     * Filters the habits based on the provided time periods.
     *
     * @param periods - The time period(s) to filter by. Can be a single period or an array of periods.
     * @returns The current instance of HabitsFilters, allowing chaining of methods.
     *
     * @example
     * const habitsFilters = HabitsFilters(habitsList);
     * habitsFilters.filterByPeriod('DAILY').getByValidDates();
     * habitsFilters.filterByPeriod(['MORNING', 'ANYTIME']).getByValidDates();
     */

    filterByPeriod(periods: TimePeriodType | TimePeriodType[]) {
      if (!Array.isArray(periods)) {
        periods = [periods]
      }

      habits = habits.filter((habit: any) => habit.period.some((p: any) => periods.includes(p)))
      return this // Return the object to allow chaining
    },

    /**
     * Filters the habits based on the provided date.
     *
     * @param date - The date to filter by. The habits will be filtered to include only those with a createdDate
     *                that is greater than or equal to the provided date.
     * @returns The current instance of HabitsFilters, allowing chaining of methods.
     *
     * @example
     * const habitsFilters = HabitsFilters(habitsList);
     * habitsFilters.filterByDay('2022-01-01').getByValidDates();
     */

    filterByDay(date: string) {
      habits = habits.filter(
        (habit: HabitsType) => date >= getFormattedDate("yyyy-MM-dd", habit.createdDate),
      )

      return this
    },
    /**
     * Filters the habits based on the provided end date.
     *
     * @param date - The end date to filter by. The habits will be filtered to include only those with an endDate
     *                that is less than or equal to the provided date, or with an empty endDate.
     * @returns The current instance of HabitsFilters, allowing chaining of methods.
     *
     * @example
     * const habitsFilters = HabitsFilters(habitsList);
     * habitsFilters.filterByEndDate('2022-12-31').getByValidDates();
     */

    filterByEndDate(date: string) {
      habits = habits.filter(
        (habit: HabitsType) =>
          !(
            habit.endDate &&
            selectedDate >= getFormattedDate("yyyy-MM-dd", habit.endDate) &&
            habit.endDate !== ""
          ),
      )

      return this
    },

    /**
     * Filters the habits based on whether they are set to repeat or have a single date matching the selected date.
     *
     * @remarks
     * This function filters the habits array to include only those habits that meet the following criteria:
     * - If the habit has a single date set and is not a repeating habit, it will be included if the single date matches the selected date.
     * - If the habit is a repeating habit, it will be included regardless of the single date or selected date.
     *
     * @returns The current instance of HabitsFilters, allowing chaining of methods.
     *
     * @example
     * const habitsFilters = HabitsFilters(habitsList);
     * habitsFilters.filterBySingleDate().getByValidDates();
     */
    filterBySingleDate() {
      habits = habits.filter((habit: HabitsType) => {
        const isSingleDate = habit.singleDate?.dateString === selectedDate && !habit.repeat
        const isRepeat = habit.repeat === true

        return (isSingleDate && !isRepeat) || isRepeat
      })

      return this
    },

    /**
     * Filters the habits based on the selected day of the month.
     *
     * This function filters the habits array to include only those habits that meet the following criteria:
     * - If the habit's frequency is set to monthly, it will be included if the selected day of the month matches the habit's frequency schedule.
     * - If the habit's frequency is not set to monthly, it will be included regardless of the selected day of the month.
     *
     * @returns The current instance of HabitsFilters, allowing chaining of methods.
     *
     * @example
     * const habitsFilters = HabitsFilters(habitsList);
     * habitsFilters.filterByDaysOnMonth().getByValidDates();
     */
    filterByDaysOnMonth() {
      const dayOfMonth = Number(getFormattedDate("dd", selectedDate))

      habits = habits.filter((habit: HabitsType) => {
        const isMonthly = habit.frequency === APP_CONSTANTS.HABIT.FREQUENCY.MONTHLY
        const isScheduledDay = habit.frequencySchedule?.monthly.includes(dayOfMonth)

        return (isMonthly && isScheduledDay) || !isMonthly
      })

      return this
    },

    /**
     * Filters the habits based on the selected day of the week.
     *
     * This function filters the habits array to include only those habits that meet the following criteria:
     * - If the habit's frequency is set to daily, it will be included if the selected day of the week matches the habit's frequency schedule.
     * - If the habit's frequency is not set to daily, it will be included regardless of the selected day of the week.
     *
     * @returns The current instance of HabitsFilters, allowing chaining of methods.
     *
     * @example
     * const habitsFilters = HabitsFilters(habitsList);
     * habitsFilters.filterByDaysOfWeek().getByValidDates();
     */
    filterByDaysOfWeek() {
      const dayOfWeek = Number(getFormattedDate("c", new Date(selectedDate)))

      habits = habits.filter((habit: HabitsType) => {
        const isDailyFrequency = habit.frequency === APP_CONSTANTS.HABIT.FREQUENCY.DAILY
        const hasScheduleDaily = habit.frequencySchedule?.daily.includes(dayOfWeek)

        return (isDailyFrequency && hasScheduleDaily) || false
      })
      return this
    },

    setDate(date: string) {
      selectedDate = date
      return this
    },

    filterBySelectedDate(date: string) {
      habits = habitsFunctions
        .setDate(date)
        .filterByDay(selectedDate)
        .filterByEndDate(selectedDate)
        .filterBySingleDate()
        .filterByDaysOnMonth()
        .filterByDaysOfWeek()
        .getAll()

      return this
    },

    groupByPeriod() {
      const groupedByPeriod: { title: string; data: HabitsType[] }[] = [
        {
          title: APP_CONSTANTS.HABIT.PERIOD.MORNING,
          data: [],
        },
        {
          title: APP_CONSTANTS.HABIT.PERIOD.AFTERNOON,
          data: [],
        },
        {
          title: APP_CONSTANTS.HABIT.PERIOD.NIGHT,
          data: [],
        },
        {
          title: APP_CONSTANTS.HABIT.PERIOD.ANYTIME,
          data: [],
        },
      ]

      habits.forEach((habit: HabitsType) => {
        habit.period &&
          habit.period.forEach((value) => {
            if (
              value === APP_CONSTANTS.HABIT.PERIOD.MORNING ||
              value === APP_CONSTANTS.HABIT.PERIOD.AFTERNOON ||
              value === APP_CONSTANTS.HABIT.PERIOD.NIGHT ||
              value === APP_CONSTANTS.HABIT.PERIOD.ANYTIME
            ) {
              // groupedByPeriod[value].push(habit.id)
              const periodIndex = groupedByPeriod.findIndex(
                (periodObj) => periodObj.title === value,
              )

              if (periodIndex !== -1) {
                groupedByPeriod[periodIndex].data.push(habit)
              }
            }
          })
      })
      const removeEmpty = groupedByPeriod.filter((period) => period.data.length > 0)
      habits = groupedByPeriod.filter((period) => period.data.length > 0) || []

      return this
    },

    getAll() {
      return habits
    },

    getGrouped() {
      return habits
    },
    getById(id: HabitsType["id"]) {
      habits = habits.find((habit: HabitsType) => habit.id === id) || []
      return habits
    },
  }
  return habitsFunctions
}
