// import { useState } from "react"
import { Info } from "../type/Info"
import { Stage } from "../type/Stage"
import { Day } from "../type/Day"
import styles from "./TimeTableInfo.module.css"

const START_TIME = 570

type TimeTableInfoProps = {
  day: Day,
  stage: Stage,
  info: Info,
}

export const TimeTableInfo = ({
  day,
  stage,
  info
}: TimeTableInfoProps): JSX.Element => {
  // const [checkCount, setCheckCount] = useState(localStorage.length)

  const createHeight = (start: string, end: string) => {
    const startMinute = (Number(start.slice(0, 2)) * 60) + Number(start.slice(2, 4))
    const endMinute = (Number(end.slice(0, 2)) * 60) + Number(end.slice(2, 4))
    return `${(endMinute - startMinute) * 5}px`
  }

  const createTop = (start: string) => {
    const startMinute = (Number(start.slice(0, 2)) * 60) + Number(start.slice(2, 4))
    return `${((startMinute - START_TIME) * 5) + 50}px`
  }

  const getKey = (stage: Stage, info: Info) => {
    return `${day}${stage}${info.start}`
  }

  const handleCheck = (stage: Stage, info: Info) => () => {
    const key = getKey(stage, info)
    if (checked(stage, info)) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, '1')
    }
    // setCheckCount(localStorage.length)
  }

  const checked = (stage: Stage, info: Info) => {
    const key = getKey(stage, info)
    const checked = localStorage.getItem(key)
    return checked != null
  }

  const formatTime = (start: string, end: string) => {
    return `${start.slice(0, 2)}:${start.slice(2, 4)}〜${end.slice(0, 2)}:${end.slice(2, 4)}`
  }

  return (
    <div
      className={styles.main}
      style={{
        height: createHeight(info.start, info.end),
        top: createTop(info.start),
        color: checked(stage as Stage, info) ? 'white' : 'black',
        backgroundColor: checked(stage as Stage, info) ? 'green' : 'white'
      }}
      onClick={handleCheck(stage as Stage, info)}
    >
      <div>
        <span>{formatTime(info.start, info.end)}</span>
      </div>
      <span>{info.artist}</span>
    </div>
  )
}
