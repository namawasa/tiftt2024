import { Info } from "../type/Info"
import { Stage } from "../type/Stage"
import styles from "./TimeTableChecked.module.css"
import { useCallback } from "react"
import data from '../timetable2.json'
import { formatTime, getKey, getStageColor } from "../utils/stringUtil"
import { Day } from "../type/Day"
import { ArtistText } from "./ArtistText"

type TimeTableCheckedProps = {
  day: Day
}

export const TimeTableChecked = ({
  day
}: TimeTableCheckedProps): JSX.Element => {

  type DataItem = {
    key: string
    day: Day
    stage: Stage
    info: Info
  }

  const allData = useCallback(() => {
    const allList = [] as DataItem[]
    Object.keys(data.day1).map(val => {
      const stage = val as Stage
      data.day1[stage as Stage].map(info => {
        allList.push({ key: getKey(1, stage, info), day: 1, stage, info })
      })
    })
    Object.keys(data.day2).map(val => {
      const stage = val as Stage
      data.day2[stage as Stage].map(info => {
        allList.push({ key: getKey(2, stage, info), day: 2, stage, info })
      })
    })
    Object.keys(data.day3).map(val => {
      const stage = val as Stage
      data.day3[stage as Stage].map(info => {
        allList.push({ key: getKey(3, stage, info), day: 3, stage, info })
      })
    })
    return allList
  }, [data])

  const checkedDatas = () => {
    const list = [] as DataItem[]
    Object.keys(localStorage).map(key => {
      const item = allData().find(val => val.key === key)
      if (item != null) list.push(item)
    })
    const sortedList = list.sort((a, b) => {
      return Number(a.info.start) - Number(b.info.start)
    })
    return sortedList
  }

  return (
    <div className={styles.main}>
      <div className={styles.item}>
        <span className={styles['day' + day]}>{day + 1}日</span>
      </div>
      {checkedDatas().map(item => {
        if (day !== item.day) return <></>
        return (
          <div
            key={item.key}
            className={styles.item}
            style={{ backgroundColor: getStageColor(item.stage) }}
          >
            <span className={styles.stage}>{item.stage}</span>
            <span><ArtistText artist={item.info.artist} /></span>
            <span>{formatTime(item.info.start ?? '', item.info.end ?? '')}</span>
          </div>
        )
      })}
    </div>
  )
}
