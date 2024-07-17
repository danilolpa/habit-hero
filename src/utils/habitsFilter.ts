import { HabitsType, TimePeriodType } from "@/types/habits"
import { getFormattedDate } from "./dateHelpers"

export interface HabitsFiltersInterface {
  filterByPeriod(periods: TimePeriodType | TimePeriodType[]): this
  filterByDay(date: string): this
  getByValidDates(): HabitsType[]
  getAll(): HabitsType[]
  getByDate(selectedDate: string): this
}

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
     * habitsFilters.filterByPeriod('daily').getByValidDates();
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
      if (habits.length > 0) {
        habits = habits.filter(
          (habit: HabitsType) => date >= getFormattedDate("yyyy-MM-dd", habit.createdDate),
        )
      }

      return this
    },

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

    filterBySingleDate() {
      habits = habits.filter((habit: HabitsType) => {
        if (habit.repeat === true) {
          return true
        }
        if (habit.singleDate?.dateString === selectedDate && !habit.repeat) {
          return true
        }
        return false
      })

      return this
    },

    getByDate(date: string) {
      selectedDate = date
      return this
    },

    getByValidDates() {
      habits = habitsFunctions
        .filterByDay(selectedDate)
        .filterByEndDate(selectedDate)
        .filterBySingleDate()
        .getAll()

      return habits
    },
    getAll() {
      return habits
    },
  }
  return habitsFunctions
}
